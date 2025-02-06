package models

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

type Tag struct {
	ID   uint   `json:"id" gorm:"primaryKey"`
	Name string `json:"name"`
}

type RecipeTag struct {
	RecipeID uint `json:"recipe_id" gorm:"primaryKey,constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	TagID    uint `json:"tag_id" gorm:"primaryKey,constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}

type IngredientTag struct {
	IngredientID uint `json:"ingredient_id" gorm:"primaryKey,constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	TagID        uint `json:"tag_id" gorm:"primaryKey,constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}
