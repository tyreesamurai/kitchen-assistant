package routes

import (
	"net/http"
	"regexp"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Ingredient struct {
	ID          uint       `json:"id"`
	Name        string     `json:"name"`
	Description *string    `json:"description"`
	Nutrition   *Nutrition `json:"nutrition" gorm:"type:json"`
	ImageURL    *string    `json:"imageUrl"`
}

func IngredientsController(router *gin.Engine, db *gorm.DB) {
	ingredients := router.Group("/ingredients")
	{
		ingredients.GET("/", func(ctx *gin.Context) { getAllIngredients(ctx, db) })
		ingredients.POST("/", func(ctx *gin.Context) { createIngredient(ctx, db) })
		ingredients.GET("/:param", func(ctx *gin.Context) { getIngredient(ctx, db) })
	}
}

func getAllIngredients(ctx *gin.Context, db *gorm.DB) {
	var Ingredients []Ingredient
	result := db.Find(&Ingredients)

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

func createIngredient(ctx *gin.Context, db *gorm.DB) {
	var ingredient Ingredient
	if err := ctx.ShouldBindJSON(&ingredient); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result := db.Create(&ingredient)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, ingredient)
}

func getIngredient(ctx *gin.Context, db *gorm.DB) {
	param := ctx.Param("param")

	var ingredient Ingredient
	if id, err := strconv.Atoi(param); err == nil {
		if err := db.First(&ingredient, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
	} else {
		regex := regexp.MustCompile("%20")
		if err := db.Where("name = ?", regex.ReplaceAllString(param, " ")).First(&ingredient).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
	}
	ctx.JSON(http.StatusOK, ingredient)
}
