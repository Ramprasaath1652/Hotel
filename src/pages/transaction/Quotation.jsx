import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReducer, useEffect } from 'react';
import axios from 'axios'




const initialState = {
    topData: {
        qNo: '',
        projectName: '',
        projectId: '',
        ledger: '',
        ledgerId: '',
        notes: '',
        inclusion: '',
        exclusion: '',
        warrenty: '',
        scope: '',
        delivery: '',
        payment: '',
        quotationValidity: '',
        item: '',
        totalAmount: '',
        vatAmt: '',
        actAmt: '',
        roundOff: '',
    },

    bottomData: {
        sNo: '',
        product: '',
        unit: '',
        brand: '',
        qty: '',
        rate: '',
        taxable: '',
        varPer: '',
        vatAmt: '',
        amount: '',
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



}

function reducer(state, action) {
    switch (action.type) {
        case "SET_TOP_FIELD":
            return {
                ...state,
                topData: { ...state.topData, [action.field]: action.value },
            }

        case 'SET_BOTTOM_FIELD':
            return {
                ...state,
                bottomData: { ...state.bottomData, [action.field]: action.value },
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
    }, []);

    const loadProjects = async () => {

        try {
            const res = await axios.get(`${gapi}/project`)
            console.log(res.data);

            dispatch({ type: 'SET_PROJECTS', payload: res.data })
        } catch (err) {
            alert('could not load project')
        }
    };

    const loadLedger = async () => {

        try {
            const res = await axios.get(`${gapi}/ledger`)
            console.log(res.data);

            dispatch({ type: 'SET_LEDGER', payload: res.data })
        } catch (err) {
            alert('could not load ledger')
        }
    };

    const loadProduct = async () => {

        try {
            const res = await axios.get(`${gapi}/productmasters`)
            console.log(res.data);

            dispatch({ type: 'SET_PRODUCT', payload: res.data })
        } catch (err) {
            alert('could not load product')
        }
    };


    const loadUnit = async () => {

        try {
            const res = await axios.get(`${gapi}/unit`)
            console.log(res.data);

            dispatch({ type: 'SET_UNIT', payload: res.data })
        } catch (err) {
            alert('could not load unit')
        }
    };

    const loadBrands = async () => {

        try {
            const res = await axios.get(`${gapi}/brand`)
            console.log(res.data);

            dispatch({ type: 'SET_BRAND', payload: res.data })
        } catch (err) {
            alert('could not load brand')
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

                                {/* Q.No */}
                                <div className="d-flex align-items-center flex-column" style={{ flex: "0 0 140px" }}>
                                    <label
                                        className="me-2 mb-0 fw-bold "
                                        style={{ fontSize: '15px', }}
                                    >
                                        Q.No
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        style={{  height: "28px" }}
                                        name='qNo'
                                        value={topData.qNo}
                                        onChange={handleTopChange}
                                    />
                                </div>

                                {/* Project */}
                                <div className="d-flex flex-column" style={{ flex: "1 0 280px" }}>
                                    <label className='fw-bold required' style={{ fontSize: "15px" }}>
                                        Project Name
                                    </label>

                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            style={{ height: "28px" }}
                                            placeholder="Search Project..."
                                            value={state.projectQuery}
                                            onChange={(e) =>
                                                dispatch({ type: "SET_PROJECT_QUERY", payload: e.target.value })
                                            }
                                            onFocus={() => {
                                                if (state.projectQuery.trim() !== "")
                                                    dispatch({ type: "SET_SHOW_PROJECT_DROPDOWN", payload: true });
                                            }}
                                            onBlur={() => {
                                                setTimeout(() => {
                                                    dispatch({ type: "SET_SHOW_PROJECT_DROPDOWN", payload: false });
                                                }, 150);
                                            }}
                                        />

                                        {state.showProjectDropdown && state.filteredProject.length > 0 && (
                                            <div
                                                className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                                style={{ maxHeight: "250px", overflowY: "auto", zIndex: 9999 }}
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
                                <div className="d-flex flex-column" style={{ flex: "1 0 280px" }}>
                                    <label className="fw-bold" style={{ fontSize: "15px" }}>
                                        Ledger
                                    </label>

                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            style={{ height: "28px" }}
                                            placeholder="Search Ledger..."
                                            value={state.ledgerQuery}
                                            onChange={(e) =>
                                                dispatch({ type: "SET_LEDGER_QUERY", payload: e.target.value })
                                            }
                                            onFocus={() => {
                                                if (state.ledgerQuery.trim() !== "")
                                                    dispatch({ type: "SET_SHOW_LEDGER_DROPDOWN", payload: true });
                                            }}
                                            onBlur={() => {
                                                setTimeout(() => {
                                                    dispatch({ type: "SET_SHOW_LEDGER_DROPDOWN", payload: false });
                                                }, 150);
                                            }}
                                        />

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
                                        value={bottomData.sNo}
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
                                        value={bottomData.qty}
                                        onChange={handleBottomChange}
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Rate</label>
                                    <input
                                        className='form-control form-control-sm'
                                        type='number'
                                        name='rate'
                                        value={bottomData.rate}
                                        onChange={handleBottomChange}
                                    />
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Taxable</label>
                                    <input
                                        className='form-control form-control-sm'
                                        type='number'
                                        name='taxable'
                                        value={bottomData.taxable}
                                        onChange={handleBottomChange}
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Vat%</label>
                                    <input
                                        className='form-control form-control-sm'
                                        type='number'
                                        name='vatPer'
                                        value={bottomData.vatPer}
                                        onChange={handleBottomChange}
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Vat Amt</label>
                                    <input
                                        className='form-control form-control-sm'
                                        type='number'
                                        name='vatAmt'
                                        value={bottomData.vatAmt}
                                        onChange={handleBottomChange}
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Amount</label>
                                    <input
                                        className='form-control form-control-sm'
                                        type='number'
                                        name='amount'
                                        value={bottomData.amount}
                                        onChange={handleBottomChange}
                                    />

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
                                    <table className="table table-bordered table-sm" style={{ fontSize: "12px", minWidth: "900px" }}>
                            <thead className="table-light">
                                <tr>
                                    <th style={{ width: "50px" }} className="text-center">S.No</th>
                                    <th style={{ width: "100px" }}>Product</th>
                                    <th style={{ width: "50px" }} className='text-center'>Unit</th>
                                    <th style={{ width: "100px" }}>Brand</th>
                                    <th style={{ width: "70px" }} className="text-center">Qty</th>
                                    <th style={{ width: "80px" }} className="text-end">Rate</th>
                                    <th style={{ width: "80px" }} className="text-end">Taxable</th>
                                    <th style={{ width: "60px" }} className="text-center">VAT %</th>
                                    <th style={{ width: "80px" }} className="text-end">VAT Amt</th>
                                    <th style={{ width: "80px" }} className="text-end">Amount</th>
                                    <th style={{ width: "80px" }} className="text-end">Actions</th>

                                </tr>
                            </thead>

                            <tbody>
                                {/* {rows.map((r, index) => (
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
                                       
                                    </tr>
                                ))} */}
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
                                    value={topData.payment}
                                    onChange={handleTopChange}
                                />

                            </div>

                            <div className="mb-2">
                                <label className="form-label fw-bold" style={{ fontSize: "0.85rem" }}>Delivery</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name='delivery'
                                    value={topData.delivery}
                                    onChange={handleTopChange}
                                />

                            </div>

                            <div className="mb-2">
                                <label className="form-label fw-bold" style={{ fontSize: "0.85rem" }}>Quotation Validity</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name='quotationValidity'
                                    value={topData.quotationValidity}
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
                                        value={topData.item}
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
                                        value={topData.totalAmount}
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
                                        value={topData.vatAmt}
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
                                        value={topData.actAmt}
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
                                        value={topData.roundOff}
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
                                value={topData.notes}
                                onChange={handleTopChange}
                            />

                        </div>

                        {/* Box 2 */}
                        <div style={{ flex: "0 0 48%" }}>
                            <label className="form-label fw-bold">Warrenty</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='warrenty'
                                value={topData.warrenty}
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
                                value={topData.inclusion}
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
                                value={topData.exclusion}
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
                                value={topData.scope}
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
