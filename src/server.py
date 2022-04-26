from flask import Flask
from flask_cors import CORS
from routes.user import user as user_routes

app = Flask(__name__)
CORS(app)

# Routes
app.register_blueprint(user_routes, url_prefix='/user')


if __name__ == '__main__':
    app.run(debug=True, port=3000)