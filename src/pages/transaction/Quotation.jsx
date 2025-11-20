import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Quotation = () => {
    const bottomFields = [
        { label: 'S.No', type: 'text', flex: '0 0 70px' },
        { label: 'Product', type: 'text', flex: '0 0 100px' },
        { label: 'Unit', type: 'text', flex: '0 0 120px' },
        { label: 'Brand', type: 'number', flex: '0 0 70px' },
        { label: 'Qty', type: 'text', flex: '0 0 70px' },
        { label: 'Rate', type: 'number', flex: '0 0 70px' },
        { label: 'Taxable', type: 'number', flex: '0 0 90px' },
        { label: 'Vat %', type: 'number', flex: '0 0 70px' },
        { label: 'Vat Amt', type: 'text', flex: '0 0 70px' },
        { label: 'Amount', type: 'text', flex: '0 0 70px' },
    ];

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

                            {/* First 3 Inputs */}
                            <div className="d-flex mb-3 align-items-center gap-3 flex-wrap">
                                <div className="col-auto d-flex align-items-center">
                                    <label className="me-2 mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Q.No</label>
                                    <input type="text" className="form-control form-control-sm" style={{ width: '80px' }} />
                                </div>
                                <div className="col-auto d-flex align-items-center flex-grow-1">
                                    <label className="me-2 mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Project Name</label>
                                    <input type="text" className="form-control form-control-sm" />
                                </div>
                                <div className="col-auto d-flex align-items-center flex-grow-1">
                                    <label className="me-2 mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Ledger</label>
                                    <input type="text" className="form-control form-control-sm" />
                                </div>
                            </div>

                            <hr className='mt-0' />

                            {/* 10 Labels Row */}
                            <div className="d-flex mb-0 justify-content-between flex-wrap">
                                {bottomFields.map((field, idx) => (
                                    <div
                                        key={idx}
                                        className="text-center"
                                        style={{
                                            flex: field.flex,
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        {field.label}
                                    </div>
                                ))}
                            </div>

                            <hr className='mt-0' />

                            {/* 10 Input Boxes Row */}
                            <div className="d-flex mb-0 justify-content-between flex-wrap ">
                                {bottomFields.map((field, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control form-control-sm"
                                        style={{ flex: field.flex }}
                                    />
                                ))}
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

                            <hr className='mt-1' />

                            {/* Big empty grid box */}
                            <div
                                className="d-flex mt-0"
                                style={{
                                    border: '2px solid #5d8aa8',
                                    borderRadius: '5px',
                                    backgroundColor: '#f8f9fa',
                                    flexGrow: 1,
                                    width: '100%',
                                    minHeight: 0,
                                    overflow: 'auto'
                                }}
                            >
                                <div style={{ width: '100%' }}>
                                    {/* future content */}
                                </div>
                            </div>

                        </div>

                        {/* RIGHT PANEL (inside the 30% empty space) */}
                        <div
                            style={{
                                flex: "0 0 30%",
                                paddingLeft: "15px"
                            }}
                        >
                            <h6

                                style={{
                                    display: 'inline-block',
                                    borderBottom: '2px solid #5d8aa8',
                                    paddingBottom: '2px',
                                    marginBottom: '10px'
                                }}
                            >
                                Terms & Conditions
                            </h6>

                            <div className="mb-2">
                                <label className="form-label" style={{ fontSize: "0.85rem" }}>Payment</label>
                                <input type="text" className="form-control form-control-sm" />
                            </div>

                            <div className="mb-2">
                                <label className="form-label" style={{ fontSize: "0.85rem" }}>Delivery</label>
                                <input type="text" className="form-control form-control-sm" />
                            </div>

                            <div className="mb-2">
                                <label className="form-label" style={{ fontSize: "0.85rem" }}>Quotation Validity</label>
                                <input type="text" className="form-control form-control-sm" />
                            </div>



                            {/* 4 small label + input rows */}
                            <div className="mt-3">

                                <div className="d-flex align-items-center mb-2">
                                    <label className="me-2" style={{ fontSize: '0.8rem', width: "70px" }}>Item</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        style={{ width: "80px" }}
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-2">
                                    <label className="me-2" style={{ fontSize: '0.8rem', width: "70px", whiteSpace: 'nowrap' }}>Total Amount</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        style={{ width: "80px" }}
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-2">
                                    <label className="me-2" style={{ fontSize: '0.8rem', width: "70px" }}>Vat Amt</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        style={{ width: "80px" }}
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-1">
                                    <label className="me-2" style={{ fontSize: '0.8rem', width: "70px" }}>Act Amt</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        style={{ width: "80px" }}
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-1">
                                    <label className="me-2" style={{ fontSize: '0.8rem', width: "70px" }}>Round Off</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        style={{ width: "80px" }}
                                    />
                                </div>

                            </div>



                        </div>

                    </div>

                    <div className="d-flex flex-wrap gap-3">

                        {/* Box 1 */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label">Notes </label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                            />
                        </div>

                        {/* Box 2 */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label">Warrenty</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                            />
                        </div>

                        {/* Box 3 */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label">Inclusion</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                            />
                        </div>

                        {/* Box 4 */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label">Exclusion</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                            />
                        </div>

                        {/* Box 5 → Should take only half row */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label">Scope</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                            />
                        </div>

                        {/* Right half → 8 buttons in one line */}
                        <div
                            style={{
                                flex: "0 0 48%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "5px",
                                paddingTop: "18px",
                                flexWrap: "nowrap",   // keeps all buttons in SAME line
                                overflowX: "auto"     // prevents breaking layout on small screens
                            }}
                        >

                            <button className="btn btn-sm" style={{ backgroundColor: "#5d8aa8", color: "white", whiteSpace: "nowrap" }}>
                                New
                            </button>

                            <button className="btn btn-sm" style={{ backgroundColor: "#5d8aa8", color: "white", whiteSpace: "nowrap" }}>
                                Edit
                            </button>

                            <button className="btn btn-sm" style={{ backgroundColor: "#5d8aa8", color: "white", whiteSpace: "nowrap" }}>
                               Save
                            </button>

                            <button className="btn btn-sm" style={{ backgroundColor: "#5d8aa8", color: "white", whiteSpace: "nowrap" }}>
                               Find
                            </button>

                            <button className="btn btn-sm" style={{ backgroundColor: "#5d8aa8", color: "white", whiteSpace: "nowrap" }}>
                                Print
                            </button>

                            <button className="btn btn-sm" style={{ backgroundColor: "#5d8aa8", color: "white", whiteSpace: "nowrap" }}>
                                Delete
                            </button>

                            <button className="btn btn-sm" style={{ backgroundColor: "#5d8aa8", color: "white", whiteSpace: "nowrap" }}>
                                Reset
                            </button>

                            <button className="btn btn-sm" style={{ backgroundColor: "#5d8aa8", color: "white", whiteSpace: "nowrap" }}>
                                Close
                            </button>

                        </div>


                    </div>


                </div>
            </div>
        </div>
    );
};

export default Quotation;
