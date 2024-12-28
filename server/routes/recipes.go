package routes

import (
	"net/http"
	"regexp"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Recipe struct {
	ID           uint       `json:"id"`
	Name         string     `json:"name"`
	CookTime     *int       `json:"cookTime"`
	Category     *string    `json:"category"`
	Cuisine      *string    `json:"cuisine"`
	Instructions *string    `json:"instructions"`
	Description  *string    `json:"description"`
	Nutrition    *Nutrition `json:"nutrition" gorm:"type:json"`
	IsPublic     *bool      `json:"isPublished"`
	ImageURL     *string    `json:"imageUrl"`
}

type Nutrition struct {
	Calories int `json:"calories"`
	Fats     int `json:"fats"`
	Carbs    int `json:"carbs"`
	Proteins int `json:"proteins"`
}

func RecipesController(router *gin.Engine, db *gorm.DB) {
	recipes := router.Group("/recipes")
	{
		recipes.GET("/", func(ctx *gin.Context) { getAllRecipes(ctx, db) })
		recipes.POST("/", func(ctx *gin.Context) { createRecipe(ctx, db) })
		recipes.GET("/:param", func(ctx *gin.Context) { getRecipe(ctx, db) })
	}
}

func getAllRecipes(ctx *gin.Context, db *gorm.DB) {
	var recipes []Recipe

	result := db.Find(&recipes)

	if result.Error != nil {
		ctx.JSON(500, gin.H{"error": result.Error.Error()})
	}

	if result.RowsAffected == 0 {
		ctx.JSON(404, gin.H{"error": "No recipes found"})
	}

	ctx.JSON(200, recipes)
}

func createRecipe(ctx *gin.Context, db *gorm.DB) {
	var recipe Recipe
	if err := ctx.ShouldBindJSON(&recipe); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result := db.Create(&recipe)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, recipe)
}

func getRecipe(ctx *gin.Context, db *gorm.DB) {
	param := ctx.Param("param")
	var recipe Recipe

	if id, err := strconv.Atoi(param); err == nil {
		if err := db.First(&recipe, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
	} else {
		regex := regexp.MustCompile("%20")
		if err := db.Where("name = ?", regex.ReplaceAllString(param, " ")).First(&recipe).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
	}

	ctx.JSON(http.StatusOK, recipe)
}
