import { useState } from "react";

function PlageSelect({ selectionnerPlage }) {
    const [plage, setPlage] = useState(11);

    function handleChange(e) {
        e.preventDefault();
        const nouvellePlage = parseInt(e.target.value, 10);
        setPlage(nouvellePlage);
        selectionnerPlage(nouvellePlage);
    }
    return (
        <div className="form-floating my-3">
            <select
                className="form-select form-select-lg"
                name="plage"
                value={plage}
                onChange={handleChange}
            >
                <option value={1}>1 à 10</option>
                <option value={11}>11 à 20</option>
                <option value={21}>21 à 30</option>
                <option value={31}>31 à 40</option>
                <option value={41}>41 à 50</option>
            </select>
            <label htmlFor="plage">Choisir un jeu de cartes </label>
        </div>
    );
}

export default PlageSelect;
