import { code } from "../components/Tool/parametres";
import { tirerCartes, melangerCartes } from "../utils/gererCartes";
import * as types from "../actions/types";

export const initialState = {
    ...tirerCartes(11),
    message: { code: code.MUET },
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.MAJ_PLAGE:
            return {
                ...state,
                ...tirerCartes(action.plage),
                message: { code: code.MUET },
            };
        case types.REJOUER:
            return {
                ...state,
                cartesMelangees: melangerCartes(state.cartesOrdonnees),
                message: { code: code.MUET },
            };
        case types.MAJ_MESSAGE:
            return { ...state, message: action.message };
        default:
            return state;
    }
}

export default reducer;
