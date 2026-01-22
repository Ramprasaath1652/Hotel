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
                            className="  card shadow-sm left-panel"
                            style={{
                                border: '1px solid #6a1b9a',
                                borderRadius: '5px',
                                padding: '15px',
                                marginRight: 'auto',
                                marginBottom: '10px',
                                backgroundColor: '#f8f9fa',
                                minHeight: '400px',
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
                            <div className="table-responsive">
                                <div
                                    className="d-flex align-items-end gap-2"
                                    style={{ minWidth: '1100px', flexWrap: 'nowrap' }}
                                >
                                    {/* Line Items Row */}
                                    <div className="table-responsive">
                                        <div
                                            className="d-flex align-items-end gap-2"
                                            style={{ minWidth: '1100px', flexWrap: 'nowrap' }}
                                        >

                                            {/* S.No */}
                                            <div style={{ width: '60px' }}>
                                                <label className="form-label fw-bold">S.No</label>
                                                <input className="form-control form-control-sm" disabled />
                                            </div>

                                            {/* Product */}
                                            <div style={{ width: '220px' }}>
                                                <label className="form-label fw-bold">Product</label>
                                                <input className="form-control form-control-sm" />
                                            </div>

                                            {/* Unit */}
                                            <div style={{ width: '150px' }}>
                                                <label className="form-label fw-bold">Unit</label>
                                                <input className="form-control form-control-sm" />
                                            </div>

                                            {/* Brand */}
                                            <div style={{ width: '150px' }}>
                                                <label className="form-label fw-bold">Brand</label>
                                                <input className="form-control form-control-sm" />
                                            </div>

                                            {/* Qty */}
                                            <div style={{ width: '80px' }}>
                                                <label className="form-label fw-bold">Qty</label>
                                                <input className="form-control form-control-sm" />
                                            </div>

                                            {/* Rate */}
                                            <div style={{ width: '90px' }}>
                                                <label className="form-label fw-bold">Rate</label>
                                                <input className="form-control form-control-sm" />
                                            </div>

                                            {/* Taxable */}
                                            <div style={{ width: '100px' }}>
                                                <label className="form-label fw-bold">Taxable</label>
                                                <input className="form-control form-control-sm" disabled />
                                            </div>

                                            {/* VAT % */}
                                            <div style={{ width: '70px' }}>
                                                <label className="form-label fw-bold">VAT%</label>
                                                <input className="form-control form-control-sm" />
                                            </div>

                                            {/* VAT Amt */}
                                            <div style={{ width: '100px' }}>
                                                <label className="form-label fw-bold">VAT Amt</label>
                                                <input className="form-control form-control-sm" disabled />
                                            </div>

                                            {/* Amount */}
                                            <div style={{ width: '110px' }}>
                                                <label className="form-label fw-bold">Amount</label>
                                                <input className="form-control form-control-sm" disabled />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* TextArea Box */}
                            <div className='d-flex align-items-center ' style={{ gap: '10px', marginTop: '5px' }}>
                                <textarea
                                    className='form-control form-control-sm mt-1 ms-0'
                                    rows={2}
                                    style={{
                                        width: '50%',
                                        marginLeft: '0.5%'

                                    }}
                                />

                                <button
                                    className='btn btn-primary btn-sm'>
                                    Add
                                </button>
                            </div>
                            <hr className='mt-1' />
                            {/* Container inside card */}
                            <div
                                className='d-flex'
                                style={{
                                    border: '2px solid #6a1b9a',
                                    borderRadius: '5px',
                                    backgroundColor: '#f8f9fa',
                                    flexGrow: 1,
                                    width: '100%',
                                    minHeight: 0,
                                    overflowY: 'auto'
                                }}
                            >
                                <div className='m-2' style={{ width: '99%' }}>
                                    {/* future content */}
                                    <table className="table table-bordered table-sm" style={{ fontSize: "12px", minWidth: "900px" }}>
                                        <thead className="table-light">
                                            <tr>
                                                <th style={{ width: "60px" }} className="text-center">S.No</th>
                                                <th style={{ width: "150px" }}>Product</th>
                                                <th style={{ width: "100px" }} className="text-center">Unit</th>
                                                <th style={{ width: "120px" }}>Brand</th>
                                                <th style={{ width: "70px" }} className="text-center">Qty</th>
                                                <th style={{ width: "100px" }} className="text-end">Rate</th>
                                                <th style={{ width: "120px" }} className="text-end">Taxable</th>
                                                <th style={{ width: "70px" }} className="text-center">VAT %</th>
                                                <th style={{ width: "100px" }} className="text-end">VAT Amt</th>
                                                <th style={{ width: "120px" }} className="text-end">Amount</th>
                                                <th style={{ width: "120px" }} className="text-end">Actions</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr >
                                                <td className="text-center"></td>
                                                <td></td>
                                                <td className="text-center"></td>
                                                <td></td>
                                                <td className="text-center"></td>
                                                <td className="text-end"></td>
                                                <td className="text-end"></td>
                                                <td className="text-center"></td>
                                                <td className="text-end"></td>
                                                <td className="text-end"></td>
                                                <td className="text-center">
                                                    <>
                                                        <button
                                                            className="btn btn-sm btn-secondary me-1"
                                                            style={{ padding: "0.2rem 0.4rem", fontSize: "8px" }}
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            style={{ padding: "0.2rem 0.4rem", fontSize: "8px" }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>



                        <div className="right-panel ps-lg-3 mt-0">
                            <div
                                style={{
                                    padding: '10px',
                                }}
                            >
                                <h6
                                    style={{
                                        borderBottom: '2px solid #6a1b9a',
                                        display: 'inline-block',
                                        marginBottom: '10px'
                                    }}
                                >
                                    Terms & Conditions
                                </h6>

                                {/* INPUTS */}
                                <div className="mb-2">
                                    <label className="fw-bold small">Payment</label>
                                    <input className="form-control form-control-sm" />
                                </div>

                                <div className="mb-2">
                                    <label className="fw-bold small">Delivery</label>
                                    <input className="form-control form-control-sm" />
                                </div>

                                <div className="mb-2">
                                    <label className="fw-bold small">Quotation Validity</label>
                                    <input className="form-control form-control-sm" />
                                </div>

                                <hr />

                                {/* TOTALS */}
                                <div >
                                    <div className="d-flex align-items-center mb-2">
                                        <div className='col-2'>
                                            <label className="fw-bold small me-2 ">Item</label>
                                        </div>
                                        <div className='col-3'>
                                            <input className="form-control form-control-sm" />
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <div className='col-2'>
                                            <label className="fw-bold small me-2 text-nowrap">Total Amt</label>
                                        </div>
                                        <div className='col-3'>
                                            <input className="form-control form-control-sm" />
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <div className='col-2'>
                                            <label className="fw-bold small me-2 text-nowrap">Vat Amt</label>
                                        </div>
                                        <div className='col-3'>
                                            <input className="form-control form-control-sm" />
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <div className='col-2'>
                                            <label className="fw-bold small me-2 text-nowrap">Act Amt</label>
                                        </div>
                                        <div className='col-3'>
                                            <input className="form-control form-control-sm" />
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <div className='col-2'>
                                            <label className="fw-bold small me-2 text-nowrap">Round Off</label>
                                        </div>
                                        <div className='col-3'>
                                            <input className="form-control form-control-sm" />
                                        </div>
                                    </div>
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