import { z } from 'zod'

/**
 * The fakestore response is a trust boundary: a third-party API that changes
 * shape should fail loudly here, not as `undefined.map` three components deep.
 *
 * Only the fields actually used are declared. Zod strips the rest, so a new
 * field upstream is not a breaking change.
 */
export const fakeStoreProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  category: z.string(),
  image: z.string(),
})

export const fakeStoreProductsSchema = z.array(fakeStoreProductSchema)

export type FakeStoreProduct = z.infer<typeof fakeStoreProductSchema>
