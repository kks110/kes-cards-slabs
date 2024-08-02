
import React from "react";
import { slabs } from "@/data/slabs";
import SlabDisplay from "@/components/SlabDisplay";

export default function Home() {
  return (
      <main>
          <div className="container">
                <div className="row mt-5 mb-3">
                    <h1>KES Cards Slabs</h1>
                </div>
                <div className="row">
                    {slabs.map((slab, index) => (
                        < SlabDisplay key={index} slab={slab} />
                    ))}
                </div>
          </div>
      </main>
  )
}

