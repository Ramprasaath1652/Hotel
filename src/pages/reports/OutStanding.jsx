import React, { useState } from 'react';
import { useParams } from "react-router-dom";

const OutStanding = () => {
    const { qid } = useParams();
    const pdfUrl = `https://gtfin.in/abnapi/api/quo/billpdf/${qid}`;
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <iframe
                src={pdfUrl}
                title="Quotation PDF"
                width="100%"
                height="100%"
                style={{ border: "none" }}
            />
        </div>
    )
}

export default OutStanding;