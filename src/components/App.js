import { useReducer } from "react";

import { code } from "./parametres.js";
import { tirerCartes, melangerCartes } from "../utils/gererCartes.js";

import SelectPlage from "./SelectPlage.js";
import Cartes from "./Cartes.js";
import Message from "./Message.js";

function reducer(state, action) {
    switch (action.type) {
        case "majPlage":
            return {
                ...state,
                ...tirerCartes(action.plage),
                message: { code: code.MUET },
            };
        case "recommencer":
            return {
                ...state,
                cartesMelangees: melangerCartes(state.cartesOrdonnees),
                message: { code: code.MUET },
            };
        case "majMessage":
            return { ...state, message: action.message };
        default:
            return state;
    }
}
function App() {
    const [{ cartesOrdonnees, cartesMelangees, message }, dispatch] =
        useReducer(reducer, {
            ...tirerCartes(11),
            message: { code: code.MUET },
        });

    function handlePlageChange(nouvellePlage) {
        dispatch({ type: "majPlage", plage: nouvellePlage });
    }

    function changerMessage(nouveauMessage) {
        if (nouveauMessage.code !== message.code) {
            dispatch({ type: "majMessage", message: nouveauMessage });
        }
    }
    function recommencer() {
        dispatch({ type: "recommencer" });
    }
    return (
        <div className="container">
            <SelectPlage onChange={handlePlageChange} />

            <Cartes
                cartesOrdonnees={cartesOrdonnees}
                cartesMelangees={cartesMelangees}
                changerMessage={changerMessage}
            />

            <Message message={message} recommencer={recommencer} />
        </div>
    );
}

export default App;
