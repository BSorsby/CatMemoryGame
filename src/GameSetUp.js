import "./GameSetUp.css";
import React from "react";
import $ from 'jquery';

export function GameSetUp({
    closeGameSetUp,
    handleCallback,
    handleBackgroundChange
}) {

    function startClick() {
        let selectedTiles = $('input[name=tiles]:checked').val();
        if (selectedTiles) {
            let numTiles = parseInt(selectedTiles[0]) * parseInt(selectedTiles[2]);
            handleCallback(numTiles);
        }
        let selectedBackground = $('input[name=background]:checked').val();
        if (selectedBackground) {
            handleBackgroundChange(selectedBackground);
        }


        closeGameSetUp();


    }

    return (
        <div className="ModalContainer">
            <div className="GameSetUp">
                <button type="button" aria-label="Close" className="modalButton btn btn-close" onClick={closeGameSetUp}>x</button>
                <div className="textSection">
                    <div className="title">Game Settings</div>
                    <form>
                        <div className="text tiles">Please select the number of tiles you would like to play:
                        <div className="d-flex justify-content-center">
                            <div className="m-2">
                                <input type="radio" id="3x4" name="tiles" value="3x4" />
                                <label for="3x4">3x4</label>
                            </div>
                            <div className="m-2">
                                <input type="radio" id="4x4" name="tiles" value="4x4" />
                                <label for="4x4">4x4</label>
                            </div>
                            <div className="m-2">
                                <input type="radio" id="4x5" name="tiles" value="4x5" />
                                <label for="4x5">4x5</label>
                            </div>
                            </div>
                        </div>
                        <div className="text" >Choose your card background:
                            <div className="text background-section">
                                <div className="d-flex flex-column m-2">
                                    <input type="radio" id="background1" name="background" value="background1" />
                                    <label for="background1"><img className="card-example" src="./CatImages/card-background1.jpg" alt="background1"></img></label>
                                </div>
                                <div className="d-flex flex-column m-2">
                                    <input type="radio" id="background2" name="background" value="background2" />
                                    <label for="background2"><img className="card-example" src="./CatImages/card-background2.jpg" alt="background2"></img></label>
                                </div>
                                <div className="d-flex flex-column m-2">
                                    <input type="radio" id="background3" name="background" value="background3" />
                                    <label for="background3"><img className="card-example" src="./CatImages/card-background3.jpg" alt="background3"></img></label>
                                </div>
                            </div>
                        </div>
                        <input type="button" className="btn btn-info" value="Save" onClick={startClick}></input>
                    </form>
                </div>
            </div>
        </div>
    )
}
