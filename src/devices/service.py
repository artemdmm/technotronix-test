from fastapi import HTTPException, status
from sqlmodel import select

from database import get_session
from devices.schemas import DeviceBase
from devices.models import DeviceModel

class DeviceService:
    session: str
    
    def __init__(self):
        self.session = next(get_session())

    async def get_list_devices(self):
        result = self.session.exec(select(DeviceModel).order_by(DeviceModel.id))
        devices = result.all()
        return [d for d in devices]

    async def create_device(self,
                         dev: DeviceBase):
        device = DeviceModel()
        new_data = dev.model_dump(exclude_unset=True)
        for key, value in new_data.items(): 
            setattr(device, key, value)
        self.session.add(device)
        self.session.commit()
        self.session.refresh(device)
        return device

    async def update_device(self,
                         id: int,
                         dev: DeviceBase):
        device = self.session.get(DeviceModel, id)
        if device:
            newdev = dev.model_dump(exclude_unset=True)
            for key, value in newdev.items(): 
                setattr(device, key, value)
            self.session.add(device)
            self.session.commit()
            self.session.refresh(device)
            return device
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Device with this ID is unavailable"
        )

    async def delete_device(self,
                         id: int):
        device = self.session.get(DeviceModel, id)
        if device:
            self.session.delete(device)
            self.session.commit()
            return {"status": "Success"}
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Device with this ID is unavailable"
        )