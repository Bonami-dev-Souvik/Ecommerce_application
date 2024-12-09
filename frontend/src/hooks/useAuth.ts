import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("check auth called")
      try {
        const response = await axios.get(
          "http://localhost:3000/ecommerce_application/auth-check", 
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        console.log("This is the response-----> ",response)
        setUser(response.data.user); 
      } catch (error) {
        console.error("Auth check failed", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, user };
};

export default useAuth;

// todo multiple API calls (maybe because of strict mode in react)
