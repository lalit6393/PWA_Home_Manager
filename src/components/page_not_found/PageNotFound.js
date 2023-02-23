import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const style = {
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontSize: "2rem",
      backgroundColor: "var(--part1-background)"
  };

  return (
    <div style={style}>
      <p>Page for this path is not found.</p>
      <p>
        Go to <Link to={"/"}>Home Page</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
