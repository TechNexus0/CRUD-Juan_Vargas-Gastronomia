
from motor.motor_asyncio import AsyncIOMotorClient
from decouple import config

MONGO_URL = config("MONGO_URL")
DB_NAME = config("DB_NAME", default="restaurante_db")

client = AsyncIOMotorClient(MONGO_URL)
database = client[DB_NAME]
restaurante_collection = database["restaurante"]


async def get_restaurantes():
    restaurantes = []
    cursor = restaurante_collection.find()

    async for restaurante in cursor:
        restaurante["id"] = str(restaurante.pop("_id"))
        restaurantes.append(restaurante)

    return restaurantes


async def get_restaurante(id):
    from bson import ObjectId

    if not ObjectId.is_valid(id):
        return None

    restaurante = await restaurante_collection.find_one(
        {"_id": ObjectId(id)}
    )

    if restaurante:
        restaurante["id"] = str(restaurante.pop("_id"))

    return restaurante


async def create_restaurante(restaurante):
    resultado = await restaurante_collection.insert_one(restaurante)
    return str(resultado.inserted_id)


async def update_restaurante(id, datos):
    from bson import ObjectId

    if not ObjectId.is_valid(id):
        return False

    resultado = await restaurante_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": datos}
    )

    return resultado.matched_count > 0


async def delete_restaurante(id):
    from bson import ObjectId

    if not ObjectId.is_valid(id):
        return False

    resultado = await restaurante_collection.delete_one(
        {"_id": ObjectId(id)}
    )

    return resultado.deleted_count > 0
