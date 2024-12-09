import prisma from "../connection/connection_pool";

export const getUserAddresses = async (userId: number) => {
  return await prisma.address.findMany({
    where: { userId, isDeleted: false},
    orderBy: { isPrimary: "desc" },
  });
};

export const addAddress = async (
  userId: number,
  addressData: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isPrimary?: boolean;
  }
) => {
  if (addressData.isPrimary) {
    await prisma.address.updateMany({
      where: { userId },
      data: { isPrimary: false },
    });
  }
  return await prisma.address.create({
    data: { ...addressData, userId },
  });
};

export const updateAddress = async (
  addressId: number,
  userId: number,
  addressData: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    isPrimary?: boolean;
  }
) => {
  if (addressData.isPrimary) {
    await prisma.address.updateMany({
      where: { userId },
      data: { isPrimary: false },
    });
  }
  return await prisma.address.update({
    where: { id: addressId },
    data: addressData,
  });
};

export const deleteAddress = async (addressId: number) => {
  return await prisma.address.update({
    where: { id: addressId },
    data:  {isDeleted: true}
  });
};
