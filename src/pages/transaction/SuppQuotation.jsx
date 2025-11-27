import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';





const SuppQuotation = () => {

    const [topData, setTopData] = useState({
        qNo: '',
        qDate: '',

        projectName: ''
    });

    const [bottomData, setBottomData] = useState({
        sNo: '',
        product: '',
        unit: '',
        brand: '',
        qty: '',
        rate: '',
        marPer: '',
        sRate: '',
        taxable: '',
        vatPer: '',
        vatAmt: '',
        amount: '',
    })

    const [ledgerList, setLedgerList] = useState([]);
    const [ledger, setLedger] = useState('');

    const [ledgerQuery, setLedgerQuery] = useState("");
    const [showLedgerDropdown, setShowLedgerDropdown] = useState(false);

    const [forceOpen, setForceOpen] = useState(false);

    const [projects, setProjects] = useState([]);
    const [projectQuery, setProjectQuery] = useState('');
    const [showProjectDropdown, setShowProjectDropdown] = useState(false);

    const [unitList, setUnitList] = useState([]);

    const [productList, setProductList] = useState([]);
    const [products, setProducts] = useState('');
    const [productQuery, setProductQuery] = useState("");
    const [showProductDropdown, setShowProductDropdown] = useState(false);




    useEffect(() => {
        loadLedger();
        loadProjects();
        loadUnit();
        loadProduct();
    }, [])


    const gapi = import.meta.env.VITE_API_URL;

    const loadLedger = async () => {
        try {
            const res = await axios.get(`${gapi}/ledger`)
            console.log("Ledger API Response:", res.data);
            setLedgerList(res.data)
        } catch (err) {
            console.error("Ledger Load Error:", err)
        }
    }

    const loadProjects = async () => {
        try {
            const res = await axios.get(`${gapi}/project`);
            console.log("LOAD PROJECTS RESPONSE:", res.data);
            setProjects(res.data);
        } catch (err) {
            console.error('Error fetching groups:', err);
            console.log("Server error:", err.response?.data);
            alert('Could not load groups. Check API connection.');
        }
    }

    const loadUnit = async () => {
        try {
            const res = await axios.get(`${gapi}/unit`);
            console.log("LOAD UNIT RESPONSE:", res.data);
            setUnitList(res.data)
        } catch (err) {
            console.error('Unit Load Error:', err)
        }
    }

    const loadProduct = async () => {
        try {
            const res = await axios.get(`${gapi}/productmasters`)
            console.log("LOAD Product RESPONSE:", res.data);
            setProductList(res.data)
        } catch (err) {
            console.error('product fetching error', err);
            alert('Could not load product. Check API connection.');
        }
    }

    const handleKeyDown = (e, type) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            if (type === "ledger") {
                setShowLedgerDropdown(true);
                setForceOpen(true);
            }

            if (type === "project") {
                setShowProjectDropdown(true);
            }

            if (type === "product") {
                setShowProductDropdown(true);
            }
        }
    }



    const filteredLedger = ledgerList.filter(item =>
        item.LedgerName?.toLowerCase().includes(ledgerQuery.toLowerCase())
    );

    const filteredProject = projects.filter(item =>
        item.ProjName?.toLowerCase().includes(projectQuery.toLowerCase())
    );

    const filteredProduct = productList.filter(item =>
        item.ProductName?.toLowerCase().includes(productQuery.toLowerCase())
    );





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
                    <div className="d-flex align-items-center" style={{ gap: '12px', flexWrap: 'nowrap' }}>
                        {/* Q.No */}
                        <div style={{ flex: '0 0 18%' }}>
                            <label style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Q.No</label>
                            <input type="text" className="form-control form-control-sm" style={{ height: '28px' }} value={topData.qNo} onChange={e => setTopData({ ...topData, qNo: e.target.value })} />
                        </div>

                        {/* Q.Date */}
                        <div style={{ flex: '0 0 18%' }}>
                            <label style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Q.Date</label>
                            <input type="date" className="form-control form-control-sm" style={{ height: '28px' }} value={topData.qDate} onChange={e => setTopData({ ...topData, qDate: e.target.value })} />
                        </div>

                        {/* Ledger */}
                        <div className='mb-3 position-relative'>
                            <label className='form-label'>Ledger</label>

                            {/* Input Box */}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Ledger..."
                                value={ledgerQuery}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setLedgerQuery(value);

                                    if (value.trim() === '') {
                                        setShowLedgerDropdown(false);
                                    } else {
                                        setShowLedgerDropdown(true);
                                    }
                                }}
                                onFocus={() => {
                                    if (ledgerQuery.trim() !== '') setShowLedgerDropdown(true);
                                }}
                                onKeyDown={(e) => handleKeyDown(e, 'ledger')}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setShowLedgerDropdown(false);
                                    }, 150);
                                }}

                            />

                            {/* Dropdown */}
                            {showLedgerDropdown && filteredLedger.length > 0 && (
                                <div
                                    className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                    style={{ maxHeight: "250px", overflowY: "auto", zIndex: 9999 }}
                                >
                                    {/* Header */}
                                    <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                        <div className="col-5">Name</div>
                                        <div className="col-3">Place</div>
                                        <div className="col-4">State</div>
                                    </div>

                                    {/* List Items */}
                                    {filteredLedger.map((item) => (
                                        <div
                                            key={item.LedgerId}
                                            className="d-flex px-2 py-2 border-bottom hover-bg"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setLedger(item.LedgerId);           // Save ID
                                                setLedgerQuery(item.LedgerName);    // Show selected name
                                                setShowLedgerDropdown(false);
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.classList.add("bg-light")}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove("bg-light")}
                                        >
                                            <div className="col-5">{item.LedgerName}</div>
                                            <div className="col-3">{item.EPlace || "-"}</div>
                                            <div className="col-4">{item.StateName || "-"}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Project Name */}
                        <div className='mb-3 position-relative'>
                            <label className='form-label'>Project Name</label>

                            {/* Input Box */}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Project..."
                                value={projectQuery}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setProjectQuery(value);

                                    if (value.trim() === '') {
                                        setShowProjectDropdown(false);
                                    } else {
                                        setShowProjectDropdown(true);
                                    }
                                }}
                                onFocus={() => {
                                    if (ledgerQuery.trim() !== '') setShowProjectDropdown(true);
                                }}
                                onKeyDown={(e) => handleKeyDown(e, 'project')}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setShowProjectDropdown(false);
                                    }, 150);
                                }}

                            />

                            {/* Dropdown */}
                            {showProjectDropdown && filteredProject.length > 0 && (
                                <div
                                    className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                    style={{ maxHeight: "250px", overflowY: "auto", zIndex: 9999 }}
                                >
                                    {/* Header */}
                                    <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                        <div className="col-5">Name</div>

                                    </div>

                                    {/* List Items */}
                                    {filteredProject.map((item) => (
                                        <div
                                            key={item.ProjId}
                                            className="d-flex px-2 py-2 border-bottom hover-bg"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setProjectId(item.ProjId);           // Save ID
                                                setProjectQuery(item.ProjName);    // Show selected name
                                                setShowProjectDropdown(false);
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.classList.add("bg-light")}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove("bg-light")}
                                        >
                                            <div className="col-5">{item.ProjName}</div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Labels Row */}
                    <div
                        className="d-flex justify-content-start"
                        style={{
                            borderTop: '2px solid #5d8aa8',
                            borderBottom: '2px solid #5d8aa8',
                            padding: '6px 0',
                            width: '100%',
                            flexWrap: 'nowrap',
                            overflowX: 'auto'
                        }}
                    >
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>S.No</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>Product</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 200px' }}>Unit</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>Brand</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>Qty</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>Rate</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>Mar %</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>SRate</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>Taxable</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>Vat %</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>Vat Amt</div>
                        <div className="text-center mx-2" style={{ flex: '0 0 120px' }}>Amount</div>
                    </div>

                    {/* Input Row */}
                    <div
                        className="d-flex justify-content-start mt-1"
                        style={{
                            width: '100%',
                            flexWrap: 'nowrap',
                            overflowX: 'auto'
                        }}
                    >

                        <input
                            className="form-control form-control-sm mx-2"
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.sNo}
                            onChange={(e) => setBottomData({ ...bottomData, sNo: e.target.value })}
                        />

                        {/* Input Box */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Product..."
                            value={productQuery}
                            onChange={(e) => {
                                const value = e.target.value;
                                setProductQuery(value);
                                setShowProductDropdown(value.trim() !== "");
                            }}
                            onFocus={() => {
                                if (productQuery.trim() !== '') setShowProductDropdown(true);
                            }}
                            onKeyDown={(e) => handleKeyDown(e, 'product')}
                            onBlur={() => {
                                setTimeout(() => {
                                    setShowProductDropdown(false);
                                }, 150);
                            }}

                        />

                        {/* Dropdown */}
                        {showProductDropdown && filteredProduct.length > 0 && (
                            <div
                                className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                style={{ maxHeight: "250px", overflowY: "auto", zIndex: 9999 }}
                            >
                                {/* Header */}
                                <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                    <div className="col-12">Name</div>

                                </div>

                                {/* List Items */}
                                {filteredProduct.map((item) => (
                                    <div
                                        key={item.ProductID}
                                        className="d-flex px-2 py-2 border-bottom hover-bg"
                                        style={{ cursor: "pointer" }}

                                        onClick={() => {
                                            setProducts(item.ProductID);
                                            setProductQuery(item.ProductName);
                                            setShowProductDropdown(false);

                                            // Automatically set unit from selected product
                                            setBottomData(prev => ({
                                                ...prev,
                                                unit: item.UnitId   // set the unit select to the product's unit
                                            }));
                                        }}

                                        onMouseEnter={(e) => e.currentTarget.classList.add("bg-light")}
                                        onMouseLeave={(e) => e.currentTarget.classList.remove("bg-light")}
                                    >
                                        <div className="col-12">{item.ProductName}</div>

                                    </div>
                                ))}
                            </div>
                        )}

                        <select
                            className='form-select form-select-sm mx-2'
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.unit}
                            onChange={(e) => setBottomData({ ...bottomData, unit: e.target.value })}
                        >
                            <option value="">-- Select --</option>

                            {unitList.map((g) => (
                                <option key={g.UnitId} value={g.UnitId}>
                                    {g.UnitType}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            className="form-control form-control-sm mx-2"
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.brand}
                            onChange={(e) => setBottomData({ ...bottomData, brand: e.target.value })}
                        />

                        <input
                            className="form-control form-control-sm mx-2"
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.qty}
                            onChange={(e) => setBottomData({ ...bottomData, qty: e.target.value })}
                        />

                        <input
                            type="number"
                            className="form-control form-control-sm mx-2"
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.rate}
                            onChange={(e) => setBottomData({ ...bottomData, rate: e.target.value })}
                        />

                        <input
                            type="number"
                            className="form-control form-control-sm mx-2"
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.marPer}
                            onChange={(e) => setBottomData({ ...bottomData, marPer: e.target.value })}
                        />

                        <input
                            type="number"
                            className="form-control form-control-sm mx-2"
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.sRate}
                            onChange={(e) => setBottomData({ ...bottomData, sRate: e.target.value })}
                        />

                        <input
                            type="number"
                            className="form-control form-control-sm mx-2"
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.taxable}
                            onChange={(e) => setBottomData({ ...bottomData, taxable: e.target.value })}
                        />

                        <input
                            type="date"
                            className="form-control form-control-sm mx-2"
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.vatPer}
                            onChange={(e) => setBottomData({ ...bottomData, vatPer: e.target.value })}
                        />

                        <input
                            className="form-control form-control-sm mx-2"
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.vatAmt}
                            onChange={(e) => setBottomData({ ...bottomData, vatAmt: e.target.value })}
                        />

                        <input
                            className="form-control form-control-sm mx-2"
                            style={{ flex: '0 0 120px', height: '28px' }}
                            value={bottomData.amount}
                            onChange={(e) => setBottomData({ ...bottomData, amount: e.target.value })}
                        />

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
