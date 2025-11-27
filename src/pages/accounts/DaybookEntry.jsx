import React from 'react';

const DaybookEntry = () => {
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
                    <h4 className='mb-0'>DayBookEntry</h4>
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
                            <input type="date" className="form-control form-control-sm" style={{ width: "230px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">Ledger</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "300px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">M.O.P</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "290px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">Narration</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "450px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">Debit</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "200px" }} />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label">Credit</label>
                            <input type="text" className="form-control form-control-sm" style={{ width: "200px" }} />
                        </div>

                       
                    </div>
                    <hr />

                </div>
            </div>
        </div>
    )
}

export default DaybookEntry;