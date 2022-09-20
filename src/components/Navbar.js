import React, { useRef, useEffect } from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav
      class="navbar is-fixed-top is-black"
      role="navigation"
      aria-label="main navigation"
    >
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">Steam Game Stats</a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">Search</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
