package main

import (
	"web-server/config"
	"web-server/models"
	"web-server/routes"
)

func main() {
	config.ConnectDatabase()

	config.DB.AutoMigrate(&models.Recipe{}, &models.Ingredient{}, &models.RecipeIngredient{})

	router := routes.SetUpRouter()
	router.Run(":8080")
}
