"""Tests for search, dynamic sitemap, RSS feed, and SEO metadata."""

from fastapi.testclient import TestClient


def test_search_query_shark(client: TestClient):
    response = client.get("/api/v1/search?q=shark")
    assert response.status_code == 200
    data = response.json()
    assert data["query"] == "shark"
    assert data["total"] >= 1
    assert any(r["type"] == "species" for r in data["results"])


def test_search_with_type_filter(client: TestClient):
    response = client.get("/api/v1/search?q=shark&type=species")
    assert response.status_code == 200
    data = response.json()
    assert all(r["type"] == "species" for r in data["results"])


def test_search_empty_query(client: TestClient):
    response = client.get("/api/v1/search?q=")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0
    assert len(data["results"]) == 0


def test_sitemap_xml(client: TestClient):
    response = client.get("/sitemap.xml")
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("application/xml")
    assert "<urlset" in response.text
    assert "<loc>https://blueocean.so/</loc>" in response.text


def test_rss_xml(client: TestClient):
    response = client.get("/rss.xml")
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("application/rss+xml")
    assert "<rss version=\"2.0\"" in response.text
    assert "<channel>" in response.text


def test_seo_meta_species(client: TestClient):
    response = client.get("/api/v1/seo/meta?path=/marine-life/species/whale-shark")
    assert response.status_code == 200
    data = response.json()
    assert "Whale Shark" in data["title"]
    assert data["canonical_url"] == "https://blueocean.so/marine-life/species/whale-shark"
    assert data["json_ld"]["@type"] == "Taxon"
