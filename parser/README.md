# TDD Assignment

Please forgive me I went a little above & beyond doing this, mainly because I was having trouble actually finding something to do to refactor so I just decided to do TDD for a project that I am currently working on & turning it in.

So first the file to look at is test_parser.py:

## test_parser.py (RED)

```python
import pytest
from parser import (
    parse_cooking_time,
)

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
    assert parse_cooking_time(url) == expected
```

Here is one example of a test that I had wrote that took two different URLs from "simplerecipes.com" & I basically put in the expected value for them

There are more functions but I am choosing this one as the one to showcase so you can understand the process

Then the next file to look at is parser.py

## parser.py (GREEN)

```python
def parse_cooking_time(url):
    if "simplyrecipes.com" not in url:
        raise ValueError("URL must be from 'simplyrecipes.com'")

    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    cook_time_container = soup.find_all(class_="project-meta__times-container")
    cook_time_details = cook_time_container[0].find_all(class_="meta-text")
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
```

So then after a lot of figuring things out, I wrote this code which got that one to pass. While doing this I was taking into account a lot of different cases, because in some cases there would be more than just the prep_time, cook_time, & total_time. So I had to account for that as well.

Also I had to account for if it said something like, "1 hr 30 mins" so I had to account for that as well.

> [!IMPORTANT]
> I should have done better tests in order to account for more cases, but I didn't spend enough time drafting cases & more time writing the code

This got me to the GREEN status leading me to the next step

## REFACTOR

Then I started realizing that I have parsers for all these different things that I want from the website & having them in different functions means that I have to call them all separately

This is a pain because that means that I have to do all the requests, & then get all the responses in order to parse for each one

This also is me repeating a lot of the same code each time which is repetitive as well & not in accordance with the DRY principle

Then I started thinking, wouldn't it better to create an object that holds the contents of the page & then each parser could use the already received contents

This caused me to restart essentially like this:

## test_simply_recipes_parser.py (RED)

```python
import pytest
from simply_recipes_parser import (
    SimplyRecipesParser,
)

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


```

Now we have a new test file that is more specific to the website that I am parsing from & I am testing the same function as before

I am now instead of importing the function, I am importing the class that I am going to be using

This saves me a lot of time & effort because instead of importing all the functions that I had before, I can just import the class & get all the functionality

Then I wrote the class that I was importing

## simply_recipes_parser.py (GREEN)

```python
class SimplyRecipesParser:
    def __init__(self, url):
        self.url = url
        if "simplyrecipes.com" not in url:
            raise ValueError("URL must be from 'simplyrecipes'")

        try:
            response = requests.get(url)
            response.raise_for_status()
            self.soup = BeautifulSoup(response.text, "html.parser")
        except requests.exceptions.HTTPError as e:
            raise ValueError(f"Invalid URL: {e}")

    def parse_cooking_time(self):
        cook_time_container = self.soup.find_all(class_="project-meta__times-container")
        cook_time_details = cook_time_container[0].find_all(class_="meta-text")
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
```

So as you can see, most of the code is the same, the only thing is that now I have a class that I can use to parse the website & I can use the same object to parse different things from the website

So for all the other methods that exist in the parser.py file, I can add them & then I'm only making one request to the website, but getting all the parsed data

## REFACTOR

So this part I will be doing on my own, so it won't be in a file that I will be giving you, however I can now just write a function called parse_all that will call all the different parsers & then return the object that has all the data

Then I can test to make sure that this functions works as expected, & I can test the fields of the object to make sure that they are correct

That way I can utilize this class to send the data to the next place that I need to send it to & I have tested that the data is correct

