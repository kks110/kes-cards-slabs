"use client";
import React, {useEffect, useState} from "react";
import { topPokemonData } from "@/data/topPokemonData";
import {PokemonData} from "@/types";

export default function TopPokemon() {
    const [sortedPokemon, setSortedPokemon] = useState<PokemonData[]>([]);
    const [selectedGeneration, setSelectedGeneration] = useState("");
    const [selectedExtraInfo, setSelectedExtraInfo] = useState("");
    const [searchQuery, setSearchQuery] = useState("");


    const filteredPokemon = sortedPokemon.filter(pokemon => {
        const query = searchQuery.toLowerCase();
        const matchesSearchQuery = (
            pokemon.name.toLowerCase().includes(query)
        );
        const matchesGenerationQuery = pokemon.generation.toString().includes(selectedGeneration);
        const matchesExtraInfoQuery = pokemon.extra.includes(selectedExtraInfo);
        return matchesGenerationQuery &&
            matchesExtraInfoQuery &&
            matchesSearchQuery;
    });

    const handleSortByNumberOneVotes = () => {
        const sortedPkmn = [...sortedPokemon].sort((a, b) => a.number_1_vote_position - b.number_1_vote_position);
        setSortedPokemon(sortedPkmn);
    };

    const handleSortByTopSixVotes = () => {
        const sortedPkmn = [...sortedPokemon].sort((a, b) => a.top_6_vote_position - b.top_6_vote_position);
        setSortedPokemon(sortedPkmn);
    };

    const handleSortByAverageVotes = () => {
        const sortedPkmn = [...sortedPokemon].sort((a, b) => a.average_vote_position - b.average_vote_position);
        setSortedPokemon(sortedPkmn);
    };

    useEffect(() => {
        const sortedByAverage = [...topPokemonData].sort((b, a) => a.average - b.average);
        setSortedPokemon(sortedByAverage);
    }, []);

    return (
        <main>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-sm-4 my-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search slabs"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-4 my-1">
                        <select
                            className="form-select"
                            value={selectedGeneration}
                            onChange={e => setSelectedGeneration(e.target.value)}
                        >
                            <option value="">Gen</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </div>
                    <div className="col-sm-4 my-1">
                        <select
                            className="form-select"
                            value={selectedExtraInfo}
                            onChange={e => setSelectedExtraInfo(e.target.value)}
                        >
                            <option value="">Extra</option>
                            <option value="starter">Starter</option>
                            <option value="legendary">Legendary</option>
                            <option value="eeveelution">Eeveelution</option>
                        </select>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-sm-4 my-1">
                        <button className="btn btn-light w-100 mx-1" onClick={handleSortByNumberOneVotes}>
                            Number 1 Votes
                        </button>
                    </div>
                    <div className="col-sm-4 my-1">
                        <button className="btn btn-light w-100 mx-1" onClick={handleSortByTopSixVotes}>
                            Top 6 Votes
                        </button>
                    </div>
                    <div className="col-sm-4 my-1">
                        <button className="btn btn-light w-100 mx-1" onClick={handleSortByAverageVotes}>
                            Average Votes
                        </button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Votes</th>
                            <th>Top 6 Votes</th>
                            <th>Rank (average)</th>
                            <th>Gen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPokemon.map((pokemon: PokemonData, index: number) => {
                            if (!pokemon.id && !pokemon.image_id) {
                                console.log(pokemon.name);
                            }
                            return (
                                <tr key={pokemon.id ? pokemon.id : pokemon.image_id}>
                                    <td>
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id ? pokemon.id : pokemon.image_id}.png`} alt={pokemon.name} />
                                    </td>
                                    <td>                                            <p className="text-center text-capitalize">{pokemon.name}</p>
                                        <p className="text-center text-muted">{pokemon.id}</p></td>
                                    <td>{pokemon.number_1_vote_position} ({pokemon.number_1_votes})</td>
                                    <td>{pokemon.top_6_vote_position} ({pokemon.top_6_votes})</td>
                                    <td>{pokemon.average_vote_position}</td>
                                    <td>{pokemon.generation}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

