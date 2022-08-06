import React from "react";

function ModalVideo({ open, video, movie, handleClickClose }) {
    const { title } = movie;

    if (!open) return null;
    return (
        <div className="overlay" onClick={handleClickClose}>
            <div className="modalContainer">
                <iframe
                    className="modalVideo"
                    src={video}
                    title={`${title} trailer`}
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    );
}

export default ModalVideo;
