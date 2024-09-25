import React from "react";

export default function FirstScreen({ onSignUp, onLogin }) {
  return (
    <div className="container mt-5">
      <button className="btn btn-primary me-1" onClick={onSignUp}>
        Sign up
      </button>
      <button className="btn btn-primary" onClick={onLogin}>
        Login
      </button>
    </div>
  );
}
