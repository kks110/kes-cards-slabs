import React from 'react';
import Image from 'next/image';
import { Slab } from '@/types/index';
import JapaneseFlag from "@/images/jp_flag.svg";
import EnglishFlag from "@/images/eng_flag.svg";
import KoreanFlag from "@/images/kor_flag.svg";
import styles from "@/styles/HideOnMobile.module.css";

const SlabDisplay = ({ slab }: { slab: Slab }) => {
    return (
        <div className={`card mb-3 ${slab.sold || !slab.forSale ? "border-danger" : "border-success" }`}>
            <div className="row g-0">
                <div className={`col-md-4 ${styles.hideOnMobile}`}>
                    <img
                        src={slab.imageURL}
                        className="img-fluid rounded-start m-3"
                        style={{maxHeight: 300}}
                        alt="Card image"
                    />
                </div>
                <div className="col-md-8">
                <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-10">
                                        <p className={"h3"}>
                                            {slab.name} {slab.sold ? "(SOLD)" : ""}
                                        </p>
                                    </div>
                                    <div className="col-2">
                                        {FlagSelector(slab.language)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div
                                        className={"alert text-center" + (slab.grade === 10 ? " alert-success" : " alert-secondary")}
                                        style={{fontSize: "1.2rem"}}
                                    >
                                        {slab.gradingCompany} {slab.grade}
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">{slab.setName}</div>
                                    <div className="col text-end">{slab.cardNumber}</div>
                                </div>
                            </li>
                            <li className="list-group-item">{CertVerificationLink(slab.certNumber, slab.gradingCompany)}</li>
                            <li className="list-group-item">Cost: £{slab.cost.toFixed(2)}</li>
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
        className="rounded row float-end border border-dark"
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
