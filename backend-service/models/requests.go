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
