import pytest
from all_recipes_parser import (
    AllRecipesParser,
)


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.allrecipes.com/butter-basted-rib-eye-steak-recipe-8753374",
            "Butter Basted Rib Eye Steak",
        ),
        (
            "https://www.allrecipes.com/recipe/215030/taco-slaw/",
            "Taco Slaw",
        ),
        (
            "https://www.allrecipes.com/recipe/274966/sheet-pan-parmesan-chicken-and-veggies/",
            "Sheet Pan Parmesan Chicken and Veggies",
        ),
    ],
)
def test_parse_name(url, expected):
    assert AllRecipesParser(url).parse_name() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.allrecipes.com/butter-basted-rib-eye-steak-recipe-8753374",
            "This butter-basted ribeye steak is an indulgent dish that is date night-worthy, perfect for company, and very easy to prepare. Use a high-quality herb butter for the best flavor.",
        ),
        (
            "https://www.allrecipes.com/recipe/215030/taco-slaw/",
            "This is a great cabbage slaw for tacos. The local taco truck serves their chicken tacos with cabbage, cilantro, and lime. This is my attempt to recreate their taco toppings.",
        ),
        (
            "https://www.allrecipes.com/recipe/274966/sheet-pan-parmesan-chicken-and-veggies/",
            "This extra-crispy sheet pan chicken and veggies dinner is baked on one pan and packed with flavor!",
        ),
    ],
)
def test_parse_description(url, expected):
    assert AllRecipesParser(url).parse_description() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.allrecipes.com/butter-basted-rib-eye-steak-recipe-8753374",
            "https://www.allrecipes.com/butter-basted-rib-eye-steak-recipe-8753374",
        ),
        (
            "https://www.allrecipes.com/recipe/215030/taco-slaw/",
            "https://www.allrecipes.com/recipe/215030/taco-slaw/",
        ),
        (
            "https://www.allrecipes.com/recipe/274966/sheet-pan-parmesan-chicken-and-veggies/",
            "https://www.allrecipes.com/recipe/274966/sheet-pan-parmesan-chicken-and-veggies/",
        ),
    ],
)
def test_parse_input_url(url, expected):
    assert AllRecipesParser(url).parse_input_url() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.allrecipes.com/butter-basted-rib-eye-steak-recipe-8753374",
            "Remove steak from package, pat dry, and place on a plate. Refrigerate, uncovered, for 2 hours before cooking.\nHeat a heavy skillet over medium-high heat until hot. Sprinkle steak thoroughly with salt and pepper. Trim off any extra fat from steak. Place steak in skillet with fattest side down; cook until fat is browned, about 2 minutes. Continue cooking until steak is browned, about 2 minutes.\nAdd butter to skillet and cook until butter is browned. Turn steak over and cook, basting with browned butter, for 2 minutes more. Remove from skillet to a plate. Tent with foil, and rest steak for 7 minutes to absorb juice. Serve steak with a pat of butter.",
        ),
        (
            "https://www.allrecipes.com/recipe/215030/taco-slaw/",
            "Gather all ingredients.\nFinely chop the cabbage, carrot, and cilantro. Mince the red onion. Seed and mince the jalapeño.\nCombine chopped vegetables and lime juice in a bowl; toss to coat.",
        ),
        (
            "https://www.allrecipes.com/recipe/274966/sheet-pan-parmesan-chicken-and-veggies/",
            "Preheat the oven to 400 degrees F (200 degrees C). Line a sheet pan with parchment paper.\nCombine oregano, parsley, paprika, garlic powder, seasoned salt, and pepper in a small bowl.\nPlace green beans, potato, bell pepper, broccoli, and garlic onto the prepared sheet pan. Drizzle with olive oil and sprinkle with 1/2 of the seasoning mix; toss to coat.\nPlace flour into a bowl. Place melted butter into a second bowl. Mix panko, 2/3 cup Parmesan cheese, and the remaining seasoning mix together in a third bowl.\nSlice chicken into 1 1/4-inch strips, then coat in flour. Dredge floured strips in melted butter, dripping excess butter back into the bowl. Press into Parmesan-panko mixture until heavily coated on both sides.\nPush veggies to one half of the sheet pan. Place coated chicken strips onto the other side. Sprinkle any remaining Parmesan-panko mixture over chicken, pressing to adhere.\nBake in the preheated oven for 10 minutes. Flip chicken strips and stir veggies, then continue to bake until chicken juices run clear and veggies are crisp-tender, 10 to 15 more minutes. An instant-read thermometer inserted into the center of the chicken should read at least 165 degrees F (74 degrees C).\nMeanwhile, make the dipping sauce: Whisk mayonnaise, ketchup, garlic powder, and Worcestershire sauce together in a small bowl.\nRemove chicken and veggies from the oven. Toss veggies with remaining 1/3 cup Parmesan cheese. Serve with dipping sauce.",
        ),
    ],
)
def test_parse_instructions(url, expected):
    assert AllRecipesParser(url).parse_instructions() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.allrecipes.com/butter-basted-rib-eye-steak-recipe-8753374",
            {"calories": 717, "fat": 55, "carbs": 0, "protein": 56},
        ),
        (
            "https://www.allrecipes.com/recipe/215030/taco-slaw/",
            {"calories": 27, "fat": 0, "carbs": 7, "protein": 1},
        ),
        (
            "https://www.allrecipes.com/recipe/274966/sheet-pan-parmesan-chicken-and-veggies/",
            {"calories": 535, "fat": 25, "carbs": 33, "protein": 45},
        ),
    ],
)
def test_parse_nutrition(url, expected):
    assert AllRecipesParser(url).parse_nutrition() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.allrecipes.com/butter-basted-rib-eye-steak-recipe-8753374",
            {
                "prep_time": 5,
                "cook_time": 10,
                "refrigerate_time": 120,
                "rest_time": 10,
                "total_time": 145,
            },
        ),
        (
            "https://www.allrecipes.com/recipe/215030/taco-slaw/",
            {"prep_time": 20, "total_time": 20},
        ),
        (
            "https://www.allrecipes.com/recipe/274966/sheet-pan-parmesan-chicken-and-veggies/",
            {"prep_time": 30, "cook_time": 20, "total_time": 50},
        ),
    ],
)
def test_parse_cooking_time(url, expected):
    assert AllRecipesParser(url).parse_cooking_time() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.allrecipes.com/butter-basted-rib-eye-steak-recipe-8753374",
            2,
        ),
        (
            "https://www.allrecipes.com/recipe/215030/taco-slaw/",
            6,
        ),
        (
            "https://www.allrecipes.com/recipe/274966/sheet-pan-parmesan-chicken-and-veggies/",
            6,
        ),
    ],
)
def test_parse_servings(url, expected):
    assert AllRecipesParser(url).parse_servings() == expected


