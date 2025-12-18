import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReducer, useEffect } from 'react';
import axios from 'axios'

//http://192.168.31.101:85/api/tblQuodets
//http://192.168.31.101:85/api/tblQuos


const initialState = {
    topData: {
        qNo: '',
        projectName: '',
        projectId: '',
        ledger: '',
        ledgerId: '',
        qDate: '',
        subject: '',
        rNo: '',
        notes: '',
        inclusion: '',
        exclusion: '',
        warranty: '',
        scope: '',
        delivery: '',
        payment: '',
        qValidity: '',
        item: '',
        totalAmount: '',
        vatAmt: '',
        actAmt: '',
        roundOff: '',
    },

    bottomData: {
        sNo: 1,
        productId: '',
        productName: '',
        unitId: '',
        unitType: '',
        brandId: '',
        brandName: '',
        qty: '',
        rate: '',
        taxable: '',
        vatPer: '',
        vatAmt: '',
        amount: '',
        description: '',
    },
    projects: [],
    ledger: [],
    productList: [],
    unitList: [],
    brandList: [],

    ledgerQuery: "",
    filteredLedger: [],
    showLedgerDropdown: false,

    projectQuery: "",
    filteredProject: [],
    showProjectDropdown: false,

    productQuery: "",
    filteredProducts: [],
    showProductDropdown: false,

    brandQuery: "",
    filteredBrands: [],
    showBrandDropdown: false,

    rows: [],
    forceOpen: false,

    suppQuot: [],
    suppQuotDets: [],

}

