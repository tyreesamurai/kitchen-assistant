package controllers

import (
	"log"
	"net/http"
	"regexp"
	"strconv"
	"web-server/config"
	"web-server/models"

	"github.com/gin-gonic/gin"
)

func CreateTag(ctx *gin.Context) {
	var tag models.Tag
	if err := ctx.ShouldBindJSON(&tag); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&tag)
	log.Println("Tag created: " + tag.Name)
	ctx.JSON(http.StatusCreated, tag)
}

func FindTags(ctx *gin.Context) {
	var tags []models.Tag
	config.DB.Find(&tags)
	ctx.JSON(http.StatusOK, tags)
}

func FindTag(ctx *gin.Context) {
	var tag models.Tag
	param := ctx.Param("param")
	if id, err := strconv.Atoi(param); err == nil {
		config.DB.Where("id = ?", id).First(&tag)
		ctx.JSON(http.StatusOK, tag)
		return
	} else {
		re := regexp.MustCompile("-")
		name := re.ReplaceAllString(param, " ")
		config.DB.Where("name = ?", name).First(&tag)
	}
	ctx.JSON(http.StatusOK, tag)
}
