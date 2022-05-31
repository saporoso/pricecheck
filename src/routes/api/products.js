import prisma from '$lib/utils/prisma'

export async function get({ url }) {
  const search = url.searchParams.get('search') || ''

  const where = {}
  if (search) {
    where.AND = search.split(' ').map((word) => ({
      OR: [{ title: { contains: word } }, { description: { contains: word } }]
    }))
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      prices: {
        include: {
          shop: true
        }
      }
    },
    orderBy: {
      title: 'asc'
    }
  })

  return {
    status: 200,
    body: {
      products
    }
  }
}