function reducer(state, action) {
    switch (action.type) {
        case "SET_TOP_FIELD":
            return {
                ...state,
                topData: { ...state.topData, [action.field]: action.value },
            }

        case 'SET_TOP_DATA':
            return { ...state, topData: { ...action.payload } };

        case 'SET_BOTTOM_DATA':
            return { ...state, bottomData: { ...action.payload } };

        case 'SET_PROJECTS':
            return { ...state, projects: action.payload }

        case 'SET_LEDGER':
            return { ...state, ledger: action.payload }

        case 'SET_PRODUCT':
            return { ...state, productList: action.payload }

        case 'SET_UNIT':
            return { ...state, unitList: action.payload }

        case 'SET_BRAND':
            return { ...state, brandList: action.payload }

        case "SET_LEDGER_LIST":
            return { ...state, ledger: action.payload };

        case "SET_LEDGER_QUERY":
            return {
                ...state,
                ledgerQuery: action.payload,
                filteredLedger: state.ledger.filter((l) =>
                    l.LedgerName.toLowerCase().includes(action.payload.toLowerCase())
                ),
                showLedgerDropdown: action.payload.trim() !== ""
            };

        case "SET_SHOW_LEDGER_DROPDOWN":
            return {
                ...state,
                showLedgerDropdown: action.payload
            };

        case "SELECT_LEDGER":
            return {
                ...state,
                ledgerQuery: action.payload.LedgerName,
                showLedgerDropdown: false,
                topData: {
                    ...state.topData,
                    ledgerId: action.payload.LedgerId
                }
            };

        case "SET_PROJECT_LIST":
            return {
                ...state,
                projects: action.payload
            };

        case "SET_PROJECT_QUERY":
            return {
                ...state,
                projectQuery: action.payload,
                filteredProject: state.projects.filter((p) =>
                    p.ProjName.toLowerCase().includes(action.payload.toLowerCase())
                ),
                showProjectDropdown: action.payload.trim() !== ""
            };

        case "SET_SHOW_PROJECT_DROPDOWN":
            return {
                ...state,
                showProjectDropdown: action.payload
            };

        case "SELECT_PROJECT":
            return {
                ...state,
                projectQuery: action.payload.ProjName,
                showProjectDropdown: false,

                topData: {
                    ...state.topData,
                    projectId: action.payload.ProjId
                }
            };
        case "SET_BRAND_LIST":
            return {
                ...state,
                brandList: action.payload
            };

        case "SET_BRAND_QUERY":
            return {
                ...state,
                brandQuery: action.payload,
                filteredBrands: state.brandList.filter((b) =>
                    b.BrandName.toLowerCase().includes(action.payload.toLowerCase())
                ),
                showBrandDropdown: action.payload.trim() !== ""
            };

        case "SET_SHOW_BRAND_DROPDOWN":
            return {
                ...state,
                showBrandDropdown: action.payload
            };

        case "SELECT_BRAND":
            return {
                ...state,
                brandQuery: action.payload.BrandName,
                showBrandDropdown: false,

                bottomData: {
                    ...state.bottomData,
                    brandId: action.payload.BrandId,
                    brandName: action.payload.BrandName,
                    brand: action.payload.BrandName
                }
            };

        case "SET_PRODUCT_LIST":
            return {
                ...state,
                productList: action.payload
            };

        case "SET_PRODUCT_QUERY":
            return {
                ...state,
                productQuery: action.payload,
                filteredProducts: state.productList.filter((p) =>
                    p.ProductName.toLowerCase().includes(action.payload.toLowerCase())
                ),
                showProductDropdown: action.payload.trim() !== ""
            };

        case "SET_SHOW_PRODUCT_DROPDOWN":
            return {
                ...state,
                showProductDropdown: action.payload
            };

        case "SELECT_PRODUCT":
            return {
                ...state,
                productQuery: action.payload.ProductName,
                showProductDropdown: false,

                bottomData: {
                    ...state.bottomData,
                    productId: action.payload.ProductID,
                    productName: action.payload.ProductName,
                    product: action.payload.ProductName,

                    // AUTO FILL
                    vatPer: action.payload.VatPer || 0,
                    unitId: action.payload.UnitId,
                    unitType: action.payload.UnitType,
                    rate: action.payload.URate ?? state.bottomData.rate ?? 0,
                }
            };

        case "SET_ROWS_LIST":
            return { ...state, rows: action.payload };

        case "OPEN_LEDGER":
            return { ...state, showLedgerDropdown: true };

        case "OPEN_PROJECT":
            return { ...state, showProjectDropdown: true };

        case "OPEN_PRODUCT":
            return { ...state, showProductDropdown: true };

        case "OPEN_BRAND":
            return { ...state, showBrandDropdown: true };

        case "FORCE_OPEN":
            return { ...state, forceOpen: true };

        case "SET_SUPPQUOT_LIST":
            return { ...state, suppQuot: action.payload };

        case "SET_SUPPQUOTDETS_LIST":
            return { ...state, suppQuotDets: action.payload };

        case 'RESET_BOTTOM_DATA':
            return { ...state, bottomData: initialState.bottomData };

        case 'SET_SAVING':
            return { ...state, saving: action.payload };

        // update logic like 1 st top field + auto calc logic
        case 'SET_BOTTOM_FIELD':
            const updated = { ...state.bottomData, [action.field]: action.value };

            // Auto-calc logic
            const qtyNum = Number(updated.qty) || 0;
            const rateNum = Number(updated.rate) || 0;
            const taxableNum = qtyNum * rateNum;
            const vatNum = (taxableNum * (Number(updated.vatPer) || 0)) / 100;
            const netNum = taxableNum + vatNum;

            return {
                ...state,
                bottomData: {
                    ...updated,
                    taxable: taxableNum,
                    vatAmt: vatNum,
                    amount: netNum
                }
            };
        case 'ADD_ROW': {
            const bd = state.bottomData;

            if (!bd.productId) {
                alert("Please select a product");
                return state;
            }
            if (!bd.qty || bd.qty === "0") {
                alert("Please enter qty");
                return state;
            }



            const newRow = {
                ...bd,
                sNo: state.rows.length + 1
            };

            const newRows = [...state.rows, newRow];

            // Auto-calc topData totals
            const totalVatAmt = newRows.reduce((sum, r) => sum + Number(r.vatAmt || 0), 0);
            const totalTaxable = newRows.reduce((sum, r) => sum + Number(r.taxable || 0), 0);
            const totalAmount = newRows.reduce((sum, r) => sum + Number(r.amount || 0), 0);

            return {
                ...state,
                rows: newRows,

                // RESET CORRECT FIELDS
                bottomData: {
                    sNo: newRows.length + 1,
                    productId: '',
                    productName: '',
                    brandId: '',
                    brandName: '',
                    unitId: '',
                    unitType: '',
                    qty: '',
                    rate: '',
                    taxable: '',
                    vatPer: '',
                    vatAmt: '',
                    amount: '',
                    description: ''
                },

                // Reset dropdown search text
                productQuery: "",
                brandQuery: "",

                showProductDropdown: false,
                showBrandDropdown: false,

                // Update topData totals
                topData: {
                    ...state.topData,
                    vatAmt: totalVatAmt,
                    totalAmount: totalTaxable,
                    actAmt: totalAmount
                }
            };
        }
        case "RESET_AFTER_SAVE":
            return {
                ...state,
                topData: {
                    ledgerId: "",
                    projectId: "",
                    qNo: "",
                    qDate: "",
                    narration: "",
                    terms: "",
                    taxable: "",
                    vatAmt: "",
                    amount: "",
                    warranty: '',
                    qValidity:'',


                },
                rows: [],
                bottomData: {
                    sNo: '',
                    productId: '',
                    productName: '',
                    unitId: '',
                    unitType: '',
                    brandId: '',
                    brandName: '',
                    qty: '',
                    rate: '',
                    taxable: '',
                    vatPer: '',
                    vatAmt: '',
                    amount: '',
                    description: '',
                },
                productQuery: "",
                brandQuery: "",
                showProductDropdown: false,
                showBrandDropdown: false,
            };



        default:
            return state;
    }
}

