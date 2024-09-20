import React from "react";

import { NavLink, Link } from "react-router-dom";
import { FaCircleUser, FaArrowRightFromBracket, FaPlus } from "react-icons/fa6";
import styles from "./Navbar.module.css";
import User from "../pages/User/User";
//permitirá o usuário deslogar:
import { useAuthentication } from "../hooks/useAuthentication";

//Obterá o valor de user do nosso context
import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {
  const { out } = useAuthentication();

  //Obter usuário
  const { user } = useAuthValue();

  return (
    <nav>
      <NavLink to="/">
        <span className={styles.blog}>Rize</span>
      </NavLink>

      {user ? (
        <>
          <FaArrowRightFromBracket onClick={out} className={styles.out} />

          <NavLink to="/Account" className={styles.central}>
            <FaCircleUser className={styles.icon} /> <h3>{user.displayName}</h3>
          </NavLink>

          <Link to="/newpost" className={styles.new}>
            <FaPlus className={styles.newicon} />
          </Link>
        </>
      ) : (
        <>
          <NavLink to="/User" className={styles.central}>
            <FaCircleUser className={styles.icon} /> <p>Entrar/Cadastrar</p>
          </NavLink>
        </>
      )}

      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : null)}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : null)}
            to="/about"
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
