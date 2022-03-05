import * as types from "./types";
import { useReducer, useState } from "react";
import reducer, { initialState } from "../reducer";

function useActions() {
    const [visibiliteAide, setVisibiliteAide] = useState(false);
    const [{ cartesOrdonnees, cartesMelangees, message }, dispatch] =
        useReducer(reducer, initialState);

    function selectionnerPlage(nouvellePlage) {
        dispatch({ type: types.MAJ_PLAGE, plage: nouvellePlage });
    }
    function changerMessage(nouveauMessage) {
        if (nouveauMessage.code !== message.code) {
            dispatch({ type: types.MAJ_MESSAGE, message: nouveauMessage });
        }
    }
    function rejouer() {
        dispatch({ type: types.REJOUER });
    }

    function ouvrirAide() {
        setVisibiliteAide(true);
    }
    function fermerAide() {
        setVisibiliteAide(false);
    }

    return [
        { cartesOrdonnees, cartesMelangees, visibiliteAide, message },
        {
            selectionnerPlage,
            changerMessage,
            ouvrirAide,
            fermerAide,
            rejouer,
        },
    ];
}

export default useActions;
