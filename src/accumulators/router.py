from fastapi import APIRouter, Depends, Form
from typing import Annotated

from accumulators.models import AccumulatorModel
from accumulators.service import AccumulatorService
from accumulators.schemas import AccumulatorBase, BindBase

accumulator_router = APIRouter(
    tags=["Accumulator"]
)

@accumulator_router.get("/get", response_model=list[AccumulatorModel])
async def get_accumulator(response: Annotated[AccumulatorService, Depends(AccumulatorService)]):
    return await response.get_list_accumulators()

@accumulator_router.post("/add", response_model=AccumulatorModel)
async def add_accumulator(response: Annotated[AccumulatorService, Depends(AccumulatorService)],
                  accumulatorbase: AccumulatorBase):
    return await response.create_accumulator(accumulatorbase)

@accumulator_router.put("/update/{id}", response_model=AccumulatorModel)
async def edit_accumulator(response: Annotated[AccumulatorService, Depends(AccumulatorService)],
                   id: int,
                   accumulatorbase: AccumulatorBase):
    return await response.update_accumulator(id, accumulatorbase)

@accumulator_router.delete("/delete/{id}")
async def remove_accumulator(response: Annotated[AccumulatorService, Depends(AccumulatorService)],
                     id: int):
    return await response.delete_accumulator(id)

@accumulator_router.put("/bind")
async def bind(response: Annotated[AccumulatorService, Depends(AccumulatorService)],
                   bindbase: BindBase):
    return await response.bind_device(bindbase)