import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <div>
      <div className={classes.uniTag}>
        <p>Fulda University of Applied Sciences Software</p>
        <p>Engineering Project Fall 2021 for Demonstration Only</p>
      </div>
      <header className={classes.header}>
        <div className={classes.logo}>Mentor Me</div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search-tutors">Search Tutors</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default MainNavigation;