@pytest.mark.parametrize(
    "url, expected",
    [
        (
            "https://www.allrecipes.com/butter-basted-rib-eye-steak-recipe-8753374",
            "https://www.allrecipes.com/thmb/93DyIZvMQxEOrbRf1UuH8iMZbMg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8753374_Butter-Basted-Rib-Eye-Steak_TheDailyGourmet_4x3-ec4b9696a758481194fb5baff1b700cb.jpg",
        ),
        (
            "https://www.allrecipes.com/recipe/215030/taco-slaw/",
            "https://www.allrecipes.com/thmb/M-51O1R-Fs_j_GtgK-f1eeY5xuY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/215030-TacoSlaw-DDMFS-120-4x3-51194aa1604c40929deb64d455b9ea92.jpg",
        ),
        (
            "https://www.allrecipes.com/recipe/274966/sheet-pan-parmesan-chicken-and-veggies/",
            "https://www.allrecipes.com/thmb/deeCG9WzLsKaVUE8h7N1oVoeCns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/274966-sheet-pan-parmesan-chicken-and-veggies-ddmfs-4x3-0155-7cfcf4f7636b452bb8aea50cf1720d8b.jpg",
        ),
    ],
)
def test_parse_image_url(url, expected):
    assert AllRecipesParser(url).parse_image_url() == expected
