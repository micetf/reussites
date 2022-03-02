import { useEffect, useReducer } from "react";
import Carte from "./Carte.js";
import { code } from "./parametres.js";

function reducer(state, action) {
    switch (action.type) {
        case "piocherCarte":
            return {
                ...state,
                melange: [
                    ...state.melange.slice(0, action.index),
                    null,
                    ...state.melange.slice(action.index + 1),
                ],
                pioche: { index: action.index, valeur: action.valeur },
            };
        case "poserCarte":
            return {
                ...state,
                melange: [
                    ...state.melange.slice(0, action.index),
                    action.valeurCartePosee,
                    ...state.melange.slice(action.index + 1),
                ],
                pioche: { index: action.index, valeur: action.valeur },
            };
        case "initialiserPartie":
            return {
                ...state,
                melange: action.cartesMelangees,
                pioche: { index: null, valeur: null },
            };
        default:
            return state;
    }
}

function Cartes({ cartesOrdonnees, cartesMelangees, changerMessage }) {
    const [{ melange, pioche }, dispatch] = useReducer(reducer, {
        melange: cartesMelangees,
        pioche: { index: null, valeur: null },
    });

    useEffect(() => {
        dispatch({ type: "initialiserPartie", cartesMelangees });
    }, [cartesMelangees]);

    function testFinDePartie() {
        const finPartie = melange.reduce(
            (fin, valeur, index) =>
                valeur !== cartesOrdonnees[index] ? false : fin,
            true
        );
        finPartie
            ? changerMessage({
                  code: code.FIN_REUSSITE,
                  color: "alert-success",
                  text: "Félicitation, tu as remis les cartes dans l'ordre.",
              })
            : changerMessage({
                  code: code.MUET,
                  color: "alert-success",
                  text: "",
              });
    }
    useEffect(() => {
        testFinDePartie();
    }, [melange]);

    function permuteValeurPioche(valeurActuelle) {
        const valeurPioche = pioche.valeur;
        const indexValeurPioche = pioche.index;
        const indexValeurActuelle = melange.findIndex(
            (valeur) => valeur === valeurActuelle
        );
        if (indexValeurPioche === null) {
            dispatch({
                type: "piocherCarte",
                index: indexValeurActuelle,
                valeur: valeurActuelle,
            });
        } else {
            dispatch({
                type: "poserCarte",
                index: indexValeurActuelle,
                valeur: valeurActuelle,
                valeurCartePosee: valeurPioche,
            });
        }
    }

    return (
        <div className="d-flex justify-content-around h-50">
            {cartesOrdonnees.map((attendue, index) => (
                <Carte
                    key={index}
                    pioche={pioche}
                    valeurPioche={pioche.index === index ? pioche.valeur : null}
                    valeurActuelle={melange[index]}
                    valeurAttendue={attendue}
                    permuteValeurPioche={permuteValeurPioche}
                    afficherMessage={changerMessage}
                />
            ))}
        </div>
    );
}

export default Cartes;
