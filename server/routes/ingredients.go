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

func IngredientController(router *gin.Engine, db *gorm.DB) {
	ingredients := router.Group("/ingredients")
	{
		ingredients.GET("/", func(ctx *gin.Context) { getAllIngredients(ctx, db) })
		ingredients.GET("/:param", func(ctx *gin.Context) { getIngredient(ctx, db) })
		ingredients.POST("/", func(ctx *gin.Context) { createIngredient(ctx, db) })
		ingredients.GET("/:param/recipes", func(ctx *gin.Context) { getRecipesByIngredient(ctx, db) })
		ingredients.GET("/:param/tags", func(ctx *gin.Context) { getTagsByIngredient(ctx, db) })
		ingredients.PUT("/:param", func(ctx *gin.Context) { updateIngredient(ctx, db) })
		ingredients.DELETE("/:param", func(ctx *gin.Context) { deleteIngredient(ctx, db) })
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

func getIngredient(ctx *gin.Context, db *gorm.DB) {
	ingredient, err := findIngredient(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
	}
	ctx.JSON(http.StatusOK, ingredient)
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

func getTagsByIngredient(ctx *gin.Context, db *gorm.DB) {
	ingredient, err := findIngredient(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Ingredient not found!"})
	}
	var Tags []Tag
	result := db.Table("ingredient_tag").
		Joins("JOIN tag ON ingredient_tag.tag_id = tag.id").
		Where("ingredient_tag.ingredient_id = ?", ingredient.ID).
		Select("tag.*").
		Find(&Tags)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No tags found"})
		return
	}
	ctx.JSON(http.StatusOK, Tags)
}

func updateIngredient(ctx *gin.Context, db *gorm.DB) {
	ingredient, err := findIngredient(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	if err := ctx.ShouldBindJSON(&ingredient); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result := db.Save(&ingredient)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusOK, ingredient)
}

func deleteIngredient(ctx *gin.Context, db *gorm.DB) {
	ingredient, err := findIngredient(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	result := db.Delete(&ingredient)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Recipe deleted"})
}

func findIngredient(ctx *gin.Context, db *gorm.DB) (*Ingredient, error) {
	param := ctx.Param("param")
	var ingredient Ingredient
	if id, err := strconv.Atoi(param); err == nil {
		if err := db.First(&ingredient, id).Error; err != nil {
			return nil, err
		}
	} else {
		regex := regexp.MustCompile("-")
		if err := db.Where("name = ?", regex.ReplaceAllString(param, " ")).First(&ingredient).Error; err != nil {
			return nil, err
		}
	}
	return &ingredient, nil
}
