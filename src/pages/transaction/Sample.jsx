import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Address from '../reports/Address';

const Sample = () => {
    const reportRef = useRef(null);

    const handlePrint = async () => {
        if (!reportRef.current) {
            alert('Report not ready');
            return;
        }
        const canvas = await html2canvas(reportRef.current, {
            scale: 2,
            useCORS: true,
        })

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4')
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

        const pdfBlob = pdf.output('bloburl')
        window.open(pdfBlob, '_blank');
    }

    return (
        <div>
            <h1>pdf</h1>
            <button className='btn btn-primary btn-sm m-2' onClick={handlePrint} >print</button>
            <div
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    top: 0,
                    width: '210mm'
                }}
            >
                <Address ref={reportRef} />
            </div>
        </div>



    )
}

export default Sample;