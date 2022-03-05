import { useReducer, useState } from "react";

import PlageSelect from "./PlageSelect.js";
import Cartes from "./Cartes.js";
import Message from "./Message.js";
import Aide from "./Aide.js";
import RejouerButton from "./RejouerButton.js";
import AideButton from "./AideButton.js";
import reducer, { initialState } from "../../reducer/index.js";
import { code } from "./parametres";

function App() {
    const [aide, setAide] = useState(false);
    const [{ cartesOrdonnees, cartesMelangees, message }, dispatch] =
        useReducer(reducer, initialState);

    function selectionnerPlage(nouvellePlage) {
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
    function ouvrirAide() {
        setAide(true);
    }
    function fermerAide() {
        setAide(false);
    }

    return (
        <div className="container-fluid">
            <AideButton ouvrirAide={ouvrirAide} />
            <PlageSelect selectionnerPlage={selectionnerPlage} />
            <Message message={message} />
            <Cartes
                cartesOrdonnees={cartesOrdonnees}
                cartesMelangees={cartesMelangees}
                changerMessage={changerMessage}
            />
            <Aide aide={aide} fermerAide={fermerAide} />
            {message.code === code.FIN_REUSSITE && (
                <RejouerButton rejouer={rejouer} />
            )}
        </div>
    );
}

export default App;
