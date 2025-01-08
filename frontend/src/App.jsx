import { Navbar } from './Pages/Components/Navbar';
import { ManageTeam } from './Pages/Management/Manageteam';
import { Bookings } from './Pages/Bookings/Bookings';
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import Dashboard from './Pages/Dashboard/Dashboard';
import VerifyPage from './Pages/Verify/Verify';
import SearchPhone from './Pages/Verifying/Verifying';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <main className="p-8">
        <ManageTeam />
      </main> */}
      <Router>
      <Routes>
        <Route path="/manage-team" element={<ManageTeam />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/verify' element={<VerifyPage/>} />
        <Route path='/verifying' element={<SearchPhone/>} />
      </Routes>
    </Router>
    </div>
  );
}