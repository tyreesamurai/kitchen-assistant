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
CREATE TABLE `IngredientTag` (
	`IngredientID` int NOT NULL,
	`TagID` int NOT NULL,
	CONSTRAINT `IngredientTag_IngredientID_TagID` PRIMARY KEY(`IngredientID`,`TagID`)
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
CREATE TABLE `RecipeTag` (
	`RecipeID` int NOT NULL,
	`TagID` int NOT NULL,
	CONSTRAINT `RecipeTag_RecipeID_TagID` PRIMARY KEY(`RecipeID`,`TagID`)
);
--> statement-breakpoint
CREATE TABLE `RecipeVersion` (
	`VersionID` int AUTO_INCREMENT NOT NULL,
	`RecipeID` int NOT NULL,
	`UserID` int NOT NULL,
	`versionDescription` text,
	`dateCreated` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `RecipeVersion_VersionID` PRIMARY KEY(`VersionID`)
);
--> statement-breakpoint
CREATE TABLE `ShoppingList` (
	`ShoppingListID` int AUTO_INCREMENT NOT NULL,
	`UserID` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`dateCreated` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `ShoppingList_ShoppingListID` PRIMARY KEY(`ShoppingListID`)
);
--> statement-breakpoint
CREATE TABLE `ShoppingListIngredient` (
	`ShoppingListID` int NOT NULL,
	`IngredientID` int NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`UnitID` int NOT NULL,
	`isChecked` tinyint(1) DEFAULT 0,
	CONSTRAINT `ShoppingListIngredient_ShoppingListID_IngredientID` PRIMARY KEY(`ShoppingListID`,`IngredientID`)
);
--> statement-breakpoint
CREATE TABLE `Tag` (
	`TagID` int AUTO_INCREMENT NOT NULL,
	`tag` varchar(255) NOT NULL,
	CONSTRAINT `Tag_TagID` PRIMARY KEY(`TagID`)
);
--> statement-breakpoint
CREATE TABLE `Unit` (
	`UnitID` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`type` enum('volume','weight','amount','other') NOT NULL,
	CONSTRAINT `Unit_UnitID` PRIMARY KEY(`UnitID`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`UserID` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`authProvider` enum('local','google','facebook') NOT NULL,
	`role` enum('admin','editor','viewer') DEFAULT 'viewer',
	`dateJoined` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `User_UserID` PRIMARY KEY(`UserID`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `UserRecipe` (
	`UserID` int NOT NULL,
	`RecipeID` int NOT NULL,
	`dateCreated` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`isFavorite` tinyint(1) DEFAULT 0,
	`isAttempted` tinyint(1) DEFAULT 0,
	`personalNote` text,
	CONSTRAINT `UserRecipe_UserID_RecipeID` PRIMARY KEY(`UserID`,`RecipeID`)
);
--> statement-breakpoint
ALTER TABLE `IngredientTag` ADD CONSTRAINT `ingredienttag_ibfk_1` FOREIGN KEY (`IngredientID`) REFERENCES `Ingredients`(`IngredientID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `IngredientTag` ADD CONSTRAINT `ingredienttag_ibfk_2` FOREIGN KEY (`TagID`) REFERENCES `Tag`(`TagID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `recipeingredients_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `Recipes`(`RecipeID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `recipeingredients_ibfk_2` FOREIGN KEY (`IngredientID`) REFERENCES `Ingredients`(`IngredientID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `recipeingredients_ibfk_3` FOREIGN KEY (`UnitID`) REFERENCES `Unit`(`UnitID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeTag` ADD CONSTRAINT `recipetag_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `Recipes`(`RecipeID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeTag` ADD CONSTRAINT `recipetag_ibfk_2` FOREIGN KEY (`TagID`) REFERENCES `Tag`(`TagID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeVersion` ADD CONSTRAINT `recipeversion_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `Recipes`(`RecipeID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RecipeVersion` ADD CONSTRAINT `recipeversion_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ShoppingList` ADD CONSTRAINT `shoppinglist_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ShoppingListIngredient` ADD CONSTRAINT `shoppinglistingredient_ibfk_1` FOREIGN KEY (`ShoppingListID`) REFERENCES `ShoppingList`(`ShoppingListID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ShoppingListIngredient` ADD CONSTRAINT `shoppinglistingredient_ibfk_2` FOREIGN KEY (`IngredientID`) REFERENCES `Ingredients`(`IngredientID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ShoppingListIngredient` ADD CONSTRAINT `shoppinglistingredient_ibfk_3` FOREIGN KEY (`UnitID`) REFERENCES `Unit`(`UnitID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserRecipe` ADD CONSTRAINT `userrecipe_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserRecipe` ADD CONSTRAINT `userrecipe_ibfk_2` FOREIGN KEY (`RecipeID`) REFERENCES `Recipes`(`RecipeID`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `TagID` ON `IngredientTag` (`TagID`);--> statement-breakpoint
CREATE INDEX `IngredientID` ON `RecipeIngredients` (`IngredientID`);--> statement-breakpoint
CREATE INDEX `UnitID` ON `RecipeIngredients` (`UnitID`);--> statement-breakpoint
CREATE INDEX `TagID` ON `RecipeTag` (`TagID`);--> statement-breakpoint
CREATE INDEX `RecipeID` ON `RecipeVersion` (`RecipeID`);--> statement-breakpoint
CREATE INDEX `UserID` ON `RecipeVersion` (`UserID`);--> statement-breakpoint
CREATE INDEX `UserID` ON `ShoppingList` (`UserID`);--> statement-breakpoint
CREATE INDEX `IngredientID` ON `ShoppingListIngredient` (`IngredientID`);--> statement-breakpoint
CREATE INDEX `UnitID` ON `ShoppingListIngredient` (`UnitID`);--> statement-breakpoint
CREATE INDEX `RecipeID` ON `UserRecipe` (`RecipeID`);
*/