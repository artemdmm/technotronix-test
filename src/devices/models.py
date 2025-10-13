from sqlmodel import Field, SQLModel

class DeviceModel(SQLModel, table=True):
    __tablename__ = 'devices'
    id: int = Field(nullable=False, primary_key=True)
    dev_name: str = Field(nullable=False, unique=True)
    version: str = Field(nullable=False)
    condition: bool