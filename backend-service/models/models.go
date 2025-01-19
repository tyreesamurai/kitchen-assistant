package models

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

// Nutrition struct
type Nutrition struct {
	Calories int `json:"calories"`
	Fat      int `json:"fat"`
	Carbs    int `json:"carbs"`
	Protein  int `json:"protein"`
}

// Implement driver.Valuer for Nutrition
func (n Nutrition) Value() (driver.Value, error) {
	return json.Marshal(n)
}

// Implement sql.Scanner for Nutrition
func (n *Nutrition) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("failed to unmarshal Nutrition: %v", value)
	}
	return json.Unmarshal(bytes, n)
}

// CookingTime struct
type CookingTime struct {
	PrepTime       int `json:"prep_time,omitempty"`
	CookTime       int `json:"cook_time,omitempty"`
	AdditionalTime int `json:"additional_time,omitempty"`
	CoolTime       int `json:"cool_time,omitempty"`
	RestTime       int `json:"rest_time,omitempty"`
	TotalTime      int `json:"total_time,omitempty"`
}

// Implement driver.Valuer for CookingTime
func (c CookingTime) Value() (driver.Value, error) {
	return json.Marshal(c)
}

// Implement sql.Scanner for CookingTime
func (c *CookingTime) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("failed to unmarshal CookingTime: %v", value)
	}
	return json.Unmarshal(bytes, c)
}

type Recipe struct {
	ID           uint         `json:"id" gorm:"primaryKey"`
	Name         string       `json:"name"`
	Description  *string      `json:"description"`
	Instructions *string      `json:"instructions"`
	Nutrition    *Nutrition   `json:"nutrition" gorm:"type:json"`
	CookingTime  *CookingTime `json:"cooking_time" gorm:"type:json"`
	Servings     *int         `json:"servings"`
	ImageURL     *string      `json:"image_url"`
	InputURL     *string      `json:"input_url"`
	Ingredients  []Ingredient `json:"ingredients" gorm:"many2many:recipe_ingredients"`
}

type Ingredient struct {
	ID      uint     `json:"id" gorm:"primaryKey"`
	Name    string   `json:"name"`
	Recipes []Recipe `json:"recipes" gorm:"many2many:recipe_ingredients"`
}

type RecipeIngredient struct {
	RecipeID     uint     `json:"recipe_id" gorm:"primaryKey,constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	IngredientID uint     `json:"ingredient_id" gorm:"primaryKey,constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Quantity     *float32 `json:"quantity"`
	Unit         *string  `json:"unit"`
}
