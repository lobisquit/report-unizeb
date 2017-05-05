import datetime
import os

from sqlalchemy import (Boolean, Column, DateTime, Float, ForeignKey, Integer,
                        String, Table, create_engine)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

engine = create_engine(os.environ.get("DATABASE_URL"))
Base = declarative_base()

Session = sessionmaker()
Session.configure(bind=engine)
session = Session()

class Measure(Base):
	__tablename__ = 'measures'
	id = Column(Integer, primary_key=True)
	date_time = Column(DateTime, nullable=False)
	temperature = Column(Integer, nullable=False)
	humidity = Column(Integer, nullable=False)
	brightness = Column(Integer, nullable=False)

	def __repr__(self):
		return 'Measure(datetime="{}", temperature={}, humidity={}, brightness={})'\
					.format(
						self.date_time.strftime('%d-%m-%Y %H:%M:%S'),
						self.temperature,
						self.humidity,
						self.brightness)

Base.metadata.create_all(engine)
