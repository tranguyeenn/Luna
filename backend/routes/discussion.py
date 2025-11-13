'''
routes/discussion.py
- Handles discussion board enpoints (creating posts, comments, replies)
'''

#routes/discussion.py

from flask import Blueprint, jsonify, request
from controllers.discussion_controller import (
    get_all_discsussions,
    get_discussion_by_id, 
    create_discussion,
    update_discussion,
    delete_discussion
)
from utils.error_handler import handle_api_error

discussion_bp = Blueprint("discussion", __name__)

@discussion_bp.route("/", methods=["GET"])
def get_discussion_route():
    try:
        posts = get_all_discsussions()
        return jsonify(posts), 200
    except Exception as e:
        return handle_api_error(e)
    
@discussion_bp.route("/<discussion_id>", methods=["GET"])
def get_discussion_by_id_route(discussion):
    try:
        post = get_discussion_by_id(discussion)
        return jsonify(post), 200
    except Exception as e:
        return handle_api_error(e)

@discussion_bp.route("/", methods=["POST"])
def create_discussion_route():
    try:
        data = request.get_json()
        new_post = create_discussion(data)
        return jsonify(new_post), 201
    except Exception as e:
        return handle_api_error(e)
    
@discussion_bp.route("/<discussion_id>", methods=["PUT"])
def update_discussion_route(discussion_id):
    try:
        data = request.get_json()
        updated_post = update_discussion(discussion_id, data)
        return jsonify(updated_post), 200
    except Exception as e:
        return handle_api_error(e)
    
@discussion_bp.route("/<discussion_id>", methods=["DELETE"])
def delete_discussion_route(discussion_id):
    try:
        delete_discussion(discussion_id)
        return jsonify({"message": "Discussion deleted successfully"}), 200
    except Exception as e:
        return handle_api_error(e)
