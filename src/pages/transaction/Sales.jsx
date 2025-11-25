import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sales = () => {

    const bottomFields = [
        { label: 'S.No', type: 'text', flex: '1 1 60px' },
        { label: 'Code', type: 'text', flex: '1 1 80px' },
        { label: 'Product', type: 'text', flex: '2 1 150px' },
        { label: 'Unit', type: 'number', flex: '1 1 60px' },
        { label: 'Qty', type: 'text', flex: '1 1 60px' },
        { label: 'Free', type: 'number', flex: '1 1 60px' },
        { label: 'NRate %', type: 'number', flex: '1 1 60px' },
        { label: 'BRate', type: 'number', flex: '1 1 60px' },
        { label: 'Dis%', type: 'number', flex: '1 1 60px' },
        { label: '  Disc', type: 'date', flex: '1 1 60px' },
        { label: 'Taxable Amt', type: 'text', flex: '1 1 80px' },
        { label: 'CGST', type: 'text', flex: '1 1 80px' },
        { label: 'SGST', type: 'text', flex: '1 1 80px' },
        { label: 'IGST', type: 'text', flex: '1 1 80px' },
        { label: 'Total Amt', type: 'text', flex: '1 1 100px' },
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
                    <div
                        style={{
                            height: '2px',
                            backgroundColor: '#5d8aa8',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                    ></div>

                    {/* Placeholder Box */}
                    <div
                        style={{
                            marginTop: "10px",
                            border: "2px solid #5d8aa8",
                            borderRadius: "4px",
                            height: "350px",
                            background: "#f8f9fa"
                        }}
                    ></div>

                    {/* 4 Column Box — Layout 1 */}
                    <div
                        className="d-flex"
                        style={{
                            height: "140px",
                            border: "2px solid #5d8aa8",
                            borderRadius: "4px",
                            marginTop: "10px"
                        }}
                    >
                        {/* Column 1 */}
                        <div className="flex-fill p-2">
                            <div className="fw-bold mb-2">Column 1</div>
                            {/* Add content here */}
                        </div>

                        {/* Vertical Line */}
                        <div style={{ width: "1px", background: "#5d8aa8" }}></div>

                        {/* Column 2 */}
                        <div className="flex-fill p-2">
                            <div className="fw-bold mb-2"> </div>
                            {/* Add content here */}
                        </div>

                        {/* Vertical Line */}
                        <div style={{ width: "1px", background: "#5d8aa8" }}></div>

                        {/* Column 3 */}
                        <div className="flex-fill p-2">
                            <div className="fw-bold mb-2">Column 3</div>
                            {/* Add content here */}
                        </div>

                        {/* Vertical Line */}
                        <div style={{ width: "1px", background: "#5d8aa8" }}></div>

                        {/* Column 4 */}
                        <div className="flex-fill p-2">
                            

                            {/* Add content here */}
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Sales;