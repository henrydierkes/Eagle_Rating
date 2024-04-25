import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import axiosConfig from "../../axiosConfig.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import bookmarkIcon from '../../components/subComponents/Misc/bookmark.png';
import bookmarkHighlightIcon from '../../components/subComponents/Misc/bookmark highlight.png';
import "./BookmarkPage.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};

const getRatingColor = (averageRating) => {
    if (averageRating >= 4) {
        return 'rgba(0, 128, 255, 0.7)';
    } else if (averageRating >= 2) {
        return 'rgba(255, 193, 7, 0.7)';
    } else {
        return '#F44336';
    }
};

const clickBookmarkApi = async (userId, placeId) => {
    try {
        const response = await axios.post(`${axiosConfig.baseURL}/api/user/clickBookMark`, null, {
            params: {
                userId,
                placeId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add or remove bookmark:', error);
        return null;
    }
};

function EditPreferencesModal({ isOpen, onClose }) {
    return (
        <div className={isOpen ? "modal is-active" : "modal"}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Edit Preferences</p >
                    <button className="delete" onClick={onClose} aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    {/* Add form fields here */}
                </section>
                <footer className="modal-card-foot">
                    <button className="modal-save-button" onClick={onClose}>Save changes</button>
                    <button className="modal-cancel-button" onClick={onClose}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}
function ChangeAccountSettingsModal({ isOpen, onClose }) {
    return (
        <div className={isOpen ? "modal is-active" : "modal"}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Change Account Settings</p>
                    <button className="delete" onClick={onClose} aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    {/* Add form fields here for account settings */}
                </section>
                <footer className="modal-card-foot">
                    <button className="modal-save-button" onClick={onClose}>Save changes</button>
                    <button className="modal-cancel-button" onClick={onClose}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}
function BookmarkPage() {
    const { currentUser } = useAuth();
    const { userId } = useParams();
<<<<<<< HEAD
    const [isModalOpen, setModalOpen] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [placeInfoData, setPlaceInfoData] = useState([]);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            axios.get(`${axiosConfig.baseURL}/api/user/bookmarks/${currentUser.userId}`)
                .then(response => {
                    const bookmarks = response.data;
                    setBookmarks(bookmarks);
                    console.log("results", bookmarks);
                    // Assuming you have a function to display place information based on bookmarks
                    // displayPlaceInformation(bookmarks);
                })
                .catch(error => {
                    console.error('Failed to fetch user bookmarks:', error);
                });
        }
    }, [currentUser]);

    useEffect(() => {
        // Function to fetch place information for each bookmarked place
        const fetchPlaceInformation = async () => {
            const placeInfoPromises = bookmarks.map(bookmarkId =>
                axios.get(`${axiosConfig.baseURL}/api/place/${bookmarkId}`)
            );

            try {
                const placeInfoResponses = await Promise.all(placeInfoPromises);
                const placeInfoData = placeInfoResponses.map(response => response.data);
                console.log("Place Information:", placeInfoData);
                setPlaceInfoData(placeInfoData);
                // Handle the retrieved place information here (e.g., set state, display on UI)
            } catch (error) {
                console.error('Failed to fetch place information:', error);
            }
        };

        if (bookmarks.length > 0) {
            fetchPlaceInformation();
        }
    }, [bookmarks]);

    const toggleBookmark = async (placeId, e) => {
        e.stopPropagation(); // Prevent the click from reaching the result item
    
        if (!currentUser) {
            // Handle case where there is no current user (authentication error)
            return;
        }
    
        // Call the backend API
        const response = await clickBookmarkApi(currentUser.userId, placeId);
    
        // Check the response and handle success case
        if (response === 'Email verified successfully' || response.success) {
            setBookmarks((prev) => {
                if (prev.includes(placeId)) {
                    // If place is already bookmarked, remove it
                    const updatedBookmarks = prev.filter((id) => id !== placeId);
                    if (updatedBookmarks.length === 0) {
                        // If no bookmarks left, reset placeInfoData
                        setPlaceInfoData([]);
                    }
                    return updatedBookmarks;
                } else {
                    // If place is not bookmarked, add it
                    return [...prev, placeId];
                }
            });
        } else {
            console.error('Failed to add or remove bookmark:', response);
        }
    };
    

    const navigateToLocationDetail = (locationId) => {
        navigate(`/ratingpage/${locationId}`);
    };
=======
    const [isPreferencesModalOpen, setPreferencesModalOpen] = useState(false);
    const [isAccountSettingsModalOpen, setAccountSettingsModalOpen] = useState(false);

    const handleOpenPreferencesModal = () => setPreferencesModalOpen(true);
    const handleClosePreferencesModal = () => setPreferencesModalOpen(false);
    const handleOpenAccountSettingsModal = () => setAccountSettingsModalOpen(true);
    const handleCloseAccountSettingsModal = () => setAccountSettingsModalOpen(false);
>>>>>>> 91b97a5f5 (bleh)

    return (
        <div className="BookmarkPage">
            <NavBar />
            <h1 className="page-title">Bookmarked Pages</h1> {/* Title added here */}
            {/* <div className="container profile">
                <section className="profile-heading">
                    <div className="columns is-multiline">
                        <div className="column is-12">
                            <h1 className="profile-title">Tuan Vinh</h1>
<<<<<<< HEAD
                            <p className="profile-subtitle">The user's profile bio goes here, limited to ~500 characters.</p >
                            <button className="edit-preferences-button" onClick={handleOpenModal} style={{ margin: "5px 0" }}>Edit Preferences</button>
=======
                            <p className="profile-subtitle">The user's profile bio goes here, limited to ~500 characters.</p>
                            <button className="edit-preferences-button" onClick={handleOpenPreferencesModal} style={{ margin: "5px" }}>Edit Preferences</button>
                            <button className="edit-account-settings-button" onClick={handleOpenAccountSettingsModal} style={{ margin: "5px" }}>Change Account Settings</button>
>>>>>>> 91b97a5f5 (bleh)
                        </div>
                        <div className="column is-6">
                            <p className="stat-label">Likes</p >
                            <p className="stat-val">10</p >
                        </div>
                        <div className="column is-6">
                            <p className="stat-label">Dislikes</p >
                            <p className="stat-val">5</p >
                        </div>
                        <div className="column is-6">
                            <p className="stat-label">Bookmark Places</p>
                    </div>
                    <div className="column is-12">
                            <Slider {...settings}>
                                <div><h3>Place 1</h3></div>
                                <div><h3>Place 2</h3></div>
                                <div><h3>Place 3</h3></div>
                                <div><h3>Place 4</h3></div>
                                <div><h3>Place 5</h3></div>
                                <div><h3>Place 6</h3></div>
                            </Slider>
                        </div>
                    </div>
                </section>
<<<<<<< HEAD
            </div> */}
            {isModalOpen && <EditPreferencesModal isOpen={isModalOpen} onClose={handleCloseModal} />}
            <div>
                {placeInfoData.length > 0 && (
                    <>
                        {placeInfoData.map((result, index) => (
                            <div key={result.locIdStr || index} className="result-item-wrapper" onClick={() => navigateToLocationDetail(result.locIdStr)}>
                                <div className="rating-box-wrapper" style={{ background: getRatingColor(result.averageRating?.overall) }}>
                                    <span className="rating-number">{result.averageRating?.overall.toFixed(1)}</span>
                                </div>
                                {currentUser && (
                                    <div className="highlight-tag-wrapper" onClick={(e) => toggleBookmark(result.locIdStr, e)}>
                                        < img src={bookmarkHighlightIcon} alt="Bookmarked" className="bookmark-highlight" />
                                    </div>
                                )}
                                <div className="result-content">
                                    <h3>{result.locName}</h3>
                                    <p className="description">{result.ratingCount} ratings</p >
                                </div>
                            </div>

                        ))}
                    </>
                )}
                {bookmarks.length === 0 && (
                    <p>No bookmarks available.</p >
                )}
            </div>


=======
            </div>
            {isPreferencesModalOpen && <EditPreferencesModal isOpen={isPreferencesModalOpen} onClose={handleClosePreferencesModal} />}
            {isAccountSettingsModalOpen && <ChangeAccountSettingsModal isOpen={isAccountSettingsModalOpen} onClose={handleCloseAccountSettingsModal} />}
>>>>>>> 91b97a5f5 (bleh)
            <Footer />
        </div>

    );
}

function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
        <div
            className="slider-arrow-next"
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
        <div
            className="slider-arrow-prev"
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

export default BookmarkPage;