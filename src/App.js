import Register from "./components/Register";
import Login from "./components/Login";
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
    </div>
  );
}

export default App;
