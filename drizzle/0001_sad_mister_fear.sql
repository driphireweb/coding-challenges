DROP INDEX IF EXISTS "advocates_search_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "advocates_search_idx" ON "advocates" USING btree (to_tsvector('english',
      coalesce("first_name", '') || ' ' ||
      coalesce("last_name", '') || ' ' ||
      coalesce("city", '') || ' ' ||
      coalesce("degree", '')
    ));