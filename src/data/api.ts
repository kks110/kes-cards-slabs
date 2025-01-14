import {ApiResponse, Slab} from "@/types";

export async function fetchData(): Promise<ApiResponse[]> {
    const response = await fetch('/api/data');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data: ApiResponse[] = await response.json();
    return data;
}

export function mapApiResponseToSlab(apiResponse: ApiResponse): Slab {
    if (!apiResponse) throw new Error("Invalid API response");

    const mappedSlab: Slab = {
        owner: validateOwner(apiResponse.owner),
        forSale: apiResponse.for_sale === 1,
        cardName: apiResponse.card_name,
        cardNumber: apiResponse.card_number,
        setName: apiResponse.set_name,
        tcg: validateTcg(apiResponse.tcg),
        language: validateLanguage(apiResponse.language),
        slab_case: apiResponse.slab_case || null,
        gradingCompany: validateGradingCompany(apiResponse.grading_company),
        grade: apiResponse.grade,
        certNumber: Number(apiResponse.cert_number),
        price: apiResponse.price,
        sold: apiResponse.sold === 1,
        soldValue: apiResponse.sold_value,
        dateSold: apiResponse.date_sold,
        notes: apiResponse.notes || null,
        imageURL: apiResponse.image_url,
        aceLabelURL: apiResponse.ace_label_url,
        listingURL: apiResponse.listing_url,
    };

    return mappedSlab;
}

function validateOwner(owner: string): "K" | "E" | "KES" {
    const validOwners = ["K", "E", "KES"];
    if (!validOwners.includes(owner)) {
        throw new Error(`Invalid owner: ${owner}`);
    }
    return owner as "K" | "E" | "KES";
}

function validateTcg(tcg: string): "Pokemon" | "Lorcana" {
    const validTcgs = ["Pokemon", "Lorcana"];
    if (!validTcgs.includes(tcg)) {
        throw new Error(`Invalid tcg: ${tcg}`);
    }
    return tcg as "Pokemon" | "Lorcana";
}

function validateLanguage(language: string): "Jp" | "Eng" | "Kor" {
    const validLanguages = ["Jp", "Eng", "Kor"];
    if (!validLanguages.includes(language)) {
        throw new Error(`Invalid language: ${language}`);
    }
    return language as "Jp" | "Eng" | "Kor";
}

function validateGradingCompany(company: string): "Ace" | "PSA" | "SGC" | "CGC" | "BGS" {
    const validCompanies = ["Ace", "PSA", "SGC", "CGC", "BGS"];
    if (!validCompanies.includes(company)) {
        throw new Error(`Invalid grading company: ${company}`);
    }
    return company as "Ace" | "PSA" | "SGC" | "CGC" | "BGS";
}
