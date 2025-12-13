import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Quot = () => {
    return (
        <div className='container-fluid mt-2'>
            {/* card */}
            <div
                className='card mx-auto shadow-lg'
                style={{
                    border: '2px solid #5d8aa8',
                    maxWidth: '95%'
                }}
            >
                {/* Header */}
                <div className='card-header text-white'
                    style={{
                        backgroundColor: '#5d8aa8',
                        padding: '20px'
                    }}
                >
                    <h4 className='mb-0'>Quot</h4>
                </div>
                {/* Body */}
                <div className='card-body mb-0'
                    style={{
                        height: 'calc(100vh - 200px)'
                    }}
                >
                    {/* 👉 FLEX ROW: left card (70%) + right panel (30%) */}
                    <div className="d-flex" style={{ width: "100%" }}>

                        {/* LEFT MAIN CARD — unchanged */}
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
                                flex: "0 0 70%"  // ⬅️ required
                            }}
                        >
                            {/* Row 1 */}
                            <div className='d-flex align-items-center gap-5 '>
                                <div className='d-flex align-items-center '
                                    style={{
                                        width: '200px',
                                        height: '25px'
                                    }}
                                >
                                    <label className='form-label mb-2 me-2 fw-bold 
                            '>Q.No</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                    />
                                </div>

                                <div className='d-flex align-items-center'
                                    style={{
                                        width: '200px',
                                        height: '20px'
                                    }}
                                >
                                    <label className='form-label mb-0 me-2 fw-bold'>R.No</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                    />
                                </div>



                                <div className='d-flex align-items-center'
                                    style={{
                                        width: '710px',
                                        height: "25px"
                                    }}
                                >
                                    <label className='form-label mb-1 me-2 fw-bold'>Project</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                    />
                                </div>

                                <div className='d-flex align-items-center'
                                    style={{
                                        width: '710px',
                                        height: "25px"
                                    }}
                                >
                                    <label className='form-label mb-1 me-2 fw-bold' >Ledger</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className='d-flex align-items-center gap-5 mt-2'>
                                <div className='d-flex align-items-center'>
                                    <label className='form-label fw-bold me-2 mb-1'>Q.Date</label>
                                    <input
                                        type='date'
                                        className='form-control form-control-sm'
                                    />
                                </div>

                                <div className='d-flex align-items-center'
                                    style={{
                                        width: '86%'
                                    }}
                                >
                                    <label className='form-label fw-bold me-2 mb-1'>Subject</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                    />
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
                                    />
                                </div>


                                <div className='mx-2' style={{ flex: '0 0 200px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Product</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                    />
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 100px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Unit</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                    />
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 180px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Brand</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
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
                                    />
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Amount</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                    />
                                </div>
                            </div>
                            {/* TextArea Box */}
                            <div className='d-flex align-items-center ' style={{ gap: '10px', marginTop: '5px' }}>
                                <textarea
                                    className='form-control form-control-sm mt-1 '
                                    rows={2}
                                    style={{
                                        width: '50%',
                                        marginLeft: '0.5%'

                                    }}
                                />
                                <button
                                    className='btn btn-primary btn-sm'
                                >
                                    Add
                                </button>
                            </div>
                            <hr className='mt-1' />

                            {/* Container inside card */}
                            <div
                                className='d-flex'
                                style={{
                                    border: '2px solid #5d8aa8',
                                    borderRadius: '5px',
                                    backgroundColor: '#f8f9fa',
                                    flexGrow: 1,
                                    width: '100%',
                                    minHeight: 0,
                                    overflowY: 'auto'
                                }}
                            >

                            </div>
                        </div>
                        {/* Right panel */}
                        <div
                            style={{
                                flex: '0 0 30%',
                                paddingLeft: '15px'
                            }}
                        >
                            <h6
                                style={{
                                    display: 'inline-block',
                                    borderBottom: '2px solid #5d8aa8',
                                    paddingTop: ' 2px',
                                    marginBottom: '10px'
                                }}
                            >
                                Terms & Conditions
                            </h6>
                            <div className='mb-2 align-items-center mb-2'>
                                <label className='form-label fw-bold' style={{ fontSize: '0.85rem' }}>Payment</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>

                            <div className='mb-2 align-items-center mb-2'>
                                <label className='form-label fw-bold' style={{ fontSize: '0.85rem' }}>Delivery</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>

                            <div className='mb-2 align-items-center mb-2'>
                                <label className='form-label fw-bold' style={{ fontSize: '0.85rem' }}>Quotation Validity</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>

                            {/* Right side small 4 input box */}
                            <div className='mt-3'>

                                <div className='d-flex align-items-center mb-2'>
                                    <label className=' me-2 fw-bold' style={{ fontSize: '0.8rem', width: '70px' }}>Item</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        style={{ width: '80px' }}
                                    />
                                </div>

                                <div className='d-flex align-items-center mb-2'>
                                    <label className=' me-2 fw-bold' style={{ fontSize: '0.8rem', width: '70px' }}>Total Amt</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        style={{ width: '80px' }}
                                    />
                                </div>

                                <div className='d-flex align-items-center mb-2'>
                                    <label className=' me-2 fw-bold' style={{ fontSize: '0.8rem', width: '70px' }}>Vat Amt</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        style={{ width: '80px' }}
                                    />
                                </div>

                                <div className='d-flex align-items-center mb-2'>
                                    <label className=' me-2 fw-bold' style={{ fontSize: '0.8rem', width: '70px' }}>Act Amt</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        style={{ width: '80px' }}
                                    />
                                </div>

                                <div className='d-flex align-items-center mb-2'>
                                    <label className=' me-2 fw-bold' style={{ fontSize: '0.8rem', width: '70px' }}>Round Off</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        style={{ width: '80px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Boxes */}
                    <div className='d-flex flex-wrap gap-3'>
                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Notes</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Warranty</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Inclusion</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Exclusion</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Scope</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                            />
                        </div>
                        {/* Bottom 8 Buttons */}
                        <div style={{
                            flex: '0 0 48%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '5px',
                            flexWrap: 'nowrap',
                            padddingTop: '18px',
                            overflowX: 'auto'
                        }}>
                            <button className='btn btn-sm btn-danger' >New</button>
                            <button className='btn btn-sm btn-danger' >Edit</button>
                            <button className='btn btn-sm btn-danger' >Find</button>
                            <button className='btn btn-sm btn-danger' >Save</button>
                            <button className='btn btn-sm btn-danger' >Print</button>
                            <button className='btn btn-sm btn-danger' >Delete</button>
                            <button className='btn btn-sm btn-danger' >Reset</button>
                            <button className='btn btn-sm btn-danger' >Close</button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quot;