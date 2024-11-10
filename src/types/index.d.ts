
export type Slab = {
    owner: "K" | "E" | "KES",
    forSale: boolean,
    cardName: string,
    cardNumber: string,
    setName: string,
    tcg: "Pokemon" | "Lorcana"
    language: "Jp" | "Eng" | "Kor",
    cost: number,
    gradingCompany: "Ace" | "PSA" | "SGC" | "CGC" | "BGS"
    grade: number,
    certNumber: number,
    priceCharting: number | null,
    psa: number | null,
    ebay: number | null,
    sold: boolean,
    soldValue: number | null,
    dateSold: string | null,
    notes: string | null,
    imageURL: string,
}

