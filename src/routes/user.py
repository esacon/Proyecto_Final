from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util
from bson.objectid import ObjectId
from database.connection import db
from jsonschema import validate
from jsonschema.exceptions import ValidationError
import database.schemas as schemas
import routes.error as error


user = Blueprint("user", __name__)


@user.route('/', methods=['POST'])
def create_user():
    # Receiving data
    data = request.json
    
    if data['password'] == data['confirm_password']:
        # Encrypting password.
        data['password'] = generate_password_hash(data['password'])
        del data['confirm_password']
        # Validate User Schema
        try:
            # Validating mongodb schema.
            user_schema = schemas.get_user_schema()
            validate(instance=data, schema=user_schema)
            # Removing white spaces from string fields.
            for field in ['name', 'username', 'email', 'password']:
                data[field] = data[field].strip()
            # Prev user exists validation.
            prev_usr = db.users.find_one({"username": data["username"], "email": data["email"]})
            if not prev_usr:
                result = db.users.insert_one(data)
            else: 
                return error.already_exists()
        except ValidationError:
            return error.validation()
        # Giving a response to the server.
        response = jsonify({'_id': str(result.inserted_id)})
        response.status_code = 200
        return response
        
    return error.not_found()


@user.route('/', methods=['GET'])
def get_users():
    # Retrieving data
    response = jsonify({'message': 'ok'})
    response.status_code = 200

    return response