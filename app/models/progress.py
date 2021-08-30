from .db import db
# from sqlalchemy.sql import func
from datetime import datetime

class Progress(db.Model):
    __tablename__ = 'progresses'

    id = db.Column(db.Integer, primary_key=True)
    progress_date = db.Column(db.Date, nullable=True)
    progress = db.Column(db.Boolean, nullable=True)
    letter = db.Column(db.Boolean, nullable=True)
    visit = db.Column(db.Boolean, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    updated_at = db.Column(db.DateTime, onupdate=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    entry_id = db.Column(db.Integer, db.ForeignKey('entries.id'), nullable=False)

    entry = db.relationship('Entry', back_populates='progresses' )

    def to_dict(self):
        return {
            'id': self.id,
            'progress_date': self.progress_date,
            'progress': self.progress,
            'letter': self.letter,
            'visit': self.visit,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'entry_id': self.entry_id
        }
