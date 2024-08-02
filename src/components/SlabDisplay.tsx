import React from 'react';
import Image from 'next/image';
import { Slab } from '@/types/index';
import JapaneseFlag from "@/images/jp_flag.svg";
import EnglishFlag from "@/images/eng_flag.svg";
import KoreanFlag from "@/images/kor_flag.svg";

const SlabDisplay = ({ slab }: { slab: Slab }) => {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><p className={"h3"}>{slab.pokemon}</p></div>
                                    <div className="col">
                                        {FlagSelector(slab.language)}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                <div className="col">{slab.setName}</div>
                                    <div className="col text-end">{slab.setNumber}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">{slab.gradingCompany}</div>
                                    <div className="col text-end">{slab.grade}</div>
                                </div>
                            </li>
                            <li className="list-group-item">{CertVerificationLink(slab.certNumber, slab.gradingCompany)}</li>
                            <li className="list-group-item">Cost: £{slab.cost}</li>
                            <li
                                className="list-group-item"
                                style={{color: slab.soldValue > 0.00 ? slab.soldValue > slab.cost ? "green" : "red" : "black"}}
                            >
                                Sold Value: £{slab.soldValue}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

const FlagSelector = (set: string) => {
    let image = EnglishFlag;
    switch (set) {
        case "japanese":
            image = JapaneseFlag
            break;
        case "english":
            image = EnglishFlag
            break;
        case "korean":
            image = KoreanFlag
    }

    return <Image
        src={image}
        alt="Flag"
        className="rounded row float-end  border border-dark"
        style={{maxWidth: 40, height: "auto"}}
    />
}

const CertVerificationLink = (certNumber: string, gradingCompany: string) => {
    let link = "";
    switch (gradingCompany) {
        case "Ace":
            link = `https://acegrading.com/cert/${certNumber}`
            break;
        case "PSA":
            link = `https://www.psacard.com/cert/${certNumber}`
            break;
        case "SGC":
            link = `https://gosgc.com/cert-code-lookup`
            break;
        case "CGC":
            link = `https://www.cgccards.com/certlookup/${certNumber}`
            break;
    }

    return <a href={link} target="_blank" rel="noreferrer">{certNumber}</a>
}

export default SlabDisplay;
