package routes

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
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
	IsPublic     *bool      `json:"isPublic"`
	ImageURL     *string    `json:"imageUrl"`
}

type Nutrition struct {
	Calories int `json:"calories"`
	Fats     int `json:"fats"`
	Carbs    int `json:"carbs"`
	Protein  int `json:"protein"`
}

func (n Nutrition) Value() (driver.Value, error) {
	return json.Marshal(n)
}

func (n *Nutrition) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("type assertion to []byte failed")
	}
	return json.Unmarshal(bytes, n)
}

func RecipeController(router *gin.Engine, db *gorm.DB) {
	recipes := router.Group("/recipes")
	{
		recipes.GET("/", func(ctx *gin.Context) { getAllRecipes(ctx, db) })
		recipes.POST("/", func(ctx *gin.Context) { createRecipe(ctx, db) })
		recipes.PUT("/:param", func(ctx *gin.Context) { updateRecipe(ctx, db) })
		recipes.GET("/:param", func(ctx *gin.Context) { getRecipe(ctx, db) })
		recipes.GET("/:param/ingredients", func(ctx *gin.Context) { getIngredientsByRecipe(ctx, db) })
		recipes.GET("/:param/tags", func(ctx *gin.Context) { getTagsByRecipe(ctx, db) })
		recipes.DELETE("/:param", func(ctx *gin.Context) { deleteRecipe(ctx, db) })
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
	recipe, err := findRecipe(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, recipe)
}

func updateRecipe(ctx *gin.Context, db *gorm.DB) {
	recipe, err := findRecipe(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := ctx.ShouldBindJSON(&recipe); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if result := db.Save(&recipe); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusOK, recipe)
}

func deleteRecipe(ctx *gin.Context, db *gorm.DB) {
	recipe, err := findRecipe(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if result := db.Delete(&recipe); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Recipe deleted"})
}

func getTagsByRecipe(ctx *gin.Context, db *gorm.DB) {
	recipe, err := findRecipe(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Recipe not found!"})
		return
	}
	var tags []Tag
	result := db.Table("recipe_tag").
		Joins("JOIN tag ON recipe_tag.tag_id = tag.id").
		Where("recipe_tag.recipe_id = ?", recipe.ID).
		Select("tag.*").
		Find(&tags)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No tags found"})
		return
	}
	ctx.JSON(http.StatusOK, tags)
}

func findRecipe(ctx *gin.Context, db *gorm.DB) (*Recipe, error) {
	param := ctx.Param("param")
	var recipe Recipe
	if id, err := strconv.Atoi(param); err == nil {
		if err := db.First(&recipe, id).Error; err != nil {
			return nil, err
		}
	} else {
		regex := regexp.MustCompile("-")
		if err := db.Where("name = ?", regex.ReplaceAllString(param, " ")).First(&recipe).Error; err != nil {
			return nil, err
		}
	}
	return &recipe, nil
}
