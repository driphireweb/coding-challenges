CREATE TABLE IF NOT EXISTS "advocates" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"city" text NOT NULL,
	"degree" text NOT NULL,
	"payload" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"years_of_experience" integer NOT NULL,
	"phone_number" bigint NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "advocates_search_idx" ON "advocates" USING btree (to_tsvector('english',
      coalesce("first_name", '') || ' ' ||
      coalesce("last_name", '') || ' ' ||
      coalesce("city", '') || ' ' ||
      coalesce("degree", '') || ' ' ||
      coalesce(array_to_string("payload"::text[], ' ', ''),'')
    ));