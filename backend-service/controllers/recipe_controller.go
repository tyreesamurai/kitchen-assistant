package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"regexp"
	"strconv"
	"web-server/config"
	"web-server/models"

	"github.com/gin-gonic/gin"
)

type Ingredient struct {
	Name     string  `json:"name"`
	Quantity float32 `json:"quantity"`
	Unit     string  `json:"unit"`
}

func FindRecipes(ctx *gin.Context) {
	var recipes []models.Recipe
	config.DB.Find(&recipes)
	ctx.JSON(http.StatusOK, recipes)
}

func CreateRecipe(ctx *gin.Context) {
	var rr models.RecipeRequest

	if err := ctx.ShouldBindJSON(&rr); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	recipe := rr.Recipe

	recipeJSON, err := json.Marshal(recipe)
	if err != nil {
		log.Print("Error: " + err.Error())
	}

	config.DB.Create(&recipe)
	log.Print("Recipe Created ", string(recipeJSON))

	for _, ingredient := range rr.Ingredients {
		var i models.Ingredient
		result := config.DB.Where("name = ?", &ingredient.Name).First(&i)
		if result.RowsAffected == 0 {
			i.Name = ingredient.Name
			config.DB.Create(&i)
			log.Print("Ingredient " + ingredient.Name + " created")
		}

		ri := models.RecipeIngredient{RecipeID: recipe.ID, IngredientID: i.ID, Quantity: &ingredient.Quantity, Unit: &ingredient.Unit}

		riJSON, err := json.Marshal(ri)
		if err != nil {
			log.Print("Error: " + err.Error())
		}

		log.Print("Recipe Ingredient Created " + string(riJSON))

		config.DB.Create(&ri)
	}

	ctx.JSON(http.StatusCreated, recipe)
}

func FindRecipe(ctx *gin.Context) {
	var recipe models.Recipe
	param := ctx.Param("param")

	if id, err := strconv.Atoi(param); err == nil {
		config.DB.Where("id = ?", id).First(&recipe)
	} else {
		re := regexp.MustCompile("-")
		name := re.ReplaceAllString(param, " ")
		config.DB.Where("name = ?", name).First(&recipe)
	}

	ctx.JSON(http.StatusOK, recipe)
}

type result struct {
	Name     string
	Quantity float32
	Unit     string
}

func FindRecipeIngredientsByRecipe(ctx *gin.Context) {
	param := ctx.Param("param")
	var results []result

	if id, err := strconv.Atoi(param); err == nil {
		err := config.DB.
			Table("recipes").
			Select("ingredients.name, recipe_ingredients.quantity, recipe_ingredients.unit").
			Joins("JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id").
			Joins("JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id").
			Where("recipes.id = ?", id).
			Scan(&results).Error
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	} else {
		re := regexp.MustCompile("-")
		name := re.ReplaceAllString(param, " ")
		err := config.DB.
			Table("recipes").
			Select("ingredients.name, recipe_ingredients.quantity, recipe_ingredients.unit").
			Joins("JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id").
			Joins("JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id").
			Where("recipes.name = ?", name).
			Scan(&results).Error
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}

	resultsJSON, err := json.Marshal(results)
	if err != nil {
		log.Print("Error: " + err.Error())
	}

	log.Print(string(resultsJSON))

	ctx.JSON(http.StatusOK, results)
}

func FindTagsByRecipe(ctx *gin.Context) {
	param := ctx.Param("param")
	var results []result
	if id, err := strconv.Atoi(param); err == nil {
		err := config.DB.
			Table("recipes").
			Select("tags.name").
			Joins("JOIN recipe_tags ON recipes.id = recipe_tags.recipe_id").
			Joins("JOIN tags ON recipe_tags.tag_id = tags.id").
			Where("recipes.id = ?", id).
			Scan(&results).Error
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	} else {
		re := regexp.MustCompile("-")
		name := re.ReplaceAllString(param, " ")
		err := config.DB.
			Table("recipes").
			Select("tags.name").
			Joins("JOIN recipe_tags ON recipes.id = recipe_tags.recipe_id").
			Joins("JOIN tags ON recipe_tags.tag_id = tags.id").
			Where("recipes.name = ?", name).
			Scan(&results).Error
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}
	resultsJSON, err := json.Marshal(results)
	if err != nil {
		log.Print("Error: " + err.Error())
	}
	log.Print(string(resultsJSON))
	ctx.JSON(http.StatusOK, results)
}
