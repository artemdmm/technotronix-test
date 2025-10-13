from pydantic import BaseModel

class AccumulatorBase(BaseModel):
    acc_name: str
    nom_voltage: int
    capacity: int
    exp_date: str

class BindBase(BaseModel):
    acc_id: int
    dev_id: int