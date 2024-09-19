import Register from "./components/Register";
import Login from "./components/Login";
import UsersTable from "./components/UsersTable";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      {showLogin ? (
        <Login onSwitch={() => setShowLogin(false)} />
      ) : (
        <Register onSwitch={() => setShowLogin(true)} />
      )}
      <UsersTable />
    </div>
  );
}

export default App;
