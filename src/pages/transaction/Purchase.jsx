import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Purchase = () => {

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
                    <h4 className='mb-0'>Purchase</h4>
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
                        className="d-flex p-1 align-items-stretch border "
                        style={{ background: "#f8f9fa", width: "100%", minHeight: "65px" }}
                    >

                        {/* LEFT SECTION */}
                        <div className="d-flex flex-column" style={{ width: "250px" }}>

                            {/* S.No */}
                            <div className="d-flex mb-2 align-items-center">
                                <label
                                    className="fw-bold"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    SI.No
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

                        <div className="d-flex flex-column" style={{ width: "250px" }}>

                            {/* Pur.Date */}
                            <div className="d-flex mb-2 align-items-center">
                                <label
                                    className="fw-bold"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    Pur.Date
                                </label>
                                <input
                                    type="date"
                                    className="form-control form-control-sm ms-2"
                                    style={{ height: "26px", fontSize: "12px" }}
                                />
                            </div>

                            {/* Entry Date */}
                            <div className="d-flex mb-2 align-items-center">
                                <label
                                    className="fw-bold text-nowrap"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    Entry Date
                                </label>
                                <input
                                    type="date"
                                    className="form-control form-control-sm ms-2"
                                    style={{ height: "26px", fontSize: "12px" }}
                                />
                            </div>
                        </div>
                        {/* VERTICAL DIVIDER */}
                        <div className="d-flex align-items-stretch px-2">
                            <div style={{ borderLeft: "1px solid #999", width: "1px" }}></div>
                        </div>

                        <div className="d-flex flex-column" style={{ width: "650px" }}>

                            {/* Ledger */}
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

                            {/* Name + Place on SAME line */}
                            <div className="d-flex mb-2 align-items-center">

                                {/* NAME label */}
                                <label
                                    className="fw-bold text-nowrap"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    Name
                                </label>

                                {/* NAME input (large) */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm ms-2"
                                    style={{ height: "26px", fontSize: "12px", width: "350px" }}
                                />

                                {/* PLACE label */}
                                <label
                                    className="fw-bold text-nowrap ms-3"
                                    style={{ width: "70px", fontSize: "13px", textAlign: "right" }}
                                >
                                    Place
                                </label>

                                {/* PLACE input (small) */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm ms-2"
                                    style={{ height: "26px", fontSize: "12px", width: "130px" }}
                                />

                            </div>
                        </div>
                        {/* VERTICAL DIVIDER */}
                        <div className="d-flex align-items-stretch px-2">
                            <div style={{ borderLeft: "1px solid #999", width: "1px" }}></div>
                        </div>

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
                            height: "370px",
                            background: "#f8f9fa"
                        }}
                    ></div>

                    {/* Remaining Space 5 Columns Filling Full Height */}
                    <div
                        className="d-flex mt-2"
                        style={{
                            flex: 1,
                            border: "2px solid #5d8aa8",
                            borderRadius: "4px",
                            background: "#f8f9fa",
                            minHeight: "162px"
                        }}
                    >
                        {/* COLUMN 1 - BIG */}
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ flex: 2, fontSize: "14px" }}
                        >

                        </div>

                        {/* Divider */}
                        <div style={{ width: "1px", background: "#5d8aa8" }}></div>

                        {/* COLUMN 2 */}
                        <div
                            className="d-flex align-items-start justify-content-center mt-2"
                            style={{ flex: 1, fontSize: "14px" }}
                        >
                            <div className="d-flex flex-column" style={{ gap: "4px" }}>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>Tot Item</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>Tot Qty</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>Free Qty</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>Dis Amt</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                            </div>
                        </div>

                        <div style={{ width: "1px", background: "#5d8aa8" }}></div>

                        {/* COLUMN 3 */}
                        <div
                            className="d-flex align-items-center justify-content-center mt-2"
                            style={{ flex: 1, fontSize: "14px" }}
                        >
                            <div className="d-flex flex-column" style={{ gap: "4px" }}>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>Tot Amt</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>CGST Amt</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>SGST Amt</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>IGST Amt</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                            </div>

                        </div>

                        <div style={{ width: "1px", background: "#5d8aa8" }}></div>

                        {/* COLUMN 4 */}
                        <div
                            className="d-flex align-items-center justify-content-center mt-2"
                            style={{ flex: 1, fontSize: "14px" }}
                        >
                            <div className="d-flex flex-column" style={{ gap: "4px" }}>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>TCS %</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>TCS RS</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>Dis %</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                                <div className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <label style={{ width: "70px", margin: 0 }}>Dis Amt</label>
                                    <input className="form-control form-control-sm" style={{ height: "28px", width: "120px" }} />
                                </div>

                            </div>
                        </div>

                        <div style={{ width: "1px", background: "#5d8aa8" }}></div>

                        {/* COLUMN 5 */}
                        <div
                            className="d-flex flex-column"
                            style={{ flex: 1, fontSize: "14px", width: "100%" }}
                        >

                            {/* FIRST HORIZONTAL CONTAINER */}
                            <div className="d-flex" style={{ width: "100%", padding: "6px 0" }}>

                                {/* LEFT 50% BOX */}
                                <div className="d-flex flex-column" style={{ width: "50%", gap: "4px" }}>

                                    {/* Row 1 */}
                                    <div className="d-flex align-items-center" style={{ gap: "6px" }}>
                                        <label style={{ width: "60px", margin: 0, fontSize: "12px" }}>Act Amt</label>
                                        <input
                                            className="form-control"
                                            style={{
                                                height: "22px",
                                                width: "90px",
                                                padding: "2px 4px",
                                                fontSize: "12px"
                                            }}
                                        />
                                    </div>

                                    {/* Row 2 */}
                                    <div className="d-flex align-items-center" style={{ gap: "6px" }}>
                                        <label style={{ width: "60px", margin: 0, fontSize: "12px" }}>Round Off</label>
                                        <input
                                            className="form-control"
                                            style={{
                                                height: "22px",
                                                width: "90px",
                                                padding: "2px 4px",
                                                fontSize: "12px"
                                            }}
                                        />
                                    </div>

                                </div>


                                {/* VERTICAL LINE */}
                                <div style={{ width: "1px", background: "#d3d3d3", margin: "0 10px" }}></div>

                                {/* RIGHT 50% BOX (EMPTY) */}
                                <div style={{ width: "50%" }}>
                                    {/* intentionally empty */}
                                </div>
                            </div>

                            {/* HORIZONTAL LINE */}
                            <div style={{ width: "100%", height: "1px", background: "#d3d3d3" }}></div>

                            {/* SECOND HORIZONTAL CONTAINER */}
                            <div
                                className="d-flex flex-column align-items-center"
                                style={{ width: "100%", padding: "6px 0" }}
                            >
                                {/* SECOND HORIZONTAL CONTAINER */}
                                <div
                                    className="d-flex flex-column"
                                    style={{ width: "100%", padding: "6px 0" }}
                                >
                                    <div
                                        className="d-flex flex-wrap justify-content-center"
                                        style={{ gap: "6px", padding: "0 8px" }}
                                    >
                                        <button className="btn btn-primary btn-sm" style={{ flex: "0 0 22%", minWidth: "60px", height: "26px" }}>Btn 1</button>
                                        <button className="btn btn-primary btn-sm" style={{ flex: "0 0 22%", minWidth: "60px", height: "26px" }}>Btn 2</button>
                                        <button className="btn btn-primary btn-sm" style={{ flex: "0 0 22%", minWidth: "60px", height: "26px" }}>Btn 3</button>
                                        <button className="btn btn-primary btn-sm" style={{ flex: "0 0 22%", minWidth: "60px", height: "26px" }}>Btn 4</button>

                                        <button className="btn btn-primary btn-sm" style={{ flex: "0 0 22%", minWidth: "60px", height: "26px" }}>Btn 5</button>
                                        <button className="btn btn-primary btn-sm" style={{ flex: "0 0 22%", minWidth: "60px", height: "26px" }}>Btn 6</button>
                                        <button className="btn btn-primary btn-sm" style={{ flex: "0 0 22%", minWidth: "60px", height: "26px" }}>Btn 7</button>
                                        <button className="btn btn-primary btn-sm" style={{ flex: "0 0 22%", minWidth: "60px", height: "26px" }}>Btn 8</button>
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

export default Purchase;