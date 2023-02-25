from flask import Flask, jsonify, request
from flask_debugtoolbar import DebugToolbarExtension
from keys import SECRET_KEY
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.app_context().push()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = SECRET_KEY
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

connect_db(app)


@app.route('/api/cupcakes')
def get_all_cupcakes():
    """API: Get all cupcakes"""
    cupcakes = [c.serialize() for c in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<int:id>')
def get_cupcake(id):
    """API: Get one cupcake based on ID"""
    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    """API: Create a new cupcake"""

    # Get data from body of JSON request
    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    image = request.json['image']

    # Create new cupcake from data
    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()

    # Return "CREATED" response with JSON
    json_resp = jsonify(cupcake=new_cupcake.serialize())
    return (json_resp, 201)

@app.route('/api/cupcakes/<int:id>', methods=['PATCH'])
def update_cupcake(id):
    """API: Update existing cupcake"""
    cupcake = Cupcake.query.get_or_404(id)

    # Update cupcake with data from body of JSON request if it exists
    # Otherwise, keep it the same
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)

    # Update the database with the updated cupcake info and return JSON
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())



