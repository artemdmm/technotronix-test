from pydantic import BaseModel

class DeviceBase(BaseModel):
    dev_name: str
    version: str
    condition: bool