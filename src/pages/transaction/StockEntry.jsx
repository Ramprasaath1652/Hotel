import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockEntry = () => {
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
                    <h4 className='mb-0'>Stock Entry</h4>
                </div>

                {/* Body */}
                <div
                    className='card-body'
                    style={{
                        height: 'calc(100vh - 200px)',
                        overflow: 'auto'
                    }}
                >
                    <div className="d-flex gap-3">
                        <div className="d-flex flex-column">
                            <label className="form-label">Date</label>
                            <input type="date" className="form-control form-control-sm" style={{ width: "220px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">Type</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "160px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">Batch Type</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "160px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">Product Name</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "450px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">Qty</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "160px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">P Rate</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "160px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">MRP</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "160px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">S Rate</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "160px" }} />
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}
export default StockEntry;