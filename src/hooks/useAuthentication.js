import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { db } from "../firebase/config";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [erro, setErro] = useState(null);

  //Cleanup. Limpar resquicios de funções.
  const [cancelled, setCancelled] = useState(false);

  //permite autenticação.
  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.name,
      });
      return user;
    } catch (erro) {
      if (erro.message.includes("password")) {
        setErro("Senha Fraca !!");
      } else if (erro.message.includes("email-already")) {
        setErro("Email já cadastrado.");
      } else {
        setErro("Ocorreu um erro, por favor tente mais tarde");
      }
    }
  };

  const log = async (email, password) => {
    try {
      const { user } = signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch {
      console.log("Erro no login.");
    }
  };

  const out = () => signOut(auth);

  //Deixa mais performatico.
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, erro, log, out };
};
