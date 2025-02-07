package models

type RecipeRequest struct {
	Recipe      Recipe              `json:"recipe"`
	Ingredients []IngredientRequest `json:"ingredients"`
}

type IngredientRequest struct {
	Name     string  `json:"name"`
	Quantity float32 `json:"quantity"`
	Unit     string  `json:"unit"`
}

type RecipeTagRequest struct {
	RecipeID uint   `json:"recipe_id"`
	Name     string `json:"name"`
}

type IngredientTagRequest struct {
	IngredientID uint   `json:"ingredient_id"`
	Name         string `json:"name"`
}
