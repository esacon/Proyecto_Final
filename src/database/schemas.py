def get_user_schema():
    return {
            "bsonType": "object",
            "required": ["username", "email", "password", "name"],
            "properties": {
                "name": {"type": "string", "pattern": "[A-Za-z\s]*"},
                "username": {"type": "string", "pattern": "[a-z0-9]{5,15}"},
                "age": {"type": "integer", "minimum": 0, "maximum":120},
                "email": {"type": "string", "pattern": "[a-z0-9]{5,15}"},
                "password": {"type": "string", "pattern": "[a-zA-Z0-9]{5,15}"},
                "confirm_password": {"type": "string", "pattern": "[a-zA-Z0-9]{5,15}"}
            }
        }