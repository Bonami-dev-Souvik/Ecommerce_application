import { createContext, useContext, ReactNode  } from "react";
import useAuth from "../hooks/useAuth";

type User = {
  id: number;
  email: string;
};

type UserContextType = {
  user: User | null;
  isAuthenticated: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <UserContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

// to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};






/**
 * 
 * const input = [
    
    {
        id: 2,
        marks: 45
    },
    {
        id: 8,
        marks: 45
    }
    ,
    {
        id: 7,
        marks: 51
    },
    {
        id: 4,
        marks: 29
    },
    {
        id: 6,
        marks: 29
    }
]

const result = []
// input.forEach((currValue, index)=>{
//     console.log(currValue.marks == 45, index)
// })

for (let i = 0 ; i)


// const output = [
//     {
//         id: [8, 2],
//         marks: 45
//     },
    
//         {
//         id: [7],
//         marks: 51
//     },
//         {
//         id: [4, 6],
//         marks: 29
//     }
//     ]
 */