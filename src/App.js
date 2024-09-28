import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UsersTable from "./components/UsersTable";
import FirstScreen from "./components/FirstScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<UsersTable />} />
      <Route path="*" element={<FirstScreen />} />
    </Routes>
  );
}
