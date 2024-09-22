import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";

export default function Register({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (response.ok) {
        const data = await response.json();
        setRegisteredUsers(data);
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        await getUsers();
        setName("");
        setEmail("");
        setPassword("");
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="exampleInputName1" class="form-label">
            Name
          </label>
          <input
            type="name"
            class="form-control"
            id="exampleInputName1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label htmlFor="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Sign up
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={onSwitch}
        >
          Login
        </button>
      </form>
      <UsersTable users={registeredUsers} />
    </div>
  );
}
