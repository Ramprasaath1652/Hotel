import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Quotation = () => {
    return (
        <div className='container-fluid mt-2'>
            <div className='card shadow-lg mx-auto'
                style={{ border: '2px solid #5d8aa8', maxWidth: '95%' }}
            >

                {/* Header */}
                <div className='card-header text-white'
                    style={{ backgroundColor: '#5d8aa8', padding: '20px' }}
                >
                    <h4 className='mb-0'>Quotation</h4>
                </div>

                {/* Body */}
                <div
                    className='card-body'
                    style={{ height: 'calc(100vh - 200px', overflow: 'auto' }}
                >

                    <div
                        className="card shadow-sm"
                        style={{
                            border: '1px solid #5d8aa8',
                            borderRadius: '5px',
                            padding: '15px',
                            maxWidth: '70%',
                            marginRight: 'auto',
                            marginBottom: '10px',
                            backgroundColor: '#f8f9fa',
                            minHeight: '400px',
                        }}
                    >
                       

                        {/* First Line: 3 inputs with labels on same line */}
                        <div className="d-flex mb-1 align-items-center gap-3">
                            {/* Small input */}
                            <div className="d-flex align-items-center">
                                <label className="me-2 mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                    Q.No
                                </label>
                                <input type="text" className="form-control form-control-sm" style={{ width: '80px' }} />
                            </div>

                            {/* Medium input */}
                            <div className="d-flex align-items-center flex-grow-1">
                                <label className="me-2 mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                    Project Name
                                </label>
                                <input type="text" className="form-control form-control-sm" />
                            </div>

                            {/* Medium input */}
                            <div className="d-flex align-items-center flex-grow-1">
                                <label className="me-2 mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                   Ledger
                                </label>
                                <input type="text" className="form-control form-control-sm" />
                            </div>
                        </div>

                        {/* Second Line: 2 inputs with labels on same line */}
                        <div className="d-flex mb-2 align-items-center gap-4">
                            {/* Small input */}
                            <div className="d-flex align-items-center">
                                <label className="me-2 mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                    Q.Date
                                </label>
                                <input type="date" className="form-control form-control-sm" style={{ width: '80px' }} />
                            </div>
                            
                            {/* Bigger input */}
                            <div className="d-flex align-items-center flex-grow-1">
                                <label className="me-2 mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                    Subject
                                </label>
                                <input type="text" className="form-control form-control-sm" />
                            </div>
                            <hr/>
                        </div>
                    </div>
                        



                </div>
            </div>
        </div>
    )
}

export default Quotation;