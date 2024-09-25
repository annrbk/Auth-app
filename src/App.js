import Register from "./components/Register";
import Login from "./components/Login";
import UsersTable from "./components/UsersTable";
import FirstScreen from "./components/FirstScreen";
import { useState } from "react";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastLogin, setLastLogin] = useState("");
  const [registeredUsers, setRegisteredUsers]= useState([]);

  const loginSuccessful = (username, lastLogin) => {
    setIsAuthenticated(true);
    setLastLogin(lastLogin); 
    getUsers();
  };

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

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSignUp = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  return (
    <div>
      <FirstScreen onSignUp={handleSignUp} onLogin={handleLogin} />
      {isAuthenticated ? (
        <>
          <UsersTable users={registeredUsers} lastLogin={lastLogin} onLogout={handleLogout}/>
        </>
      ) : showLogin ? (
        <Login
          onSwitch={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={loginSuccessful}
        />
      ) : showRegister ? (
        <Register
          onSwitch={() => {
            setShowRegister(false);
            setShowLogin(true); 
          }}
        />
      ) : null}
    </div>
  );
}