const Quotation = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        topData,
        bottomData,
        projects,
        ledger,
        productList,
        unitList,
        brandList,
    } = state;

    const gapi = import.meta.env.VITE_API_URL;
    useEffect(() => {

        loadProjects();
        loadLedger();
        loadProduct();
        loadUnit();
        loadBrands();
        loadQuot();
        loadQuotDets();
    }, []);

    const loadProjects = async () => {

        try {
            const res = await axios.get(`${gapi}/project`)
            //console.log(res.data);

            dispatch({ type: 'SET_PROJECTS', payload: res.data })
        } catch (err) {
            alert('could not load project')
        }
    };

    const loadLedger = async () => {

        try {
            const res = await axios.get(`${gapi}/ledger`)
            //console.log(res.data);

            dispatch({ type: 'SET_LEDGER', payload: res.data })
        } catch (err) {
            alert('could not load ledger')
        }
    };

    const loadProduct = async () => {

        try {
            const res = await axios.get(`${gapi}/productmasters`)
            //console.log(res.data);

            dispatch({ type: 'SET_PRODUCT', payload: res.data })
        } catch (err) {
            alert('could not load product')
        }
    };


    const loadUnit = async () => {

        try {
            const res = await axios.get(`${gapi}/unit`)
            //console.log(res.data);

            dispatch({ type: 'SET_UNIT', payload: res.data })
        } catch (err) {
            alert('could not load unit')
        }
    };

    const loadBrands = async () => {

        try {
            const res = await axios.get(`${gapi}/brand`)
            // console.log(res.data);

            dispatch({ type: 'SET_BRAND', payload: res.data })
        } catch (err) {
            alert('could not load brand')
        }
    };

    const loadQuot = async () => {
        try {
            const res = await axios.get(`${gapi}/tblQuos`);
            dispatch({ type: 'SET_SUPPQUOT_LIST' })
            //console.log(res.data);
        } catch (err) {
            console.error("Error fetching suppQuo:", err);
            alert("Could not load Quotation. Please check API connection.");
        }
    }

    const loadQuotDets = async () => {
        try {
            const res = await axios.get(`${gapi}/tblQuodets`);
            dispatch({ type: 'SET_SUPPQUOTDETS_LIST' })
            //console.log(res.data);
        } catch (err) {
            console.error("Error fetching suppQuo:", err);
            alert("Could not load QuotationDetails. Please check API connection.");
        }
    }

    const handleKeyDown = (e, type) => {
        //console.log("KEY PRESSED:", e.key, " -- type:", type);

        if (["ArrowDown", "ArrowUp", "Backspace"].includes(e.key)) {
            dispatch({ type: "FORCE_OPEN" });

            if (type === "ledger") dispatch({ type: "OPEN_LEDGER" });
            if (type === "project") dispatch({ type: "OPEN_PROJECT" });
            if (type === "product") dispatch({ type: "OPEN_PRODUCT" });
            if (type === "brand") dispatch({ type: "OPEN_BRAND" });
        }
    };



    const saveQuoDetails = async () => {
        const bd = state.bottomData;

       

        // Prepare data to send
        const newRow = {
            QDetsId: 0,
            SNo: state.rows.length + 1,
            ProductId: Number(bd.productId) || 0,
            ProdDes: bd.description || "",
            UnitId: Number(bd.unitId) || 0,
            BrandId: Number(bd.brandId) || 0,
            Qty: Number(bd.qty) || 0,
            Rate: Number(bd.rate) || 0,
            Taxable: Number(bd.taxable) || 0,
            VatPer: Number(bd.vatPer) || 0,
            VatAmt: Number(bd.vatAmt) || 0,
            NetAmt: Number(bd.amount) || 0,
            NRate: Number(bd.rate) || 0,
        };

        try {
            dispatch({ type: 'SET_SAVING', payload: true });
            // Send POST
            const response = await axios.post(`${gapi}/tblQuodets`, newRow);

            // If succeeded
            if (response.status === 200 || response.status === 201) {
                alert("Saved Successfully!");
            } else {
                alert("Save Failed!");
            }

        } catch (error) {
            console.error("Error saving:", error);
            alert("API Error occurred!");
        } finally {
            dispatch({ type: 'SET_SAVING', payload: false });
        }
    };

    const saveQuotationTop = async () => {
        const td = state.topData;

        // Basic validation
        if (!td.projectId) {
            alert("Please select a project");
            return;
        }

        // Prepare payload matching DB
        const payload = {
            QId:  0, // if new, server auto-increment
            QNo: Number(td.qNo) || 0,
            QDate: td.qDate || new Date().toISOString(), // iso string
            QRevNo: Number(td.revNo) || 0,
            ProjId: Number(td.projectId) || 0,
            Subject: td.subject || "",
            Scope: td.scope || "",
            Notes: td.notes || "",
            Warranty: td.warranty || "",
            Indusion: td.inclusion || "",
            Exdusion: Number(td.exclusion) || 0,
            TotTaxableAmt: Number(td.totalAmount) || 0,
            TotVatAmt: Number(td.vatAmt) || 0,
            NetAmount: td.actAmt || "",
            Terms: td.payment || "",
            Delivery: td.delivery || "",
            Validity: Number(td.qValidity) || 0,
            CreateBy: 1, // your user id
            CreateOn: new Date().toISOString(),
        };

        try {
            const response = await axios.post(`${gapi}/tblQuos`, payload);

            if (response.status === 200 || response.status === 201) {
                const savedData = response.data; // server response contains QId etc.
                dispatch({ type: "SET_TOP_DATA", payload: savedData });
                alert("Quotation header saved successfully!");
                return savedData.QId; // return QId for next bottomData API
            } else {
                alert("Failed to save quotation header");
            }

        } catch (err) {
            console.error("Error saving quotation header:", err);
            alert("API error occurred");
        }
    };

    const handleClose= async() => {
        const top = state.topData;
        console.log("Top Data View :" + state.topData);
    }

    const handleSave = async () => {
        const top = state.topData;
        
        try {
            console.log("🔥 Saving Quotation...");
            
            // 1️⃣ Save tblQuo (Header)
            const resHeader = await axios.post(`${gapi}/tblQuos`, {
                ...top
            });
            console.log("Rseult 1 :" + resHeader);
            console.log("Rseult 2 :" + resHeader.data);
            const qId = resHeader.data.QId;
            console.log("✔ Saved Header → qId:", qId);

            // 2️⃣ Save tblQuoDets (Rows)

            // for (const r of state.rows) {
            //     await axios.post(`${gapi}/tblQuodets`, {
            //         ...r,
            //         qId: qId
            //     });
            // }

            //console.log("✔ Saved All Detail Rows");
            alert("Saved Successfully!");

            // 3️⃣ Reset reducer state
            dispatch({ type: "RESET_AFTER_SAVE" });

        } catch (err) {
            //console.error("❌ Save failed:", err);
            alert("Save failed! " + (err.response?.data || err.message));
        }
    };


    const handleBottomChange = (e) => {
        dispatch({
            type: 'SET_BOTTOM_FIELD',
            field: e.target.name,
            value: e.target.value,
        })
    }
    const handleTopChange = (e) => {
        dispatch({
            type: 'SET_TOP_FIELD',
            field: e.target.name,
            value: e.target.value,
        })
    }



