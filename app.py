from flask import Flask, jsonify
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
def get_cupcakes():
    cupcakes = [c.serialize() for c in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcake/<int:id>')
def get_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake=cupcake.serialize())

