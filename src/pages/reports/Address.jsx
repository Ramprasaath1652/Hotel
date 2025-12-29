import React from 'react';
import "./report.css";

const Address = () => {
    return (
        <div className='report-wrapper'>
            {/* A4 Page*/}
            <div className='a4-page'>
                <div className="header-top">
                    <span>GSTIN: 33ABBPS6347LIZC</span>
                    <span className="contact">
                        Ph: 04364-222836 | Cell: 82202 98615
                    </span>
                </div>
                <div className="header-title">
                    <p className="sub-title">வாடகை இறசிது</p>
                    <h1>வாசுகி மஹால்</h1>
                    <p className="address">நெ.22, புலியந்தெரு, மயிலாடுதுறை - 1.</p>
                </div>
                <hr />

                <div className="meta-row">
                    <div>ரசீது எண் : 502</div>
                    <div>ரசீது தேதி : 16-12-2025</div>
                </div>

                <div className="details-section">
                    <div className="detail-row">
                        <span className="detail-label">பெயர்</span>
                        <span className="detail-value">Mr. K. Ramalingam</span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">முகவரி</span>
                        <span className="detail-value">
                            14 C Alli Street, Basand Nagar, Mayiladuthurai
                        </span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">நிகழ்ச்சி</span>
                        <span className="detail-value">HALF DAY (Engagement)</span>
                    </div>

                </div>

                <div className="details-section">
                    <div className="detail-row two-col">

                        <div className="event-col">
                            <span className="detail-label">தமிழ் தேதி</span>
                            <span className="detail-value">	கார்த்திகை -29</span>
                        </div>

                        <div className="event-col">
                            <span className="detail-label">தேதி</span>
                            <span className="detail-value">
                                15-12-2025 01:30 AM - 15-12-2025 09:30 AM
                            </span>
                        </div>
                    </div>
                </div>

                <table className='item-table'>
                    <thead>
                        <tr className="table-head">
                            <th style={{ width: "40px" }}>S.No</th>
                            <th>Description</th>
                            <th style={{ width: "120px" }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="main-row">
                            <td className="sno">1</td>

                            <td className="desc">
                                Hall Rent

                                <div className="gst-labels">
                                    CGST (9%) <br />
                                    SGST (9%)
                                </div>
                            </td>

                            <td className="amount">
                                20,338.98

                                <div className="gst-amounts">
                                    1,830.51 <br />
                                    1,830.51
                                </div>
                            </td>
                        </tr>

                        <tr className="grand-total">
                            <td></td>
                            <td className="right-label">Grand Total</td>
                            <td className="right">24,000.00</td>
                        </tr>
                    </tbody>
                </table>
                <div className="detail-row" style={{ marginTop: '10px' }}>
                    <span className="detail-label">ரூபாய்</span>
                    <span className="detail-value">Twenty Four Thousand Rupees only</span>
                </div>

                <div className="detail-row" style={{ marginTop: '10px' }}>
                    <span >மட்டும் பெற்றுக்கொள்ளப்பட்டது</span>
                </div>


                <div className="details-section">
                    <div className="detail-row rate-row">
                        <span className='rate'>24,000.00</span>
                        <span className='note' >	(எந்தகாரணத்தைக் கொண்டும் பணம் திருப்பித் தரமாட்டாது)</span>
                    </div>

                    <div className="detail-row sign">
                        <span >பணம் செலுத்துபவர் கையெழுத்து</span>
                        <span >
                            உரிமையாளார்/நிர்வாகி
                        </span>
                    </div>

                </div>



            </div>
        </div>
    )
}

export default Address;