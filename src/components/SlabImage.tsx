import React from 'react';
import { Slab } from '@/types/index';


const SlabImage = ({ slab }: { slab: Slab }) => {
    const aceLabel = !!slab.aceLabelURL;

    return (
        <div className={`col-md-3`}>
            {aceLabel ? <AceLabelImage slab={slab} /> : <StandardImage slab={slab} />}
        </div>
    );
}

const AceLabelImage = ({ slab }: { slab: Slab }): React.JSX.Element => {
    return (
        <>
            {/* Ace label Desktop */}
            <img
                src={slab.aceLabelURL || ''}
                className="img-fluid rounded mt-3 me-3 ms-3 d-none d-md-block"
                alt="Ace label image"
            />
            {/* Slab image Desktop */}
            <img
                src={slab.imageURL}
                className="img-fluid rounded mt-1 mb-3 me-3 ms-3 d-none d-md-block"
                style={{maxHeight: 300}}
                alt="Card image"
            />
            {/* Ace label Mobile */}
            <img
                src={slab.aceLabelURL || ''}
                className="img-fluid rounded m-3 mb-1 mx-auto d-block d-md-none"
                style={{maxWidth: 144}}
                alt="Ace label image"
            />
            {/* Slab image Mobile */}
            <img
                src={slab.imageURL}
                className="img-fluid rounded m-3 mt-1 mx-auto d-block d-md-none"
                style={{maxHeight: 200}}
                alt="Card image"
            />

        </>

    );
}

const StandardImage = ({ slab }: { slab: Slab }): React.JSX.Element => {
    return (
        <>
            <img
                src={slab.imageURL}
                className="img-fluid rounded m-3 mx-auto d-block d-md-none"
                style={{maxHeight: 200}}
                alt="Card image"
            />
            <img
                src={slab.imageURL}
                className="img-fluid rounded m-3 d-none d-md-block"
                style={{maxHeight: 300}}
                alt="Card image"
            />
        </>
    );
}


export default SlabImage;
