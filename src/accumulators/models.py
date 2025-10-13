from sqlmodel import Field, SQLModel
from datetime import date

class AccumulatorModel(SQLModel, table=True):
    __tablename__ = 'accumulators'
    id: int = Field(nullable=False, primary_key=True)
    acc_name: str = Field(nullable=False, unique=True)
    nom_voltage: int = Field(nullable=False)
    capacity: int = Field(nullable=False)
    exp_date: date = Field(nullable=False)
    device_id: int = Field(nullable=True, foreign_key="devices.id")