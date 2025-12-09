import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./supQuot_css.css";
import axios from 'axios';




const SuppQuotation = () => {


    const [topData, setTopData] = useState({
        qNo: '',
        qDate: '',
        ledgerId: '',
        narration: '',
        terms: '',
        netAmount: '',
        totalTaxableAmt: '',
        totVatAmt: ''
    });

    const [bottomData, setBottomData] = useState({
        sNo: '',
        product: '',
        unitId: '',
        brand: '',
        qty: '',
        rate: '',
        marPer: '',
        sRate: '',
        taxable: '',
        vatPer: '',
        vatAmt: '',
        amount: '',
        description: '',
        productName: "",
        brandName: "",
        unitType: "",
        productId: '',
        brandId: "",

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
    const [productId, setProductId] = useState('');

    const [products, setProducts] = useState('');
    const [productQuery, setProductQuery] = useState("");
    const [showProductDropdown, setShowProductDropdown] = useState(false);

    const [brandList, setBrandList] = useState([]);
    const [brandId, setBrandId] = useState('');
    const [brandQuery, setBrandQuery] = useState('');
    const [showBrandDropdown, setShowBrandDropdown] = useState(false);

    const [suppQuot, setSuppQuot] = useState([]);
    const [suppQuotDet, setSuppQuotDet] = useState([]);
    const [sqId, setSqId] = useState(0); // or the actual Quotation ID

    const brandRef = useRef(null);
    const productRef = useRef(null);

    const [rows, setRows] = useState([]);
    const [description, setDescription] = useState('')
    const [projectId, setProjectId] = useState(null);
    const [editIndex, setEditIndex] = useState(null); // null means adding new row
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [rowToDelete, setRowToDelete] = useState(null);




    useEffect(() => {
        loadLedger();
        loadProjects();
        loadUnit();
        loadProduct();
        loadBrands();
        loadSupp();
        loadSuppDets();
        console.log("XXX : " + brandList);
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (brandRef.current && !brandRef.current.contains(event.target)) {
                setShowBrandDropdown(false);
            }
            if (productRef.current && !productRef.current.contains(event.target)) {
                setShowProductDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    const gapi = import.meta.env.VITE_API_URL;

    const loadLedger = async () => {
        try {
            const res = await axios.get(`${gapi}/ledger`)
            //console.log("Ledger API Response:", res.data);
            setLedgerList(res.data)
        } catch (err) {
            console.error("Ledger Load Error:", err)
        }
    }

    const loadProjects = async () => {
        try {
            const res = await axios.get(`${gapi}/project`);
            console.log("API RAW RESPONSE:", res);

            //console.log("LOAD PROJECTS RESPONSE:", res.data);
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
            //console.log("LOAD UNIT RESPONSE:", res.data);
            setUnitList(res.data)
        } catch (err) {
            console.error('Unit Load Error:', err)
        }
    }

    const loadProduct = async () => {
        try {
            const res = await axios.get(`${gapi}/productmasters`)
            //console.log("LOAD Product RESPONSE:", res.data);
            setProductList(res.data)
        } catch (err) {
            console.error('product fetching error', err);
            alert('Could not load product. Check API connection.');
        }
    }

    const loadBrands = async () => {
        try {
            const res = await axios.get(`${gapi}/brand`);
            //    console.log("LOAD Brand RESPONSE:", res.data);
            setBrandList(res.data);

        } catch (err) {
            console.error("Error fetching brands:", err);
            alert("Could not load brands. Please check API connection.");
        }
    };

    const loadSupp = async () => {
        try {
            const res = await axios.get(`${gapi}/tblSuppQuos`);
            console.log("LOAD table RESPONSE:", res.data);
            setSuppQuot(res.data)

        } catch (err) {
            console.error("Error fetching suppQuo:", err);
            alert("Could not load SuppQuotation. Please check API connection.");
        }
    }

    const loadSuppDets = async () => {
        try {
            const res = await axios.get(`${gapi}/tblSuppQuoDets`);
            console.log("LOAD detail RESPONSE:", res.data);
            setSuppQuotDet(res.data)
        } catch (err) {
            console.error("Error fetching suppQuo:", err);
            alert("Could not load SuppQuotationDetails. Please check API connection.");
        }
    }


    const handleKeyDown = (e, type) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'BackSpace') {
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
            if (type === "brand") {
                setShowBrandDropdown(true);
            }
        }
    }

    const handleAddRow = () => {
        // Validate minimal required fields before adding
        if (!bottomData.productId) {
            alert("Please select a product.");
            return;
        }

        const newRow = {
            SQDetId: 0,
            productId: Number(bottomData.productId) || 0,
            productName: bottomData.productName || "",
            brandId: Number(bottomData.brandId) || 0,
            brandName: bottomData.brandName || "",
            unitId: Number(bottomData.unitId) || 0,
            unitType: bottomData.unitType || "",
            qty: Number(bottomData.qty) || 0,
            rate: Number(bottomData.rate) || 0,
            marPer: Number(bottomData.marPer) || 0,
            sRate: Number(bottomData.sRate) || 0,
            taxable: Number(bottomData.taxable) || 0,
            vatPer: Number(bottomData.vatPer) || 0,
            vatAmt: Number(bottomData.vatAmt) || 0,
            amount: Number(bottomData.amount) || 0,
            description: bottomData.description || "",

        };

        // Add the new row to rows array
        setRows(prev => [...prev, newRow]);

        // Reset bottom inputs for next entry
        setBottomData({
            product: "",
            productId: "",
            productName: "",
            brand: "",
            brandId: "",
            brandName: "",
            unitId: "",
            unitType: "",
            qty: "",
            rate: "",
            marPer: "",
            sRate: "",
            taxable: "",
            vatPer: "",
            vatAmt: "",
            amount: "",
            description: "",
        });

        setProductQuery("");
        setBrandQuery("");
        setProductId("");
        setBrandId("");

        setShowProductDropdown(false);
        setShowBrandDropdown(false);

        // Focus first input for convenience
        document.getElementById("productInput")?.focus();
    };


    const handleSaveSuppQuo = async () => {
        try {


            const payload = {
                Create_By: 1,
                Create_On: new Date().toISOString(),

                LedgerId: topData.ledgerId,
                ProjectId: topData.projectId,
                SQNo: topData.qNo,
                SQDate: topData.qDate,

                Narration: topData.narration || "",
                Terms: topData.terms || "",

                TotTaxableAmt: rows.reduce((sum, r) => sum + Number(r.taxable || 0), 0),
                TotVatAmt: rows.reduce((sum, r) => sum + Number(r.vatAmt || 0), 0),

                NetAmount: rows.reduce((sum, r) => sum + Number(r.amount || 0), 0),

                SQId: 0
            };

            console.log("HEADER PAYLOAD:", payload);

            const res = await axios.post(`${gapi}/tblSuppQuos`, payload);

            console.log("HEADER SAVED:", res.data);

            // Return the created SQId. Try to read returned property in multiple casings
            return Number(res.data?.RefId) || 0;


        } catch (err) {
            console.error("❌ HEADER SAVE ERROR:", err);
            throw err;
        }
    };

    const saveSuppQuoDetails = async (sqId) => {
        if (!sqId || sqId <= 0) {
            throw new Error("Missing SQId for details save.");
        }
        const totalQty = rows.reduce((sum, r) => sum + Number(r.qty || 0), 0);
        const netAmt = rows.reduce((sum, r) => sum + Number(r.amount || 0), 0);

        // ✅ CALCULATE NRate (NetAmt / Qty)
        const nRate = totalQty > 0 ? netAmt / totalQty : 0;
        // Build detail objects and validate
        const detailItems = rows.map((r, index) => {
            return {
                SQDetId: r.SQDetId || 0,
                SQId: Number(sqId),
                SNo: index + 1,

                ProductId: Number(r.productId || 0),
                BrandId: Number(r.brandId || 0),
                UnitId: Number(r.unitId || 0),
                UnitType: r.unitType || "",

                Qty: Number(r.qty || 0),
                BRate: Number(r.rate || 0),
                ProfPer: Number(r.marPer || 0),
                SRate: Number(r.sRate || 0),

                Taxable: Number(r.taxable || 0),
                VatPer: Number(r.vatPer || 0),
                VatAmt: Number(r.vatAmt || 0),

                NetAmT: Number(r.amount || 0),
                Des: r.description || "",
                NRate: nRate,

            };
        });

        console.log("DETAIL ITEMS TO SEND (per-item):", detailItems);

        // Validate: ensure required fields are present. If any row lacks productId, skip or throw.
        for (let i = 0; i < detailItems.length; i++) {
            const it = detailItems[i];
            if (!it.ProductId || Number(it.ProductId) === 0) {
                // If you prefer to stop saving completely, throw. Otherwise skip.
                throw new Error(`Row ${i + 1} missing ProductId. Please select product for each row.`);
            }
            // optionally validate other required fields
        }

        // Post each detail item individually (backend expects single object per POST)
        try {
            const results = [];
            for (const item of detailItems) {
                // POST single object
                const res = await axios.post(`${gapi}/tblSuppQuoDets`, item);
                results.push(res.data);
                console.log("Saved detail:", res.data);
            }
            return results;
        } catch (err) {
            console.error("❌ DETAIL SAVE ERROR:", err);
            // If server returns .response.data include it
            console.error("Server response:", err.response?.data);
            throw err;
        }
    };



    const handleSave = async () => {
        if (!topData.ledgerId) {
            alert('please select a Ledger')
        }
        if (!topData.projectId) {
            alert("Please select a Project.");
            return;
        }
        if (!topData.qNo) {
            alert("Please enter Quotation No.");
            return;
        }
        if (!topData.qDate) {
            alert("Please select Quotation Date.");
            return;
        }


        try {
            console.log("🔥 Saving (Header + Details)...");

            // 1️⃣ Save header
            const sqId = await handleSaveSuppQuo();
            console.log("✔ New SQId:", sqId);

            // 2️⃣ Save detail rows
            await saveSuppQuoDetails(sqId);

            alert("Saved Successfully!");

            // 3️⃣ Reset everything properly AFTER save
            setTopData({
                ledgerId: "",
                projectId: "",
                qNo: "",
                qDate: "",
                narration: "",
                terms: "",

            });

            setRows([]);  // Clear all detail rows


            setLedger("");
            setLedgerQuery("");
            setProjectQuery("");
            setShowProductDropdown(false);
            setShowBrandDropdown(false);
            setShowLedgerDropdown(false);
            setShowProjectDropdown(false);

            // focus product input for next entry
            document.getElementById("productInput")?.focus();

        } catch (err) {
            console.error("❌ SAVE FAILED:", err);
            const serverMsg = err.response?.data || err.message;
            alert("Saving failed! " + (typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg)));
        }
    };


    const filteredLedger = ledgerList.filter(item =>
        item.LedgerName?.toLowerCase().includes(ledgerQuery.toLowerCase())
    );

    const projectsArray = Array.isArray(projects) ? projects : [];
    console.log('projects:', projects)
    const filteredProject = projectsArray.filter(item =>
        item.ProjName?.toLowerCase().includes(projectQuery.toLowerCase())
    );


    const filteredProduct = productList.filter(item =>
        item.ProductName?.toLowerCase().includes(productQuery.toLowerCase())
    );

    const filteredBrand = brandList.filter(item =>
        item.BrandName?.toLowerCase().includes(brandQuery.toLowerCase())
    );

    const calculateAll = (qty, rate, marPer, vatPer) => {
        qty = parseFloat(qty) || 0;
        rate = parseFloat(rate) || 0;
        marPer = parseFloat(marPer) || 0;
        vatPer = parseFloat(vatPer) || 0;

        // selling rate
        const marginValue = rate * (marPer / 100);
        const sRate = rate + marginValue;

        // taxable
        const taxable = qty * rate;

        // vat amount
        const vatAmt = (taxable * vatPer) / 100;

        // total
        const amount = taxable + vatAmt;

        return { sRate, taxable, vatAmt, amount };
    };

    const totalAmount = rows.reduce(
        (sum, r) => sum + Number(r.amount || 0), 0
    )

    const totalVatAmount = rows.reduce(
        (sum, r) => sum + Number(r.vatAmt || 0), 0
    )

    const totalActAmt = rows.reduce(
        (sum, r) => sum + Number(r.sRate || 0), 0
    )
    //Row Edit
    const handleEditRow = (index) => {
        const row = rows[index];
        setBottomData({
            sNo: index + 1,
            productId: row.productId,
            productName: row.productName,
            unitId: row.unitId,
            unitType: row.unitType,
            brandId: row.brandId,
            brandName: row.brandName,
            qty: row.qty,
            rate: row.rate,
            marPer: row.marPer,
            sRate: row.sRate,
            taxable: row.taxable,
            vatPer: row.vatPer,
            vatAmt: row.vatAmt,
            amount: row.amount,
        });
        setProductQuery(row.productName);
        setBrandQuery(row.brandName);
        setEditIndex(index);
        loadRowDataForEdit(index);
    };

    //Row Add/ Update
    const handleAddOrUpdateRow = () => {
        if (editIndex !== null) {
            // Update existing row
            const updatedRows = [...rows];
            updatedRows[editIndex] = { ...bottomData };
            setRows(updatedRows);
            setEditIndex(null); // reset edit mode
        } else {
            // Add new row
            setRows([...rows, { ...bottomData }]);
        }

        // Clear input fields after add/update
        setBottomData({
            sNo: '',
            productId: '',
            productName: '',
            unitId: '',
            unitType: '',
            brandId: '',
            brandName: '',
            qty: '',
            rate: '',
            marPer: '',
            sRate: '',
            taxable: '',
            vatPer: '',
            vatAmt: '',
            amount: '',
            description: ''
        });
        setProductQuery("");
        setBrandQuery("");
        setShowProductDropdown(false);
        setShowBrandDropdown(false);
    };

    // cancel edit row
    const handleCancelEdit = () => {
        setEditIndex(null); // exit edit mode
        setBottomData({
            sNo: '',
            productId: '',
            productName: '',
            unitId: '',
            unitType: '',
            brandId: '',
            brandName: '',
            qty: '',
            rate: '',
            marPer: '',
            sRate: '',
            taxable: '',
            vatPer: '',
            vatAmt: '',
            amount: '',
            description: ''
        });
        setProductQuery("");
        setBrandQuery("");
        setShowProductDropdown(false);
        setShowBrandDropdown(false);
    };

    const handleDeleteRow = (index) => {
        // Remove the row
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);

        // If deleted row was being edited, reset edit mode
        if (editIndex === index) {
            handleCancelEdit();
        }

        // If rows shift up, fix editIndex
        if (editIndex > index) {
            setEditIndex(editIndex - 1);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setRowToDelete(null);
    };


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
                    {/* 1st Row */}
                    <div className='container-fluid'>

                        <div className='row mb-3'>
                            {/* Q.No */}
                            <div className='col-lg-2 col-md-6 col-sm-12'>
                                {/* <label style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Q.No</label> */}
                                <label className='form-label fw-bold required '>QNo</label>
                                <input type="text" className="form-control" value={topData.qNo} onChange={e => setTopData({ ...topData, qNo: e.target.value })} />
                            </div>

                            {/* Q.Date */}
                            <div className='col-lg-2 col-md-6 col-sm-12 '>
                                {/* <label style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Q.Date</label> */}
                                <label className='form-label fw-bold required'>Q.Date</label>
                                <input type="date" className="form-control" value={topData.qDate} onChange={e => setTopData({ ...topData, qDate: e.target.value })} />
                            </div>

                            {/* Ledger */}
                            <div className='col-lg-4 col-md-6 col-sm-12'>
                                <label className='form-label fw-bold required'>Ledger</label>

                                {/* Ledger Input Box */}
                                <div style={{ position: 'relative' }}>
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

                                    {/* Ledger Dropdown */}
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
                                                    onMouseDown={(e) => {
                                                        e.preventDefault(); // prevents input from losing focus
                                                        setTopData({ ...topData, ledgerId: item.LedgerId });
                                                        setLedger(item.LedgerId);
                                                        setLedgerQuery(item.LedgerName);
                                                        setShowLedgerDropdown(false);
                                                    }}
                                                >
                                                    <div className="col-5">{item.LedgerName}</div>
                                                    <div className="col-3">{item.EPlace || "-"}</div>
                                                    <div className="col-4">{item.StateName || "-"}</div>
                                                </div>

                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Project Name */}
                            <div className='col-lg-4 col-md-6 col-sm-12'>
                                <label className='form-label fw-bold required'>Project Name</label>

                                {/* Project Input Box */}
                                <div style={{ position: 'relative' }}>
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
                                                    onMouseDown={(e) => {
                                                        e.preventDefault(); // prevents blur before click
                                                        setTopData({ ...topData, projectId: item.ProjId });
                                                        setProjectId(item.ProjId);
                                                        setProjectQuery(item.ProjName);
                                                        setShowProjectDropdown(false);
                                                    }}
                                                >
                                                    <div className="col-5">{item.ProjName}</div>
                                                </div>

                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Line
                    <div
                        style={{
                            height: '2px',
                            backgroundColor: '#5d8aa8',
                            marginTop: '15px',
                            marginBottom: '15px'
                        }}
                    ></div> */}

                    {/* 3rd Row Input Row */}
                    <div
                        className="d-flex justify-content-start mt-1"
                        style={{
                            width: '100%',
                            flexWrap: 'nowrap',
                            // overflowX: 'auto'
                        }}
                    >
                        {/* SNO */}
                        <div className="mx-2" style={{ flex: '0 0 120px' }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>S.No</label>
                            <input
                                className="form-control form-control-sm"
                                style={{ height: '28px' }}
                                value={bottomData.sNo}
                                onChange={(e) =>
                                    setBottomData({ ...bottomData, sNo: e.target.value })
                                }
                                disabled
                            />
                        </div>


                        {/* Product */}
                        <div className="mx-2" style={{ flex: '0 0 200px', position: "relative" }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Product</label>
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
                                    if (productQuery.trim() !== "") setShowProductDropdown(true);
                                }}
                                onKeyDown={(e) => handleKeyDown(e, "product")}
                            />
                            {/* Product Dropdown */}
                            {showProductDropdown && (
                                <div
                                    ref={productRef}
                                    className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                    style={{
                                        top: "100%",
                                        left: 0,
                                        maxHeight: "250px",
                                        overflowY: "auto",
                                        zIndex: 9999
                                    }}
                                >
                                    <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                        <div className="col-5">Name</div>
                                    </div>

                                    {filteredProduct.map((item) => (
                                        <div
                                            key={item.ProductID}
                                            className="d-flex px-2 py-2 border-bottom hover-bg"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setProductId(item.ProductID);
                                                const rate = item.URate ?? bottomData.rate ?? 0;
                                                setBottomData((prev) => ({
                                                    ...prev,
                                                    productId: item.ProductID,
                                                    productName: item.ProductName,
                                                    product: item.ProductName,
                                                    // AUTO LOAD THESE
                                                    vatPer: item.VatPer || 0,
                                                    unitId: item.UnitId,
                                                    unitType: item.UnitType,
                                                    rate: rate,
                                                    qty: prev.qty || "",
                                                    marPer: prev.marPer || "",
                                                    sRate: prev.sRate || "",
                                                    taxable: prev.taxable || "",
                                                    vatAmt: prev.vatAmt || "",
                                                    amount: prev.amount || "",


                                                }));
                                                setProductId(item.ProductID);
                                                setProductQuery(item.ProductName);
                                                setShowProductDropdown(false);


                                            }}
                                        >
                                            <div className="col-5">{item.ProductName}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Unit */}
                        <div className="mx-2" style={{ flex: '0 0 120px' }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Unit</label>
                            <select
                                className="form-select form-select-sm"
                                style={{ height: '28px' }}
                                value={bottomData.unitId || ""}
                                onChange={(e) => {
                                    const selectedId = Number(e.target.value);
                                    const selectedUnit = unitList.find(u => u.UnitId === selectedId);

                                    setBottomData({
                                        ...prev,           // ✅ use bottomData, not prev
                                        unitId: selectedId,
                                        unitType: selectedUnit?.UnitType || "",

                                    });
                                }}
                                disabled
                            >
                                <option value="">-- Select --</option>
                                {unitList.map((u) => (
                                    <option key={u.UnitId} value={u.UnitId}>
                                        {u.UnitType}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Brand */}
                        <div ref={brandRef} className="mx-2" style={{ flex: '0 0 200px', position: "relative" }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Brand</label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Brand..."
                                value={brandQuery}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setBrandQuery(value);
                                    setShowBrandDropdown(value.trim() !== "");
                                }}
                                onFocus={() => {
                                    if (brandQuery.trim() !== '') setShowBrandDropdown(true);
                                }}
                                onKeyDown={(e) => handleKeyDown(e, 'brand')}
                                // onBlur={() => {
                                //     setTimeout(() => {
                                //         setShowBrandDropdown(false);
                                //         console.log('onBlur')
                                //     }, 150);
                                // }}
                                style={{ height: "28px" }}
                            />
                            {/* Brand - Dropdown */}
                            {showBrandDropdown && (
                                <div
                                    className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                    style={{
                                        top: "100%",
                                        left: 0,
                                        maxHeight: "250px",
                                        overflowY: "auto",
                                        zIndex: 9999
                                    }}
                                >
                                    {/* Header */}
                                    <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                        <div className="col-12">Brand</div>
                                    </div>

                                    {/* List Items */}
                                    {filteredBrand.map((item) => (
                                        <div
                                            key={item.BrandId}
                                            className="d-flex px-2 py-2 border-bottom hover-bg"
                                            style={{ cursor: "pointer" }}

                                            onClick={() => {
                                                setBrandId(item.BrandId);

                                                setBottomData(prev => ({
                                                    ...prev,
                                                    brandId: item.BrandId,
                                                    brandName: item.BrandName,
                                                    brand: item.BrandName   // <-- REQUIRED
                                                }));
                                                setBrandId(item.BrandId);
                                                setBrandQuery(item.BrandName);
                                                setShowBrandDropdown(false);

                                            }}

                                            onMouseEnter={(e) => e.currentTarget.classList.add("bg-light")}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove("bg-light")}
                                        >
                                            <div className="col-12">{item.BrandName}</div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Qty */}
                        <div className="mx-2" style={{ flex: '0 0 70px' }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Qty</label>
                            <input
                                className="form-control form-control-sm"
                                style={{ height: '28px' }}
                                value={bottomData.qty ?? ''}
                                onChange={(e) => {
                                    const qty = e.target.value;
                                    console.log("👉 Qty Changed:", qty);
                                    console.log("Current Rate:", bottomData.rate);

                                    const { sRate, taxable, vatAmt, amount } = calculateAll(
                                        qty,
                                        bottomData.rate,
                                        bottomData.marPer,
                                        bottomData.vatPer
                                    );

                                    setBottomData(prev => ({
                                        ...prev,
                                        qty,
                                        sRate,
                                        taxable,
                                        vatAmt,
                                        amount
                                    }));
                                }}

                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        document.getElementById("rateInput")?.focus();
                                    }
                                }}


                            />
                        </div>

                        {/* Rate */}
                        <div className="mx-2" style={{ flex: '0 0 120px' }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Rate</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                style={{ height: '28px' }}
                                value={bottomData.rate ?? ''}
                                onChange={(e) => {
                                    const rate = e.target.value;

                                    const { sRate, taxable, vatAmt, amount } = calculateAll(
                                        bottomData.qty,
                                        rate,
                                        bottomData.marPer,
                                        bottomData.vatPer
                                    );

                                    setBottomData(prev => ({
                                        ...prev,
                                        rate,
                                        sRate,
                                        taxable,
                                        vatAmt,
                                        amount
                                    }));
                                }}

                            />
                        </div>

                        {/* Mar Per */}
                        <div className="mx-2" style={{ flex: '0 0 120px' }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Mar%</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                style={{ height: '28px' }}
                                value={bottomData.marPer}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddRow();
                                    }
                                }}
                                onChange={(e) => {
                                    const marPer = e.target.value;

                                    const { sRate, taxable, vatAmt, amount } = calculateAll(
                                        bottomData.qty,
                                        bottomData.rate,
                                        marPer,
                                        bottomData.vatPer
                                    );

                                    setBottomData(prev => ({
                                        ...prev,
                                        marPer,
                                        sRate,
                                        taxable,
                                        vatAmt,
                                        amount
                                    }));
                                }}

                            />
                        </div>
                        {/* SRate */}
                        <div className="mx-2" style={{ flex: '0 0 120px' }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>SRate</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                style={{ height: '28px' }}
                                value={bottomData.sRate}
                                onChange={(e) => setBottomData({ ...bottomData, sRate: e.target.value })}
                            />
                        </div>
                        {/* Taxable */}
                        <div className="mx-2" style={{ flex: '0 0 120px' }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Taxable</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                style={{ height: '28px' }}
                                value={bottomData.taxable}
                                onChange={(e) => setBottomData({ ...bottomData, taxable: e.target.value })}
                                disabled
                            />
                        </div>
                        {/* Vat % */}
                        <div className="mx-2" style={{ flex: '0 0 120px' }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Vat %</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                style={{ height: '28px' }}
                                value={bottomData.vatPer}
                                onChange={(e) => setBottomData({ ...bottomData, vatPer: e.target.value })}
                            />
                        </div>
                        {/* Vat Amt */}
                        <div className="mx-2" style={{ flex: '0 0 120px' }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Vat Amt</label>
                            <input
                                className="form-control form-control-sm"
                                style={{ height: '28px' }}
                                value={bottomData.vatAmt}
                                onChange={(e) => setBottomData({ ...bottomData, vatAmt: e.target.value })}
                                disabled
                            />
                        </div>
                        {/* NetAmt % */}
                        <div className="mx-2" style={{ flex: '0 0 120px' }}>
                            <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Amount</label>
                            <input
                                className="form-control form-control-sm"
                                style={{ height: '28px' }}
                                value={bottomData.amount}
                                onChange={(e) => setBottomData({ ...bottomData, amount: e.target.value })}
                                disabled
                            />
                        </div>

                    </div>
                    {/* 4th Row Input box - Description */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                        <textarea
                            placeholder='Type Description...'
                            className='form-control form-control-sm mt-1 '
                            rows={2}
                            value={bottomData.description}
                            style={{
                                width: '50%',
                                marginLeft: '2%'
                            }}
                            onChange={(e) => setBottomData(prev => ({ ...prev, description: e.target.value }))}
                        />
                        <button
                            className='btn btn-primary btn-sm'
                            onClick={handleAddOrUpdateRow}
                        >
                            {editIndex !== null ? 'Update' : 'Add'}
                        </button>
                    </div>
                    {/* Line */}
                    <div
                        style={{
                            height: '2px',
                            backgroundColor: '#5d8aa8',
                            marginTop: '15px',
                            marginBottom: '15px'
                        }}
                    ></div>
                    {/* 5 th Dets Area -  */}
                    {/* 5th Details Area */}
                    <div
                        className="mt-3 px-2 px-md-3"
                        style={{
                            border: '2px solid #5d8aa8',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                            minHeight: '300px',
                            padding: '10px',
                            overflowX: "auto"   // prevents overflow issue
                        }}
                    >
                        <table className="table table-bordered table-sm" style={{ fontSize: "12px", minWidth: "1200px" }}>
                            <thead className="table-light">
                                <tr>
                                    <th style={{ width: "60px" }} className="text-center">S.No</th>
                                    <th style={{ width: "100px" }}>Product</th>
                                    <th style={{ width: "100px" }} className='text-center'>Unit</th>
                                    <th style={{ width: "100px" }}>Brand</th>
                                    <th style={{ width: "70px" }} className="text-center">Qty</th>
                                    <th style={{ width: "80px" }} className="text-end">Rate</th>
                                    <th style={{ width: "80px" }} className="text-center">Mar %</th>
                                    <th style={{ width: "100px" }} className="text-end">S.Rate</th>
                                    <th style={{ width: "100px" }} className="text-end">Taxable</th>
                                    <th style={{ width: "60px" }} className="text-center">VAT %</th>
                                    <th style={{ width: "80px" }} className="text-end">VAT Amt</th>
                                    <th style={{ width: "80px" }} className="text-end">Amount</th>
                                    <th style={{ width: "100px" }} className="text-end">Actions</th>

                                </tr>
                            </thead>

                            <tbody>
                                {rows.map((r, index) => (
                                    <tr key={index}
                                        className={editIndex === index ? "edit-highlight" : ""}
                                    >
                                        <td className="text-center">{index + 1}</td>
                                        <td>{r.productName}</td>
                                        <td className='text-center'>{r.unitType}</td>
                                        <td>{r.brandName}</td>
                                        <td className="text-center">{r.qty}</td>
                                        <td className="text-end">{r.rate}</td>
                                        <td className="text-center">{r.marPer}</td>
                                        <td className="text-end">{r.sRate}</td>
                                        <td className="text-end">{r.taxable}</td>
                                        <td className="text-center">{r.vatPer}</td>
                                        <td className="text-end">{r.vatAmt}</td>
                                        <td className="text-end">{r.amount}</td>
                                        <td className="text-center">
                                            {editIndex === index ? (
                                                // Show Cancel Edit ONLY for the selected row
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    style={{ padding: "0.2rem 0.4rem", fontSize: "10px", lineHeight: "1" }}
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel Edit
                                                </button>
                                            ) : (
                                                // When NOT editing -> show edit & delete
                                                // When editing -> hide them for all rows
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-secondary me-1"
                                                        style={{ padding: "0.2rem 0.4rem", fontSize: "10px", lineHeight: "1" }}
                                                        onClick={() => {

                                                            handleEditRow(index);
                                                            setEditIndex(index);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        style={{ padding: "0.2rem 0.4rem", fontSize: "10px", lineHeight: "1" }}
                                                        onClick={() => {
                                                            setRowToDelete(index);     // store which row to delete
                                                            setShowDeleteModal(true);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </>

                                            )}
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Delete Modal */}
                    {showDeleteModal && (
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Confirm Delete</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={cancelDelete}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>
                                            Are you sure you want to delete "

                                        </p>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={cancelDelete}
                                        >
                                            No
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                handleDeleteRow(rowToDelete); // delete now
                                                setShowDeleteModal(false);    // close modal
                                                setRowToDelete(null);
                                            }}>
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}



                    {/* Footer Summary Area */}
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
                                value={rows.length}
                                readOnly
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
                                    value={totalAmount}
                                    readOnly
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
                                    value={totalVatAmount}
                                    readOnly
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
                                    value={totalActAmt}
                                    readOnly
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
                            {/* Empty section - Dynamic Net Amount display */}
                            <div className="flex-grow-1 ps-3 d-flex justify-content-end align-items-center">
                                <div
                                    className="p-3 border rounded"
                                    style={{
                                        minWidth: '250px',          // adjust width as needed
                                        backgroundColor: '#f1f3f5', // light background
                                        textAlign: 'right',
                                    }}
                                >
                                    <div style={{ fontSize: '0.85rem', color: '#495057', marginBottom: '4px' }}>
                                        Net Amount
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000' }}>
                                        {rows.reduce((total, row) => total + Number(row.amount || 0), 0).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div
                        className=" d-flex justify-content-between"
                        style={{ gap: '15px' }}
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
                                value={topData.terms}
                                style={{
                                    resize: 'none',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                                onChange={(e) => setTopData(prev => ({ ...prev, terms: e.target.value }))}
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
                                value={topData.narration}
                                style={{
                                    resize: 'none',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                                onChange={(e) =>
                                    setTopData(prev => ({ ...prev, narration: e.target.value }))
                                }
                            ></textarea>
                        </div>
                    </div>
                    {/* buttons */}
                    <div
                        className="mt-1 d-flex justify-content-center flex-wrap"
                        style={{ gap: '8px' }}
                    >
                        <button className="btn btn-sm btn-primary">New</button>
                        <button className="btn btn-sm btn-secondary">Edit</button>
                        <button className="btn btn-sm btn-success" onClick={handleSave}>Save</button>
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
