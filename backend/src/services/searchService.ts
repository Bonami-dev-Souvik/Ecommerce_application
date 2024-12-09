import prisma from '../connection/connection_pool';

export const getSearchResults = async (query: string) => {
  return prisma.product.findMany({
    where: {
      title: {
        contains: query,  
        mode: 'insensitive',  
      },
    },
    select: {
      id: true,
      title: true,
      price: true,
      image: true, 
      description: true,
      ratingCount: true,
      ratingRate: true,
      category: true

    },
  });
};
