import requests
import re
from bs4 import BeautifulSoup, Tag
from typing import cast


class AllRecipesParser:
    def __init__(self, url):
        self.url = url
        if "allrecipes.com" not in url:
            raise ValueError("URL must be from 'allrecipes.com'")

        try:
            response = requests.get(url)
            response.raise_for_status()
            self.soup = BeautifulSoup(response.text, "html.parser")
        except requests.exceptions.HTTPError as e:
            raise ValueError(f"Invalid URL: {e}")

    def parse_name(self):
        tag = self.soup.find(class_="article-heading")
        tag = cast(Tag, tag)
        return tag.text.strip()

    def parse_description(self):
        tag = self.soup.find(class_="article-subheading")
        tag = cast(Tag, tag)
        return tag.text.strip()

    def parse_input_url(self):
        return self.url

    def parse_instructions(self):
        tags = self.soup.find_all(class_="mntl-sc-block-html")
        tags_text = []
        for tag in tags:
            tags_text.append(tag.text.strip())
        return "\n".join(tags_text).replace("\xa0", " ")

    def parse_nutrition(self):
        nutrition_object = {}
        table_row = self.soup.find_all(
            class_="mm-recipes-nutrition-facts-summary__table-row"
        )
        for row in table_row:
            value = row.find(class_="text-body-100-prominent").text.strip().strip("g")

            key = row.find(class_="text-body-100").text.strip().lower()
            nutrition_object[key] = int(value)

        return nutrition_object

    def parse_cooking_time(self):
        cook_time_details = self.soup.find_all(class_="mm-recipes-details__item")
        cook_time_object = {}
        for detail in cook_time_details:
            key = (
                detail.find(class_="mm-recipes-details__label")
                .text.strip()
                .lower()
                .replace(" ", "_")
                .strip(":")
            )

            if key == "servings":
                break

            total_minutes = 0
            value_set = detail.find(class_="mm-recipes-details__value").text.strip()

            hours_match = re.search(r"(\d+)\s*hrs?", value_set)
            minutes_match = re.search(r"(\d+)\s*mins?", value_set)

            if hours_match:
                total_minutes += int(hours_match.group(1)) * 60

            if minutes_match:
                total_minutes += int(minutes_match.group(1))

            cook_time_object[key] = total_minutes

        return cook_time_object

    def parse_servings(self):
        cook_time_details = self.soup.find_all(class_="mm-recipes-details__item")
        for detail in cook_time_details:
            key = (
                detail.find(class_="mm-recipes-details__label")
                .text.strip()
                .lower()
                .replace(" ", "_")
                .strip(":")
            )
            if key == "servings":
                return int(
                    detail.find(class_="mm-recipes-details__value")
                    .text.strip()
                    .split(" ")[0]
                )

    def parse_ingredients(self):
        ingredients = self.soup.find_all(
            class_="mm-recipes-structured-ingredients__list-item"
        )
        ingredients_list = []
        for ingredient in ingredients:
            output = {}
            quantity = ingredient.find(attrs={"data-ingredient-quantity": True})
            unit = ingredient.find(attrs={"data-ingredient-unit": True})
            name = ingredient.find(attrs={"data-ingredient-name": True})

            if quantity:
                quantity_text = quantity.text.strip().split(" ")
                quantity = 0
                for i in range(len(quantity_text)):
                    match quantity_text[i]:
                        case "½":
                            quantity = quantity + 0.5
                        case "1/2":
                            quantity = quantity + 0.5
                        case "¼":
                            quantity = quantity + 0.25
                        case "1/4":
                            quantity = quantity + 0.25
                        case "¾":
                            quantity = quantity + 0.75
                        case "3/4":
                            quantity = quantity + 0.75
                        case "⅓":
                            quantity = quantity + 0.33
                        case "1/3":
                            quantity = quantity + 0.33
                        case "⅔":
                            quantity = quantity + 0.66
                        case "2/3":
                            quantity = quantity + 0.66
                        case "⅛":
                            quantity = quantity + 0.125
                        case "1/8":
                            quantity = quantity + 0.125
                        case "":
                            quantity = quantity
                        case _:
                            quantity = quantity + int(quantity_text[i])

                if quantity != 0:
                    output["quantity"] = quantity
            if unit:
                if unit.text.strip() != "":
                    output["unit"] = unit.text.strip()
            if name:
                output["name"] = name.text.strip()

            ingredients_list.append(output)

        return ingredients_list

    def parse_image_url(self):
        image = self.soup.find(class_="primary-image__media")
        if not image:
            image = self.soup.find(class_="figure-media")
            image = cast(Tag, image)
            image_source = image.find("img")
            image_source = cast(Tag, image_source)
            attribute = image_source.get("data-src")
            return attribute
        image = cast(Tag, image)
        image_source = image.find("img")
        image_source = cast(Tag, image_source)
        attribute = image_source.get("src")
        return attribute

    def parse(self):
        recipe = {
            "name": self.parse_name(),
            "description": self.parse_description(),
            "instructions": self.parse_instructions(),
            "nutrition": self.parse_nutrition(),
            "servings": self.parse_servings(),
            "cooking_time": self.parse_cooking_time(),
            "image_url": self.parse_image_url(),
            "input_url": self.parse_input_url(),
        }

        ingredients = self.parse_ingredients()
        return {"recipe": recipe, "ingredients": ingredients}
