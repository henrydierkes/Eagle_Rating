import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./pages/Navigation/Navigation";
import SmoothScroll from 'smooth-scroll';
import RatingPage from "./pages/RatingPage/RatingPage.jsx";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/ratingpage" element={<RatingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
