import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Quot = () => {
    return (
        <div className='container-fluid mt-2'>
            <div
                className='card shadow-lg mx-auto'
                style={{
                    border: '2px solid #6a1b9a',
                    maxWidth: '95%'
                }}
            >

                {/* Header */}
                <div
                    className='card-header '
                    style={{
                        backgroundColor: '#white',
                        padding: '20px',
                        color: '#6a1b9a'
                    }}
                >
                    <h4 className='mb-0'>Quotation</h4>
                </div>

                {/* Body */}
                <div
                    className='card-body'
                    style={{
                        height: 'calc(100vh - 200px)',
                        overflow: 'auto'
                    }}
                >
                    <div className="d-flex" style={{ width: "100%" }}>

                        {/* LEFT MAIN CARD — unchanged */}
                        <div
                            className="card shadow-sm"
                            style={{
                                border: '1px solid #6a1b9a',
                                borderRadius: '5px',
                                padding: '15px',
                                maxWidth: '70%',
                                marginRight: 'auto',
                                marginBottom: '10px',
                                backgroundColor: '#f8f9fa',
                                minHeight: '400px',
                                flex: "0 0 70%"  // ⬅️ required
                            }}
                        >
                            {/* Row 1 */}
                            <div className="row g-3 align-items-center">

                                {/* Q.No */}
                                <div className="col-12 col-md-6 col-lg-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <label className="fw-bold mb-0" style={{ whiteSpace: 'nowrap' }}>
                                            Q.No
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                        />
                                    </div>
                                </div>

                                {/* R.No */}
                                <div className="col-12 col-md-6 col-lg-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <label className="fw-bold mb-0" style={{ whiteSpace: 'nowrap' }}>
                                            R.No
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                        />
                                    </div>
                                </div>

                                {/* Project */}
                                <div className="col-12 col-md-6 col-lg-4  ">
                                    <div className="d-flex align-items-center gap-2">
                                        <label className="form-label fw-bold" style={{ whiteSpace: 'nowrap' }}>Project</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="🔎 Search Project..."
                                        />
                                    </div>
                                </div>

                                {/* Ledger */}
                                <div className="col-12 col-md-6 col-lg-4  ">
                                    <div className="d-flex align-items-center gap-2">
                                        <label className="form-label fw-bold" style={{ whiteSpace: 'nowrap' }}>Ledger</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="🔎 Search Ledger..."
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Row 2 */}
                            <div className='row align-items-center g-1 mt-1'>

                                <div className="col-12 col-md-6 col-lg-3 ">
                                    <div className="d-flex align-items-center gap-2">
                                        <label className="form-label fw-bold" style={{ whiteSpace: 'nowrap' }}>Q.Date</label>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                        />
                                    </div>
                                </div>


                                <div className="col-12 col-md-6 col-lg-9  ">
                                    <div className="d-flex align-items-center gap-2 ">
                                        <label className="form-label fw-bold" style={{ whiteSpace: 'nowrap' }}>Subject</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="🔎 Search Subject..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className='mt-1 mb-1' />
                            {/* 10 Bottom Input Boxes */}
                            <div className='d-flex mt-0'>
                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>S.No</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                        
                                        disabled
                                    />
                                </div>


                                <div
                                    className="d-flex flex-column align-items-start"
                                    style={{ width: '200px', position: 'relative' }}
                                >
                                    <label className="form-label mb-1 me-2 fw-bold">
                                        product
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      
                                    />



                                   
                                </div>

                               


                                <div
                                    className="d-flex flex-column align-items-start"
                                    style={{ width: '180px', position: 'relative' }}
                                >
                                    <label className="form-label mb-1 me-2 fw-bold">
                                        Brand
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        autoComplete="off"
                                        placeholder="🔎 Search Brand..."
                                    />


                                  
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Qty</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                       
                                    />
                                </div>


                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Rate</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                       
                                    />
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Taxable</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                       
                                        disabled
                                    />
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Vat%</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Vat Amt</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                       
                                        disabled
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Amount</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                        disabled
                                    />

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quot