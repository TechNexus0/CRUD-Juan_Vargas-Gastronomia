
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from router.restaurante import router as restaurante_router

app = FastAPI()

FRONTEND_URL = config(
    "FRONTEND_URL",
    default="http://localhost:5173"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    restaurante_router,
    prefix="/api/restaurante",
    tags=["Restaurante"]
)


@app.get("/")
async def inicio():
    return {
        "mensaje": "API del restaurante funcionando correctamente"
    }
