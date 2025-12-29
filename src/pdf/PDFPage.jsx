import { useLocation } from 'react-router-dom';
import React from 'react';
import PDFViewer from './PDFViewer';

const PDFPage = () => {
    const location = useLocation();
    const pdfUrl = location.state?.pdfUrl;

    if (!pdfUrl) {
        return <h3>No PDF found</h3>;
    }

    return <PDFViewer pdfUrl={pdfUrl} />;
};

export default PDFPage;
