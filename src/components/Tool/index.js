import { useReducer, useState } from "react";

import { code } from "./parametres.js";
import { tirerCartes, melangerCartes } from "../../utils/gererCartes.js";

import SelectPlage from "./SelectPlage.js";
import Cartes from "./Cartes.js";
import Message from "./Message.js";
import Aide from "./Aide.js";
import Svg, { AIDE } from "../Svg/index.js";

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
    function handleClick(e) {
        e.preventDefault();
        setAide(true);
    }
    function closeAide() {
        setAide(false);
    }
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-primary"
                    onClick={handleClick}
                    title="Comment utiliser cette application web ?"
                >
                    <Svg src={AIDE} />
                </button>
            </div>
            <SelectPlage onChange={handlePlageChange} />

            <Message message={message} recommencer={recommencer} />
            <Cartes
                cartesOrdonnees={cartesOrdonnees}
                cartesMelangees={cartesMelangees}
                changerMessage={changerMessage}
            />

            <Aide aide={aide} close={closeAide} />
        </div>
    );
}

export default App;
