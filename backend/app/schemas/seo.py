"""SEO and OpenGraph metadata schemas — Sprint B13."""

from typing import Any
from pydantic import BaseModel, ConfigDict


class SEOMetaResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    path: str
    title: str
    description: str | None = None
    canonical_url: str
    og_title: str
    og_description: str | None = None
    og_image: str | None = None
    og_type: str = "website"
    twitter_card: str = "summary_large_image"
    twitter_title: str
    twitter_description: str | None = None
    twitter_image: str | None = None
    json_ld: dict[str, Any] | None = None
