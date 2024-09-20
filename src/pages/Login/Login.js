import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthentication } from "../../hooks/useAuthentication";

import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, log } = useAuthentication();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    async function login() {
      await log(email, password);
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
    login();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>
          Email:
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            name="email"
            id="email"
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            name="senha"
            id="senha"
          />
        </label>
        <button className={styles.button}>Entrar</button>
      </form>
    </>
  );
}

export default Login;
