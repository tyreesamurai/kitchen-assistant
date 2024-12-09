-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Ingredients` (
	`IngredientID` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`nutrition` json,
	`imageUrl` varchar(2083),
	CONSTRAINT `Ingredients_IngredientID` PRIMARY KEY(`IngredientID`)
);
--> statement-breakpoint
CREATE TABLE `IngredientTags` (
	`IngredientID` int NOT NULL,
	`TagID` int NOT NULL,
	CONSTRAINT `IngredientTags_IngredientID_TagID` PRIMARY KEY(`IngredientID`,`TagID`)
);
--> statement-breakpoint
CREATE TABLE `RecipeIngredients` (
	`RecipeID` int NOT NULL,
	`IngredientID` int NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`UnitID` int,
	CONSTRAINT `RecipeIngredients_RecipeID_IngredientID` PRIMARY KEY(`RecipeID`,`IngredientID`)
);
--> statement-breakpoint
CREATE TABLE `Recipes` (
	`RecipeID` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`cookTime` int,
	`category` varchar(100),
	`cuisine` varchar(100),
	`instructions` text,
	`description` text,
	`nutrition` json,
	`isPublic` tinyint(1) DEFAULT 1,
	`imageUrl` varchar(2083),
	CONSTRAINT `Recipes_RecipeID` PRIMARY KEY(`RecipeID`),
	CONSTRAINT `recipes_chk_1` CHECK((`cookTime` > 0))
);
--> statement-breakpoint
CREATE TABLE `RecipeTags` (
	`RecipeID` int NOT NULL,
	`TagID` int NOT NULL,
	CONSTRAINT `RecipeTags_RecipeID_TagID` PRIMARY KEY(`RecipeID`,`TagID`)
);
--> statement-breakpoint
CREATE TABLE `RecipeVersions` (
	`VersionID` int AUTO_INCREMENT NOT NULL,
	`RecipeID` int NOT NULL,
	`UserID` int NOT NULL,
	`versionDescription` text,
	`dateCreated` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `RecipeVersions_VersionID` PRIMARY KEY(`VersionID`)
);
--> statement-breakpoint
CREATE TABLE `ShoppingListIngredients` (
	`ShoppingListID` int NOT NULL,
	`IngredientID` int NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`UnitID` int NOT NULL,
	`isChecked` tinyint(1) DEFAULT 0,
	CONSTRAINT `ShoppingListIngredients_ShoppingListID_IngredientID` PRIMARY KEY(`ShoppingListID`,`IngredientID`)
);
--> statement-breakpoint
CREATE TABLE `ShoppingLists` (
	`ShoppingListID` int AUTO_INCREMENT NOT NULL,
	`UserID` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`dateCreated` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `ShoppingLists_ShoppingListID` PRIMARY KEY(`ShoppingListID`)
);
--> statement-breakpoint
CREATE TABLE `Tags` (
	`TagID` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `Tags_TagID` PRIMARY KEY(`TagID`)
);
--> statement-breakpoint
CREATE TABLE `Units` (
	`UnitID` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`type` enum('volume','weight','amount','other') NOT NULL,
	CONSTRAINT `Units_UnitID` PRIMARY KEY(`UnitID`)
);
--> statement-breakpoint
CREATE TABLE `UserRecipes` (
	`UserID` int NOT NULL,
	`RecipeID` int NOT NULL,
	`dateCreated` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`isFavorite` tinyint(1) DEFAULT 0,
	`isAttempted` tinyint(1) DEFAULT 0,
	`personalNote` text,
	CONSTRAINT `UserRecipes_UserID_RecipeID` PRIMARY KEY(`UserID`,`RecipeID`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`UserID` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`authProvider` enum('local','google','facebook') NOT NULL,
	`role` enum('admin','editor','viewer') DEFAULT 'viewer',
	`dateJoined` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`firstName` varchar(50) NOT NULL,
	`lastName` varchar(50) NOT NULL,
	CONSTRAINT `Users_UserID` PRIMARY KEY(`UserID`)
);
--> statement-breakpoint
ALTER TABLE `IngredientTags` ADD CONSTRAINT `ingredienttags_ibfk_1` FOREIGN KEY (`IngredientID`) REFERENCES `Ingredients`(`IngredientID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `IngredientTags` ADD CONSTRAINT `ingredienttags_ibfk_2` FOREIGN KEY (`TagID`) REFERENCES `Tags`(`TagID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `recipeingredients_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `Recipes`(`RecipeID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `recipeingredients_ibfk_2` FOREIGN KEY (`IngredientID`) REFERENCES `Ingredients`(`IngredientID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `recipeingredients_ibfk_3` FOREIGN KEY (`UnitID`) REFERENCES `Units`(`UnitID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeTags` ADD CONSTRAINT `recipetags_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `Recipes`(`RecipeID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeTags` ADD CONSTRAINT `recipetags_ibfk_2` FOREIGN KEY (`TagID`) REFERENCES `Tags`(`TagID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeVersions` ADD CONSTRAINT `recipeversions_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `Recipes`(`RecipeID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeVersions` ADD CONSTRAINT `recipeversions_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ShoppingListIngredients` ADD CONSTRAINT `shoppinglistingredients_ibfk_1` FOREIGN KEY (`ShoppingListID`) REFERENCES `ShoppingLists`(`ShoppingListID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ShoppingListIngredients` ADD CONSTRAINT `shoppinglistingredients_ibfk_2` FOREIGN KEY (`IngredientID`) REFERENCES `Ingredients`(`IngredientID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ShoppingListIngredients` ADD CONSTRAINT `shoppinglistingredients_ibfk_3` FOREIGN KEY (`UnitID`) REFERENCES `Units`(`UnitID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ShoppingLists` ADD CONSTRAINT `shoppinglists_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserRecipes` ADD CONSTRAINT `userrecipes_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserRecipes` ADD CONSTRAINT `userrecipes_ibfk_2` FOREIGN KEY (`RecipeID`) REFERENCES `Recipes`(`RecipeID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `TagID` ON `IngredientTags` (`TagID`);--> statement-breakpoint
CREATE INDEX `IngredientID` ON `RecipeIngredients` (`IngredientID`);--> statement-breakpoint
CREATE INDEX `UnitID` ON `RecipeIngredients` (`UnitID`);--> statement-breakpoint
CREATE INDEX `TagID` ON `RecipeTags` (`TagID`);--> statement-breakpoint
CREATE INDEX `RecipeID` ON `RecipeVersions` (`RecipeID`);--> statement-breakpoint
CREATE INDEX `UserID` ON `RecipeVersions` (`UserID`);--> statement-breakpoint
CREATE INDEX `IngredientID` ON `ShoppingListIngredients` (`IngredientID`);--> statement-breakpoint
CREATE INDEX `UnitID` ON `ShoppingListIngredients` (`UnitID`);--> statement-breakpoint
CREATE INDEX `UserID` ON `ShoppingLists` (`UserID`);--> statement-breakpoint
CREATE INDEX `RecipeID` ON `UserRecipes` (`RecipeID`);
*/