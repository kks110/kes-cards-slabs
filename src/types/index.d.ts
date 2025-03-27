
export type Slab = {
    owner: "K" | "E" | "KES",
    personalCollection: boolean,
    cardName: string,
    cardNumber: string,
    setName: string,
    tcg: "Pokemon" | "Lorcana"
    language: "Jp" | "Eng" | "Kor" | "Indo",
    gradingCompany: "Ace" | "PSA" | "SGC" | "CGC" | "BGS"
    grade: number,
    certNumber: number,
    slab_case: string | null;
    price: number | null,
    sold: boolean,
    soldValue: number | null,
    postage_and_fees: number | null,
    dateSold: string | null,
    notes: string | null,
    imageURL: string,
    aceLabelURL: string | null,
    listingURL: string | null,
};

export type ApiResponse = {
    id: number;
    owner: string;
    personal_collection: number; // Typically 0 or 1, representing a boolean in API responses
    card_name: string;
    card_number: string;
    set_name: string;
    tcg: string;
    language: string;
    grading_company: string;
    grade: number;
    cert_number: string; // This is a string in the JSON, but you may want to validate or convert it to a number
    slab_case: string | null;
    price: number | null;
    sold: number; // Typically 0 or 1, representing a boolean in API responses
    sold_value: number | null;
    postage_and_fees: number | null,
    date_sold: string | null; // Assuming a date string, e.g., "2024-01-01"
    notes: string; // Empty strings are still valid strings
    image_url: string;
    ace_label_url: string | null;
    listing_url: string | null;
};

export type PokemonData = {
    name: string;
    number_1_votes: number;
    top_6_votes: number;
    average: number;
    generation: number;
    extra: string;
    id?: number;
    image_id?: number;
    number_1_vote_position: number;
    top_6_vote_position: number;
    average_vote_position: number;
}
