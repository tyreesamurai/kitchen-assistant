package routes

import (
	"web-server/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetUpRouter() *gin.Engine {
	router := gin.Default()

	router.Use(cors.Default())

	recipes := router.Group("/recipes")

	recipes.GET("", controllers.FindRecipes)
	recipes.GET("/:param", controllers.FindRecipe)
	recipes.POST("", controllers.CreateRecipe)
	recipes.GET("/:param/ingredients", controllers.FindRecipeIngredientsByRecipe)

	ingredients := router.Group("/ingredients")

	ingredients.GET("", controllers.FindIngredients)
	ingredients.GET("/:param", controllers.FindIngredient)
	ingredients.POST("", controllers.CreateIngredient)

	return router
}
