import React from "react";
import { Link } from "react-router-dom";

export default function FirstScreen({ onSignUp, onLogin }) {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Link to="/register" className="btn btn-primary me-2" onClick={onSignUp}>
        Sign up
      </Link>
      <Link to="/login" className="btn btn-primary" onClick={onLogin}>
        Login
      </Link>
    </div>
  );
}
