import { useReducer, useState } from "react";

import PlageSelect from "./PlageSelect.js";
import Cartes from "./Cartes.js";
import Message from "./Message.js";
import Aide from "./Aide.js";
import RejouerButton from "./RejouerButton.js";
import AideButton from "./AideButton.js";
import { code } from "./parametres";
import useActions from "../../actions";

function App() {
    const [
        { cartesOrdonnees, cartesMelangees, visibiliteAide, message },
        { ouvrirAide, fermerAide, selectionnerPlage, changerMessage, rejouer },
    ] = useActions();

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
            <Aide visibiliteAide={visibiliteAide} fermerAide={fermerAide} />
            {message.code === code.FIN_REUSSITE && (
                <RejouerButton rejouer={rejouer} />
            )}
        </div>
    );
}

export default App;
