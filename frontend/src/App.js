/*
 * @Author: chen yang
 * @Date: 2020-09-13 13:13:58
 * @Last Modified by: chen yang
 * @Last Modified time: 2020-09-13 13:47:40
 */
import React from "react";
import data from "./data";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import ProductScreen from "./components/ProductScreen";

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              <img className="menu" src="/images/icons/menu.svg" alt="menu" />
            </button>
            <Link to="/">Amazona</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            <Link to="/signin">Signin</Link>
          </div>
        </header>

        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <Link to="/pants">Pants</Link>
            </li>
            <li>
              <Link to="/dresses">Dresses</Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route path="/product/:id">
              <ProductScreen data={data} />
            </Route>
            <Route exact path="/">
              <HomeScreen data={data} />
            </Route>
          </div>
        </main>

        <footer className="footer">All right reserved. </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
