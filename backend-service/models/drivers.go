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
