import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/auth";
import styles from "../../../styles/Login.module.scss";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      alert("Login successful!");

      console.log("Navigating to the products page");
      navigate("/home");
    } catch (err) {
      const errorMessage =
        (err as { message: string }).message || "An unknown error occurred";
      console.log("Login error:", err);
      setError(errorMessage);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className = {styles['full-screen']}>
      <div className={styles["wrapper"]}>
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <h1 className={styles['h1-margin']}>Login</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={styles["input-field"]}
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
            className={styles["input-field"]}
            required
          />
          {error && <p className="">{error}</p>}
          <div className="button-container">
            <button type="submit" className={styles["login-btn"]}>
              Login
            </button>
            <button
              type="submit"
              onClick={handleSignup}
              className={styles["signup-btn"]}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
