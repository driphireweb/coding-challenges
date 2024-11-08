import db from '~/db'
import { advocates } from '~/db/schema'
import { sql } from 'drizzle-orm'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get('search')

  if (!searchTerm) {
    const data = await db.select().from(advocates)
    return Response.json({ data })
  }

  // Format search term: replace spaces with & and add :* to each term
  const formattedSearch = searchTerm
    .split(' ')
    .map(term => `${term}:*`)
    .join(' & ')

  const data = await db
    .select()
    .from(advocates)
    .where(
      sql`to_tsvector('english',
        coalesce(${advocates.firstName}, '') || ' ' ||
        coalesce(${advocates.lastName}, '') || ' ' ||
        coalesce(${advocates.city}, '') || ' ' ||
        coalesce(${advocates.degree}, '')
      ) @@ to_tsquery('english', ${formattedSearch})`
    )

  return Response.json({ data })
}
