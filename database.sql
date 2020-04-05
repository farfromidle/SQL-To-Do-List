CREATE TABLE "task" (
	"id" SERIAL PRIMARY KEY,
	"taskDo" VARCHAR (500) NOT NULL
	)

	INSERT INTO "task" ("taskDo") 
		VALUES('Get a thing done');