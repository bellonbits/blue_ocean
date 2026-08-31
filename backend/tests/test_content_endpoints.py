"""Tests for public content read APIs across all modules."""

from fastapi.testclient import TestClient


def test_list_regions(client: TestClient):
    response = client.get("/api/v1/regions")
    assert response.status_code == 200
    assert len(response.json()) >= 3


def test_list_destinations(client: TestClient):
    response = client.get("/api/v1/destinations")
    assert response.status_code == 200
    destinations = response.json()
    assert len(destinations) >= 5
    assert any(d["slug"] == "bosaso" for d in destinations)


def test_list_species(client: TestClient):
    response = client.get("/api/v1/species")
    assert response.status_code == 200
    species_list = response.json()
    assert len(species_list) >= 5
    assert any(s["slug"] == "whale-shark" for s in species_list)


def test_list_research_projects(client: TestClient):
    response = client.get("/api/v1/research-projects")
    assert response.status_code == 200
    projects = response.json()
    assert len(projects) >= 4


def test_list_experiences(client: TestClient):
    response = client.get("/api/v1/experiences")
    assert response.status_code == 200
    exps = response.json()
    assert len(exps) >= 4


def test_list_conservation_projects(client: TestClient):
    response = client.get("/api/v1/conservation-projects")
    assert response.status_code == 200
    cps = response.json()
    assert len(cps) >= 4


def test_list_community_stories(client: TestClient):
    response = client.get("/api/v1/community-stories")
    assert response.status_code == 200
    stories = response.json()
    assert len(stories) >= 4


def test_list_news_articles(client: TestClient):
    response = client.get("/api/v1/news-articles")
    assert response.status_code == 200
    articles = response.json()
    assert len(articles) >= 4


def test_team_members_empty_by_default_and_admin_crud(client: TestClient, super_admin_token: str):
    # No fabricated people seeded — public list starts empty.
    public = client.get("/api/v1/team-members")
    assert public.status_code == 200
    assert public.json() == []

    headers = {"Authorization": f"Bearer {super_admin_token}"}
    create = client.post(
        "/api/v1/team-members",
        json={"slug": "test-researcher", "name": "Test Researcher", "role": "Marine Biologist", "published": False},
        headers=headers,
    )
    assert create.status_code == 201
    member_id = create.json()["id"]

    try:
        # Unpublished — hidden from public list, visible to admin.
        assert client.get("/api/v1/team-members").json() == []
        admin_list = client.get("/api/v1/team-members/admin/all", headers=headers)
        assert any(m["id"] == member_id for m in admin_list.json())

        publish = client.patch(f"/api/v1/team-members/{member_id}", json={"published": True}, headers=headers)
        assert publish.status_code == 200
        assert any(m["id"] == member_id for m in client.get("/api/v1/team-members").json())

        detail = client.get("/api/v1/team-members/test-researcher")
        assert detail.status_code == 200
        assert detail.json()["name"] == "Test Researcher"
    finally:
        client.delete(f"/api/v1/team-members/{member_id}", headers=headers)


def test_organization_settings(client: TestClient):
    response = client.get("/api/v1/organization")
    assert response.status_code == 200
    data = response.json()
    assert "mission_statement" in data
    assert "mission_description" in data
    assert "Somalia" in data.get("mission_description", "")


def test_admin_destination_endpoints_require_role(client: TestClient):
    assert client.get("/api/v1/destinations/admin/all").status_code == 401
    assert client.get("/api/v1/regions/admin/all").status_code == 401


def test_admin_destinations_list_includes_unpublished(client: TestClient, super_admin_token: str, editor_token: str):
    headers = {"Authorization": f"Bearer {super_admin_token}"}

    create = client.post(
        "/api/v1/destinations",
        json={
            "slug": "test-hidden-destination",
            "name": "Test Hidden Destination",
            "region_id": client.get("/api/v1/regions").json()[0]["id"],
            "status": "draft",
        },
        headers=headers,
    )
    assert create.status_code == 201
    created_id = create.json()["id"]

    try:
        public = client.get("/api/v1/destinations")
        assert not any(d["id"] == created_id for d in public.json())

        admin_list = client.get("/api/v1/destinations/admin/all", headers=headers)
        assert admin_list.status_code == 200
        assert any(d["id"] == created_id for d in admin_list.json())

        admin_get = client.get(f"/api/v1/destinations/admin/{created_id}", headers=headers)
        assert admin_get.status_code == 200
        assert admin_get.json()["status"] == "draft"

        # Editor can create/edit (narrower delete role tested elsewhere), so admin-list should also work for editor.
        editor_headers = {"Authorization": f"Bearer {editor_token}"}
        assert client.get("/api/v1/destinations/admin/all", headers=editor_headers).status_code == 200
    finally:
        client.delete(f"/api/v1/destinations/{created_id}", headers=headers)


def test_activity_log_records_create_and_publish(client: TestClient, super_admin_token: str):
    headers = {"Authorization": f"Bearer {super_admin_token}"}

    create = client.post(
        "/api/v1/destinations",
        json={
            "slug": "test-activity-destination",
            "name": "Test Activity Destination",
            "region_id": client.get("/api/v1/regions").json()[0]["id"],
            "status": "published",
        },
        headers=headers,
    )
    assert create.status_code == 201
    created_id = create.json()["id"]

    try:
        activity = client.get("/api/v1/auth/me/activity", headers=headers)
        assert activity.status_code == 200
        entries = activity.json()
        recent = [e for e in entries if e["resource_label"] == "Test Activity Destination"]
        actions = {e["action"] for e in recent}
        assert "created" in actions
        assert "published" in actions
        assert all(e["resource_type"] == "destination" for e in recent)
    finally:
        client.delete(f"/api/v1/destinations/{created_id}", headers=headers)
