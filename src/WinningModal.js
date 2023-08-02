import "./WinningModal.css"
import React from "react";

export function WinningModal({
    setShowModal,
    closeModal,
    attempts
}) {
    return (
        <div className="ModalContainer">
            <div className="WinningModal">
                <button type="button" aria-label="Close" className="modalButton btn btn-close" onClick={closeModal}>x</button>
                <div className="textSection">
                    <div className="title">Congratulations!!</div>
                    <div className="description">You matched all the pairs in {attempts} tries!</div>
                    <img src="./CatImages/Cat-Winning.png" alt="Cat" />
                    <div className="text">Close this pop up and click "New Game" to play again</div>
                </div>
            </div>
        </div>
    )
}
