import React from "react";
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
