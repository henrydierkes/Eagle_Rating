import React, { useEffect, useState } from "react";

// Define your React component
function Map({ setLatitude, setLongitude }) {
  useEffect(() => {
    let map;
    let markers = [];
    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);

    function initMap() {
      const haightAshbury = { lat: 37.769, lng: -122.446 };

      map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: haightAshbury,
        mapTypeId: "terrain",
      });

      // This event listener will call addMarker() when the map is clicked.
      map.addListener("click", (event) => {
        addMarker(event.latLng);
      });

      // add event listeners for the buttons
      // document
      //   .getElementById("show-markers")
      //   .addEventListener("click", showMarkers);
      // document
      //   .getElementById("hide-markers")
      //   .addEventListener("click", hideMarkers);
      // document
      //   .getElementById("delete-markers")
      //   .addEventListener("click", deleteMarkers);

      // Adds a marker at the center of the map.
      addMarker(haightAshbury);
    }

    // Adds a marker to the map and push to the array.
    function addMarker(position) {
      deleteMarkers();
      const marker = new window.google.maps.Marker({
        position,
        map,
      });

      markers.push(marker);
      setLatitude(position.lat);
      setLongitude(position.lng);
      console.log(position.lat);
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    // Removes the markers from the map, but keeps them in the array.
    function hideMarkers() {
      setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    function showMarkers() {
      setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
      hideMarkers();
      markers = [];
    }

    // Call the initMap function once the component mounts
    initMap();

    // Clean up function (equivalent to componentWillUnmount)
    return () => {
      // Cleanup code here if needed
    };
  }, [setLatitude, setLongitude]); // Empty dependency array ensures useEffect runs only once after initial render

  // Return JSX for the component
  return (
    <div>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      {/* <button id="show-markers">Show Markers</button>
      <button id="hide-markers">Hide Markers</button>
      <button id="delete-markers">Delete Markers</button> */}
    </div>
  );
}

export default Map;
