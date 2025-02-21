import requests
import re
from bs4 import BeautifulSoup, Tag
from typing import cast


class SimplyRecipesParser:
    def __init__(self, url):
        self.url = url

        try:
            response = requests.get(url)
            response.raise_for_status()
            self.soup = BeautifulSoup(response.text, "html.parser")
        except requests.exceptions.HTTPError as e:
            raise ValueError(f"Invalid URL: {e}")

    def parse_name(self):
        tag = self.soup.find(class_="heading__title")
        tag = cast(Tag, tag)
        return tag.text.strip()

    def parse_description(self):
        tag = self.soup.find(class_="heading__subtitle")
        tag = cast(Tag, tag)
        return tag.text.strip()

    def parse_input_url(self):
        return self.url

    def parse_instructions(self):
        instructions = self.soup.find_all(class_="mntl-sc-block-group--LI")
        instructions_text = []
        step_number = 1
        for instruction in instructions:
            insertion = (
                f"Step {step_number}: {instruction.text.strip().replace('\n', ' ')}"
            )
            instructions_text.append(insertion)
            step_number += 1
        return (
            "\n".join(instructions_text)
            .replace("\xa0", " ")
            .replace("\xb0", "°")
            .replace("\u2019", "'")
        )

    def parse_nutrition(self):
        nutrition_object = {}
        table_row = self.soup.find_all(class_="nutrition-info__table--row")
        for row in table_row:
            cells = row.find_all(class_="nutrition-info__table--cell")
            value = cells[0].text.strip().strip("g")
            key = cells[1].text.strip().lower()
            nutrition_object[key] = int(value)

        return nutrition_object

    def parse_cooking_time(self):
        cook_time_container = self.soup.find(class_="project-meta__times-container")
        cook_time_container = cast(Tag, cook_time_container)
        cook_time_details = cook_time_container.find_all(class_="meta-text")
        cook_time_object = {}
        for detail in cook_time_details:
            key = (
                detail.find(class_="meta-text__label")
                .text.strip()
                .lower()
                .replace(" ", "_")
            )

            total_minutes = 0
            value_set = detail.find(class_="meta-text__data").text.strip()

            hours_match = re.search(r"(\d+)\s*hrs?", value_set)
            minutes_match = re.search(r"(\d+)\s*mins?", value_set)

            if hours_match:
                total_minutes += int(hours_match.group(1)) * 60

            if minutes_match:
                total_minutes += int(minutes_match.group(1))

            cook_time_object[key] = total_minutes

        return cook_time_object

    def parse_ingredients(self):
        ingredients = self.soup.find_all(class_="structured-ingredients__list-item")
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
        image = cast(Tag, image)
        image_source = image.find("img")
        image_source = cast(Tag, image_source)
        attribute = image_source.get("src")
        return attribute

    def parse_servings(self):
        servings_info = self.soup.find(class_="project-meta__recipe-serving")
        servings_info = cast(Tag, servings_info)
        servings = servings_info.find(class_="meta-text__data")
        servings = cast(Tag, servings)
        return servings.text.strip()

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


print(
    SimplyRecipesParser(
        "https://www.simplyrecipes.com/three-ingredient-brisket-recipe-8758979"
    ).parse()
)
