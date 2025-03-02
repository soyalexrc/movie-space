CREATE TABLE `lists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `movies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`movie_id` integer,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`releaseDate` text NOT NULL,
	`poster` text NOT NULL,
	`backdrop` text NOT NULL,
	`rating` integer NOT NULL,
	`budget` integer NOT NULL,
	`duration` integer NOT NULL,
	`genres` text NOT NULL,
	`originalTitle` text NOT NULL,
	`productionCompanies` text NOT NULL,
	`list_id` integer NOT NULL,
	FOREIGN KEY (`list_id`) REFERENCES `lists`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `movies_movie_id_unique` ON `movies` (`movie_id`);