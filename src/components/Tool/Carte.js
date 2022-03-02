import React from "react";
import { code } from "./parametres.js";

const DIM = 200;
const MARGE = 5;

const drawCarte = ({ valeurPioche, valeurAttendue, valeurActuelle }) => {
    const canvas = document.createElement("canvas");
    const withPioche = valeurPioche !== null;
    canvas.width = DIM;
    canvas.height = withPioche ? 2 * DIM : DIM;
    const ctx = canvas.getContext("2d");
    ctx.font = "72px Arial Bold";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.lineWidth = MARGE;

    if (valeurActuelle === null) {
        ctx.fillStyle = "silver";
        ctx.fillRect(0, 0, DIM, canvas.height);
        ctx.strokeRect(0, 0, DIM, canvas.height);
    } else {
        ctx.fillStyle = "#643DF2";
        ctx.fillRect(0, 0, DIM, canvas.height);
        ctx.strokeRect(0, 0, DIM, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillText("?", DIM / 2, DIM / 2);
    }

    if (valeurAttendue === valeurActuelle) {
        ctx.fillStyle = "#1BF2A3";
        ctx.fillRect(0, 0, DIM, DIM);
        ctx.strokeRect(0, 0, DIM, DIM);
        ctx.fillStyle = "black";
        ctx.fillText(valeurActuelle.toString(), DIM / 2, DIM / 2);
    }

    if (withPioche) {
        ctx.fillStyle = "#F29422";
        ctx.fillRect(0, DIM, DIM, DIM);
        ctx.strokeRect(0, DIM, DIM, DIM);
        ctx.fillStyle = "black";
        ctx.fillText(valeurPioche.toString(), DIM / 2, DIM + DIM / 2);
    }
    return canvas.toDataURL("image/png");
};

function Carte({
    pioche,
    valeurPioche,
    valeurActuelle,
    valeurAttendue,
    permuteValeurPioche,
    afficherMessage,
}) {
    const imageCarte = drawCarte({
        valeurPioche,
        valeurActuelle,
        valeurAttendue,
    });

    function handleImgClick(e) {
        e.preventDefault();
        if (valeurActuelle !== valeurAttendue) {
            if (pioche.valeur === null || pioche.valeur === valeurAttendue) {
                permuteValeurPioche(valeurActuelle);
            } else {
                afficherMessage({
                    code: code.PLACE_INCORRECTE,
                    color: "alert-danger",
                    text: "Attention, ce n'est pas la place correcte pour la carte que tu as tirée.",
                });
            }
        }
    }

    return (
        <div className="align-self-start m-1 border border-primary">
            <img
                onClick={handleImgClick}
                className="img-fluid rounded-2"
                src={imageCarte}
                style={
                    valeurActuelle !== valeurAttendue
                        ? { cursor: "pointer" }
                        : {}
                }
            />
        </div>
    );
}

export default Carte;
