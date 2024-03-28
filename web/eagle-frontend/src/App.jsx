import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/SignIn.jsx"
import Navigation from "./pages/Navigation/Navigation";
import RatingPage from "./pages/RatingPage/RatingPage.jsx";
import AddLocation from "./pages/AddLocation/AddLocation.jsx";
import AddRating from "./pages/AddRating/AddRating.jsx";
import SignUp from "./pages/Login/SignUp.jsx";
import SignIn from "./pages/Login/SignIn.jsx";
import ScrollToTop from './ScrollToTop';



import SmoothScroll from 'smooth-scroll';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/ratingpage/:locId" element={<RatingPage />} />
          <Route path="/addLocation" element={<AddLocation />} />
          <Route path="/addRating" element={<AddRating/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
