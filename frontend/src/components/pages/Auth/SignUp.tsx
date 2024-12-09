import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../api/auth"
import styles from '../../../styles/Login.module.scss'


function Signup() {
  const [formData, setFormData] = useState({ email: "", name: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("some error occured");

    try {
      await signup(formData);
      alert("Signup successful!");
      navigate("/products");
    } catch (err) {
        const errorMessage = (err as {message: string}).message || "An unknown error occured"
        console.log("This is the error that has ocurred ", err)
      setError(errorMessage);
    }
  };

  const handleLogin = ()=>{
    navigate('/')
  }

  return (
    <div className = {styles['full-screen']}>
    <div className={styles['wrapper']}>
      <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h1 className={styles['margin-bottom']}>Signup</h1>
          <label htmlFor="name" >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={styles['input-field']}
            required
          />
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={styles['input-field']}
            required
          />
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={styles['input-field']}
            required
          />

        {error && <p className="text-red-500">{error}</p>}
        <div className="button-container">
        <button
          type="submit"
          className={styles['login-btn']}
        >
          Signup
        </button>
        <button
          type="submit"
          className={styles['signup-btn']}
          onClick={handleLogin}
        >
          Login
        </button>
        </div>
        
      </form>
    </div>
    </div>
  );
}

export default Signup;
