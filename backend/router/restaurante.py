
from fastapi import APIRouter, HTTPException
from pymongo.errors import DuplicateKeyError
from models import RestauranteModel, UpdateModel
from database import (
    get_restaurantes,
    get_restaurante,
    create_restaurante,
    update_restaurante,
    delete_restaurante,
    restaurante_collection
)

router = APIRouter()


@router.get("/")
async def listar_restaurantes():
    return await get_restaurantes()


@router.get("/{id}")
async def buscar_restaurante(id: str):
    restaurante = await get_restaurante(id)

    if not restaurante:
        raise HTTPException(
            status_code=404,
            detail="Plato no encontrado"
        )

    return restaurante


@router.post("/")
async def registrar_restaurante(restaurante: RestauranteModel):
    existente = await restaurante_collection.find_one(
        {"plato": restaurante.plato}
    )

    if existente:
        raise HTTPException(
            status_code=400,
            detail="Ya existe un plato con ese nombre"
        )

    try:
        nuevo_id = await create_restaurante(
            restaurante.model_dump()
        )
    except DuplicateKeyError:
        raise HTTPException(
            status_code=400,
            detail="Ya existe un plato con ese nombre"
        )

    return {
        "mensaje": "Plato registrado correctamente",
        "id": nuevo_id
    }


@router.put("/{id}")
async def modificar_restaurante(
    id: str,
    datos: UpdateModel
):
    restaurante = await get_restaurante(id)

    if not restaurante:
        raise HTTPException(
            status_code=404,
            detail="Plato no encontrado"
        )

    cambios = datos.model_dump(exclude_unset=True)

    if not cambios:
        raise HTTPException(
            status_code=400,
            detail="Debes enviar al menos un campo para actualizar"
        )

    if "plato" in cambios:
        existente = await restaurante_collection.find_one(
            {
                "plato": cambios["plato"],
                "_id": {"$ne": __import__(
                    "bson"
                ).ObjectId(id)}
            }
        )

        if existente:
            raise HTTPException(
                status_code=400,
                detail="Ya existe otro plato con ese nombre"
            )

    await update_restaurante(id, cambios)

    return {
        "mensaje": "Plato actualizado correctamente"
    }


@router.delete("/{id}")
async def eliminar_restaurante(id: str):
    eliminado = await delete_restaurante(id)

    if not eliminado:
        raise HTTPException(
            status_code=404,
            detail="Plato no encontrado"
        )

    return {
        "mensaje": "Plato eliminado correctamente"
    }
