package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type RecipeIngredient struct {
	RecipeID     uint     `json:"recipeId" gorm:"primaryKey;autoIncrement:false"`
	IngredientID uint     `json:"ingredientId" gorm:"primaryKey;autoIncrement:false"`
	Quantity     *float64 `json:"quantity"`
	UnitName     *string  `json:"unitName"`
	UnitType     *string  `json:"unitType"`
}

func RecipeIngredientController(router *gin.Engine, db *gorm.DB) {
	recipeIngredients := router.Group("/recipe-ingredients")
	{
		recipeIngredients.GET("/recipe/:param", func(ctx *gin.Context) { getIngredientsByRecipe(ctx, db) })
		recipeIngredients.GET("/ingredient/:param", func(ctx *gin.Context) { getRecipesByIngredient(ctx, db) })
		recipeIngredients.POST("/", func(ctx *gin.Context) { createRecipeIngredient(ctx, db) })
	}
}

func getIngredientsByRecipe(ctx *gin.Context, db *gorm.DB) {
	recipe, err := findRecipe(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Recipe not found!"})
	}

	var Ingredients []Ingredient
	result := db.Table("recipe_ingredient").
		Joins("JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id").
		Where("recipe_ingredient.recipe_id = ?", recipe.ID).
		Select("ingredient.*").
		Find(&Ingredients)

	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No ingredients found"})
		return
	}

	ctx.JSON(http.StatusOK, Ingredients)
}

func getRecipesByIngredient(ctx *gin.Context, db *gorm.DB) {
	ingredient, err := findIngredient(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Ingredient not found!"})
	}

	var Recipes []Recipe
	result := db.Table("recipe_ingredient").
		Joins("JOIN recipe ON recipe_ingredient.recipe_id = recipe.id").
		Where("recipe_ingredient.ingredient_id = ?", ingredient.ID).
		Select("recipe.*").
		Find(&Recipes)

	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No recipes found"})
		return
	}
	ctx.JSON(http.StatusOK, Recipes)
}

func createRecipeIngredient(ctx *gin.Context, db *gorm.DB) {
	var recipeIngredient RecipeIngredient
	if err := ctx.ShouldBindJSON(&recipeIngredient); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result := db.Create(&recipeIngredient)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, recipeIngredient)
}
