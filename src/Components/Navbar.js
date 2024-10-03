import React from "react";

import { NavLink, Link } from "react-router-dom";
import {
  FaCircleUser,
  FaArrowRightFromBracket,
  FaPlus,
  FaHouse,
} from "react-icons/fa6";
import styles from "./Navbar.module.css";
import User from "../pages/Home/User/User";
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
      <NavLink to="/timeline">
        <span className={styles.blog}>Rize</span>
      </NavLink>

      {user ? (
        <>
          <Link to="/timeline" className={styles.home}>
            <FaHouse className={styles.newicon} />
          </Link>

          <NavLink to="/Account" className={styles.central}>
            <FaCircleUser className={styles.icon} /> <h3>{user.displayName}</h3>
          </NavLink>

          <Link to="/newpost" className={styles.new}>
            <FaPlus className={styles.newicon} />
          </Link>

          <Link to="/user">
            <FaArrowRightFromBracket onClick={out} className={styles.out} />
          </Link>
        </>
      ) : (
        <>
          <NavLink to="/User" className={styles.central}>
            <FaCircleUser className={styles.icon} /> <p>Entrar/Cadastrar</p>
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
