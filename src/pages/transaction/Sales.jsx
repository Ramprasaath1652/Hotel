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

                    <div
                        className="d-flex p-1 align-items-stretch border"
                        style={{ background: "#f8f9fa", width: "100%", minHeight: "95px" }}
                    >

                        {/* LEFT SECTION */}
                        <div className="d-flex flex-column" style={{ width: "380px" }}>

                            {/* DATE */}
                            <div className="d-flex mb-2 align-items-center">
                                <label
                                    className="fw-bold"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="form-control form-control-sm ms-2"
                                    style={{ height: "26px", fontSize: "12px" }}
                                />
                            </div>

                            {/* TYPE */}
                            <div className="d-flex mb-2 align-items-center">
                                <label
                                    className="fw-bold"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    Type
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm ms-2"
                                    style={{ height: "26px", fontSize: "12px" }}
                                />
                            </div>

                            {/* INV NO */}
                            <div className="d-flex mb-2 align-items-center">
                                <label
                                    className="fw-bold"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    Inv.No
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm ms-2"
                                    style={{ height: "26px", fontSize: "12px" }}
                                />
                            </div>

                        </div>

                        {/* VERTICAL DIVIDER */}
                        <div className="d-flex align-items-stretch px-2">
                            <div style={{ borderLeft: "1px solid #999", width: "1px" }}></div>
                        </div>


                        {/* MIDDLE SECTION */}
                        <div className="d-flex flex-column" style={{ width: "550px" }}>

                            {/* LEDGER */}
                            <div className="d-flex mb-2 align-items-center">
                                <label
                                    className="fw-bold"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    Ledger
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm ms-2"
                                    style={{ height: "26px", fontSize: "12px" }}
                                />
                            </div>

                            {/* NAME */}
                            <div className="d-flex mb-2 align-items-center">
                                <label
                                    className="fw-bold"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm ms-2"
                                    style={{ height: "26px", fontSize: "12px" }}
                                />
                            </div>

                            {/* PLACE */}
                            <div className="d-flex mb-2 align-items-center">
                                <label
                                    className="fw-bold"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    Place
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm ms-2"
                                    style={{ height: "26px", fontSize: "12px" }}
                                />
                            </div>

                        </div>

                         {/* VERTICAL DIVIDER */}
                        <div className="d-flex align-items-stretch px-2">
                            <div style={{ borderLeft: "1px solid #999", width: "1px" }}></div>
                        </div>

                        {/* RIGHT SIDE EMPTY AREA */}
                        <div style={{ flexGrow: 1 }}></div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Sales;