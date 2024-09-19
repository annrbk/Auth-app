import React from "react";

export default function Register({ onSwitch }) {
  return (
    <div className="container">
      <h2>Sign up</h2>
      <form>
        <div class="mb-3">
          <label for="exampleInputName1" class="form-label">
            Name
          </label>
          <input type="name" class="form-control" id="exampleInputName1" />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Sign up
        </button>
        <button
          type="submit"
          class="btn btn-outline-primary"
          onClick={onSwitch}
        >
          Login
        </button>
      </form>
    </div>
  );
}
