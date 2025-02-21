from all_recipes_parser import AllRecipesParser
from simply_recipes_parser import SimplyRecipesParser

# import os
# import requests
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/", methods=["POST"])
@cross_origin()
def get_recipe():
    try:
        req = request.get_json()
        url = req.get("url")
        if not url:
            return jsonify({"error": "No URL provided"}, 400)

        # BACKEND_URL = os.environ.get("BACKEND_URL", "http://localhost:8080/recipes")

        if "simplyrecipes.com" in url:
            parsed_data = SimplyRecipesParser(url).parse()
        elif "allrecipes.com" in url:
            parsed_data = AllRecipesParser(url).parse()
        else:
            raise ValueError("URL must be from 'allrecipes.com' or 'simplyrecipes.com'")

        # response = requests.post(BACKEND_URL, json=parsed_data)

        return jsonify(parsed_data)
    except ValueError as e:
        return jsonify({"error": str(e)}, 400)
    except Exception as e:
        return jsonify(
            {"error": "An unexpected error occurred", "details": str(e)}, 500
        )


app.run(host="0.0.0.0", port=5555)
