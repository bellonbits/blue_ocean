"""Tests for admin dashboard stats and public contact inbox."""

from fastapi.testclient import TestClient


def test_contact_submission_flow(client: TestClient, super_admin_token: str):
    # 1. Submit contact inquiry as public user
    payload = {
        "name": "Amina Hassan",
        "email": "amina@example.com",
        "subject": "Research Collaboration Inquiry",
        "category": "research",
        "message": "Interested in partnering on coral reef resilience mapping in Puntland.",
    }
    response = client.post("/api/v1/contact-submissions", json=payload)
    assert response.status_code == 201
    created = response.json()
    assert created["email"] == "amina@example.com"
    submission_id = created["id"]

    # 2. Admin fetches inbox
    inbox_res = client.get(
        "/api/v1/contact-submissions",
        headers={"Authorization": f"Bearer {super_admin_token}"},
    )
    assert inbox_res.status_code == 200
    assert any(s["id"] == submission_id for s in inbox_res.json())

    # 3. Admin marks as read
    update_res = client.patch(
        f"/api/v1/contact-submissions/{submission_id}",
        json={"is_read": True, "admin_notes": "Contacted via email on Aug 30."},
        headers={"Authorization": f"Bearer {super_admin_token}"},
    )
    assert update_res.status_code == 200
    assert update_res.json()["is_read"] is True


def test_admin_stats_unauthorized(client: TestClient):
    response = client.get("/api/v1/admin/stats")
    assert response.status_code == 401


def test_admin_stats_authorized(client: TestClient, super_admin_token: str):
    response = client.get(
        "/api/v1/admin/stats",
        headers={"Authorization": f"Bearer {super_admin_token}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "users" in data
    assert "content" in data
    assert "contact_submissions" in data
    assert data["users"]["total"] >= 1
    assert data["content"]["species"] >= 5
    assert data["content"]["destinations"] >= 5
