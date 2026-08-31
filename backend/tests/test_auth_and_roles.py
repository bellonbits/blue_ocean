"""Tests for authentication, registration, role gating, and password changes."""

from uuid import uuid4
from fastapi.testclient import TestClient


def test_login_invalid_credentials(client: TestClient):
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "invalid@blueocean.so", "password": "WrongPassword123!"},
    )
    assert response.status_code == 401


def test_auth_me_unauthorized(client: TestClient):
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401


def test_auth_me_with_token(client: TestClient, super_admin_token: str):
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {super_admin_token}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "admin@blueoceansomalia.org"
    assert data["role"] == "super_admin"


def test_user_registration_and_json_login(client: TestClient):
    unique_email = f"user_{uuid4().hex[:8]}@example.com"
    reg_payload = {
        "email": unique_email,
        "password": "SecurePassword123!",
        "full_name": "Farhiya Warsame",
    }
    # 1. Register new user
    reg_res = client.post("/api/v1/auth/register", json=reg_payload)
    assert reg_res.status_code == 201
    reg_data = reg_res.json()
    assert "access_token" in reg_data
    assert reg_data["user"]["email"] == unique_email
    assert reg_data["user"]["full_name"] == "Farhiya Warsame"

    # 2. Duplicate registration fails
    dup_res = client.post("/api/v1/auth/register", json=reg_payload)
    assert dup_res.status_code == 400

    # 3. JSON login works
    login_res = client.post(
        "/api/v1/auth/login-json",
        json={"email": unique_email, "password": "SecurePassword123!"},
    )
    assert login_res.status_code == 200
    login_data = login_res.json()
    assert "access_token" in login_data
    assert login_data["user"]["email"] == unique_email


def test_update_own_profile(client: TestClient):
    unique_email = f"user_{uuid4().hex[:8]}@example.com"
    reg_res = client.post(
        "/api/v1/auth/register",
        json={"email": unique_email, "password": "SecurePassword123!", "full_name": "Original Name"},
    )
    token = reg_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Can update own name
    res = client.patch("/api/v1/auth/me", json={"full_name": "Updated Name"}, headers=headers)
    assert res.status_code == 200
    assert res.json()["full_name"] == "Updated Name"

    # Role/active status aren't accepted by this endpoint at all — sending
    # them alongside full_name has no effect, unlike admin's /users PATCH.
    res = client.patch(
        "/api/v1/auth/me", json={"full_name": "Still Content Manager", "role": "super_admin"}, headers=headers
    )
    assert res.status_code == 200
    assert res.json()["role"] == "content_manager"

    # Requires auth
    assert client.patch("/api/v1/auth/me", json={"full_name": "Nope"}).status_code == 401
