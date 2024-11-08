import { sql } from 'drizzle-orm'
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  index,
} from 'drizzle-orm/pg-core'

const advocates = pgTable('advocates', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  city: text('city').notNull(),
  degree: text('degree').notNull(),
  specialties: jsonb('payload').default([]).notNull(),
  yearsOfExperience: integer('years_of_experience').notNull(),
  phoneNumber: bigint('phone_number', { mode: 'number' }).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  searchIdx: index('advocates_search_idx').on(
    sql`to_tsvector('english',
      coalesce(${table.firstName}, '') || ' ' ||
      coalesce(${table.lastName}, '') || ' ' ||
      coalesce(${table.city}, '') || ' ' ||
      coalesce(${table.degree}, '')
    )`
  ),
}))

export { advocates }