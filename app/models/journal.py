from .db import db
# from sqlalchemy.sql import func
from datetime import datetime

class Journal(db.Model):
    __tablename__ = 'journals'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    coverUrl = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    updated_at = db.Column(db.DateTime, onupdate=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    user = db.relationship('User', back_populates='journals')
    entries = db.relationship('Entry', back_populates='journal', cascade="all, delete, delete-orphan", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "coverUrl": self.coverUrl,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id
        }
