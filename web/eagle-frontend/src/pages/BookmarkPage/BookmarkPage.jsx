import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./BookmarkPage.css";
import axiosConfig from "../../axiosConfig.jsx";


function BookmarkPage() {
    const { bookmarkId } = useParams();
    const [bookmarkDetails, setBookmarkDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

  
}

export default BookmarkPage;