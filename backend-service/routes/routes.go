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
	recipes.GET("/:param/tags", controllers.FindTagsByRecipe)

	ingredients := router.Group("/ingredients")

	ingredients.GET("", controllers.FindIngredients)
	ingredients.GET("/:param", controllers.FindIngredient)
	ingredients.POST("", controllers.CreateIngredient)

	tags := router.Group("/tags")

	tags.GET("", controllers.FindTags)
	tags.GET("/:param", controllers.FindTag)
	tags.POST("", controllers.CreateTag)

	return router
}
