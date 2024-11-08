"use client";
import React, {useState} from "react";
import { slabs } from "@/data/slabs";
import SlabDisplay from "@/components/SlabDisplay";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedFranchise, setSelectedFranchise] = useState("");
    const [selectedGradingCompany, setSelectedGradingCompany] = useState("");
    const [selectSold, setSelectSold] = useState(false);
    const [selectForSale, setSelectForSale] = useState(true);

    const filteredSlabs = slabs.filter(slab => {
        const query = searchQuery.toLowerCase();
        const matchesSearchQuery = (
            slab.name.toLowerCase().includes(query) ||
            slab.cardNumber.toLowerCase().includes(query) ||
            slab.setName.toLowerCase().includes(query) ||
            slab.certNumber.toLowerCase().includes(query)
        );
        const matchesLanguage = selectedLanguage ? slab.language === selectedLanguage : true;
        const matchesFranchise = selectedFranchise ? slab.franchise === selectedFranchise : true;
        const matchesGradingCompany = selectedGradingCompany ? slab.gradingCompany === selectedGradingCompany : true;
        const matchesSold = selectSold ? slab.sold : true;
        const matchesForSale = selectForSale ? slab.forSale : true;
        return matchesSearchQuery && matchesLanguage && matchesFranchise && matchesGradingCompany && matchesSold && matchesForSale;
    });


    return (
      <main>
          <div className="container">
              <div className="row mt-5 mb-3">
                  <h1>KES Cards Slabs</h1>
              </div>
              <div className="row mb-3">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Search slabs"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                  />
              </div>
              <div className="row mb-3">
                  <select
                      className="form-select"
                      value={selectedLanguage}
                      onChange={e => setSelectedLanguage(e.target.value)}
                  >
                      <option value="">All Languages</option>
                      <option value="japanese">Japanese</option>
                      <option value="english">English</option>
                      <option value="korean">Korean</option>
                  </select>
              </div>
              <div className="row mb-3">
                  <select
                      className="form-select"
                      value={selectedFranchise}
                      onChange={e => setSelectedFranchise(e.target.value)}
                  >
                      <option value="">All Franchises</option>
                      <option value="pokemon">Pokemon</option>
                      <option value="lorcana">Lorcana</option>
                  </select>
              </div>
              <div className="row mb-3">
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
              <div className="row mb-3">
                  <div className="form-check">
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
                  <div className="form-check">
                      <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectForSale}
                          onChange={e => setSelectForSale(e.target.checked)}
                      />
                      <label className="form-check-label">
                          For Sale
                      </label>
                  </div>
              </div>
              <div className="row">
                  {filteredSlabs.map((slab, index) => (
                      < SlabDisplay key={index} slab={slab}/>
                  ))}
              </div>
          </div>
      </main>
    )
}

