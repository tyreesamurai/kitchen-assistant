package main

import (
	"log"
	"os"
	"server/routes"

	"github.com/joho/godotenv"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	dsn := os.Getenv("dsn")
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}
	defer sqlDB.Close()

	router := gin.Default()

	routes.IngredientsController(router, db)
	routes.RecipesController(router, db)
	routes.RecipeIngredientsController(router, db)

	router.Run(":8080")
}
