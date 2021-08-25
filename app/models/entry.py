from .db import db
# from sqlalchemy.sql import func
from datetime import datetime



class Entry(db.Model):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    progress = db.Column(db.Boolean, nullable=False)
    letter = db.Column(db.Boolean, nullable=False)
    visit = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    updated_at = db.Column(db.DateTime, onupdate=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    journal_id = db.Column(db.Integer, db.ForeignKey('journals.id'), nullable=False)

    user = db.relationship('User', back_populates='entries')
    journal = db.relationship('Journal', back_populates='entries')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'progress': self.progress,
            'letter': self.letter,
            'visit': self.visit,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id,
            'journal_id': self.journal_id
        }
