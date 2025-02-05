import pytest
from simply_recipes_parser import (
    SimplyRecipesParser,
)


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.simplyrecipes.com/three-ingredient-brisket-recipe-8758979",
            "Step 1: Preheat the oven to 275°F.\nStep 2: Prepare the brisket: Place the brisket in a large, oven-safe roasting pan. In a large bowl, mix together the ketchup and the onion soup mix. Stir in the water. Pour the ketchup mixture all over the brisket. Flip the brisket once to make sure it's coated on both sides.\nStep 3: Cook the brisket: Cover the pan tightly with aluminum foil, being careful the foil doesn't touch the brisket and its tangy sauce. Cook the brisket in the oven until it feels tender all the way through when pierced with a fork but doesn't fall apart, 7 to 8 hours.\nStep 4: Rest, then serve: Remove the roasting pan from the oven and let it rest for 1 to 2 hours. This will ensure that the brisket is tender once sliced. After the brisket has cooled slice against the grain into 1/2-inch slices. Serve immediately. If you’re making ahead, see detailed instructions above. Store leftovers tightly wrapped in the refrigerator for up to 5 days or in the freezer for up to 3 months.",
        ),
    ],
)
def test_parse_instructions(url, expected):
    assert SimplyRecipesParser(url).parse_instructions() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.simplyrecipes.com/easy-puerto-rican-picadillo-recipe-8772420",
            "The Ground Beef Dinner I Make When I'm Too Tired To Cook",
        ),
        (
            "https://www.simplyrecipes.com/monkey-bread-recipe-6890369",
            "Monkey Bread",
        ),
    ],
)
def test_parse_name(url, expected):
    assert SimplyRecipesParser(url).parse_name() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.simplyrecipes.com/easy-puerto-rican-picadillo-recipe-8772420",
            "It’s a Puerto Rican classic.",
        ),
        (
            "https://www.simplyrecipes.com/monkey-bread-recipe-6890369",
            "This easy monkey bread recipe starts with store-bought biscuit dough. It’s loaded with cinnamon sugar and butter, and baked until perfectly gooey.",
        ),
    ],
)
def test_parse_description(url, expected):
    assert SimplyRecipesParser(url).parse_description() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.simplyrecipes.com/easy-puerto-rican-picadillo-recipe-8772420",
            "https://www.simplyrecipes.com/easy-puerto-rican-picadillo-recipe-8772420",
        ),
        (
            "https://www.simplyrecipes.com/monkey-bread-recipe-6890369",
            "https://www.simplyrecipes.com/monkey-bread-recipe-6890369",
        ),
        (
            "https://www.allrecipes.com/monkey-bread-recipe-6890369",
            "Not a valid URL",
        ),
    ],
)
def test_parse_input_url(url, expected):
    assert SimplyRecipesParser(url).parse_input_url() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.simplyrecipes.com/easy-puerto-rican-picadillo-recipe-8772420",
            {"calories": 386, "fat": 20, "carbs": 15, "protein": 36},
        ),
        (
            "https://www.simplyrecipes.com/monkey-bread-recipe-6890369",
            {"calories": 543, "fat": 29, "carbs": 66, "protein": 6},
        ),
    ],
)
def test_parse_nutrition(url, expected):
    assert SimplyRecipesParser(url).parse_nutrition() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.simplyrecipes.com/easy-puerto-rican-picadillo-recipe-8772420",
            {"prep_time": 15, "cook_time": 25, "total_time": 40},
        ),
        (
            "https://www.simplyrecipes.com/monkey-bread-recipe-6890369",
            {"prep_time": 15, "cook_time": 35, "total_time": 50},
        ),
    ],
)
def test_parse_cooking_time(url, expected):
    assert SimplyRecipesParser(url).parse_cooking_time() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.simplyrecipes.com/easy-puerto-rican-picadillo-recipe-8772420",
            "https://www.simplyrecipes.com/thmb/lmSrjDKfnj7DNc94TU2kMc2Ne1Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/simply-recipes-picadillo-over-rice-lead-1-9fda74ed82ff40d6aa44e01fd52358df.jpg",
        ),
        (
            "https://www.simplyrecipes.com/monkey-bread-recipe-6890369",
            "https://www.simplyrecipes.com/thmb/NU0k2znzbo9J4We9lnCUuBXX-nU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes_Monkey-Bread_LEAD_5-5896f421a4f546dd85756997140a35c1.jpg",
        ),
    ],
)
def test_parse_image_url(url, expected):
    assert SimplyRecipesParser(url).parse_image_url() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.simplyrecipes.com/easy-puerto-rican-picadillo-recipe-8772420",
            3,
        ),
        (
            "https://www.simplyrecipes.com/monkey-bread-recipe-6890369",
            12,
        ),
    ],
)
def test_parse_servings(url, expected):
    assert SimplyRecipesParser(url).parse_servings() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.simplyrecipes.com/easy-taco-casserole-recipe-8605773",
            {
                "name": "Easy Taco Casserole",
                "input_url": "https://www.simplyrecipes.com/easy-taco-casserole-recipe-8605773",
                "description": "Crunchy, cheesy, and crowd-pleasing, this casserole is ready in just 20 minutes.",
                "nutrition": {"calories": 646, "fat": 32, "carbs": 49, "protein": 40},
                "cooking_time": {"prep_time": 5, "cook_time": 15, "total_time": 20},
                "image_url": "https://www.simplyrecipes.com/thmb/obPeKFmHPcKItGj0MJxBXxVWljI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Easy-Taco-Casserole-LEAD-686bbc2ac89742aea26f4d5b6e04404f.jpg",
                "servings": 4,
            },
        ),
        (
            "https://www.simplyrecipes.com/easy-puerto-rican-picadillo-recipe-8772420",
            {
                "name": "The Ground Beef Dinner I Make When I'm Too Tired To Cook",
                "input_url": "https://www.simplyrecipes.com/easy-puerto-rican-picadillo-recipe-8772420",
                "description": "It’s a Puerto Rican classic.",
                "nutrition": {"calories": 386, "fat": 20, "carbs": 15, "protein": 36},
                "cooking_time": {"prep_time": 15, "cook_time": 25, "total_time": 40},
                "image_url": "https://www.simplyrecipes.com/thmb/lmSrjDKfnj7DNc94TU2kMc2Ne1Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/simply-recipes-picadillo-over-rice-lead-1-9fda74ed82ff40d6aa44e01fd52358df.jpg",
                "servings": 3,
            },
        ),
        (
            "https://www.simplyrecipes.com/monkey-bread-recipe-6890369",
            {
                "name": "Monkey Bread",
                "input_url": "https://www.simplyrecipes.com/monkey-bread-recipe-6890369",
                "description": "This easy monkey bread recipe starts with store-bought biscuit dough. It’s loaded with cinnamon sugar and butter, and baked until perfectly gooey.",
                "nutrition": {"calories": 543, "fat": 29, "carbs": 66, "protein": 6},
                "cooking_time": {"prep_time": 15, "cook_time": 35, "total_time": 50},
                "image_url": "https://www.simplyrecipes.com/thmb/NU0k2znzbo9J4We9lnCUuBXX-nU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes_Monkey-Bread_LEAD_5-5896f421a4f546dd85756997140a35c1.jpg",
                "servings": 12,
            },
        ),
    ],
)
def test_parse(url, expected):
    result = SimplyRecipesParser(url).parse()
    assert "recipe" in result
    recipe = result["recipe"]

    for key, expected_value in expected.items():
        assert recipe[key] == expected_value, (
            f"Expected {key}: {expected_value}, Got: {recipe[key]}"
        )
