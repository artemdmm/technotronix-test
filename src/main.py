from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from database import init_db
from devices.router import device_router
from accumulators.router import accumulator_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(device_router, prefix="/devices")
app.include_router(accumulator_router, prefix="/accumulators")

if __name__  == "__main__": 
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)