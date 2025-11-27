import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegister from '../screens/UserRegister';
import UserLogin from '../screens/UserLogin';
import PartnerRegister from '../screens/FoodPartnerRegister';
import PartnerLogin from '../screens/FoodPartnerLogin';
import Home from '../screens/Home';
import CreateFood from '../screens/Food-partner/CreateFood';
import Profile from '../screens/Food-partner/Profile';
import SavedFood from '../screens/SavedFood';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* Food Partner Auth */}
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />

        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/save" element={<SavedFood />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
