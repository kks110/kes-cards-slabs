import React from 'react';
import Image from 'next/image';
import { Slab } from '@/types/index';
import JapaneseFlag from "@/images/jp_flag.svg";
import EnglishFlag from "@/images/eng_flag.svg";
import KoreanFlag from "@/images/kor_flag.svg";
import AceLogo from "@/images/ace_grading_logo.svg";
import CgcLogo from "@/images/cgc_logo.svg";
import PsaLogo from "@/images/psa_logo.svg";
import SgcLogo from "@/images/sgc_logo.svg";
import BgsLogo from "@/images/bgs_logo.svg";
import Ebay_logo from "@/images/ebay.svg";
import styles from "@/styles/HideOnMobile.module.css";
import SlabImage from "@/components/SlabImage";


const SlabDisplay = ({ slab }: { slab: Slab }) => {
    if (slab.listingURL) {
        console.log("listing: ", slab.listingURL);
    }

    return (
        <div className={`card mb-3 ${slab.sold || !slab.forSale ? "border-danger" : "border-success" }`}>
            <div className="row g-0">
                < SlabImage slab={slab} />
                <div className="col-md-9">
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className={"h3"}>
                                            {slab.cardName} {slab.sold ? "(SOLD)" : ""}
                                        </p>
                                        <div className="ms-auto mb-3">
                                            {FlagSelector(slab.language)}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div style={{fontSize: "1.2rem"}}>
                                            {slab.gradingCompany + " " + slab.grade}
                                        </div>
                                        <div className="ms-auto"
                                             style={{"paddingLeft": slab.gradingCompany === "Ace" ? "24px" : ""}}>
                                            {GradingCompanyLogo(slab.gradingCompany)}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-8"><strong>{SlabPrice(slab)}</strong></div>
                                    <div className="col-4 text-end">{slab.dateSold}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-8">{slab.setName}</div>
                                    <div className="col-4 text-end">{slab.cardNumber}</div>
                                </div>
                            </li>
                            <li className="list-group-item">{CertVerificationLink(slab.certNumber, slab.gradingCompany)}</li>
                            {slab.listingURL && (
                                <li className="list-group-item">
                                    <a href={slab.listingURL} target="_blank" rel="noreferrer">
                                        <Image
                                            src={Ebay_logo}
                                            alt="ebay_logo"
                                            className="rounded p-1"
                                            style={{maxWidth: 70, height: "auto"}}
                                        />
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SlabPrice = (slab: Slab) => {
    if (slab.sold) {
        return slab.soldValue ? `Sold for: £${slab.soldValue.toFixed(2)}` : slab.notes;
    }
    return slab.price ? `£${slab.price.toFixed(2)}` : "Price Check";
}

const FlagSelector = (set: string) => {
    let image = EnglishFlag;
    switch (set) {
        case "Jp":
            image = JapaneseFlag
            break;
        case "Eng":
            image = EnglishFlag
            break;
        case "Kor":
            image = KoreanFlag
    }

    return <Image
        src={image}
        alt="Flag"
        className="rounded row float-end border border-dark"
        style={{maxWidth: 40, height: "auto"}}
    />
}

const GradingCompanyLogo = (gradingCompany: string) => {
    let image = AceLogo;
    let style = { maxWidth: 60, maxHeight: 30, paddingLeft: "0" };

    switch (gradingCompany) {
        case "Ace":
            image = AceLogo
            style = { ...style, paddingLeft: "24px" };
            break;
        case "PSA":
            image = PsaLogo
            break;
        case "SGC":
            image = SgcLogo
            break;
        case "CGC":
            image = CgcLogo
            break;
        case "BGS":
            image = BgsLogo
            break;
    }

    return <Image
        src={image}
        alt="Grading Company Logo"
        className="rounded row"
        style={style}
    />
}

const CertVerificationLink = (certNumber: number, gradingCompany: string) => {
    let link = "";
    switch (gradingCompany) {
        case "Ace":
            link = `https://acegrading.com/cert/${certNumber}`
            break;
        case "PSA":
            link = `https://www.psacard.com/cert/${certNumber}/psa`
            break;
        case "SGC":
            link = `https://gosgc.com/cert-code-lookup`
            break;
        case "CGC":
            link = `https://www.cgccards.com/certlookup/${certNumber}`
            break;
        case "BGS":
            link = `https://www.beckett.com/grading/card-lookup?item_id=${certNumber}&item_type=BGS`
            break;
    }

    return <a href={link} target="_blank" rel="noreferrer">{certNumber}</a>
}

export default SlabDisplay;
