from flask import Flask
from keys import SECRET_KEY

app = Flask(__name__)
app.app_context().push()

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = SECRET_KEY


