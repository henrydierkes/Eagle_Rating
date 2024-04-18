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
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Text input" />
                        </div>
                        {/* Repeat for other fields */}
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-primary" onClick={onClose}>Save changes</button>
                    <button className="button" onClick={onClose}>Cancel</button>
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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div className="BookmarkPage">
            <NavBar />
            <div className="container profile">
                <section className="profile-heading">
                    <div className="columns is-multiline">
                        <div className="column is-12">
                            <h1 className="title is-2">Tuan Vinh</h1>
                            <p className="subtitle is-5">The users profile bio would go here, of course. It could be two lines or more or whatever. We should probably limit the amount of characters to ~500 at most though.</p>
                            <button className="button is-primary is-outlined" onClick={handleOpenModal} style={{ margin: "5px 0" }}>Edit Preferences</button>
                        </div>
                        <div className="column is-4">
                            <p className="title">30</p>
                            <p className="subtitle">Searches</p>
                        </div>
                        <div className="column is-4">
                            <p className="title">10</p>
                            <p className="subtitle">Likes</p>
                        </div>
                        <div className="column is-4">
                            <p className="title">3</p>
                            <p className="subtitle">Lists</p>
                        </div>
                    </div>
                </section>
            </div>
            <EditPreferencesModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <Footer />
        </div>
    );
}
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}


export default BookmarkPage;
