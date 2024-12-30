package routes

import (
	"net/http"
	"regexp"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Tag struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func TagController(router *gin.Engine, db *gorm.DB) {
	tags := router.Group("/tags")
	{
		tags.GET("/", func(ctx *gin.Context) { getAllTags(ctx, db) })
		tags.POST("/", func(ctx *gin.Context) { createTag(ctx, db) })
		tags.GET("/:param", func(ctx *gin.Context) { getTag(ctx, db) })
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
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No records found!"})
	}

	ctx.JSON(http.StatusOK, tags)
}

func getTag(ctx *gin.Context, db *gorm.DB) {
	tag, err := findTag(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Record not found!"})
		return
	}
	ctx.JSON(http.StatusOK, tag)
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

func deleteTag(ctx *gin.Context, db *gorm.DB) {
	tag, err := findTag(ctx, db)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Record not found!"})
		return
	}
	if result := db.Delete(&tag); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Tag deleted"})
}
