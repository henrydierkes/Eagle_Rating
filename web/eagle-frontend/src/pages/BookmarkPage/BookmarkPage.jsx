import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./BookmarkPage.css";
import Slider from "react-slick";

function EditPreferencesModal({ isOpen, onClose }) {
    return (
        <div className={isOpen ? "modal is-active" : "modal"}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Edit Preferences</p>
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

function BookmarkPage() {
    const { userId } = useParams();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <div className="BookmarkPage">
            <NavBar />
            <div className="container profile">
                <section className="profile-heading">
                    <div className="columns is-multiline">
                        <div className="column is-12">
                            <h1 className="profile-title">Tuan Vinh</h1>
                            <p className="profile-subtitle">The user's profile bio goes here, limited to ~500 characters.</p>
                            <button className="edit-preferences-button" onClick={handleOpenModal} style={{ margin: "5px 0" }}>Edit Preferences</button>
                        </div>
                        <div className="column is-6">
                            <p className="stat-label">Likes</p>
                            <p className="stat-val">10</p>
                        </div>
                        <div className="column is-6">
                            <p className="stat-label">Dislikes</p>
                            <p className="stat-val">5</p>
                        </div>
                    </div>
                </section>
            </div>
            {isModalOpen && <EditPreferencesModal isOpen={isModalOpen} onClose={handleCloseModal} />}
            <Footer />
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} slider-arrow-next`}
            style={{ ...style, background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} slider-arrow-prev`}
            style={{ ...style, background: "green" }}
            onClick={onClick}
        />
    );
}

export default BookmarkPage;
