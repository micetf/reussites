import { code } from "../components/Tool/parametres";
import { tirerCartes, melangerCartes } from "../utils/gererCartes";

export const initialState = {
    ...tirerCartes(11),
    message: { code: code.MUET },
};

function reducer(state = initialState, action) {
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

export default reducer;
