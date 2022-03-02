import React from "react";
import { code } from "./parametres.js";

const DIM = 100;
const MARGE = 5;

const drawCarte = ({ valeurPioche, valeurAttendue, valeurActuelle }) => {
    const canvas = document.createElement("canvas");
    const withPioche = valeurPioche !== null;
    canvas.width = DIM;
    canvas.height = withPioche ? 2 * DIM : DIM;
    const ctx = canvas.getContext("2d");
    ctx.font = "24px Arial Bold";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.lineWidth = MARGE;

    ctx.fillStyle = "#643DF2";
    ctx.fillRect(0, 0, DIM, canvas.height);
    ctx.strokeRect(0, 0, DIM, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillText("?", DIM / 2, DIM / 2);

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
        <img
            onClick={handleImgClick}
            className="align-self-start img-thumbnail m-2 border border-primary  border-3 rounded-3"
            src={imageCarte}
            style={
                valeurActuelle !== valeurAttendue ? { cursor: "pointer" } : {}
            }
        />
    );
}

export default Carte;
