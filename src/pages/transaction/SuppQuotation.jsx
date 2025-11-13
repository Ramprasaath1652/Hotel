import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SuppQuotation = () => {
    // Top fields (Q.No, Q.Date, Ledger, Project)
    const topFields = [
        { label: 'Q.No', type: 'text', flex: '0 0 18%' },
        { label: 'Q.Date', type: 'date', flex: '0 0 18%' },
        { label: 'Ledger', type: 'text', flex: '0 0 28%' },
        { label: 'Project Name', type: 'text', flex: '0 0 28%' },
    ];

    // Bottom 12 fields
    const bottomFields = [
        { label: 'S.No', type: 'text', flex: '0 0 120px' },
        { label: 'Product', type: 'text', flex: '0 0 120px' },
        { label: 'Unit', type: 'text', flex: '0 0 200px' },
        { label: 'Brand', type: 'number', flex: '0 0 120px' },
        { label: 'Qty', type: 'text', flex: '0 0 120px' },
        { label: 'Rate', type: 'number', flex: '0 0 120px' },
        { label: 'Mar %', type: 'number', flex: '0 0 120px' },
        { label: 'SRate', type: 'number', flex: '0 0 120px' },
        { label: 'Taxable', type: 'number', flex: '0 0 120px' },
        { label: ' Vat %', type: 'date', flex: '0 0 120px' },
        { label: 'Vat Amt', type: 'text', flex: '0 0 120px' },
        { label: 'Amount', type: 'text', flex: '0 0 120px' },
    ];

    return (
        <div className="container-fluid mt-2">
            <div
                className="card shadow-lg mx-auto"
                style={{ border: '2px solid #5d8aa8', maxWidth: '95%' }}
            >
                {/* Header */}
                <div
                    className="card-header text-white"
                    style={{ backgroundColor: '#5d8aa8', padding: '20px' }}
                >
                    <h4 className="mb-0">Supplier Quotation</h4>
                </div>

                {/* Body */}
                <div
                    className="card-body py-2"
                    style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}
                >
                    {/* Top Inputs */}
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        {topFields.map((field, idx) => (
                            <div
                                key={idx}
                                className="d-flex align-items-center flex-grow-1"
                                style={{ flex: field.flex, minWidth: '150px' }}
                            >
                                <label
                                    className="me-2 mb-0"
                                    style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}
                                >
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    className="form-control form-control-sm"
                                    style={{ height: '28px' }}
                                />
                            </div>
                        ))}
                    </div>



                    {/* Bottom 12 Inputs */}
                    <div className="mt-3">
                        {/* Large + Medium screens (horizontal) */}
                        <div className="d-none d-md-flex flex-column">
                            {/* Labels Row */}
                            <div
                                className="d-flex justify-content-start"
                                style={{
                                    borderTop: '2px solid #5d8aa8',
                                    borderBottom: '2px solid #5d8aa8',
                                    padding: '6px 0',
                                    width: '100%',
                                    flexWrap: 'nowrap',
                                    overflowX: 'auto',
                                }}
                            >
                                {bottomFields.map((field, idx) => (
                                    <div
                                        key={idx}
                                        className="text-center mx-2"
                                        style={{
                                            flex: field.flex,
                                            fontSize: '0.8rem',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {field.label}
                                    </div>
                                ))}
                            </div>

                            {/* Input Row */}
                            <div
                                className="d-flex justify-content-start mt-1"
                                style={{ width: '100%', flexWrap: 'nowrap', overflowX: 'auto' }}
                            >
                                {bottomFields.map((field, idx) => (
                                    <div key={idx} className="mx-2" style={{ flex: field.flex }}>

                                        <input
                                            type={field.type}
                                            className="form-control form-control-sm"
                                            style={{ height: '28px' }}
                                        />
                                    </div>
                                ))}
                                <div>
                                </div>
                            </div>
                        </div>

                        {/* Small screens (stacked vertically) */}
                        <div className="d-md-none">
                            {bottomFields.map((field, idx) => (
                                <div key={idx} className="mb-2">
                                    <label
                                        className="mb-1"
                                        style={{ fontSize: '0.85rem', display: 'block' }}
                                    >
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        className="form-control form-control-sm"
                                        style={{ height: '28px' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <textarea
                            className='form-control form-control-sm mt-1 '
                            rows={2}
                            style={{
                                width: '50%',
                                marginLeft: '2%'
                            }}
                        />
                    </div>
                    <div
                        style={{
                            height: '2px',
                            backgroundColor: '#5d8aa8',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                    ></div>
                    <div
                        className="mt-3 px-2 px-md-3"
                        style={{
                            border: '2px solid #5d8aa8',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                            minHeight: '300px',
                            padding: '15px'
                        }}
                    >

                    </div>

                    {/* Big grid box container */}
                    <div
                        className="mt-3 px-3 py-3 d-flex"
                        style={{
                            border: '2px solid #5d8aa8',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                            alignItems: 'stretch'
                        }}
                    >
                        {/* Left section - single label + input */}
                        <div
                            className="d-flex align-items-center pe-3"
                            style={{ borderRight: '2px solid #5d8aa8', minWidth: '140px' }}
                        >
                            <label
                                className="me-2 mb-0"
                                style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                            >
                                Item
                            </label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                style={{ width: '80px', height: '28px' }}
                            />
                        </div>

                        {/* Middle section 1 - two vertical label/input pairs */}
                        <div
                            className="px-3 d-flex flex-column justify-content-center"
                            style={{ borderRight: '2px solid #5d8aa8', minWidth: '200px' }}
                        >
                            <div className="d-flex align-items-center mb-2">
                                <label
                                    className="me-2 mb-0"
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right' }}
                                >
                                    Total Amount
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    style={{ width: '300px', height: '28px' }}
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <label
                                    className="me-2 mb-0"
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right' }}
                                >
                                    Vat Amount
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    style={{ width: '300px', height: '28px' }}
                                />
                            </div>
                        </div>

                        {/* Middle section 2 - two vertical label/input pairs */}
                        <div
                            className="px-3 d-flex flex-column justify-content-center"
                            style={{ borderRight: '2px solid #5d8aa8', minWidth: '200px' }}
                        >
                            <div className="d-flex align-items-center mb-2">
                                <label
                                    className="me-2 mb-0"
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right' }}
                                >
                                    Act Amt
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    style={{ width: '300px', height: '28px' }}
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <label
                                    className="me-2 mb-0"
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right' }}
                                >
                                    Round Off
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    style={{ width: '300px', height: '28px' }}
                                />
                            </div>
                        </div>

                        {/* Empty section (future area) */}
                        <div className="flex-grow-1 ps-3">
                            {/* Future content (like Total, Grand Total, etc.) */}
                        </div>
                    </div>
                    {/* Two side-by-side textareas (half-left, half-right) */}
                    <div
                        className=" d-flex justify-content-between"
                        style={{ gap: '10px' }}
                    >
                        {/* Left textarea */}
                        <div style={{ flex: 1 }}>
                            <label
                                className="form-label "
                                style={{ fontSize: '0.85rem', color: '#333' }}
                            >
                                Terms and Conditions
                            </label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                style={{
                                    resize: 'none',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            ></textarea>
                        </div>

                        {/* Right textarea */}
                        <div style={{ flex: 1 }}>
                            <label
                                className="form-label "
                                style={{ fontSize: '0.85rem', color: '#333' }}
                            >
                                Narration
                            </label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                style={{
                                    resize: 'none',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            ></textarea>
                        </div>
                    </div>
                    {/* 9 horizontally centered buttons */}
                    <div
                        className="mt-1 d-flex justify-content-center flex-wrap"
                        style={{ gap: '8px' }}
                    >
                        <button className="btn btn-sm btn-primary">New</button>
                        <button className="btn btn-sm btn-secondary">Edit</button>
                        <button className="btn btn-sm btn-success">Save</button>
                        <button className="btn btn-sm btn-danger">Find</button>
                        <button className="btn btn-sm btn-warning text-white">Print</button>
                        <button className="btn btn-sm btn-info text-white">Delete</button>
                        <button className="btn btn-sm btn-dark">Reset</button>
                        <button className="btn btn-sm btn-outline-primary">Close</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SuppQuotation;
