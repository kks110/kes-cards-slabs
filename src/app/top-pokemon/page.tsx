"use client";
import React from "react";
import { topPokemonData } from "@/data/topPokemonData";
import {PokemonData} from "@/types";

export default function TopPokemon() {
    return (
        <main>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Pokedex number</th>
                            <th>Name</th>
                            <th>Votes</th>
                            <th>Top 6 Votes</th>
                            <th>Average</th>
                            <th>Generation</th>
                            <th>Extra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topPokemonData.map((pokemon: PokemonData, index: number) => {
                            if (!pokemon.id && !pokemon.image_id) {
                                console.log(pokemon.name);
                            }
                            return (
                                <tr key={pokemon.id ? pokemon.id : pokemon.image_id}>
                                    <td><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id ? pokemon.id : pokemon.image_id}.png`} alt={pokemon.name} /></td>
                                    <td>{pokemon.id}</td>
                                    <td>{pokemon.name}</td>
                                    <td>{pokemon.votes}</td>
                                    <td>{pokemon.top_6_votes}</td>
                                    <td>{pokemon.average}</td>
                                    <td>{pokemon.generation}</td>
                                    <td>{pokemon.extra}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

