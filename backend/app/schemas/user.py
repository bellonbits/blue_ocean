from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models.activity_log import ActivityAction
from app.models.user import UserRole


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    full_name: str | None = None
    role: UserRole = UserRole.EDITOR


class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    full_name: str = Field(min_length=2, max_length=150)


class LoginJsonRequest(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    full_name: str | None = None
    role: UserRole | None = None
    is_active: bool | None = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8, max_length=72)


class UpdateOwnProfileRequest(BaseModel):
    """Deliberately narrower than UserUpdate — self-service can only ever
    touch full_name/phone/avatar_url, never role or is_active (see
    users.py's PATCH for why self-role/self-active changes are blocked
    outright)."""

    full_name: str = Field(min_length=2, max_length=150)
    phone: str | None = None
    avatar_url: str | None = None


class UpdateNotificationPreferencesRequest(BaseModel):
    new_contact_messages: bool | None = None
    volunteer_enquiries: bool | None = None
    partnership_enquiries: bool | None = None
    new_article_published: bool | None = None
    system_updates: bool | None = None


class UpdateInterestsRequest(BaseModel):
    interests: list[str]


class ActivityLogEntryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    action: ActivityAction
    resource_type: str
    resource_label: str
    created_at: datetime


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    email: EmailStr
    full_name: str | None
    role: UserRole
    is_active: bool
    phone: str | None = None
    avatar_url: str | None = None
    notification_preferences: dict = {}
    interests: list[str] = []
    created_at: datetime


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead
