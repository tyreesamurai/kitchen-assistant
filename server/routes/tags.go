package routes

import (
	"net/http"
	"regexp"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Tag struct {
	ID          uint    `json:"id" gorm:"primaryKey"`
	Name        string  `json:"name"`
	Description *string `json:"description"`
}

type RecipeTag struct {
	RecipeID uint `json:"recipeId" gorm:"primaryKey;autoIncrement:false"`
	TagID    uint `json:"tagId" gorm:"primaryKey;autoIncrement:false"`
}

type IngredientTag struct {
	IngredientID uint `json:"ingredientId" gorm:"primaryKey;autoIncrement:false"`
	TagID        uint `json:"tagId" gorm:"primaryKey;autoIncrement:false"`
}

func TagController(router *gin.Engine, db *gorm.DB) {
	tags := router.Group("/tags")
	{
		tags.GET("/", func(ctx *gin.Context) { getAllTags(ctx, db) })
		tags.GET("/:param", func(ctx *gin.Context) { getTag(ctx, db) })
		tags.POST("/", func(ctx *gin.Context) { createTag(ctx, db) })
		tags.GET("/:param/recipes", func(ctx *gin.Context) { getRecipesByTag(ctx, db) })
		tags.GET("/:param/ingredients", func(ctx *gin.Context) { getIngredientsByTag(ctx, db) })
		tags.POST("/recipes", func(ctx *gin.Context) { createRecipeTag(ctx, db) })
		tags.POST("/ingredients", func(ctx *gin.Context) { createIngredientTag(ctx, db) })
		tags.DELETE("/:param", func(ctx *gin.Context) { deleteTag(ctx, db) })
	}
}

func getAllTags(ctx *gin.Context, db *gorm.DB) {
	var tags []Tag

	result := db.Find(&tags)

	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
	}

	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No tags found!"})
	}

	ctx.JSON(http.StatusOK, tags)
}

func getTag(ctx *gin.Context, db *gorm.DB) {
	tag, err := findTag(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Tag not found!"})
		return
	}
	ctx.JSON(http.StatusOK, tag)
}

func createTag(ctx *gin.Context, db *gorm.DB) {
	var tag Tag
	if err := ctx.ShouldBindJSON(&tag); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if result := db.Create(&tag); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, tag)
}

func getRecipesByTag(ctx *gin.Context, db *gorm.DB) {
	tag, err := findTag(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Tag not found!"})
	}
	var recipes []Recipe
	result := db.Table("recipe_tag").
		Joins("JOIN recipe ON recipe_tag.recipe_id = recipe.id").
		Where("tag_id = ?", tag.ID).
		Select("recipe.*").Find(&recipes)

	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
	}

	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No recipes found!"})
	}

	ctx.JSON(http.StatusOK, recipes)
}

func getIngredientsByTag(ctx *gin.Context, db *gorm.DB) {
	tag, err := findTag(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Tag not found!"})
	}
	var ingredients []Ingredient
	result := db.Table("ingredient_tag").Joins("JOIN ingredient ON ingredient_tag.ingredient_id = ingredient.id").Where("tag_id = ?", tag.ID).Select("ingredient.*").Find(&ingredients)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
	}
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No ingredients found!"})
	}
	ctx.JSON(http.StatusOK, ingredients)
}

func createRecipeTag(ctx *gin.Context, db *gorm.DB) {
	var recipeTag RecipeTag
	if err := ctx.ShouldBindJSON(&recipeTag); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if result := db.Create(&recipeTag); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, recipeTag)
}

func createIngredientTag(ctx *gin.Context, db *gorm.DB) {
	var ingredientTag IngredientTag
	if err := ctx.ShouldBindJSON(&ingredientTag); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if result := db.Create(&ingredientTag); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, ingredientTag)
}

func deleteTag(ctx *gin.Context, db *gorm.DB) {
	tag, err := findTag(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Tag not found!"})
		return
	}
	if result := db.Delete(&tag); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Tag deleted"})
}

func findTag(ctx *gin.Context, db *gorm.DB) (*Tag, error) {
	param := ctx.Param("param")
	var tag Tag
	if id, err := strconv.Atoi(param); err == nil {
		if err := db.First(&tag, id).Error; err != nil {
			return nil, err
		}
	} else {
		regex := regexp.MustCompile("-")
		if err := db.Where("name = ?", regex.ReplaceAllString(param, " ")).First(&tag).Error; err != nil {
			return nil, err
		}
	}

	return &tag, nil
}
