from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.experience_interest import ExperienceInterestStatus


class ExperienceInterestCreate(BaseModel):
    experience_slug: str
    status: ExperienceInterestStatus = ExperienceInterestStatus.INTERESTED


class ExperienceInterestUpdate(BaseModel):
    status: ExperienceInterestStatus


class ExperienceInterestRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    experience_slug: str
    status: ExperienceInterestStatus
    created_at: datetime
    updated_at: datetime
