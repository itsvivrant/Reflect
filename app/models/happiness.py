from .db import db

from datetime import datetime


class Happiness(db.Model):
    __tablename__: 'happiness'

    id = db.Column(db.Integer, primary_key=True)
    overall_happiness = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    updated_at = db.Column(db.DateTime, onupdate=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='happiness')

    def to_dict(self):
        return {
            'id': self.id,
            'overall_happiness': self.overall_happiness,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id,
        }
