import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sales = () => {
    return (
        <div className='container-fluid mt-2'>
            <div
                className='card shadow-lg mx-auto'
                style={{
                    border: '2px solid #5d8aa8',
                    maxWidth: '95%'
                }}
            >

                {/* Header */}
                <div
                    className='card-header text-white'
                    style={{
                        backgroundColor: '#5d8aa8',
                        padding: '20px'
                    }}
                >
                    <h4 className='mb-0'>Sales</h4>
                </div>

                {/* Body */}
                <div
                    className='card-body'
                    style={{
                        height: 'calc(100vh - 200px)',
                        overflow: 'auto'
                    }}
                >

                    {/* Start of the main Header Form Section */}
                    <div className="row form-section mx-0">

                        {/* 3.1. Left-Side Input Block (Date, Type, Inv.No) - Takes up about 30% of the row */}
                        <div className="col-4">

                            {/* Row 1: Date */}
                            <div className="row mb-1 align-items-center">
                                <div className="col-5 text-end fw-bold" style={{ fontSize: '14px' }}>
                                    Date
                                </div>
                                <div className="col-7">
                                    <input type="date"
                                        defaultValue="07/11/2025"
                                        className="form-control form-control-sm p-1"
                                        style={{ height: '25px', fontSize: '12px' }}
                                    />
                                </div>
                            </div>

                            {/* Row 2: Type */}
                            <div className="row mb-1 align-items-center">
                                <div className="col-5 text-end fw-bold" style={{ fontSize: '14px' }}>
                                    Type
                                </div>
                                <div className="col-7">
                                    <input type="text"
                                        defaultValue="B2B"
                                        className="form-control form-control-sm p-1"
                                        style={{ height: '25px', fontSize: '12px' }}
                                    />
                                </div>
                            </div>

                            {/* Row 3: Inv.No */}
                            <div className="row mb-1 align-items-center">
                                <div className="col-5 text-end fw-bold" style={{ fontSize: '14px' }}>
                                    Inv.No
                                </div>
                                <div className="col-7">
                                    <input type="text"
                                        defaultValue="1"
                                        className="form-control form-control-sm p-1"
                                        style={{ height: '25px', fontSize: '12px' }}
                                    />
                                </div>
                            </div>

                        </div> {/* End of col-4 */}

                        {/* *** VERTICAL SEPARATOR *** */}
                        {/* We use a column with a right border, or a div with a left border, 
        and give it a minimal width to act as the line. */}
                        <div className="col-auto d-flex align-items-stretch p-0"> {/* col-auto takes minimum space */}
                            <div style={{ borderLeft: '1px solid #dee2e6', height: '100%', margin: '0 8px' }}></div>
                        </div>
                        {/* ************************ */}

                        <div className="col"> {/* This column takes the remaining space after the separator */}

                            {/* Row 1: Ledger */}
                            <div className="row mb-1 align-items-center">
                                <div className="col-2 text-end fw-bold" style={{ fontSize: '14px' }}>
                                    Ledger
                                </div>
                                <div className="col-10">
                                    <input type="text"
                                        className="form-control form-control-sm p-1"
                                        style={{ height: '25px', fontSize: '12px' }}
                                    />
                                </div>
                            </div>

                            {/* Row 2: Name */}
                            <div className="row mb-1 align-items-center">
                                <div className="col-2 text-end fw-bold" style={{ fontSize: '14px' }}>
                                    Name
                                </div>
                                <div className="col-10">
                                    <input type="text"
                                        className="form-control form-control-sm p-1"
                                        style={{ height: '25px', fontSize: '12px' }}
                                    />
                                </div>
                            </div>

                            {/* Row 3: GSTINNo, 0.00 box, and MRP box */}
                            <div className="row mb-1 align-items-center">

                                {/* GSTINNo Input (Label and Field) */}
                                <div className="col-6 d-flex">
                                    <div className="col-3 text-end fw-bold pe-2" style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
                                        GSTINNo
                                    </div>
                                    <div className="col-9">
                                        <input type="text"
                                            className="form-control form-control-sm p-1"
                                            style={{ height: '25px', fontSize: '12px' }}
                                        />
                                    </div>
                                </div>

                                {/* Display Box 1 (0.00) */}
                                <div className="col-3">
                                    <div className="text-center bg-white p-1 fw-bold text-danger"
                                        style={{ border: '2px solid #ccc', minHeight: '25px', fontSize: '16px' }}>
                                        0.00
                                    </div>
                                </div>

                                {/* Display Box 2 (MRP) */}
                                <div className="col-3">
                                    <div className="text-center bg-white p-1 fw-bold text-secondary"
                                        style={{ border: '2px solid #ccc', minHeight: '25px', fontSize: '16px' }}>
                                        MRP
                                    </div>
                                </div>

                            </div>

                            {/* Row 4: Place (This field is also visible below GSTIN in the original image) */}
                            <div className="row mb-1 align-items-center">
                                <div className="col-2 text-end fw-bold" style={{ fontSize: '14px' }}>
                                    Place
                                </div>
                                <div className="col-10">
                                    <input type="text"
                                        className="form-control form-control-sm p-1"
                                        style={{ height: '25px', fontSize: '12px' }}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    {/* End of the main Header Form Section */}

                </div>
            </div>
        </div>
    )
}

export default Sales;