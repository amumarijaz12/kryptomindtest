import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserTable from "./screens/UsersTable";
import EditUser from "./screens/EditUser"; // We'll create this component
import CreateUser from "./screens/CreateUser";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/add-user" element={<CreateUser />} />
        <Route path="/edit/:userId" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
