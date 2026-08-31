from uuid import UUID

from pydantic import BaseModel, ConfigDict


class GalleryImage(BaseModel):
    url: str
    caption: str | None = None


class CommunityBase(BaseModel):
    slug: str
    name: str
    category: str | None = None
    location: str | None = None
    region: str | None = None
    hero_image: str | None = None
    description: str | None = None
    livelihoods: list[str] = []
    marine_connection: str | None = None
    conservation_activities: list[str] = []
    gallery: list[GalleryImage] = []
    published: bool = True


class CommunityCreate(CommunityBase):
    pass


class CommunityUpdate(BaseModel):
    slug: str | None = None
    name: str | None = None
    category: str | None = None
    location: str | None = None
    region: str | None = None
    hero_image: str | None = None
    description: str | None = None
    livelihoods: list[str] | None = None
    marine_connection: str | None = None
    conservation_activities: list[str] | None = None
    gallery: list[GalleryImage] | None = None
    published: bool | None = None


class CommunityRead(CommunityBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
