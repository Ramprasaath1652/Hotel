import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const SQuot = () => {
    return (
        <div className='container-fluid mt-2'>
            {/* Card */}
            <div className='card shadow-lg mx-auto'
                style={{
                    border: '2px solid #5d8aa8',
                    width: '95%'
                }}
            >
                {/* card - header */}
                <div
                    className='card-header text-white'
                    style={{
                        backgroundColor: '#5d8aa8',
                        padding: '20px'
                    }}
                >
                    <h4>SQuot</h4>
                </div>
                {/* card-body */}
                <div
                    className='card-body'
                    style={{
                        height: 'calc(100vh - 200px)'
                    }}
                >
                    {/* top row */}
                    <div className='d-flex align-items-center gap-3'>
                        <div style={{ flex: '0 0 100px' }}>
                            <div className='d-flex'>
                                <label className='form-label fw-bold  mb-2 me-2'>QNo</label>
                                <input
                                    type='number'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 200px' }}>
                            <div className='d-flex align-items-center'>
                                <label
                                    className='form-label fw-bold mb-2 me-2'>Q.Date</label>
                                <input
                                    type='date'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 700px' }}>
                            <div className='d-flex align-items-center '>
                                <label
                                    className='form-label fw-bold  mb-2 me-2' >Ledger</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>
                        <div style={{ flex: '0 0 700px' }}>
                            <div className='d-flex align-items-center'>
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Project</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>
                    </div>
                    <hr className='mt-1' />
                    {/* 12 bottom inputs */}
                    <div className='d-flex align-items-center gap-1 mb-0'>
                        <div style={{ flex: '0 0 100px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >S.No</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 320px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Product</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>


                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'>Unit</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 210px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Brand</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Qty</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Rate</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 110px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Mar%</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >SRate</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 '  >Taxable</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>

                        </div>

                        <div style={{ flex: '0 0 100px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Vat%</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div>

                                <label
                                    className="form-label fw-bold mb-2 "
                                    style={{
                                        maxWidth: "70px",
                                        whiteSpace: "normal",
                                        lineHeight: "1.1",

                                    }}
                                >
                                    VatAmt
                                </label>

                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    style={{
                                        flex: "1 1 auto",
                                        minWidth: 0
                                    }}
                                />

                            </div>
                        </div>


                        <div style={{ flex: '0 0 150px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 '>Amount</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                    </div>
                    {/* textarea */}
                    <div className='d-flex align-items-center gap-2 mt-1'>
                        <textarea
                            className='form-control form-control-sm mt-1'
                            rows={2}
                            style={{
                                width: '50%'
                            }}
                        />
                        <button className='btn btn-primary btn-sm'>
                            Add
                        </button>
                    </div>

                    {/* custom color line */}
                    <div
                        style={{
                            height: '2px',
                            backgroundColor: '#5d8aa8',
                            marginTop: '8px',
                            marginBottom: '8px'
                        }}
                    ></div>
                    {/* middle container for table row */}

                    <div
                        className="mt-2 px-2 px-md-3"
                        style={{
                            border: '2px solid #5d8aa8',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                            minHeight: '300px',
                            padding: '10px',
                            overflowX: "auto"   // prevents overflow issue
                        }}
                    ></div>

                    {/* Footer final amount display area */}
                    <div
                        className='mt-1 px-3 py-2 d-flex'
                        style={{
                            border: '2px solid #5d8aa8',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                            alignItems: 'stretch'
                        }}
                    >
                        {/* left section */}
                        <div
                            className='d-flex align-items-center pe-3'
                            style={{ borderRight: '2px solid #5d8aa8', minWidth: '140px' }}
                        >
                            <label
                                className='fw-bold me-2 mb-0 '
                                style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                            >
                                Item
                            </label>
                            <input
                                type='text'
                                className='form-control form-control-sm'
                                style={{ width: '80px', height: '28px' }}
                            />
                        </div>

                        {/* middle section 1 */}
                        <div
                            className='d-flex px-3 flex-column justify-content-center'
                            style={{ borderRight: '2px solid #5d8aa8', minWidth: '200px' }}
                        >
                            <div className='d-flex align-items-center mb-2'>
                                <label className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right', width: '90px' }}
                                >Total Amount</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{ width: '300px', height: '28px' }}

                                />
                            </div>

                            <div className='d-flex align-items-center '>
                                <label className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right',width: '90px' }}
                                >Vat Amount</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{ width: '300px', height: '28px' }}
                                />
                            </div>

                        </div>
                        {/* mid section-2 */}
                        <div
                            className='d-flex flex-column px-3 justify-content-center'
                            style={{ borderRight: ' 2px solid #5d8aa8', minWidth: '200px' }}
                        >
                            <div className='d-flex align-items-center mb-2'>
                                <label
                                    className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', textAlign: 'right', minWidth: '75px' }}
                                >
                                    Act Amt
                                </label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{
                                        width: '300px',
                                        height: '28px'
                                    }}
                                />
                            </div>

                            <div className='d-flex align-items-center mb-2'>
                                <label
                                    className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', textAlign: 'right', minWidth: '75px' }}
                                >
                                    Round Off
                                </label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{
                                        width: '300px',
                                        height: '28px'
                                    }}
                                />
                            </div>
                        </div>
                        {/* net amount display part */}

                    </div>

                    {/* terms & condition */}
                    <div className='d-flex flex-wrap gap-1'>
                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Term & Conditions</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Narration</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                            />
                        </div>
                    </div>
                    {/* buttons */}
                    <div
                        className="mt-3 d-flex justify-content-center flex-wrap"
                        style={{ gap: '8px' }}
                    >
                        <button className="btn btn-sm btn-primary">New</button>
                        <button className="btn btn-sm btn-secondary">Edit</button>
                        <button className="btn btn-sm btn-success" >Save</button>
                        <button className="btn btn-sm btn-danger">Find</button>
                        <button className="btn btn-sm btn-warning text-white">Print</button>
                        <button className="btn btn-sm btn-info text-white">Delete</button>
                        <button className="btn btn-sm btn-dark">Reset</button>
                        <button className="btn btn-sm btn-outline-primary">Close</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SQuot;