// Design
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
                            {/* 1st Row */}
                            <div className="d-flex mb-3 align-items-center gap-3 flex-wrap">

                                {/* Q.No */}
                                <div className="d-flex align-items-center gap-2" style={{ flex: "0 0 140px" }}>
                                    <label className="fw-bold mb-0" style={{ fontSize: "15px" }}>Q.No</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        style={{
                                            height: "20px",
                                            padding: "2px 6px",
                                            fontSize: "13px",
                                            border: "1px solid #ced4da",
                                            borderRadius: "4px",
                                            width: "100%"
                                        }}
                                        name="qNo"
                                        value={state.topData.qNo}
                                        onChange={handleTopChange}
                                    />
                                </div>

                                {/* Project */}
                                <div className="d-flex align-items-center gap-2" style={{ flex: "1 0 280px" }}>
                                    <label className="fw-bold required mb-0" style={{ fontSize: "15px", width: "120px" }}>Project</label>

                                    <div style={{ position: "relative", width: "100%" }}>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            style={{ height: "28px" }}
                                            placeholder="Search Project..."
                                            value={state.projectQuery}
                                            onChange={(e) => dispatch({ type: "SET_PROJECT_QUERY", payload: e.target.value })}
                                            onFocus={() => {
                                                if (state.projectQuery.trim() !== "")
                                                    dispatch({ type: "SET_SHOW_PROJECT_DROPDOWN", payload: true });
                                            }}
                                            onKeyDown={(e) => handleKeyDown(e, "project")}
                                            onBlur={() => {
                                                setTimeout(() => {
                                                    dispatch({ type: "SET_SHOW_PROJECT_DROPDOWN", payload: false });
                                                }, 150);
                                            }}
                                        />

                                        {/* Dropdown same */}
                                        {state.showProjectDropdown && state.filteredProject.length > 0 && (
                                            <div
                                                className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                                style={{ maxHeight: "280px", overflowY: "auto", zIndex: 9999 }}
                                            >
                                                <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                    <div className="col-5">Name</div>
                                                </div>

                                                {state.filteredProject.map((item) => (
                                                    <div
                                                        key={item.ProjId}
                                                        className="d-flex px-2 py-2 border-bottom hover-bg"
                                                        style={{ cursor: "pointer" }}
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            dispatch({ type: "SELECT_PROJECT", payload: item });
                                                        }}
                                                    >
                                                        <div className="col-5">{item.ProjName}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>



                                {/* Ledger */}
                                <div className="d-flex align-items-center gap-2" style={{ flex: "1 0 280px" }}>
                                    <label className="fw-bold mb-0" style={{ fontSize: "15px", width: "120px" }}>Ledger</label>

                                    <div style={{ position: 'relative', width: '100%' }}>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            style={{ height: "28px" }}
                                            placeholder="Search Ledger..."
                                            value={state.ledgerQuery}
                                            onChange={(e) => dispatch({ type: "SET_LEDGER_QUERY", payload: e.target.value })}
                                            onFocus={() => {
                                                if (state.ledgerQuery.trim() !== "")
                                                    dispatch({ type: "SET_SHOW_LEDGER_DROPDOWN", payload: true });
                                            }}
                                            onKeyDown={(e) => handleKeyDown(e, 'ledger')}
                                            onBlur={() => {
                                                setTimeout(() => {
                                                    dispatch({ type: "SET_SHOW_LEDGER_DROPDOWN", payload: false });
                                                }, 150);
                                            }}
                                        />

                                        {/* Dropdown same */}
                                        {state.showLedgerDropdown && state.filteredLedger.length > 0 && (
                                            <div
                                                className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                                style={{ maxHeight: "250px", overflowY: "auto", zIndex: 9999 }}
                                            >
                                                <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                    <div className="col-5">Name</div>
                                                    <div className="col-3">Place</div>
                                                    <div className="col-4">State</div>
                                                </div>

                                                {state.filteredLedger.map((item) => (
                                                    <div
                                                        key={item.LedgerId}
                                                        className="d-flex px-2 py-2 border-bottom hover-bg"
                                                        style={{ cursor: "pointer" }}
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            dispatch({ type: "SELECT_LEDGER", payload: item });
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

                            </div>


                            {/* 2nd Row */}
                            <div className="d-flex mb-3 align-items-center gap-3 flex-wrap">

                                {/* R.No */}
                                <div className="d-flex align-items-center gap-2" style={{ flex: "1 0 200px" }}>
                                    <label className="fw-bold mb-0" style={{ fontSize: "15px", width: "120px" }}>Q.Date</label>
                                    <input type="date" className="form-control form-control-sm" style={{ height: "28px" }} name="qDate" value={state.topData.qDate} onChange={handleTopChange} />
                                </div>

                                {/* Subject */}
                                <div className="d-flex align-items-center gap-2" style={{ flex: "1 0 120px" }}>
                                    <label className="fw-bold mb-0" style={{ fontSize: "15px", width: "120px" }}>R.No</label>
                                    <input type="number" className="form-control form-control-sm" style={{ height: "28px" }} name="rNo" value={state.topData.revNo} onChange={handleTopChange} />
                                </div>

                                {/* Subject */}
                                <div className="d-flex align-items-center gap-2" style={{ flex: "1 0 200px" }}>
                                    <label className="fw-bold mb-0" style={{ fontSize: "15px", width: "120px" }}>Subject</label>
                                    <input type="text" className="form-control form-control-sm" style={{ height: "28px" }} name="subject" value={state.topData.subject} onChange={handleTopChange} />
                                </div>

                            </div>





                            <hr className='mt-0' />

                            {/* 10 Input Boxes */}
                            <div className='d-flex '
                                style={{
                                    width: '100%',
                                    flexWrap: 'nowrap',
                                }}
                            >
                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>S.No</label>
                                    <input
                                        className='form-control form-control-sm'
                                        style={{ height: '28px' }}
                                        type='text'
                                        name='sNo'
                                        value={state.bottomData.sNo}
                                        onChange={handleBottomChange}
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 200px', position: "relative" }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>
                                        Product
                                    </label>

                                    <input
                                        className='form-control form-control-sm'
                                        style={{ height: '28px' }}
                                        type='text'
                                        placeholder="Search Product..."
                                        value={state.productQuery}
                                        onChange={(e) =>
                                            dispatch({ type: "SET_PRODUCT_QUERY", payload: e.target.value })
                                        }
                                        onFocus={() => {
                                            if (state.productQuery.trim() !== "")
                                                dispatch({ type: "SET_SHOW_PRODUCT_DROPDOWN", payload: true });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, 'product')}
                                        onBlur={() => {
                                            setTimeout(() => {
                                                dispatch({ type: "SET_SHOW_PRODUCT_DROPDOWN", payload: false });
                                            }, 150);
                                        }}
                                    />

                                    {/* Dropdown */}
                                    {state.showProductDropdown && state.filteredProducts.length > 0 && (
                                        <div
                                            className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                            style={{
                                                maxHeight: "250px",
                                                overflowY: "auto",
                                                zIndex: 9999
                                            }}
                                        >
                                            <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                <div className="col-12">Product Name</div>
                                            </div>

                                            {state.filteredProducts.map((item) => (
                                                <div
                                                    key={item.ProductID}
                                                    className="px-2 py-2 border-bottom hover-bg"
                                                    style={{ cursor: "pointer" }}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        dispatch({ type: "SELECT_PRODUCT", payload: item });
                                                    }}
                                                >
                                                    {item.ProductName}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 100px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>
                                        Unit
                                    </label>

                                    <select
                                        className="form-select form-select-sm"
                                        style={{ height: "28px" }}
                                        value={state.bottomData.unitId || ""}
                                        disabled
                                        onChange={(e) => {
                                            const selectedId = Number(e.target.value);
                                            const selectedUnit = state.unitList.find(u => u.UnitId === selectedId);

                                            dispatch({
                                                type: "UPDATE_BOTTOM_UNIT",
                                                payload: {
                                                    unitId: selectedId,
                                                    unitType: selectedUnit?.UnitType || "",
                                                    unit: selectedUnit?.UnitType || "",
                                                }
                                            });
                                        }}
                                    >
                                        <option value="">--</option>
                                        {state.unitList.map((u) => (
                                            <option key={u.UnitId} value={u.UnitId}>
                                                {u.UnitType}
                                            </option>
                                        ))}
                                    </select>
                                        
                                </div>


                                <div className="mx-2" style={{ flex: '0 0 180px', position: "relative" }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>
                                        Brand
                                    </label>

                                    <input
                                        className='form-control form-control-sm'
                                        style={{ height: '28px' }}
                                        type='text'
                                        placeholder="Search Brand..."
                                        value={state.brandQuery}
                                        onChange={(e) =>
                                            dispatch({ type: "SET_BRAND_QUERY", payload: e.target.value })
                                        }
                                        onFocus={() => {
                                            if (state.brandQuery.trim() !== "")
                                                dispatch({ type: "SET_SHOW_BRAND_DROPDOWN", payload: true });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, 'brand')}

                                        onBlur={() => {
                                            setTimeout(() => {
                                                dispatch({ type: "SET_SHOW_BRAND_DROPDOWN", payload: false });
                                            }, 150);
                                        }}
                                    />

                                    {/* Dropdown */}
                                    {state.showBrandDropdown && state.filteredBrands.length > 0 && (
                                        <div
                                            className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                            style={{
                                                maxHeight: "200px",
                                                overflowY: "auto",
                                                zIndex: 9999
                                            }}
                                        >
                                            <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                <div className="col-12">Brand</div>
                                            </div>

                                            {state.filteredBrands.map((item) => (
                                                <div
                                                    key={item.BrandId}
                                                    className="px-2 py-2 border-bottom hover-bg"
                                                    style={{ cursor: "pointer" }}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        dispatch({ type: "SELECT_BRAND", payload: item });
                                                    }}
                                                >
                                                    {item.BrandName}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>


                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Qty</label>
                                    <input
                                        className='form-control form-control-sm'
                                        style={{ height: '28px' }}
                                        type='number'
                                        name='qty'
                                        value={state.bottomData.qty}
                                        onChange={handleBottomChange}
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Rate</label>
                                    <input
                                        className='form-control form-control-sm'
                                        type='number'
                                        name='rate'
                                        value={state.bottomData.rate}
                                        onChange={handleBottomChange}
                                    />
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Taxable</label>
                                    <input
                                        className='form-control form-control-sm'
                                        type='number'
                                        name='taxable'
                                        value={state.bottomData.taxable}
                                        onChange={handleBottomChange}
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Vat%</label>
                                    <input
                                        className='form-control form-control-sm'
                                        type='number'
                                        name='vatPer'
                                        value={state.bottomData.vatPer}
                                        onChange={handleBottomChange}
                                        readOnly
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Vat Amt</label>
                                    <input
                                        className='form-control form-control-sm'
                                        type='number'
                                        name='vatAmt'
                                        value={state.bottomData.vatAmt}
                                        onChange={handleBottomChange}

                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Amount</label>
                                    <input
                                        className='form-control form-control-sm'
                                        type='number'
                                        name='amount'
                                        value={state.bottomData.amount}
                                        onChange={handleBottomChange}
                                    />

                                </div>

                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                                <textarea
                                    className='form-control form-control-sm mt-1 '
                                    rows={2}
                                    style={{
                                        width: '50%',
                                        marginLeft: '2%'
                                    }}
                                    name='description'
                                    value={state.bottomData.description}
                                    onChange={handleBottomChange}
                                />
                                <button
                                    className='btn btn-primary btn-sm'
                                    onClick={() => {
                                        console.log("bottomData before ADD_ROW:", state.bottomData);
                                        dispatch({ type: 'ADD_ROW' })
                                    }}
                                >
                                    Add
                                </button>
                            </div>

                            <hr className='mt-1' />

                            {/* Big empty grid box */}
                            <div
                                className="d-flex  px-2"
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
                                <div className='mt-2' style={{ width: '100%' }}>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.rows.map((r, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{r.sNo}</td>
                                                    <td>{r.productName}</td>
                                                    <td className="text-center">{r.unitType}</td>
                                                    <td>{r.brandName}</td>
                                                    <td className="text-center">{r.qty}</td>
                                                    <td className="text-end">{r.rate}</td>
                                                    <td className="text-end">{r.taxable}</td>
                                                    <td className="text-center">{r.vatPer}</td>
                                                    <td className="text-end">{r.vatAmt}</td>
                                                    <td className="text-end">{r.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>

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
                                <label className="form-label fw-bold" style={{ fontSize: "0.85rem" }}>Payment</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name='payment'
                                    value={state.topData.payment}
                                    onChange={handleTopChange}
                                />

                            </div>

                            <div className="mb-2">
                                <label className="form-label fw-bold" style={{ fontSize: "0.85rem" }}>Delivery</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name='delivery'
                                    value={state.topData.delivery}
                                    onChange={handleTopChange}
                                />

                            </div>

                            <div className="mb-2">
                                <label className="form-label fw-bold" style={{ fontSize: "0.85rem" }}>Quotation Validity</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name='quotationValidity'
                                    value={state.topData.qValidity}
                                    onChange={handleTopChange}
                                />

                            </div>



                            {/* 4 small label + input rows */}
                            <div className="mt-3">

                                <div className="d-flex align-items-center mb-2">
                                    <label className="me-2 fw-bold" style={{ fontSize: '0.8rem', width: "70px" }}>Item</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        style={{ width: "80px" }}
                                        name='item'
                                        value={state.topData.item}
                                        onChange={handleTopChange}
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-2">
                                    <label className="me-2 fw-bold" style={{ fontSize: '0.8rem', width: "70px", whiteSpace: 'nowrap' }}>Total Amt</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        style={{ width: "80px" }}
                                        name='totalAmount'
                                        value={state.topData.totalAmount}
                                        onChange={handleTopChange}
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-2">
                                    <label className="me-2 fw-bold" style={{ fontSize: '0.8rem', width: "70px" }}>Vat Amt</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        style={{ width: "80px" }}
                                        name='vatAmt'
                                        value={state.topData.vatAmt}
                                        onChange={handleTopChange}
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-1">
                                    <label className="me-2 fw-bold" style={{ fontSize: '0.8rem', width: "70px" }}>Act Amt</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        style={{ width: "80px" }}
                                        name='actAmt'
                                        value={state.topData.actAmt}
                                        onChange={handleTopChange}
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-1">
                                    <label className="me-2 fw-bold" style={{ fontSize: '0.8rem', width: "70px" }}>Round Off</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        style={{ width: "80px" }}
                                        name='roundOff'
                                        value={state.topData.roundOff}
                                        onChange={handleTopChange}
                                    />
                                </div>
                            </div>



                        </div>

                    </div>

                    <div className="d-flex flex-wrap gap-3">

                        {/* Box 1 */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label fw-bold">Notes </label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='notes'
                                value={state.topData.notes}
                                onChange={handleTopChange}
                            />

                        </div>

                        {/* Box 2 */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label fw-bold">Warrenty</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='warranty'
                                value={state.topData.warranty}
                                onChange={handleTopChange}
                            />

                        </div>

                        {/* Box 3 */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label fw-bold">Inclusion</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='inclusion'
                                value={state.topData.inclusion}
                                onChange={handleTopChange}
                            />
                        </div>

                        {/* Box 4 */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label fw-bold">Exclusion</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='exclusion'
                                value={state.topData.exclusion}
                                onChange={handleTopChange}
                            />
                        </div>

                        {/* Box 5 → Should take only half row */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label fw-bold">Scope</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='scope'
                                value={state.topData.scope}
                                onChange={handleTopChange}
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

                            <button className="btn btn-sm"
                                onClick={handleSave}
                                style={{ backgroundColor: "#5d8aa8", color: "white", whiteSpace: "nowrap" }}>
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

                            <button 
                            onClick={handleClose}                            
                             className="btn btn-sm" style={{ backgroundColor: "#5d8aa8", color: "white", whiteSpace: "nowrap" }}>                                
                                Close
                            </button>

                        </div>


                    </div>


                </div>
            </div >
        </div >
    );
};

export default Quotation;
