
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
    price: number | null,
    sold: boolean,
    soldValue: number | null,
    dateSold: string | null,
    notes: string | null,
    imageURL: string,
    aceLabelURL: string | null,
};

export type ApiResponse = {
    id: number;
    owner: string;
    for_sale: number; // Typically 0 or 1, representing a boolean in API responses
    card_name: string;
    card_number: string;
    set_name: string;
    tcg: string;
    language: string;
    cost: number;
    grading_company: string;
    grade: number;
    cert_number: string; // This is a string in the JSON, but you may want to validate or convert it to a number
    price: number | null;
    sold: number; // Typically 0 or 1, representing a boolean in API responses
    sold_value: number | null;
    date_sold: string | null; // Assuming a date string, e.g., "2024-01-01"
    notes: string; // Empty strings are still valid strings
    image_url: string;
    ace_label_url: string | null;
};
