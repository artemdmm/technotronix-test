from fastapi import APIRouter, Depends
from typing import Annotated

from devices.models import DeviceModel
from devices.service import DeviceService
from devices.schemas import DeviceBase

device_router = APIRouter(
    tags=["Device"]
)

@device_router.get("/get", response_model=list[DeviceModel])
async def get_device(response: Annotated[DeviceService, Depends(DeviceService)]):
    return await response.get_list_devices()

@device_router.post("/add", response_model=DeviceModel)
async def add_device(response: Annotated[DeviceService, Depends(DeviceService)],
                   devicebase: DeviceBase):
    return await response.create_device(devicebase)

@device_router.put("/update/{id}", response_model=DeviceModel)
async def edit_device(response: Annotated[DeviceService, Depends(DeviceService)],
                   id: int,
                   devicebase: DeviceBase):
    return await response.update_device(id, devicebase)

@device_router.delete("/delete/{id}")
async def remove_device(response: Annotated[DeviceService, Depends(DeviceService)],
                     id: int):
    return await response.delete_device(id)