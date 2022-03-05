import { useReducer, useState } from "react";

import { code } from "./parametres.js";
import { tirerCartes, melangerCartes } from "../../utils/gererCartes.js";

import PlageSelect from "./PlageSelect.js";
import Cartes from "./Cartes.js";
import Message from "./Message.js";
import Aide from "./Aide.js";
import RejouerButton from "./RejouerButton.js";
import AideButton from "./AideButton.js";

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
    const [aide, setAide] = useState(false);
    const [{ cartesOrdonnees, cartesMelangees, message }, dispatch] =
        useReducer(reducer, {
            ...tirerCartes(11),
            message: { code: code.MUET },
        });

    function selectPlage(nouvellePlage) {
        dispatch({ type: "majPlage", plage: nouvellePlage });
    }

    function changerMessage(nouveauMessage) {
        if (nouveauMessage.code !== message.code) {
            dispatch({ type: "majMessage", message: nouveauMessage });
        }
    }
    function rejouer() {
        dispatch({ type: "recommencer" });
    }

    function showAide() {
        setAide(true);
    }

    function closeAide() {
        setAide(false);
    }

    return (
        <div className="container-fluid">
            <AideButton showAide={showAide} />
            <PlageSelect selectPlage={selectPlage} />
            <Message message={message} />
            <Cartes
                cartesOrdonnees={cartesOrdonnees}
                cartesMelangees={cartesMelangees}
                changerMessage={changerMessage}
            />
            <Aide aide={aide} close={closeAide} />
            {message.code === code.FIN_REUSSITE && (
                <RejouerButton rejouer={rejouer} />
            )}
        </div>
    );
}

export default App;
