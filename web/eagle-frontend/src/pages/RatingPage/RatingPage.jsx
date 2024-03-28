// import React from "react";
// import NavBar from "../../components/NavBar/NavBar.jsx";
// import PlaceDetails from "../../components/PlaceDetails/PlaceDetails.jsx";
// import CommentFilter from "../../components/CommentFilter/CommentFilter.jsx";
// import CommentList from "../../components/CommentList/CommentList.jsx";
// import Footer from "../../components/Footer/Footer.jsx";
// import "./RatingPage.css";
// import DetailRating from "../../components/subComponents/detailRating/DetailRating.jsx";
//
// const results = [
//   {
//     id: 1,
//     title: "Some Building",
//     description: "Description for Result 1",
//     rating: 4.5,
//     num_rate: 33,
//     location: "540 Asbury Cir, Atlanta, GA 30307",
//     top_tags: ["tables", "chairs", "restroom"],
//     details: {
//       subrating1: {
//         name: "Cleanliness",
//         rating: 5,
//       },
//       subrating2: {
//         name: "Service",
//         rating: 2,
//       },
//       subrating3: {
//         name: "Location",
//         rating: 3,
//       },
//     },
//     url: "https://www.google.com/maps/place/Goizueta+Business+Library/@33.7904374,-84.322938,21z/data=!4m6!3m5!1s0x88f506f074593dc1:0xddb21bb8ce50833c!8m2!3d33.7905688!4d-84.3229201!16s%2Fg%2F1hm3lswk1?entry=ttu",
//     building: "Goizueta Business School's Library",
//     floor: "2nd floor",
//   },
// ];
//
// const comments = [
//   {
//     id: 1,
//     user: {
//       name: "John Doe",
//       profilePicture:
//         "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png",
//     },
//     datePosted: "2024-03-06",
//     overallRating: 4.5,
//     upvotes: 10,
//     downvotes: 2,
//     comment:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at convallis magna. Aenean ultricies eros ac lectus fermentum, quis volutpat elit fermentum.",
//   },
//   {
//     id: 2,
//     user: {
//       name: "Jane Smith",
//       profilePicture:
//         "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png",
//     },
//     datePosted: "2024-03-05",
//     overallRating: 3.8,
//     specificRatings: {
//       subrating1: 3,
//       subrating2: 4,
//       subrating3: 4,
//     },
//     upvotes: 5,
//     downvotes: 1,
//     comment:
//       "Sed malesuada arcu a suscipit malesuada. Sed tincidunt massa ut nisi scelerisque, non aliquam lorem ullamcorper.",
//   },
//   // Add more comments as needed
// ];
//
// function RatingPage() {
//   return (
//     <div className="RatingPage">
//       <NavBar />
//       <PlaceDetails results={results} />
//       <hr className="divider" />
//       <CommentFilter />
//       <CommentList comments={comments} />
//       <Footer />
//     </div>
//   );
// }
//
// export default RatingPage;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios';
import NavBar from "../../components/NavBar/NavBar.jsx";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails.jsx";
import CommentFilter from "../../components/CommentFilter/CommentFilter.jsx";
import CommentList from "../../components/CommentList/CommentList.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./RatingPage.css";

function RatingPage() {
  const { locId } = useParams();
  const [placeDetails, setPlaceDetails] = useState(null);
  const [placeComments, setPlaceComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      setIsLoading(true);
      try {
        const response = await Axios.get(`http://localhost:8080/api/place/${locId}`);
        setPlaceDetails(response.data);
        console.log(response.data); // Log the fetched data
      } catch (error) {
        console.error('Error fetching place details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [locId]); // Dependency array

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!placeDetails) {
    return <div>Place not found or error loading details.</div>;
  }

  return (
    <div className="RatingPage">
      <NavBar />
      {/* Ensure that placeDetails is passed correctly to the PlaceDetails component */}
      <PlaceDetails result={placeDetails} />
      <hr className="divider" />
      <CommentFilter />
      {/* Pass the comments to the CommentList component if necessary */}
      <CommentList comments={placeComments} />
      <Footer />
    </div>
  );
}

export default RatingPage;
