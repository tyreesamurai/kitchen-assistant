package config

import (
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("DB_DSN")

	if dsn == "" {
		log.Fatal("DB_DSN is not set in .env file")
	}

	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		for {
			log.Fatal("Failed to connect to the database: ", err)
			log.Println("Retrying connection to database in 5 seconds")
			time.Sleep(5 * time.Second)

			database, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
			if err == nil {
				break
			}
		}
	}

	DB = database
	log.Println("Database connection successful")
}
