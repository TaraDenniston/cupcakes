from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMG = 'https://www.trophycupcakes.com/sites/default/files/styles/standard_cupcake_600w/public/cupcakes/cupcake-placeholder-lemon_0.jpg?itok=KOuQiFms'

def connect_db(app):
    db.app = app
    db.init_app(app)


class Cupcake(db.Model):
    """Model for a cupcake"""

    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, default=DEFAULT_IMG)

    def __repr__(self):
        return f'< Cupcake {self.id}: {self.size} {self.flavor} >'
    
    def serialize(self):
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }
