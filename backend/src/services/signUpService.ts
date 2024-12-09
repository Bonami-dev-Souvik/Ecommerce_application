import prisma from '../connection/connection_pool'
import bcrypt from 'bcrypt';

export const createUser = async (email: any, name: string, password:string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // for creating user in the database using Prisma
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,  
    },
  });

  return user;
};