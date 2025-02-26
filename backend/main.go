package main

import (
	"web-server/config"
	"web-server/models"
	"web-server/routes"
)

func main() {
	config.ConnectDatabase()

	config.DB.AutoMigrate(&models.Recipe{}, &models.Ingredient{}, &models.RecipeIngredient{}, &models.Tag{}, &models.RecipeTag{}, &models.IngredientTag{})

	router := routes.SetUpRouter()
	router.Run(":8080")
}
