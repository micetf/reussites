import modal from "bootstrap/js/dist/modal";
import { useEffect, useRef } from "react";

function Aide({ visibiliteAide, fermerAide }) {
    const aideModal = useRef(null);

    useEffect(() => {
        const modalHandler = new modal(aideModal.current);
        if (visibiliteAide) modalHandler.show();
    }, [visibiliteAide]);

    function handleClick(e) {
        e.preventDefault();
        fermerAide();
    }
    return (
        <div
            ref={aideModal}
            className="modal fade"
            data-bs-backdrop="static"
            tabIndex="-1"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="aide">
                            Faire une réussite pour construire le nombre au
                            cycle 2 ?
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            onClick={handleClick}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p className="fw-bold text-decoration-underline">
                            Objectifs :
                        </p>
                        <ul>
                            <li>Connaître les nombres jusqu'à 50.</li>
                            <li>
                                Travailler sur la valeur positionnelle des
                                nombres dans la suite numérique.
                            </li>
                        </ul>
                        <p className="fw-bold text-decoration-underline">
                            But du jeu :
                        </p>
                        <ul>
                            <li>
                                Remettre toutes les cartes-nombres à leur place.
                            </li>
                        </ul>
                        <p className="fw-bold text-decoration-underline">
                            Déroulement :
                        </p>
                        <ul>
                            <li>
                                Choisir la plage de nombres sur laquelle vous
                                souhaitez travailler (1 à 10, 11 à 20, 21 à 30,
                                31 à 40, 41 à 50 ?).
                            </li>
                            <li>
                                Cliquer sur le dos (bleu) d'une carte pour la
                                retourner. La face (orange) de la carte
                                s'affiche alors au-dessous de la file.
                            </li>
                            <li>
                                Cliquer sur la bonne place pour déposer la carte
                                retournée (orange).
                            </li>
                            <li>
                                La partie se termine lorsque toutes les cartes
                                sont à leur place (vert)
                            </li>
                        </ul>
                    </div>
                    <p></p>{" "}
                </div>
            </div>
        </div>
    );
}

export default Aide;
