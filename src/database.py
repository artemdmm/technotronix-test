from sqlalchemy import create_engine
from sqlmodel import SQLModel, Session

USERNAME = "postgres"
PASSWORD = "postgres"
HOST = "localhost"
PORT = "5432"
DB_NAME = "postgres"

engine = create_engine(f'postgresql+psycopg2://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}', pool_size=20, max_overflow=40)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session