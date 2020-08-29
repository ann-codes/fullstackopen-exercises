import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <nav>
      [{" "}
      <Link style={padding} to="/anecdotes">
        anecdotes
      </Link>
      ] [{" "}
      <Link style={padding} to="/new">
        create new
      </Link>
      ] [{" "}
      <Link style={padding} to="/about">
        about
      </Link>
      ]
    </nav>
  );
};

export default Menu;
