import shuffle from "./shuffle.js";

export function melangerCartes(cartesOrdonnees) {
    let cartesMelangees = shuffle(cartesOrdonnees);
    while (
        cartesMelangees.reduce(
            (paire, v, i) => v === cartesOrdonnees[i] || paire,
            false
        )
    ) {
        cartesMelangees = shuffle(cartesOrdonnees);
    }
    return cartesMelangees;
}
export function tirerCartes(plage) {
    const cartes = {
        ordonnees: Array.from({ length: 10 }, (_, i) => plage + i),
        melangees: [],
    };

    return {
        cartesOrdonnees: cartes.ordonnees,
        cartesMelangees: melangerCartes(cartes.ordonnees),
    };
}
