import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Payment = () => {
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
                    <h4 className='mb-0'>Payment Voucher</h4>
                </div>

                {/* Body */}
                <div
                    className='card-body'
                    style={{
                        height: 'calc(100vh - 200px)',
                        overflow: 'auto'
                    }}
                >
                    <div className="row">

                        <div className="col-6 d-flex flex-column h-100 justify-content-between">

                            <div className="d-flex align-items-center">
                                <label style={{ width: "150px" }}>Payment No</label>
                                <input className="form-control form-control-sm" />
                            </div>

                            <div className="d-flex align-items-center">
                                <label style={{ width: "150px" }}>Date</label>
                                <input className="form-control form-control-sm" />
                            </div>

                            <div className="d-flex align-items-center">
                                <label style={{ width: "150px" }}>Type</label>
                                <input className="form-control form-control-sm" />
                            </div>

                            <div className="d-flex align-items-center">
                                <label style={{ width: "150px" }}>Amount</label>
                                <input className="form-control form-control-sm" />
                            </div>

                        </div>


                        {/* RIGHT SIDE — 5 Inputs */}
                        <div className="col-6 d-flex flex-column h-100 justify-content-between">

                            <div className="d-flex align-items-center">
                                <label style={{ width: "150px" }}>Ledger Name</label>
                                <input className="form-control form-control-sm" />
                            </div>

                            <div className="d-flex align-items-center">
                                <label style={{ width: "150px" }}>Name</label>
                                <input className="form-control form-control-sm" />
                            </div>

                            <div className="d-flex align-items-center">
                                <label style={{ width: "150px" }}>Place</label>
                                <input className="form-control form-control-sm" />
                            </div>

                            <div className="d-flex align-items-center">
                                <label style={{ width: "150px" }}>Paid Ledger</label>
                                <input className="form-control form-control-sm" />
                            </div>

                            <div className="d-flex align-items-center">
                                <label style={{ width: "150px" }}>Narration</label>
                                <input className="form-control form-control-sm" />
                            </div>

                        </div>


                    </div>


                </div>
            </div>
        </div>
    )
}

export default Payment;