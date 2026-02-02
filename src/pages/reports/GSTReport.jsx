import React, { useEffect, useState, useRef, forwardRef } from 'react';
import axiosInstance from '../../api/axiosInstance';
import './GSTReport.css';
import { useSearchParams } from 'react-router-dom';



const GSTReport = forwardRef((props, ref) => {
    const { gstReportData = [], qId } = props;
    const [reportData, setReportData] = useState([]);

    const [searchParams] = useSearchParams();
    const hasPrintedRef = useRef(false);

    const gapi = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const mode = new URLSearchParams(window.location.search).get('mode');
        if (mode === 'print') {
            generatePDF();
        }
    }, []);

    useEffect(() => {
        loadReport()
    }, []);

    useEffect(() => {
        if (
            searchParams.get('print') === 'true' &&
            reportData.length > 0 &&
            !hasPrintedRef.current
        ) {
            hasPrintedRef.current = true; // 🔒 lock
            previewPDF();
        }
    }, [searchParams, reportData]);




    useEffect(() => {
        window.focus();
    }, []);

    useEffect(() => {
        const handleKeyDown = () => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                window.print()
            }
            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [])

    useEffect(() => {
        const afterPrint = () => {
            if (printInitiatedRef.current) {
                window.close()
            }
        };
        window.addEventListener('afterprint', afterPrint);
        return () => {
            window.removeEventListener('afterprint', afterPrint)
        }
    }, [])



    const loadReport = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/quo/bill/5`)

            console.log("API data:", res.data.Data);
            setReportData(res.data.Data)
            console.log(reportData)
        } catch (err) {
            console.error(err)
        }
    }
    const summary = gstReportData.length > 0 ? gstReportData[0] : {};


    return (
        <div id="gst-report" ref={ref}>

            <div className='page-a4'>

                {/* HEADER IMAGE */}
                <div className="invoice-header">
                    <img src="/Header.png" alt="Invoice Header" />
                </div>
                {/* BODY */}
                <div className='invoice-body'>
                    <h2 className='invoice-title'>Tax Invoice</h2>
                    <div className="header-grid">
                        {/* LEFT EMPTY / LOGO SPACE */}
                        <div></div>

                        {/* RIGHT META */}
                        <div className="invoice-meta">
                            <div><b>Date</b> : 13-Oct-25</div>
                            <div><b>Quote#</b> : ABN/13102025/1156</div>
                            <div><b>INV#</b> : ABN/INV/13102025/1156</div>
                            <div><b>TRN</b> : 104028963700003</div>
                        </div>

                        {/* FROM */}
                        <div className="from-box">
                            <p className="title">From</p>
                            <p>Alphabit Networks Trading LLC</p>
                            <p>Office #85, Unibiz Business Center</p>
                            <p>Business Bay</p>
                            <p>P.O Box # 32846, Dubai, UAE</p>
                        </div>

                        {/* TO */}
                        <div className="to-box">
                            <p className="title">To</p>
                            <p>Mr. Kasi</p>
                            <p>Shams Al Hayat Goods</p>
                            <p>Dubai</p>
                            <p>VAT# 100586415000003</p>
                        </div>
                    </div>


                    <div className='m-3 fw-bold' style={{ color: '#6a1b9a' }}>
                        <span>Subject:-  </span>
                        <span>Quote for the Supply of CCTV & LAN Cable, Al Ras, Dubai</span>
                    </div>

                    <table className="inv-table">
                        <thead>
                            <tr>
                                <th>S. No</th>
                                <th>Description</th>
                                <th>Unit</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reportData.map((item, index) => (
                                <tr key={index}>
                                    <td className="c">{index + 1}</td>
                                    <td>{item.ProductName}</td>
                                    <td className="c">{item.UnitType}</td>
                                    <td className="c">{item.Qty}</td>
                                    <td className="r">{item.Rate}</td>
                                    <td className="r">{item.NetAmt}</td>
                                </tr>
                            ))}


                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="r bold">Total</td>
                                <td></td>
                                <td className="r bold">{summary.TotTaxableAmt}</td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="r bold">VAT - 5%</td>
                                <td></td>
                                <td className="r bold">{summary.TotVatamt}</td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="r gt-label">Grand Total</td>
                                <td></td>
                                <td className="r gt-value">{summary.NetAmount}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='m-3 fw-bold mt-4' >
                        <span style={{ color: '#6a1b9a' }}>Amount in Words (AED): </span>
                        <span className='fw-bold'>One Thousand Two Hundred Sixty-Five Dirhams and Twenty-Five Fils Only</span>
                    </div>

                    <div className='m-3'>
                        <div className='terms-title'>Terms and Conditions</div>
                        <div className="terms-row">
                            <div className="terms-label">Payment</div>
                            <div className="terms-value">100% after completion</div>
                        </div>

                        <div className="terms-row">
                            <div className="terms-label">Delivery</div>
                            <div className="terms-value">2 - 5 Days from the confirmation of order</div>
                        </div>

                        <div className="terms-row">
                            <div className="terms-label">Quotation Validity</div>
                            <div className="terms-value">10 Days</div>
                        </div>
                    </div>

                    <div className='m-3'>
                        <div className='terms-title'>Payment Details</div>
                        <div className="terms-row">
                            <div className="terms-label">Account Name:</div>
                            <div className="terms-value">Alphabit Networks Trading LLC</div>
                        </div>

                        <div className="terms-row">
                            <div className="terms-label">Bank Name:</div>
                            <div className="terms-value">RAK Bank</div>
                        </div>

                        <div className="terms-row">
                            <div className="terms-label">Branch:</div>
                            <div className="terms-value">Umm Hurrair</div>
                        </div>

                        <div className="terms-row">
                            <div className="terms-label">Account Number:</div>
                            <div className="terms-value">0332946354001</div>
                        </div>

                        <div className="terms-row">
                            <div className="terms-label">IBAN Number:</div>
                            <div className="terms-value">AE320400000332946354001</div>
                        </div>
                    </div>

                    {/* Footer IMAGE */}
                    <div className="invoice-header footer">
                        <img src="/Footer_2024.jpeg" alt="Invoice Header" />
                    </div>


                </div>

            </div>
        </div>
    )
});

export default GSTReport;