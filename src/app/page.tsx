"use client";
import React, {useEffect, useState} from "react";
import SlabDisplay from "@/components/SlabDisplay";
import {ApiResponse, Slab} from "@/types";
import {fetchData, mapApiResponseToSlab} from "@/data/api";

export default function Home() {
    const [slabs, setSlabs] = useState<Slab[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [gradeSearchQuery, setGradeSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedFranchise, setSelectedFranchise] = useState("");
    const [selectedGradingCompany, setSelectedGradingCompany] = useState("");
    const [selectSold, setSelectSold] = useState(false);
    const [selectPersonCollection, setSelectPersonCollection] = useState(false);
    const [selectOnEbay, setSelectOnEbay] = useState(false);
    const [maxPrice, setMaxPrice] = useState(100000000);

    const filteredSlabs = slabs.filter(slab => {
        const query = searchQuery.toLowerCase();
        const matchesSearchQuery = (
            slab.cardName.toLowerCase().includes(query) ||
            slab.cardNumber.toLowerCase().includes(query) ||
            slab.setName.toLowerCase().includes(query) ||
            slab.certNumber.toString().includes(query) ||
            slab.grade.toString().includes(query)
        );
        const matchesGradeQuery = slab.grade.toString().includes(gradeSearchQuery);
        const matchesLanguage = selectedLanguage ? slab.language === selectedLanguage : true;
        const matchesFranchise = selectedFranchise ? slab.tcg === selectedFranchise : true;
        const matchesGradingCompany = selectedGradingCompany ? slab.gradingCompany === selectedGradingCompany : true;
        const matchesSold = selectSold === slab.sold;
        const matchesPersonalCollection = selectPersonCollection === slab.personalCollection;
        const matchesOnEbay = selectOnEbay ? slab.listingURL !== null : true;
        const matchesMaxPrice = slab.price ? slab.price <= maxPrice : true;
        return matchesGradeQuery &&
            matchesSearchQuery &&
            matchesLanguage &&
            matchesFranchise &&
            matchesGradingCompany &&
            matchesSold &&
            matchesPersonalCollection &&
            matchesOnEbay &&
            matchesMaxPrice;
    });

    useEffect(() => {
        fetchData().then(data  => {
            const slabs = data.map( (slab: ApiResponse) => mapApiResponseToSlab(slab));
            const sortedSlabs = slabs.sort((b, a) => (a.price || 0) - (b.price || 0)); // Sort by price
            setSlabs(sortedSlabs);
            setLoading(false);
        });
    }, []);

    const handleSortByPriceHigh = () => {
        const sortedSlabs = [...slabs].sort((b, a) => (a.price || 0) - (b.price || 0));
        setSlabs(sortedSlabs);
    };

    const handleSortByPriceLow = () => {
        const sortedSlabs = [...slabs].sort((a, b) => (a.price || 0) - (b.price || 0));
        setSlabs(sortedSlabs);
    };


    return (
        <main>
            <div className="container">
                <div className="row mt-5 mb-3">
                  <h1>KES Cards Slabs</h1>
                </div>
                <div className="row align-items-center">
                    <div className="col-sm-8 my-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search slabs"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-2  my-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Max Price"
                            onChange={e => {
                                if (parseInt(e.target.value) === 0 || Number.isNaN(parseInt(e.target.value))) {
                                    setMaxPrice(100000000)
                                } else {
                                    setMaxPrice(parseInt(e.target.value))
                                }
                            }}
                        />
                    </div>
                    <div className="col-sm-2 my-1">
                        <button className="btn btn-light" onClick={handleSortByPriceHigh}>
                            Price ⬆️
                        </button>
                        <button className="btn btn-light mx-1" onClick={handleSortByPriceLow}>
                            Price ⬇️
                        </button>
                    </div>
                    <div className="col-sm-3 my-1">
                        <select
                            className="form-select"
                            value={selectedLanguage}
                            onChange={e => setSelectedLanguage(e.target.value)}
                        >
                            <option value="">All Languages</option>
                            <option value="Jp">Japanese</option>
                            <option value="Eng">English</option>
                            <option value="Kor">Korean</option>
                        </select>
                    </div>
                    <div className="col-sm-3 my-1">
                        <select
                            className="form-select"
                            value={selectedFranchise}
                            onChange={e => setSelectedFranchise(e.target.value)}
                        >
                            <option value="">All Franchises</option>
                            <option value="Pokemon">Pokemon</option>
                            <option value="Lorcana">Lorcana</option>
                        </select>
                    </div>
                    <div className="col-sm-3 my-1">
                        <select
                            className="form-select"
                            value={selectedGradingCompany}
                            onChange={e => setSelectedGradingCompany(e.target.value)}
                        >
                            <option value="">All Grading Companies</option>
                            <option value="Ace">Ace</option>
                            <option value="PSA">PSA</option>
                            <option value="SGC">SGC</option>
                            <option value="CGC">CGC</option>
                            <option value="BGS">BGS</option>
                        </select>
                    </div>
                    <div className="col-sm-3 my-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Grades"
                            value={gradeSearchQuery}
                            onChange={e => setGradeSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="d-flex">
                        <div className="form-check me-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectSold}
                                onChange={e => setSelectSold(e.target.checked)}
                            />
                            <label className="form-check-label">
                                Sold
                            </label>
                        </div>
                        <div className="form-check me-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectPersonCollection}
                                onChange={e => setSelectPersonCollection(e.target.checked)}
                            />
                            <label className="form-check-label">
                                Personal Collection
                            </label>
                        </div>
                        <div className="form-check me-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectOnEbay}
                                onChange={e => setSelectOnEbay(e.target.checked)}
                            />
                            <label className="form-check-label">
                                On Ebay
                            </label>
                        </div>
                    </div>
                </div>
                {loading && (
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <h1 className="m-5">Loading...</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <div className="spinner-border text-primary m-5"
                                    style={{width: 100, height: 100, borderWidth: 10}}
                                    role="status"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="row">
                    {filteredSlabs.map((slab, index) => (
                        <div className="col-md-6 mb-3" key={index}>
                            < SlabDisplay key={index} slab={slab}/>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

