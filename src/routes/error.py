from flask import Blueprint, jsonify, request

error = Blueprint("error", __name__)


# Error handlers
@error.errorhandler(404)
def not_found(error=None):
    message = {
        'message': 'Resource Not Found ' + request.url,
        'status': 404
    }
    print(message)
    response = jsonify(message)
    response.status_code = 404
    return response


@error.errorhandler(500)
def validation(status_error=500):
    message = {
        'message': 'The content does not correspond to the expected one. ' + request.url,
        'status': status_error
    }
    print(message)
    response = jsonify(message)
    response.status_code = status_error
    return response

def already_exists():
    message = {
        'message': 'Data already exists in the database. ' + request.url,
        'status': 500
    }
    print(message)
    response = jsonify(message)
    response.status_code = 500
    return response