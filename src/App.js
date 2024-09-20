import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//CSS
import "./App.css";

//Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import User from "./pages/User/User";
import { AuthProvider } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import { useAuthentication } from "./hooks/useAuthentication";
import Account from "./pages/Account/Account";
import NewPost from "./pages/NewPost/NewPost";
//Components

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/account" element={<Account />}></Route>
              <Route path="/newpost" element={<NewPost />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/user" element={<User />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
