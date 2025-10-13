from fastapi import HTTPException, status
from sqlmodel import select
from sqlalchemy import func

from database import get_session
from accumulators.schemas import AccumulatorBase
from accumulators.models import AccumulatorModel
from accumulators.utils import is_date
from devices.models import DeviceModel

class AccumulatorService:
    session: str
    
    def __init__(self):
        self.session = next(get_session())

    async def get_list_accumulators(self):
        result = self.session.exec(select(AccumulatorModel).order_by(AccumulatorModel.id))
        accumulators = result.all()
        return [acc for acc in accumulators]

    async def create_accumulator(self,
                         acc: AccumulatorBase):
        if is_date(acc.exp_date):
            accumulator = AccumulatorModel()
            new_data = acc.model_dump(exclude_unset=True)
            for key, value in new_data.items(): 
                setattr(accumulator, key, value)
            self.session.add(accumulator)
            self.session.commit()
            self.session.refresh(accumulator)
            return accumulator
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Date is unacceptable"
        )

    async def update_accumulator(self,
                         id: int,
                         acc: AccumulatorBase):
        accumulator = self.session.get(AccumulatorModel, id)
        if accumulator:
            if is_date(acc.exp_date):
                newdev = acc.model_dump(exclude_unset=True)
                for key, value in newdev.items(): 
                    setattr(accumulator, key, value)
                self.session.add(accumulator)
                self.session.commit()
                self.session.refresh(accumulator)
                return accumulator
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Date is unacceptable"
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Accumulator with this ID is unavailable"
        )

    async def delete_accumulator(self,
                         id: int):
        accumulator = self.session.get(AccumulatorModel, id)
        if accumulator:
            self.session.delete(accumulator)
            self.session.commit()
            return {"status": "Success"}
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Accumulator with this ID is unavailable"
        )

    async def bind_device(self,
                         base: AccumulatorBase):
        if base.dev_id != 0:
            device = self.session.get(DeviceModel, base.dev_id)
            if not device:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Device with this ID is unavailable"
                )
        accumulator = self.session.get(AccumulatorModel, base.acc_id)
        if accumulator:
            if base.dev_id != 0:
                result = self.session.query(func.count()).select_from(AccumulatorModel).where(AccumulatorModel.device_id == base.dev_id).scalar()
                if result < 5:
                    accumulator.device_id = base.dev_id
                    self.session.add(accumulator)
                    self.session.commit()
                    self.session.refresh(accumulator)
                    return {"status": "Success"}
                else:
                    raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="A maximum of 5 accumulators can be linked to the device"
                )
            else:
                accumulator.device_id = None
                self.session.add(accumulator)
                self.session.commit()
                self.session.refresh(accumulator)
                return {"status": "Success"}
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Accumulator with this ID is unavailable"
        )