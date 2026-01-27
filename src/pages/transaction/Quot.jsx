import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../api/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons'


const Quot = () => {
    const productInputRef = useRef(null);
    const unitInputRef = useRef(null);
    const brandInputRef = useRef(null);
    const [topData, setTopData] = useState({
        qNo: '',
        rNo: '',
        ledger: '',
        ledgerId: '',
        project: '',
        projectId: '',
        qDate: '',
        subject: '',
        payment: '',
        delivery: '',
        item: 0,
        qValidity: '',
        totalAmt: 0,
        totVatAmt: 0,
        totActAmt: 0,
        roundOff: '',
        notes: '',
        warranty: '',
        inclusion: '',
        exclusion: '',
        scope: '',
    });

    const [bottomData, setBottomData] = useState({
        sNo: '',
        product: '',
        productId: '',
        unitType: '',
        unitId: '',
        brand: '',
        brandId: '',
        qty: '',
        rate: '',
        taxable: '',
        vatPer: '',
        vatAmt: '',
        amount: '',
        description: '',
    })

    const [projectList, setProjectList] = useState([]);
    const [projectQuery, setProjectQuery] = useState('');
    const [showProjectDropdown, setShowProjectDropdown] = useState(false);
    const [activeProjectIndex, setActiveProjectIndex] = useState(-1);

    const [ledgerList, setLedgerList] = useState([]);
    const [ledgerQuery, setLedgerQuery] = useState('');
    const [showLedgerDropdown, setShowLedgerDropdown] = useState(false);
    const [activeLedgerIndex, setActiveLedgerIndex] = useState(-1);

    const [productList, setProductList] = useState([]);   // API data
    const [productQuery, setProductQuery] = useState("");
    const [showProductDropdown, setShowProductDropdown] = useState(false);
    const [activeProductIndex, setActiveProductIndex] = useState(-1);

    const [unitList, setUnitList] = useState([]);
    const [unitQuery, setUnitQuery] = useState("");
    const [showUnitDropdown, setShowUnitDropdown] = useState(false);
    const [activeUnitIndex, setActiveUnitIndex] = useState(-1);

    const [brandList, setBrandList] = useState([]);
    const [brandQuery, setBrandQuery] = useState("");
    const [showBrandDropdown, setShowBrandDropdown] = useState(false);
    const [activeBrandIndex, setActiveBrandIndex] = useState(-1);

    const [rows, setRows] = useState([]);


    const gapi = import.meta.env.VITE_API_URL;

    useEffect(() => {
        loadProject();
        loadLedgers();
        loadProduct();
        loadUnit();
        loadBrands();

    }, [])

    const loadProject = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/project/list`)
            console.log('project res:', res.data)
            setProjectList(res.data.Data)
        } catch (err) {
            console.error('Project load error:', err)
        }
    }

    const handleProjectChange = (e) => {
        const value = e.target.value;
        setProjectQuery(value);
        setShowProjectDropdown(value.trim() !== "");
        setActiveProjectIndex(-1);
    };

    const handleProjectSelect = (item) => {
        setProjectQuery(item.ProjName);

        setTopData(prev => ({
            ...prev,
            project: item.ProjName,
            projectId: item.ProjId
        }));

        setShowProjectDropdown(false);
        setActiveProjectIndex(-1);
    };

    const filteredProject = projectList.filter(item =>
        (item?.ProjName || "").toLowerCase().includes(
            (projectQuery || "").toLowerCase()
        )
    );

    const handleProjectKeyDown = (e) => {
        if (!showProjectDropdown || filteredProject.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveProjectIndex(prev =>
                prev < filteredProject.length - 1 ? prev + 1 : prev
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveProjectIndex(prev =>
                prev > 0 ? prev - 1 : 0
            );
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (activeProjectIndex >= 0) {
                const selected = filteredProject[activeProjectIndex];

                handleProjectSelect(selected); // 👈 reuse
                setShowProjectDropdown(false);
                setActiveProjectIndex(-1);
            }
        }
    };


    const loadLedgers = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/ledger/list`)
            console.log('ledgers res:', res.data)
            setLedgerList(res.data.Data)
        } catch (err) {
            console.error('Ledger Load Error:', err)
        }
    }
    const filteredLedger = ledgerList.filter(item =>
        item.LedgerName?.toLowerCase().includes(ledgerQuery.toLowerCase())
    );


    const handleLedgerChange = (e) => {
        const value = e.target.value;
        setLedgerQuery(value);
        setShowLedgerDropdown(value.trim() !== "");
        setActiveLedgerIndex(-1);
    }

    const handleLedgerKeyDown = (e) => {
        if (!showLedgerDropdown || filteredLedger.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveLedgerIndex(prev =>
                prev < filteredLedger.length - 1 ? prev + 1 : prev
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveLedgerIndex(prev =>
                prev > 0 ? prev - 1 : 0
            );
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (activeLedgerIndex >= 0) {
                const selected = filteredLedger[activeLedgerIndex];


                setTopData(prev => ({                 // top section
                    ...prev,
                    ledger: selected.LedgerName,
                    ledgerId: selected.LedgerId
                }));

                setLedgerQuery(selected.LedgerName);
                setShowLedgerDropdown(false);
                setActiveLedgerIndex(-1);
            }
        }
    };

    const loadProduct = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/product/list`)
            //console.log("LOAD Product RESPONSE:", res.data);
            setProductList(res.data.Data)
        } catch (err) {
            console.error('product fetching error', err);
        }
    }

    const filteredProduct = productList.filter(item =>
        (item.ProductName || "").toLowerCase().includes(
            (productQuery || "").toLowerCase()
        )
    );

    const handleProductKeyDown = (e) => {
        if (!showProductDropdown || filteredProduct.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveProductIndex(prev =>
                prev < filteredProduct.length - 1 ? prev + 1 : prev
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveProductIndex(prev =>
                prev > 0 ? prev - 1 : 0
            );
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (activeProductIndex >= 0) {
                const item = filteredProduct[activeProductIndex];
                selectProduct(item);
            }
        }
    };

    const handleProductChange = (e) => {
        const value = e.target.value;
        setProductQuery(value);
        setShowProductDropdown(value.trim() !== "");
        setActiveProductIndex(-1);
    }

    const handleTopChange = (e) => {
        const { name, value } = e.target;
        setTopData((prev) => ({ ...prev, [name]: value }))
    }

    const handleBottomChange = (e) => {
        const { name, value } = e.target;
        setBottomData((prev) => ({ ...prev, [name]: value }))
    }

    const selectProduct = (item) => {
        setProductQuery(item.ProductName);  // Product name
        setUnitQuery(item.UnitType || ""); // Unit auto fill
        setBottomData(prev => ({
            ...prev,
            product: item.ProductName,
            productId: item.ProductID,
            productName: item.ProductName,
            unit: item.UnitType,
            rate: item.URate ?? '',
            unitId: item.UnitId || "",
            unitType: item.UnitType,
            vatPer: item.VatPer || "",
        }));

        setShowProductDropdown(false);
        setActiveProductIndex(-1);
    };

    const loadUnit = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/unit/list`);
            console.log("LOAD UNIT RESPONSE:", res.data);
            setUnitList(res.data.Data)
        } catch (err) {
            console.error('Unit Load Error:', err)
        }
    }

    const selectUnit = (item) => {
        setUnitQuery(item.UnitType);

        setBottomData(prev => ({
            ...prev,
            unit: item.UnitType,
            unitId: item.UnitId
        }));

        setShowUnitDropdown(false);
        setActiveUnitIndex(-1);
    };

    const handleUnitKeyDown = (e) => {
        if (!showUnitDropdown || filteredUnit.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveUnitIndex(prev =>
                prev < filteredUnit.length - 1 ? prev + 1 : prev
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveUnitIndex(prev =>
                prev > 0 ? prev - 1 : 0
            );
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (activeUnitIndex >= 0) {
                selectUnit(filteredUnit[activeUnitIndex]);
            }
        }
    };

    const filteredUnit = unitList.filter(u =>
        (u.UnitType || '').toLowerCase().includes(
            (unitQuery || '').toLowerCase()
        )
    );

    const loadBrands = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/brand/list`);
            //    console.log("LOAD Brand RESPONSE:", res.data);
            setBrandList(res.data.Data);

        } catch (err) {
            console.error("Error fetching brands:", err);
        }
    };

    const filteredBrand = brandList.filter(item =>
        item.BrandName?.toLowerCase().includes(
            (brandQuery || '').toLowerCase()
        )
    );

    const selectBrand = (item) => {
        setBrandQuery(item.BrandName);

        setBottomData(prev => ({
            ...prev,
            brand: item.BrandName,
            brandId: item.BrandId,
            brandName: item.BrandName
        }));

        setShowBrandDropdown(false);
        setActiveBrandIndex(-1);
    };

    const handleBrandKeyDown = (e) => {
        if (!showBrandDropdown || filteredBrand.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveBrandIndex(prev =>
                prev < filteredBrand.length - 1 ? prev + 1 : prev
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveBrandIndex(prev =>
                prev > 0 ? prev - 1 : 0
            );
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (activeBrandIndex >= 0) {
                selectBrand(filteredBrand[activeBrandIndex]);
            }
        }
    };

    const calculateAll = (qty, rate, vatPer) => {
        qty = parseFloat(qty) || 0;
        rate = parseFloat(rate) || 0;
        vatPer = parseFloat(vatPer) || 0;



        // taxable
        const taxable = qty * rate;

        // vat amount
        const vatAmt = (taxable * vatPer) / 100;

        // total
        const amount = taxable + vatAmt;

        return { taxable, vatAmt, amount };
    };

    const totalAmount = rows.reduce(
        (sum, r) => sum + Number(r.taxable || 0), 0
    )

    const totalVatAmount = rows.reduce(
        (sum, r) => sum + Number(r.vatAmt || 0), 0
    )

    const totalActAmt = rows.reduce(
        (sum, r) => sum + Number(r.amount || 0), 0
    )

    const handleAddOrUpdateRow = () => {
        if (editIndex !== null) {
            // Update existing row
            const updatedRows = [...rows];
            updatedRows[editIndex] = {
                ...bottomData,
                productName: productQuery,
                brandName: brandQuery,
                unitType: unitQuery,
            };
            setRows(updatedRows);
            setEditIndex(null); // reset edit mode
        } else {
            // Add new row
            setRows([...rows, {
                ...bottomData,
                productName: productQuery,
                brandName: brandQuery,
                unitType: unitQuery
            }]);
        }

        // Clear input fields after add/update
        setBottomData({
            sNo: '',
            productId: '',
            productName: '',
            unitId: '',
            unit: '',
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
        setUnitQuery('');
        setShowProductDropdown(false);
        setShowBrandDropdown(false);
    };


    const highlightText = (text, search) => {
        if (!search || !text) return text;

        const regex = new RegExp(`(${search})`, 'ig');
        const parts = text.toString().split(regex);

        return parts.map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <span
                    key={index}
                    style={{
                        backgroundColor: '#ffc107',
                        fontWeight: 'bold',
                        padding: '0 2px'
                    }}
                >
                    {part}
                </span>
            ) : (
                part
            )
        );
    };


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
                    <h4 className='mb-0'><FontAwesomeIcon icon={faReceipt} className="me-2" />Quotation</h4>
                </div>

                {/* Body */}
                <div
                    className='card-body'
                    style={{
                        height: 'calc(100vh - 200px)',
                        overflow: 'auto'
                    }}
                >

                    <div className="d-flex  flex-lg-row flex-column" style={{ width: "100%" }}>

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
                                            name='qNo'
                                            value={topData.qNo}
                                            onChange={handleTopChange}
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
                                            name='rNo'
                                            value={topData.rNo}
                                            onChange={handleTopChange}
                                        />
                                    </div>
                                </div>

                                {/* Project */}
                                <div className="col-12 col-md-6 col-lg-4  ">
                                    <div className="d-flex align-items-center gap-2"
                                        style={{ position: 'relative', width: '100%' }}
                                    >
                                        <label className="form-label fw-bold" style={{ whiteSpace: 'nowrap' }}>Project</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="🔎 Search Project..."
                                            onChange={handleProjectChange}
                                            onKeyDown={handleProjectKeyDown}
                                            value={projectQuery}
                                            onFocus={() => projectQuery && setShowProjectDropdown(true)}
                                            onBlur={() => setTimeout(() => setShowProjectDropdown(false), 150)}
                                        />
                                        {/* Dropdown */}
                                        {showProjectDropdown && (
                                            <div
                                                className="position-absolute bg-white border shadow-sm"
                                                style={{
                                                    top: '100%',
                                                    left: '60px',
                                                    width: 'calc(100% - 60px)',
                                                    maxHeight: '200px',
                                                    overflowY: 'auto',
                                                    zIndex: 9999
                                                }}
                                            >
                                                {filteredProject.length > 0 ? (
                                                    <>
                                                        <div className="fw-bold border-bottom bg-light px-2 py-2">
                                                            Name
                                                        </div>

                                                        {filteredProject.map((item, index) => (
                                                            <div
                                                                key={item.ProjId}
                                                                className={`px-2 py-2 border-bottom ${index === activeProjectIndex
                                                                    ? "bg-secondary text-white"
                                                                    : "hover-bg"
                                                                    }`}
                                                                style={{ cursor: 'pointer' }}
                                                                onMouseEnter={() => setActiveProjectIndex(index)}
                                                                onMouseDown={() => handleProjectSelect(item)}
                                                            >
                                                                {highlightText(item.ProjName, projectQuery)}
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : (
                                                    /* 🔹 NO RESULT → ADD LEDGER */
                                                    <div
                                                        className="d-flex align-items-center px-2 py-2 text-primary fw-bold"
                                                        style={{ cursor: "pointer" }}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        onClick={() => {
                                                            // STEP-2 la idha use pannuvom
                                                            setShowProjectModal(true);
                                                            setShowProjectDropdown(false);
                                                            setProjectName(projectQuery);
                                                        }}
                                                    >
                                                        <span className="me-2">+</span>
                                                        <span>Add Project</span><span className='ms-2'><i> (Click here to add a new Project)</i></span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Ledger */}
                                <div className="col-12 col-md-6 col-lg-4  ">
                                    <div className="d-flex align-items-center gap-2"
                                        style={{ position: 'relative', width: '100%' }}
                                    >
                                        <label className="form-label fw-bold" style={{ whiteSpace: 'nowrap' }}>Ledger</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="🔎 Search Ledger..."
                                            onChange={handleLedgerChange}
                                            value={ledgerQuery}
                                            onFocus={() => {
                                                if (ledgerQuery.trim() !== '') setShowLedgerDropdown(true);
                                            }}
                                            onKeyDown={handleLedgerKeyDown}
                                            onBlur={() => {
                                                setTimeout(() => setShowLedgerDropdown(false), 150);
                                            }}
                                        />

                                        {/* DROPDOWN */}
                                        {showLedgerDropdown && (
                                            <div
                                                className="position-absolute bg-white border shadow-sm"
                                                style={{
                                                    top: '100%',
                                                    left: '70px',                 // label width
                                                    width: 'calc(100% - 70px)',   // input width
                                                    maxHeight: '250px',
                                                    overflowY: 'auto',
                                                    zIndex: 9999
                                                }}
                                            >
                                                {filteredLedger.length > 0 ? (
                                                    <>
                                                        {/* Header */}
                                                        <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                            <div className="col-5">Name</div>
                                                            <div className="col-3">Place</div>
                                                            <div className="col-4">State</div>
                                                        </div>

                                                        {/* Rows */}
                                                        {filteredLedger.map((item, index) => (
                                                            <div
                                                                key={item.LedgerId}
                                                                className={`d-flex px-2 py-2 border-bottom ${index === activeLedgerIndex
                                                                    ? "bg-secondary text-white"
                                                                    : "hover-bg"
                                                                    }`}
                                                                style={{ cursor: 'pointer' }}
                                                                onMouseEnter={() => setActiveLedgerIndex(index)}
                                                                onClick={() => {

                                                                    setLedgerQuery(item.LedgerName);

                                                                    setTopData(prev => ({
                                                                        ...prev,
                                                                        ledger: item.LedgerName,
                                                                        ledgerId: item.LedgerId
                                                                    }));

                                                                    setShowLedgerDropdown(false);
                                                                    setActiveLedgerIndex(-1);
                                                                }}
                                                            >
                                                                <div className="col-5"> {highlightText(item.LedgerName, ledgerQuery)}</div>
                                                                <div className="col-3">{highlightText(item.EPlace || "-", ledgerQuery)}</div>
                                                                <div className="col-4">{highlightText(item.StateName || "-", ledgerQuery)}</div>
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : (
                                                    /* 🔹 NO RESULT → ADD LEDGER */
                                                    <div
                                                        className="d-flex align-items-center px-2 py-2 text-primary fw-bold"
                                                        style={{ cursor: "pointer" }}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        onClick={() => {
                                                            // STEP-2 la idha use pannuvom
                                                            setShowLedgerModal(true);
                                                            setShowLedgerDropdown(false);
                                                            setLedgerName(ledgerQuery);
                                                        }}
                                                    >
                                                        <span className="me-2">+</span>
                                                        <span>Add Ledger</span><span className='ms-2'><i> (Click here to add a new Ledger)</i></span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
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
                                            name='qDate'
                                            value={topData.qDate}
                                            onChange={handleTopChange}
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
                                            name='subject'
                                            value={topData.subject}
                                            onChange={handleTopChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className='mt-1 mb-1' />
                            {/* 10 Bottom Input Boxes */}
                            <div className="table-responsive" >
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
                                                <label className="form-label fw-bold mb-1">S.No</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    name='sNo'
                                                    value={bottomData.sNo}
                                                    onChange={handleBottomChange}
                                                    disabled
                                                />
                                            </div>

                                            {/* Product */}
                                            <div style={{ flex: '0 0 220px' }}>
                                                <div
                                                    style={{ position: 'relative', width: '100%', overflow: 'visible' }}
                                                >
                                                    <label className="form-label fw-bold mb-1">Product</label>
                                                    <input
                                                        className="form-control form-control-sm"
                                                        onChange={handleProductChange}
                                                        placeholder="🔎 Search Product..."
                                                        ref={productInputRef}
                                                        value={productQuery}

                                                        onFocus={() => {
                                                            if (productQuery.trim() !== "")
                                                                setShowProductDropdown(true);
                                                        }}
                                                        onKeyDown={handleProductKeyDown}

                                                    />
                                                    {/* DROPDOWN */}
                                                    {showProductDropdown && productInputRef.current && (

                                                        <div
                                                            className="position-fixed bg-white border shadow-sm "
                                                            style={{
                                                                top:
                                                                    productInputRef.current.getBoundingClientRect().bottom,
                                                                left:
                                                                    productInputRef.current.getBoundingClientRect().left,
                                                                width:
                                                                    productInputRef.current.getBoundingClientRect().width,
                                                                maxHeight: '250px',
                                                                overflowY: 'auto',
                                                                zIndex: 9999
                                                            }}
                                                        >
                                                            {filteredProduct.length > 0 ? (
                                                                <>
                                                                    {/* Header */}
                                                                    <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                                        <div className="col-7">Name</div>
                                                                    </div>

                                                                    {/* Rows */}
                                                                    {filteredProduct.map((item, index) => (
                                                                        <div
                                                                            key={item.ProductID}
                                                                            className={`d-flex px-2 py-2 border-bottom
                                                                             ${index === activeProductIndex
                                                                                    ? "bg-secondary text-white"
                                                                                    : "hover-bg"
                                                                                }`}
                                                                            style={{ cursor: 'pointer' }}
                                                                            onMouseEnter={() =>
                                                                                setActiveProductIndex(index)
                                                                            }
                                                                            onMouseDown={(e) => {
                                                                                e.preventDefault();
                                                                                selectProduct(item);
                                                                            }}
                                                                        >
                                                                            <div className="col-7">
                                                                                {highlightText(item.ProductName, productQuery)}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            ) : (
                                                                /* 🔹 NO RESULT → ADD LEDGER */
                                                                <div
                                                                    className="d-flex align-items-center px-2 py-2 text-primary fw-bold"
                                                                    style={{ cursor: "pointer" }}
                                                                    onMouseDown={(e) => {
                                                                        e.preventDefault();
                                                                        selectProduct(item);
                                                                    }}
                                                                    onClick={() => {
                                                                        // STEP-2 la idha use pannuvom
                                                                        setShowProductModal(true);
                                                                        setShowProductDropdown(false);
                                                                        setProductName(productQuery);
                                                                    }}
                                                                >
                                                                    <span className="me-2">+</span>
                                                                    <span>Add Product</span><span className='ms-2'><i> (Click here to add a new Product)</i></span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Unit */}
                                            <div style={{ flex: '120px' }}>
                                                <div style={{ position: 'relative', width: '100%' }}>
                                                    <label className="form-label fw-bold mb-1">Unit</label>

                                                    <input
                                                        ref={unitInputRef}
                                                        className="form-control form-control-sm"
                                                        value={unitQuery}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setUnitQuery(value);
                                                            setShowUnitDropdown(value.trim() !== "");
                                                            setActiveUnitIndex(-1);
                                                        }}
                                                        onFocus={() => {
                                                            if (unitQuery.trim() !== "")
                                                                setShowUnitDropdown(true);
                                                        }}
                                                        onKeyDown={handleUnitKeyDown}
                                                    />

                                                    {/* DROPDOWN */}
                                                    {showUnitDropdown && unitInputRef.current && (
                                                        <div
                                                            className="position-fixed bg-white border shadow-sm"
                                                            style={{
                                                                top: unitInputRef.current.getBoundingClientRect().bottom,
                                                                left: unitInputRef.current.getBoundingClientRect().left,
                                                                width: unitInputRef.current.getBoundingClientRect().width,
                                                                maxHeight: '160px',
                                                                overflowY: 'auto',
                                                                zIndex: 9999
                                                            }}
                                                        >
                                                            {filteredUnit.map((u, index) => (
                                                                <div
                                                                    key={u.UnitId}
                                                                    className={`px-2 py-1 border-bottom
                                                                      ${index === activeUnitIndex
                                                                            ? "bg-secondary text-white"
                                                                            : "hover-bg"
                                                                        }`}
                                                                    style={{ cursor: 'pointer' }}
                                                                    onMouseEnter={() => setActiveUnitIndex(index)}
                                                                    onMouseDown={(e) => {
                                                                        e.preventDefault();   // 🔥 IMPORTANT
                                                                        selectUnit(u);
                                                                    }}
                                                                >
                                                                    {u.UnitType}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>



                                            {/* Brand */}
                                            <div style={{ flex: '0 0 150px' }} >
                                                <div style={{ position: 'relative', width: '100%' }}>

                                                    {/* LABEL */}
                                                    <label className="form-label fw-bold mb-1">
                                                        Brand<span className='required'>*</span>
                                                    </label>

                                                    {/* INPUT */}
                                                    <input
                                                        ref={brandInputRef}
                                                        type="text"
                                                        className="form-control form-control-sm fw-bold"
                                                        placeholder="🔎 Search Brand..."
                                                        value={brandQuery}
                                                        autoComplete="off"
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setBrandQuery(value);
                                                            setShowBrandDropdown(value.trim() !== "");
                                                            setActiveBrandIndex(-1);
                                                        }}
                                                        onFocus={() => {
                                                            if (brandQuery.trim() !== "")
                                                                setShowBrandDropdown(true);
                                                        }}
                                                        onKeyDown={handleBrandKeyDown}
                                                    />

                                                    {/* DROPDOWN */}
                                                    {showBrandDropdown && brandInputRef.current && (
                                                        <div
                                                            className="position-fixed bg-white border shadow-sm"
                                                            style={{
                                                                top: brandInputRef.current.getBoundingClientRect().bottom,
                                                                left: brandInputRef.current.getBoundingClientRect().left,
                                                                width: brandInputRef.current.getBoundingClientRect().width,
                                                                maxHeight: '200px',
                                                                overflowY: 'auto',
                                                                zIndex: 9999
                                                            }}
                                                        >
                                                            {filteredBrand.length > 0 ? (
                                                                <>
                                                                    {/* Header */}
                                                                    <div className="fw-bold border-bottom bg-light px-2 py-2">
                                                                        Brand Name
                                                                    </div>

                                                                    {/* Rows */}
                                                                    {filteredBrand.map((item, index) => (
                                                                        <div
                                                                            key={item.BrandId}
                                                                            className={`px-2 py-2 border-bottom
                                                                        ${index === activeBrandIndex
                                                                                    ? "bg-secondary text-white"
                                                                                    : "hover-bg"
                                                                                }`}
                                                                            style={{ cursor: 'pointer' }}
                                                                            onMouseEnter={() =>
                                                                                setActiveBrandIndex(index)
                                                                            }
                                                                            onMouseDown={(e) => {
                                                                                e.preventDefault();
                                                                                selectBrand(item);
                                                                                setShowBrandDropdown(false);
                                                                            }}
                                                                        >
                                                                            {highlightText(item.BrandName, brandQuery)}
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            ) : (
                                                                /* ADD BRAND */
                                                                <div
                                                                    className="d-flex align-items-center px-2 py-2 text-primary fw-bold"
                                                                    style={{ cursor: "pointer" }}
                                                                    onMouseDown={(e) => e.preventDefault()}
                                                                    onClick={() => {
                                                                        setShowBrandDropdown(false);
                                                                        setShowBrandModal(true);
                                                                    }}
                                                                >
                                                                    <span className="me-2">+</span>
                                                                    <span>Add Brand</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>


                                            {/* Qty */}
                                            <div style={{ width: '80px' }}>
                                                <label className="form-label fw-bold mb-1">Qty</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    name='qty'
                                                    value={bottomData.qty}
                                                    onChange={(e) => {
                                                        const qty = e.target.value;
                                                        const { taxable, vatAmt, amount } = calculateAll(
                                                            qty,
                                                            bottomData.rate,
                                                            bottomData.vatPer
                                                        );
                                                        setBottomData(prev => ({
                                                            ...prev,
                                                            qty,
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
                                            <div style={{ width: '90px' }}>
                                                <label className="form-label fw-bold mb-1">Rate</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    name='rate'
                                                    value={bottomData.rate}
                                                    onChange={(e) => {
                                                        const rate = e.target.value;
                                                        const { taxable, vatAmt, amount } = calculateAll(
                                                            bottomData.qty,
                                                            rate,
                                                            bottomData.vatPer
                                                        );

                                                        setBottomData(prev => ({
                                                            ...prev,
                                                            rate,
                                                            taxable,
                                                            vatAmt,
                                                            amount
                                                        }));
                                                    }}
                                                />
                                            </div>

                                            {/* Taxable */}
                                            <div style={{ width: '100px' }}>
                                                <label className="form-label fw-bold mb-1">Taxable</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    name='taxable'
                                                    value={bottomData.taxable}
                                                    onChange={handleBottomChange}
                                                    disabled
                                                />
                                            </div>

                                            {/* VAT % */}
                                            <div style={{ width: '70px' }}>
                                                <label className="form-label fw-bold mb-1">VAT%</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    name='vatPer'
                                                    value={bottomData.vatPer}
                                                    onChange={handleBottomChange}
                                                />
                                            </div>

                                            {/* VAT Amt */}
                                            <div style={{ width: '100px' }}>
                                                <label className="form-label fw-bold mb-1">VAT Amt</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    name='vatAmt'
                                                    value={bottomData.vatAmt}
                                                    onChange={handleBottomChange}
                                                    disabled
                                                />
                                            </div>

                                            {/* Amount */}
                                            <div style={{ width: '110px' }}>
                                                <label className="form-label fw-bold mb-1">Amount</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    disabled
                                                    name='amount'
                                                    value={bottomData.amount}
                                                    onChange={handleBottomChange}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* TextArea Box */}
                            <div className='d-flex align-items-center ' style={{ gap: '10px', marginTop: '5px' }}>
                                <textarea
                                    className='form-control form-control-sm mt-1 ms-0'
                                    name='description'
                                    value={bottomData.description}
                                    onChange={handleBottomChange}
                                    rows={2}
                                    style={{
                                        width: '50%',
                                        marginLeft: '0.5%'
                                    }}
                                />

                                <button
                                    className='btn btn-primary btn-sm' onClick={handleAddOrUpdateRow}>
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
                                    <input
                                        className="form-control form-control-sm"
                                        name='payment'
                                        value={topData.payment}
                                        onChange={handleBottomChange}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="fw-bold small">Delivery</label>
                                    <input
                                        className="form-control form-control-sm"
                                        name='delivery'
                                        value={topData.delivery}
                                        onChange={handleBottomChange}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="fw-bold small">Quotation Validity</label>
                                    <input
                                        className="form-control form-control-sm"
                                        name='qValidity'
                                        value={topData.qValidity}
                                        onChange={handleBottomChange}
                                    />
                                </div>

                                <hr />

                                {/* TOTALS */}
                                <div >
                                    <div className="d-flex align-items-center mb-2">
                                        <div className='col-2'>
                                            <label className="fw-bold small me-2 ">Item</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                className="form-control form-control-sm"
                                                name='item'
                                                value={topData.item}
                                                onChange={handleBottomChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <div className='col-2'>
                                            <label className="fw-bold small me-2 text-nowrap">Total Amt</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                className="form-control form-control-sm"
                                                name='totalAmt'
                                                value={topData.totalAmt}
                                                onChange={handleBottomChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <div className='col-2'>
                                            <label className="fw-bold small me-2 text-nowrap">Vat Amt</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                className="form-control form-control-sm"
                                                name='totVatAmt'
                                                value={topData.totVatAmt}
                                                onChange={handleBottomChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <div className='col-2'>
                                            <label className="fw-bold small me-2 text-nowrap">Act Amt</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                className="form-control form-control-sm"
                                                name='totActAmt'
                                                value={topData.totActAmt}
                                                onChange={handleBottomChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <div className='col-2'>
                                            <label className="fw-bold small me-2 text-nowrap">Round Off</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                className="form-control form-control-sm"
                                                name='roundOff'
                                                value={topData.roundOff}
                                                onChange={handleBottomChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="d-flex gap-2 flex-column flex-md-row">

                        {/* LEFT */}
                        <div style={{ width: "50%" }} className="col-md-6">
                            <label className="fw-bold small mb-1">Notes</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='notes'
                                value={topData.notes}
                                onChange={handleBottomChange}
                            />
                        </div>

                        {/* RIGHT */}
                        <div style={{ width: "50%" }} className="col-md-6">
                            <label className="fw-bold small mb-1">Warranty</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='warranty'
                                value={topData.warranty}
                                onChange={handleBottomChange}
                            />
                        </div>

                    </div>

                    <div className="d-flex gap-2 flex-column flex-md-row">

                        {/* LEFT */}
                        <div style={{ width: "50%" }} className="col-md-6">
                            <label className="fw-bold small mb-1">Inclusion</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='inclusion'
                                value={topData.inclusion}
                                onChange={handleBottomChange}
                            />
                        </div>

                        {/* RIGHT */}
                        <div style={{ width: "50%" }} className="col-md-6">
                            <label className="fw-bold small mb-1">Exclusion</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='exclusion'
                                value={topData.exclusion}
                                onChange={handleBottomChange}
                            />
                        </div>

                    </div>

                    <div className="d-flex gap-2 flex-column flex-md-row">

                        {/* LEFT */}
                        <div style={{ width: "50%" }} className="col-md-6">
                            <label className="fw-bold small mb-1">Scope</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='scope'
                                value={topData.scope}
                                onChange={handleBottomChange}
                            />
                        </div>

                        {/* RIGHT */}
                        <div style={{ width: "50%" }} className="col-md-6 d-flex align-items-center justify-content-center mt-5" >
                            <div className='d-flex gap-3 flex-wrap '>
                                <button className='btn btn-sm btn-primary'>Find</button>
                                <button className='btn btn-sm btn-success'>Save</button>
                                <button className='btn btn-sm btn-secondary'>Print</button>
                                <button className='btn btn-sm btn-danger'>Delete</button>
                                <button className='btn btn-sm btn-warning'>Reset</button>
                            </div>
                        </div>

                    </div>




                </div>
            </div>
        </div >

    )
}

export default Quot
