
export type Slab = {
    name: string,
    cardNumber: string,
    setName: string,
    language: "japanese" | "english" | "korean",
    cost: number,
    gradingCompany: "Ace" | "PSA" | "SGC" | "CGC" | "BGS"
    certNumber: string,
    grade: number,
    soldValue: number,
    imageURL: string,
    sold: boolean,
    forSale: boolean,
    franchise: Franchise
}

export type Franchise = "pokemon" | "lorcana"