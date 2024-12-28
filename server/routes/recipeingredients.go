package routes

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type RecipeIngredient struct {
	RecipeID     uint    `json:"recipeId" gorm:"primaryKey;autoIncrement:false"`
	IngredientID uint    `json:"ingredientId" gorm:"primaryKey;autoIncrement:false"`
	Quantity     float64 `json:"quantity"`
	UnitID       uint    `json:"unitId"`
}

func RecipeIngredientsController(router *gin.Engine, db *gorm.DB) {
	recipeIngredients := router.Group("/recipeingredients")
	{
		recipeIngredients.GET("/recipe/:recipeId", func(ctx *gin.Context) { getIngredientsFromRecipeID(ctx, db) })
		recipeIngredients.GET("/ingredient/:ingredientId", func(ctx *gin.Context) { getRecipesFromIngredientID(ctx, db) })
	}
}

func getIngredientsFromRecipeID(ctx *gin.Context, db *gorm.DB) {
	recipeID, err := strconv.Atoi(ctx.Param("recipeId"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid recipe ID"})
		return
	}
	var Ingredients []Ingredient
	result := db.Table("RecipeIngredients").
		Joins("JOIN ingredients ON RecipeIngredients.IngredientID = ingredients.id").
		Where("RecipeIngredients.RecipeID = ?", recipeID).
		Select("ingredients.*").
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

func getRecipesFromIngredientID(ctx *gin.Context, db *gorm.DB) {
	ingredientID, err := strconv.Atoi(ctx.Param("ingredientId"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ingredient ID"})
		return
	}
	var Recipes []Recipe
	result := db.Table("RecipeIngredients").
		Joins("JOIN recipes ON RecipeIngredients.RecipeID = recipes.id").
		Where("RecipeIngredients.IngredientID = ?", ingredientID).
		Select("recipes.*").
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
