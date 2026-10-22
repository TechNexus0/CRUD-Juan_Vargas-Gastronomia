
from pydantic import BaseModel, Field
from typing import Optional


class RestauranteModel(BaseModel):
    plato: str = Field(..., min_length=2, max_length=100)
    categoria_plato: str = Field(..., min_length=2, max_length=50)
    precio: float = Field(..., gt=0)
    disponible_hoy: bool


class UpdateModel(BaseModel):
    plato: Optional[str] = Field(None, min_length=2, max_length=100)
    categoria_plato: Optional[str] = Field(None, min_length=2, max_length=50)
    precio: Optional[float] = Field(None, gt=0)
    disponible_hoy: Optional[bool] = None
