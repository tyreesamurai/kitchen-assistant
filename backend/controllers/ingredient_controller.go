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

func FindIngredients(ctx *gin.Context) {
	var ingredients []models.Ingredient
	config.DB.Find(&ingredients)
	ctx.JSON(http.StatusOK, ingredients)
}

func FindIngredient(ctx *gin.Context) {
	var ingredient models.Ingredient
	param := ctx.Param("param")
	if id, err := strconv.Atoi(param); err == nil {
		config.DB.Where("id = ?", id).First(&ingredient)
	} else {
		re := regexp.MustCompile("-")
		name := re.ReplaceAllString(param, " ")
		config.DB.Where("name = ?", name).First(&ingredient)
	}
	ctx.JSON(http.StatusOK, ingredient)
}

func CreateIngredient(ctx *gin.Context) {
	var ingredient models.Ingredient
	if err := ctx.ShouldBindJSON(&ingredient); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&ingredient)
	log.Println("Ingredient created: " + ingredient.Name)
	ctx.JSON(http.StatusCreated, ingredient)
}
