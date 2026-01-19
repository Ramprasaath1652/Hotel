import React, { useReducer, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import GSTReport from '../reports/GSTReport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';

const initialFormState = {

    topData: {
        vatAmt: null,
        totalAmt: null,
        actAmt: null,
        qNo: null,
        rNo: null,
        project: '',
        ledger: '',
        qDate: '',
        subject: '',
        notes: '',
        warranty: '',
        inclusion: '',
        exclusion: '',
        scope: '',
        payment: '',
        delivery: '',
        qValidity: '',
    },
    bottomData: {
        sNo: 1,
        productId: '',
        product: '',
        brandId: '',
        brand: '',
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
    rows: [],
    editIndex: null,
    rowToDelete: null,
    showDeleteModal: false,
    productQuery: '',
    brandQuery: '',
    showProductDropdown: false,
    showBrandDropdown: false,
    // 👇 LEDGER
    ledgerId: '',
    ledgerName: '',
    ledgerQuery: '',
    showLedgerDropdown: false,

    // 👇 PROJECT
    projectId: '',
    projectName: '',
    projectQuery: '',
    showProjectDropdown: false,
    isEditMode: false,
    isLoadedFromApi: false
};

const initialState = {
    topData: {
        qNo: '',
        rNo: '',
        project: '',//selected project name
        ledger: '',
        qDate: '',
        subject: '',
        notes: '',
        warranty: '',
        inclusion: '',
        exclusion: '',
        scope: '',
        payment: '',
        delivery: '',
        qValidity: '',
        item: '',
        totalAmt: '',
        vatAmt: '',
        actAmt: '',
        roundOff: '',

    },

    bottomData: {
        sNo: 1,
        product: '',
        unit: '',
        unitId: '',
        unitType: '',
        barnd: '',
        qty: '',
        rate: '',
        taxable: '',
        vatPer: '',
        vatAmt: '',
        amount: '',
        description: '',
    },
    projectList: [], //Api data
    projectQuery: '', //inputbox value(typing)
    filteredProject: [], //filtered list (suggestions)
    showProjectDropDown: false,
    projectId: '', // selected project id 
    highlightedProjectIndex: -1,

    ledgerList: [],
    ledgerQuery: '',
    filteredLedger: [],
    showLedgerDropDown: false,
    ledgerId: '',
    highlightedLedgerIndex: -1,

    productList: [],
    productQuery: '',
    filteredProduct: [],
    showProductDropDown: false,
    productId: '',
    highlightedProductIndex: -1,

    brandList: [],
    brandQuery: '',
    filteredBrand: [],
    showBrandDropDown: false,
    brandId: '',
    highlightedBrandIndex: -1,

    unitList: [],
    rows: [],

    quot: [],
    quotDets: [],

    editIndex: null,
    showDeleteModal: false,
    rowToDelete: null,

    qId: null,
    findData: [],
    loading: false,
    showFindPage: false,

    isEditMode: false,
    editQId: null,
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_TOP_FIELD':
            return {
                ...state,
                topData: { ...state.topData, [action.field]: action.value }
            }
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

        case 'SET_PROJECT_LIST':
            return { ...state, projectList: action.payload }

        case 'SET_PROJECT_QUERY':
            return {
                ...state,
                projectQuery: action.payload,
                filteredProject: state.projectList.filter((p) =>
                    p.ProjName.toLowerCase().includes(action.payload.toLowerCase())
                ),
                showProjectDropDown: action.payload.trim() !== '',
                highlightedProjectIndex: -1
            }

        case 'SELECT_PROJECT':
            return {
                ...state,
                project: action.payload.ProjName,
                projectId: action.payload.ProjId,
                projectQuery: action.payload.ProjName,
                topData: {
                    ...state.topData,
                    projectId: action.payload.ProjId
                },
                showProjectDropDown: false
            }

        case 'SET_SHOW_PROJECT_DROPDOWN':
            return {
                ...state,
                showProjectDropDown: action.payload
            }

        case 'PROJECT_ARROW_DOWN':
            const lastIndex = state.filteredProject.length - 1;
            return {
                ...state,
                highlightedProjectIndex:
                    state.highlightedProjectIndex < 0
                        ? 0
                        : state.highlightedProjectIndex < lastIndex
                            ? state.highlightedProjectIndex + 1
                            : lastIndex
            }

        case 'PROJECT_ARROW_UP':
            return {
                ...state,
                highlightedProjectIndex:
                    state.highlightedProjectIndex > 0
                        ? state.highlightedProjectIndex - 1
                        : 0

            }

        case 'PROJECT_ENTER_SELECT':
            const selected =
                state.filteredProject[state.highlightedProjectIndex];

            if (!selected) return state;

            return {
                ...state,
                topData: {
                    ...state.topData,
                    project: selected.ProjName,
                    projectId: selected.ProjId
                },
                projectQuery: selected.ProjName,
                showProjectDropDown: false,
                highlightedProjectIndex: -1
            }

        case 'SET_LEDGER':
            return { ...state, ledger: action.payload }

        case 'SET_LEDGER_LIST':
            return { ...state, ledgerList: action.payload }

        case 'SET_LEDGER_QUERY':
            return {
                ...state,
                ledgerQuery: action.payload || '',
                filteredLedger: state.ledgerList.filter(l =>
                    l.LedgerName
                        ?.toLowerCase()
                        .includes((action.payload || '').toLowerCase())
                ),
                showLedgerDropDown: action.payload.trim() !== '',
            }

        case 'SELECT_LEDGER':
            return {
                ...state,
                ledger: action.payload.LedgerName,
                ledgerId: action.payload.LedgerId,
                ledgerQuery: action.payload.LedgerName,
                showLedgerDropDown: false
            }

        case 'SET_SHOW_LEDGER_DROPDOWN':
            return {
                ...state,
                showLedgerDropDown: action.payload
            }

        case 'LEDGER_ARROW_DOWN':
            const LlastIndex = state.filteredLedger.length - 1;
            return {
                ...state,
                highlightedLedgerIndex:
                    state.highlightedLedgerIndex < 0
                        ? 0
                        : state.highlightedLedgerIndex < LlastIndex
                            ? state.highlightedLedgerIndex + 1
                            : LlastIndex
            }

        case 'LEDGER_ARROW_UP':
            return {
                ...state,
                highlightedLedgerIndex:
                    state.highlightedLedgerIndex > 0
                        ? state.highlightedLedgerIndex - 1
                        : 0
            }

        case 'LEDGER_ENTER_SELECT':
            const lselected =
                state.filteredLedger[state.highlightedLedgerIndex];

            if (!lselected) return state;

            return {
                ...state,
                bottomData: {
                    ...state.bottomData,
                    product: lselected.LedgerName,
                    productId: lselected.LedgerId
                },
                ledgerQuery: lselected.LedgerName,
                showLedgerDropDown: false,
                highlightedLedgerIndex: -1
            }

        case 'SET_PRODUCT':
            return { ...state, product: action.payload }

        case 'SET_PRODUCT_LIST':
            return { ...state, productList: action.payload }

        case 'SET_PRODUCT_QUERY':
            return {
                ...state,
                productQuery: action.payload || '',
                filteredProduct: state.productList.filter(l =>
                    l.ProductName
                        ?.toLowerCase()
                        .includes((action.payload || '').toLowerCase())
                ),
                showProductDropDown: action.payload.trim() !== '',
            }

        case 'SELECT_PRODUCT':
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


        case 'SET_SHOW_PRODUCT_DROPDOWN':
            return {
                ...state,
                showProductDropDown: action.payload
            }

        case 'PRODUCT_ARROW_DOWN':
            const plastIndex = state.filteredProduct.length - 1;
            return {
                ...state,
                highlightedProductIndex:
                    state.highlightedProductIndex < 0
                        ? 0
                        : state.highlightedProductIndex < plastIndex
                            ? state.highlightedProductIndex + 1
                            : plastIndex
            }

        case 'PRODUCT_ARROW_UP':
            return {
                ...state,
                highlightedProductIndex:
                    state.highlightedProductIndex > 0
                        ? state.highlightedProductIndex - 1
                        : 0
            }

        case 'PRODUCT_ENTER_SELECT':
            const pselected =
                state.filteredProduct[state.highlightedProductIndex];

            if (!pselected) return state;

            return {
                ...state,
                bottomData: {
                    ...state.bottomData,
                    product: pselected.ProductName,
                    productId: pselected.ProductID
                },
                productQuery: pselected.ProductName,
                showProductDropDown: false,
                highlightedProductIndex: -1
            }

        case 'SET_BRAND':
            return { ...state, brand: action.payload }

        case 'SET_BRAND_LIST':
            return { ...state, brandList: action.payload }

        case 'SET_BRAND_QUERY':
            return {
                ...state,
                brandQuery: action.payload || '',
                filteredBrand: state.brandList.filter(b =>
                    b.BrandName
                        ?.toLowerCase()
                        .includes((action.payload || '').toLowerCase())
                ),
                showBrandDropDown: action.payload.trim() !== '',
            }

        case 'SELECT_BRAND':
            return {
                ...state,
                brandQuery: action.payload.BrandName,
                showBrandDropDown: false,

                bottomData: {
                    ...state.bottomData,
                    brandId: action.payload.BrandId,
                    brandName: action.payload.BrandName,
                    brand: action.payload.BrandName
                }
            };


        case 'SET_SHOW_BRAND_DROPDOWN':
            return {
                ...state,
                showBrandDropDown: action.payload
            }

        case 'BRAND_ARROW_DOWN':
            const blastIndex = state.filteredBrand.length - 1;
            return {
                ...state,
                highlightedBrandIndex:
                    state.highlightedBrandIndex < 0
                        ? 0
                        : state.highlightedBrandIndex < blastIndex
                            ? state.highlightedBrandIndex + 1
                            : blastIndex
            }

        case 'BRAND_ARROW_UP':
            return {
                ...state,
                highlightedBrandIndex:
                    state.highlightedBrandIndex > 0
                        ? state.highlightedBrandIndex - 1
                        : 0
            }

        case 'BRAND_ENTER_SELECT':
            const bselected =
                state.filteredBrand[state.highlightedBrandIndex];

            if (!bselected) return state;

            return {
                ...state,
                bottomData: {
                    ...state.bottomData,
                    brand: bselected.brandName,
                    brandId: bselected.BrandId
                },
                brandQuery: bselected.BrandName,
                showBrandDropDown: false,
                highlightedBrandIndex: -1
            }
        case 'SET_UNIT':
            return { ...state, unit: action.payload }

        case 'SET_UNIT_LIST':
            return { ...state, unitList: action.payload }

        case 'UPDATE_BOTTOM_UNIT':
            return {
                ...state,
                bottomData: {
                    ...state.bottomData,
                    unitId: action.payload.unitId,
                    unit: action.payload.unit,
                    unitType: action.payload.unitType
                }
            };

        case "SET_ROWS_LIST":
            return { ...state, rows: action.payload };

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
                    product: '',
                    brandId: '',
                    brand: '',
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
                    totalAmt: totalTaxable,
                    actAmt: totalAmount
                }
            };
        }

        case 'SET_QUOT_FIELD':
            return {
                ...state,
                quot: {
                    ...state.quot,
                    [action.field]: action.value
                }
            }

        case 'SET_QID_FROM_API':
            return {
                ...state,
                topData: {
                    ...state.topData,
                    qId: action.QId
                }
            }

        case 'ADD_QUOT_DETS':
            return {
                ...state,
                quotDets: [...state.quoDets, action.payload]
            }

        case 'SET_SAVING':
            return { ...state, saving: action.payload };

        case "RESET_AFTER_SAVE":
            console.log("RESET HIT");
            return {
                ...state,
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
                rows: [],
                productQuery: "",
                brandQuery: "",
                showProductDropdown: false,
                showBrandDropdown: false,
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
                    totalAmt: '',
                    vatAmt: '',
                    actAmt: '',
                    roundOff: '',
                },
                ledgerQuery: "",
                projectQuery: "",
            };
        case "EDIT_ROW": {
            const row = state.rows[action.index];

            return {
                ...state,
                editIndex: action.index,
                bottomData: {
                    ...state.rows[action.index],
                    sNo: action.index + 1,
                    productId: row.productId,
                    product: row.productName,
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
                    amount: row.amount
                },
                productQuery: row.productName,
                brandQuery: row.brandName,
            };
        }

        case "ASK_DELETE_ROW":
            return {
                ...state,
                rowToDelete: action.index,
                showDeleteModal: true
            };
        case "CONFIRM_DELETE_ROW": {
            const deleteIndex = state.rowToDelete;

            const newRows = state.rows.filter((_, i) => i !== deleteIndex);

            // 🔁 Recalculate totals AFTER delete
            const totalVatAmt = newRows.reduce(
                (sum, r) => sum + Number(r.vatAmt || 0),
                0
            );
            const totalTaxable = newRows.reduce(
                (sum, r) => sum + Number(r.taxable || 0),
                0
            );
            const totalAmount = newRows.reduce(
                (sum, r) => sum + Number(r.amount || 0),
                0
            );

            return {
                ...state,
                rows: newRows,
                rowToDelete: null,
                showDeleteModal: false,

                // 🔥 update topData also
                topData: {
                    ...state.topData,
                    vatAmt: totalVatAmt,
                    totalAmt: totalTaxable,
                    actAmt: totalAmount
                }
            };
        }
        case "CANCEL_EDIT":
            return {
                ...state,
                editIndex: null,
                bottomData: {
                    sNo: state.rows.length + 1,
                    productId: '',
                    product: '',
                    brandId: '',
                    brand: '',
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
                productQuery: '',
                brandQuery: '',
                showBrandDropDown: false,
                showProductDropDown: false,
            }
        case "UPDATE_ROW": {
            const updatedRows = state.rows.map((row, i) =>
                i === state.editIndex
                    ? {
                        ...row,
                        productId: state.bottomData.productId,
                        productName: state.bottomData.product,

                        brandId: state.bottomData.brandId,
                        brandName: state.bottomData.brandName,

                        unitId: state.bottomData.unitId,
                        unitType: state.bottomData.unitType,

                        qty: state.bottomData.qty,
                        rate: state.bottomData.rate,

                        taxable: state.bottomData.taxable,
                        vatPer: state.bottomData.vatPer,
                        vatAmt: state.bottomData.vatAmt,
                        amount: state.bottomData.amount,

                        description: state.bottomData.description
                    }
                    : row
            );

            // 🔁 totals recalc
            const totalVatAmt = updatedRows.reduce(
                (s, r) => s + Number(r.vatAmt || 0),
                0
            );
            const totalTaxable = updatedRows.reduce(
                (s, r) => s + Number(r.taxable || 0),
                0
            );
            const totalAmount = updatedRows.reduce(
                (s, r) => s + Number(r.amount || 0),
                0
            );

            return {
                ...state,
                rows: updatedRows,
                editIndex: null, // 🔑 back to add mode
                bottomData: {
                    sNo: updatedRows.length + 1,
                    productId: '',
                    product: '',
                    brandId: '',
                    brand: '',
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
                productQuery: '',
                brandQuery: '',
                topData: {
                    ...state.topData,
                    vatAmt: totalVatAmt,
                    totalAmt: totalTaxable,
                    actAmt: totalAmount
                }
            };
        }
        case 'RESET_PAGE': return {
            ...initialFormState,
            rows: [],
            isLoadedFromApi: false,
            isEditMode: false,
            editQId: null
        }

        case 'LOAD_QUOT_FOR_EDIT': {
            const d = action.payload;

            return {
                ...state,
                isEditMode: true,
                editQId: action.payload.QId,

                // 🔹 PROJECT
                projectId: d.ProjId,
                projectName: d.ProjName,
                projectQuery: d.ProjName,


                // 🔹 LEDGER
                ledgerId: d.LedgerId,
                ledgerName: d.LedgerName,
                ledgerQuery: d.LedgerName,

                // 🔹 TOP DATA
                topData: {
                    ...state.topData,
                    subject: d.Subject,
                    notes: d.Notes,
                    warranty: d.Warranty,
                    inclusion: d.Inclusion,
                    exclusion: d.Exclusion,
                    scope: d.Scope,
                    delivery: d.Delivery,
                    qValidity: d.Validity,
                    vatAmt: d.TotVatamt,
                    totalAmt: d.TotTaxableAmt,
                    actAmt: d.NetAmount,
                    rNo: d.QRevNo,
                    qDate: d.QDate.split('T')[0],
                    qNo: d.QNo
                }
            };
        }

        case 'LOAD_QUOT_DETAILS_FOR_EDIT': {
            return {
                ...state,
                rows: action.payload
            };
        }


        case 'UPDATE_QUOTATION_SUCCESS':
            // console.log('RESET HIT');
            return {
                ...state,
                isEditMode: false,
                editQId: null,
                topData: { ...initialFormState.topData },
                // 👇 LEDGER
                ledgerId: '',
                ledgerName: '',
                ledgerQuery: '',
                showLedgerDropdown: false,

                // 👇 PROJECT
                projectId: '',
                projectName: '',
                projectQuery: '',
                showProjectDropdown: false,
            };

        case "SET_ROWS":
            return {
                ...state,
                rows: action.payload
            };

        case 'SET_LOADED_FROM_API':
            return {
                ...state,
                isLoadedFromApi: true
            };

        default:
            return state;

    }

}
const API_BASE = 'http://192.168.31.101:85/api';

const Quot = ({ gstReportData }) => {
    const reportRef = useRef(null);

    const [state, dispatch] = useReducer(reducer, initialState);


    const gapi = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    useEffect(() => {
        loadProject();
        loadLedger();
        loadProduct();
        loadBrand();
        loadUnit();
        loadQuot();
        loadQuotDets();
    }, [])
    const ignoreRowsLoadRef = useRef(false);
    const { qId } = useParams();
    // console.log('QID FROM URL = ', qId);


    useEffect(() => {
        if (!qId) return;
        if (state.isLoadedFromApi) return;

        if (qId && !state.isLoadedFromApi) {
            ignoreRowsLoadRef.current = false;
            loadQuotationById(qId);
            loadQuotationDetailsByQId(qId);
            dispatch({
                type: 'SET_LOADED_FROM_API'
            });
        }
    }, [qId]);



    const loadQuotationDetailsByQId = async (qId) => {
        try {
            const res = await axios.get('http://192.168.31.101:85/api/QuoDetsInfoes');
            console.log("ALL DATA", res.data);
            if (ignoreRowsLoadRef.current) return;
            const filteredRows = (Array.isArray(res.data) ? res.data : [])
                .filter(r => r.QId === Number(qId));

            // Map to your FE state format
            const mappedRows = filteredRows.map((r, index) => ({
                sNo: index + 1,

                productId: r.ProductId,
                productName: r.ProductName || '',
                description: r.ProdDes || '',

                brandId: r.BrandId,
                brandName: r.BrandName || '',

                unitId: r.UnitId,
                unitType: r.UnitType || '',

                qty: r.Qty,
                rate: r.Rate,

                taxable: r.Taxable,
                vatPer: r.VatPer,
                vatAmt: r.VatAmt,
                amount: r.NetAmt,

                QDetsId: r.QDetsId
            }));

            dispatch({
                type: 'LOAD_QUOT_DETAILS_FOR_EDIT',
                payload: mappedRows
            });
        } catch (err) {
            console.error("Failed to load secondary data:", err);
        }
    };


    const loadQuotationById = async (id) => {
        const res = await axios.get(`http://192.168.31.101:85/api/quoinfo/${id}`);
        console.log('EDIT API DATA =', res.data);
        dispatch({
            type: 'LOAD_QUOT_FOR_EDIT',
            payload: res.data
        });
    };

   

    const updateQuotation = async () => {
        try {
            const payload = {
                QId: state.editQId,
                QNo: state.topData.qNo,
                QRevNo: state.topData.rNo,

                ProjId: state.projectId,
                ProjName: state.projectQuery,

                LedgerId: state.ledgerId,
                LedgerName: state.ledgerQuery,

                QDate: state.topData.qDate,
                Subject: state.topData.subject,
                Notes: state.topData.notes,
                Scope: state.topData.scope,
                Inclusion: state.topData.inclusion,
                Exclusion: state.topData.exclusion,
                Delivery: state.topData.delivery,
                Warranty: state.topData.warranty,
                Validity: state.topData.qValidity,

                TotTaxableAmt: state.topData.totalAmt,
                TotVatamt: state.topData.vatAmt,
                NetAmount: state.topData.actAmt,
            };


            console.log('UPDATE PAYLOAD =', payload);

            await axios.put(
                `${API_BASE}/tblQuos/${state.editQId}`,
                payload
            );

            alert('Quotation updated successfully');

            dispatch({ type: 'RESET_PAGE' });
            navigate('/transaction/quot');
        } catch (err) {
            console.error('UPDATE FAILED', err);
            alert('Update failed');
        }
    };


    const loadProject = async () => {
        try {
            const res = await axios.get(`${gapi}/project`);
            // console.log(res.data)
            dispatch({ type: 'SET_PROJECT_LIST', payload: res.data })
        } catch (err) {
            alert('Could not load project')
        }
    }

    const loadLedger = async () => {
        try {
            const res = await axios.get(`${gapi}/ledger`)
            // console.log(res.data)
            dispatch({ type: 'SET_LEDGER_LIST', payload: res.data })
        } catch (err) {
            alert('could not load ledger')
        }
    }

    const loadProduct = async () => {
        try {
            const res = await axios.get(`${gapi}/productmasters`)
            // console.log(res.data)
            dispatch({ type: 'SET_PRODUCT_LIST', payload: res.data })

        } catch (err) {
            alert('could not load product')
        }
    }

    const loadUnit = async () => {
        try {
            const res = await axios.get(`${gapi}/unit`)
            // console.log(res.data)
            dispatch({ type: 'SET_UNIT_LIST', payload: res.data })

        } catch (err) {
            alert('could not load unit')
        }
    }

    const loadBrand = async () => {
        try {
            const res = await axios.get(`${gapi}/brand`)
            // console.log(res.data)
            dispatch({ type: 'SET_BRAND_LIST', payload: res.data })

        } catch (err) {
            alert('could not load brand')
        }
    }

    const loadQuot = async () => {
        try {
            const res = await axios.get(`${gapi}/tblQuos`);
            dispatch({ type: 'SET_QUOT_LIST' })
            //console.log(res.data);
        } catch (err) {
            console.error("Error fetching Quo:", err);
            alert("Could not load Quotation. Please check API connection.");
        }
    }

    const loadQuotDets = async () => {
        try {
            const res = await axios.get(`${gapi}/tblQuodets`);
            dispatch({ type: 'SET_QUOTDETS_LIST' })
            //console.log(res.data);
        } catch (err) {
            console.error("Error fetching QuoDets:", err);
            alert("Could not load QuotationDetails. Please check API connection.");
        }
    }


    const handleBottomChange = (e) => {
        dispatch({
            type: 'SET_BOTTOM_FIELD',
            field: e.target.name,
            value: e.target.value,
        })
    }

    const handleTopChange = (e) => {
        const { name, value } = e.target;

        dispatch({
            type: 'SET_TOP_FIELD',
            field: name,
            value: value
        });
    };


    const handleProjectChange = (e) => {

        dispatch({
            type: 'SET_PROJECT_QUERY',
            payload: e.target.value
        })
    }

    const handleLedgerChange = (e) => {
        dispatch({
            type: 'SET_LEDGER_QUERY',
            payload: e.target.value
        })
    }

    const handleProductChange = (e) => {
        dispatch({
            type: 'SET_PRODUCT_QUERY',
            payload: e.target.value
        })
    }

    const handleBrandChange = (e) => {
        dispatch({
            type: 'SET_BRAND_QUERY',
            payload: e.target.value
        })
    }

    const handleProjectKeyDown = (e) => {
        if (!state.showProjectDropDown) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                dispatch({ type: 'PROJECT_ARROW_DOWN' })
                break;

            case 'ArrowUp':
                e.preventDefault();
                dispatch({ type: 'PROJECT_ARROW_UP' })
                break;

            case 'Enter':
                e.preventDefault();
                dispatch({ type: 'PROJECT_ENTER_SELECT' });

            default:
                break;
        }
    }

    const handleLedgerKeyDown = (e) => {
        if (!state.showLedgerDropDown) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                dispatch({ type: 'LEDGER_ARROW_DOWN' })
                break;

            case 'ArrowUp':
                e.preventDefault();
                dispatch({ type: 'LEDGER_ARROW_UP' })
                break;

            case 'Enter':
                e.preventDefault();
                dispatch({ type: 'LEDGER_ENTER_SELECT' });

            default:
                break;
        }
    }

    const handleProductKeyDown = (e) => {
        if (!state.showProductDropDown) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                dispatch({ type: 'PRODUCT_ARROW_DOWN' })
                break;

            case 'ArrowUp':
                e.preventDefault();
                dispatch({ type: 'PRODUCT_ARROW_UP' })
                break;

            case 'Enter':
                e.preventDefault();
                dispatch({ type: 'PRODUCT_ENTER_SELECT' });

            default:
                break;
        }
    }

    const handleBrandKeyDown = (e) => {
        if (!state.showBrandDropDown) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                dispatch({ type: 'BRAND_ARROW_DOWN' })
                break;

            case 'ArrowUp':
                e.preventDefault();
                dispatch({ type: 'BRAND_ARROW_UP' })
                break;

            case 'Enter':
                e.preventDefault();
                dispatch({ type: 'BRAND_ENTER_SELECT' });

            default:
                break;
        }
    }

    const saveQuotationTop = async () => {

        // console.log("Selected ProjectId:", state.projectId);
        // console.log("Selected Project Name:", state.projectQuery);

        const td = state.topData;
        // Prepare payload matching DB
        const payload = {
            QId: td.qId ? Number(td.qId) : 0, // if new, server auto-increment
            QNo: Number(td.qNo) || 0,
            QDate: td.qDate || new Date().toISOString(), // iso string
            QRevNo: Number(td.rNo) || 0,
            ProjId: Number(td.projectId) || 0,
            Subject: td.subject || "",
            Scope: td.scope || "",
            Notes: td.notes || "",
            Warranty: td.warranty || "",
            Inclusion: td.inclusion || "",
            Exclusion: td.exclusion || '',
            TotTaxableAmt: Number(td.totalAmt) || 0,
            TotVatAmt: Number(td.vatAmt) || 0,
            NetAmount: td.actAmt || "",
            Terms: td.payment || "",
            Delivery: td.delivery || "",
            Validity: td.qValidity || '',
            CreateBy: 1, // your user id
            CreateOn: new Date().toISOString(),
        };

        try {
            const response = await axios.post(`${gapi}/tblQuos`, payload);
            // console.log("FULL RESPONSE DATA 👉", response.data);

            if (response.data.Status === 'Success') {
                const qId = Number(response.data.RefId)
                return qId;
            } else {
                alert(response.data.Message || "Save failed");
                return null;
            }

        } catch (err) {
            console.error("Error saving quotation header:", err);
            return null;
        }

    };


    const saveQuoDetails = async (qId, row, index) => {
        // Prepare payload
        const newRow = {
            QDetsId: 0,
            QId: Number(qId),              // 🔥 THIS IS THE KEY LINE
            SNo: index + 1,
            ProductId: Number(row.productId) || 0,
            ProdDes: row.description || "",
            UnitId: Number(row.unitId) || 0,
            BrandId: Number(row.brandId) || 0,
            Qty: Number(row.qty) || 0,
            Rate: Number(row.rate) || 0,
            Taxable: Number(row.taxable) || 0,
            VatPer: Number(row.vatPer) || 0,
            VatAmt: Number(row.vatAmt) || 0,
            NetAmt: Number(row.amount) || 0,
            NRate: Number(row.rate) || 0,
        };
        return axios.post(`${gapi}/tblQuodets`, newRow);

    };

    const handleSave = async () => {
        try {
            dispatch({ type: "SET_SAVING", payload: true });

            // 1️⃣ Save quotation header
            const qId = await saveQuotationTop();
            console.log("Header saved, QId 👉", qId);

            // 2️⃣ Save all quotation details
            for (let i = 0; i < state.rows.length; i++) {
                await saveQuoDetails(qId, state.rows[i], i);
            }

            dispatch({ type: "RESET_AFTER_SAVE" });

            alert("Quotation & Details saved successfully ✅");

        } catch (err) {
            console.error("Save failed:", err);
            alert("Save failed ❌");

        } finally {
            dispatch({ type: "SET_SAVING", payload: false });
        }
    };

    const handleReset = () => {
        ignoreRowsLoadRef.current = true;
        dispatch({ type: 'RESET_PAGE' })
        navigate('/transaction/quot/')
    }


    const handlePrint = async () => {
        if (!reportRef.current) return;

        const canvas = await html2canvas(reportRef.current, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        window.open(pdf.output("bloburl"), "_blank");
    };

    const highlightText = (text = '', query = '') => {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, 'ig');

        return text.split(regex).map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: '#ffc107', fontWeight: 'bold' }}>
                    {part}
                </span>
            ) : (
                part
            )
        );
    };


    return (
        <div className='container-fluid mt-2'>
            {/* card */}
            <div
                className='card mx-auto shadow-lg'
                style={{
                    border: '2px solid #6a1b9a',
                    maxWidth: '95%'
                }}
            >
                {/* Header */}
                <div className='card-header'
                    style={{
                        color: '#6a1b9a',
                        padding: '20px',
                        backgroundColor: 'white'
                    }}
                >
                    <h4 className='mb-0'><FontAwesomeIcon icon={faReceipt} className="me-2" />Quot</h4>
                </div>
                {/* Body */}
                <div className='card-body mb-0'
                    style={{
                        height: 'calc(100vh - 200px)'
                    }}
                >
                    {/* 👉 FLEX ROW: left card (70%) + right panel (30%) */}
                    <div className="d-flex" style={{ width: "100%" }}>

                        {/* LEFT MAIN CARD — unchanged */}
                        <div
                            className="card shadow-sm"
                            style={{
                                border: '1px solid #6a1b9a',
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
                            {/* Row 1 */}
                            <div className='d-flex align-items-center gap-5 '>


                                <div className='d-flex align-items-center '
                                    style={{
                                        width: '200px',
                                        height: '25px'
                                    }}
                                >
                                    <label className='form-label mb-2 me-2 fw-bold 
                            '>Q.No</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                        name='qNo'
                                        value={state.topData.qNo ?? ''}
                                        onChange={handleTopChange}
                                        autoComplete="off"
                                    />
                                </div>



                                <div className='d-flex align-items-center'
                                    style={{
                                        width: '200px',
                                        height: '20px'
                                    }}
                                >
                                    <label className='form-label mb-0 me-2 fw-bold'>R.No</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                        name='rNo'
                                        value={state.topData.rNo ?? ''}
                                        onChange={handleTopChange}
                                        autoComplete="off"
                                    />
                                </div>



                                <div
                                    className="d-flex align-items-center"
                                    style={{ width: '710px', height: '25px', position: 'relative' }}
                                >
                                    <label className="form-label mb-1 me-2 fw-bold">
                                        Project
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="project"
                                        value={state.projectQuery}
                                        placeholder="🔎 Search Project..."
                                        onChange={handleProjectChange}
                                        onKeyDown={handleProjectKeyDown}
                                        autoComplete="off"
                                        onFocus={() =>
                                            dispatch({ type: 'SET_SHOW_PROJECT_DROPDOWN', payload: true })
                                        }
                                        onBlur={() =>
                                            setTimeout(
                                                () =>
                                                    dispatch({
                                                        type: 'SET_SHOW_PROJECT_DROPDOWN',
                                                        payload: false
                                                    }),
                                                150
                                            )
                                        }
                                    />

                                    {/* 🔽 Autosuggest Dropdown */}
                                    {state.showProjectDropDown && state.filteredProject.length > 0 && (
                                        <div
                                            className="position-absolute bg-white border shadow-sm"
                                            style={{
                                                top: '28px',
                                                left: '54px',
                                                width: 'calc(100% - 50px)',
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                zIndex: 9999
                                            }}
                                        >
                                            <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                <div className="col-5">Name</div>
                                            </div>
                                            {state.filteredProject.map((item, index) => (
                                                <div
                                                    key={item.ProjId}
                                                    className="px-2 py-1 border-bottom"
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor:
                                                            index === state.highlightedProjectIndex
                                                                ? '#e9ecef'
                                                                : 'white'
                                                    }}
                                                    onMouseDown={() =>
                                                        dispatch({
                                                            type: 'SELECT_PROJECT',
                                                            payload: item
                                                        })
                                                    }
                                                >
                                                    {highlightText(item.ProjName, state.projectQuery)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>



                                <div
                                    className="d-flex align-items-center"
                                    style={{ width: '710px', height: '25px', position: 'relative' }}
                                >
                                    <label className="form-label mb-1 me-2 fw-bold">
                                        Ledger
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="ledger"
                                        value={state.ledgerQuery ?? ''}
                                        placeholder="🔎 Search Ledger..."
                                        onChange={handleLedgerChange}
                                        onKeyDown={handleLedgerKeyDown}
                                        autoComplete="off"
                                        onFocus={() =>
                                            dispatch({ type: 'SET_SHOW_LEDGER_DROPDOWN', payload: true })
                                        }
                                        onBlur={() =>
                                            setTimeout(
                                                () =>
                                                    dispatch({
                                                        type: 'SET_SHOW_LEDGER_DROPDOWN',
                                                        payload: false
                                                    }),
                                                150
                                            )
                                        }
                                    />

                                    {/* 🔽 Autosuggest Dropdown */}
                                    {state.showLedgerDropDown && state.filteredLedger.length > 0 && (
                                        <div
                                            className="position-absolute bg-white border shadow-sm"
                                            style={{
                                                top: '28px',
                                                left: '54px',        // 👈 label width adjust
                                                width: 'calc(100% - 50px)',
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                zIndex: 9999
                                            }}
                                        >
                                            <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                <div className="col-5">Name</div>
                                                <div className="col-3">Place</div>
                                                <div className="col-4">State</div>


                                            </div>
                                            {state.filteredLedger.map((item, index) => (
                                                <div
                                                    key={item.LedgerId}
                                                    className=" d-flex px-2 py-1 border-bottom"
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor:
                                                            index === state.highlightedLedgerIndex
                                                                ? '#e9ecef'
                                                                : 'white'
                                                    }}
                                                    onMouseDown={() =>
                                                        dispatch({
                                                            type: 'SELECT_LEDGER',
                                                            payload: item
                                                        })
                                                    }
                                                >
                                                    <div className="col-5"> {highlightText(item.LedgerName, state.ledgerQuery)}</div>
                                                    <div className="col-3">{highlightText(item.EPlace || "-", state.ledgerQuery)}</div>
                                                    <div className="col-4">{highlightText(item.StateName || "-", state.ledgerQuery)}</div>

                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* Row 2 */}

                            <div className='d-flex align-items-center gap-5 mt-2'>

                                <div className='d-flex align-items-center'>
                                    <label className='form-label fw-bold me-2 mb-1'>Q.Date</label>
                                    <input
                                        type='date'
                                        className='form-control form-control-sm'
                                        name='qDate'
                                        value={state.topData.qDate || ''}
                                        onChange={handleTopChange}
                                        autoComplete="off"
                                    />
                                </div>


                                <div className='d-flex align-items-center'
                                    style={{
                                        width: '86%'
                                    }}
                                >
                                    <label className='form-label fw-bold me-2 mb-1'>Subject</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        name='subject'
                                        value={state.topData.subject}
                                        onChange={handleTopChange}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>


                            <hr className='mt-1 mb-1' />
                            {/* 10 Bottom Input Boxes */}

                            <div className='d-flex mt-0'>
                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>S.No</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                        name='sNo'
                                        value={state.bottomData.sNo}
                                        onChange={handleTopChange}
                                        autoComplete="off"
                                        disabled
                                    />
                                </div>


                                <div
                                    className="d-flex flex-column align-items-start"
                                    style={{ width: '200px', position: 'relative' }}
                                >
                                    <label className="form-label mb-1 me-2 fw-bold">
                                        product
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="product"
                                        value={state.productQuery}
                                        placeholder="🔎 Search Product..."
                                        onChange={handleProductChange}
                                        onKeyDown={handleProductKeyDown}
                                        autoComplete="off"
                                        onFocus={() =>
                                            dispatch({ type: 'SET_SHOW_PRODUCT_DROPDOWN', payload: true })
                                        }
                                        onBlur={() =>
                                            setTimeout(
                                                () =>
                                                    dispatch({
                                                        type: 'SET_SHOW_PRODUCT_DROPDOWN',
                                                        payload: false
                                                    }),
                                                150
                                            )
                                        }
                                    />



                                    {/* 🔽 Autosuggest Dropdown */}
                                    {state.showProductDropDown && state.filteredProduct.length > 0 && (
                                        <div
                                            className="position-absolute bg-white border shadow-sm"
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                width: '100%',
                                                maxHeight: '200px',
                                                border: '1px solid #ccc',
                                                overflowY: 'auto',
                                                zIndex: 9999
                                            }}
                                        >
                                            <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                <div className="col-5">Product </div>
                                            </div>
                                            {state.filteredProduct.map((item, index) => (
                                                <div
                                                    key={item.ProductID}
                                                    className="px-2 py-1 border-bottom"
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor:
                                                            index === state.highlightedProductIndex
                                                                ? '#e9ecef'
                                                                : 'white'
                                                    }}
                                                    onMouseDown={() =>
                                                        dispatch({
                                                            type: 'SELECT_PRODUCT',
                                                            payload: item
                                                        })
                                                    }
                                                >
                                                    {highlightText(item.ProductName, state.productQuery)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 100px' }}>
                                    <label className='form-label fw-bold'
                                        style={{ fontSize: '15px', marginBottom: '2px' }}>
                                        Unit
                                    </label>

                                    <select
                                        className="form-select form-select-sm"
                                        value={state.bottomData.unitId || ""}
                                        disabled
                                        onChange={(e) => {
                                            const selectedId = Number(e.target.value);
                                            const selectedUnit =
                                                state.unitList.find(u => u.UnitId === selectedId);

                                            dispatch({
                                                type: "UPDATE_BOTTOM_UNIT",
                                                payload: {
                                                    unitId: selectedId,
                                                    unit: selectedUnit?.UnitType || "",
                                                    unitType: selectedUnit?.UnitType || ""
                                                }
                                            });
                                        }}
                                    >
                                        <option value="">--</option>
                                        {Array.isArray(state.unitList) &&
                                            state.unitList.map(u => (
                                                <option key={u.UnitId} value={u.UnitId}>
                                                    {u.UnitType}
                                                </option>
                                            ))
                                        }

                                    </select>
                                </div>


                                <div
                                    className="d-flex flex-column align-items-start"
                                    style={{ width: '180px', position: 'relative' }}
                                >
                                    <label className="form-label mb-1 me-2 fw-bold">
                                        Brand
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="brand"
                                        value={state.brandQuery}
                                        onChange={handleBrandChange}
                                        onKeyDown={handleBrandKeyDown}
                                        autoComplete="off"
                                        placeholder="🔎 Search Brand..."
                                        onFocus={() =>
                                            dispatch({ type: 'SET_SHOW_BRAND_DROPDOWN', payload: true })
                                        }
                                        onBlur={() =>
                                            setTimeout(
                                                () =>
                                                    dispatch({
                                                        type: 'SET_SHOW_BRAND_DROPDOWN',
                                                        payload: false
                                                    }),
                                                150
                                            )
                                        }
                                    />


                                    {/* 🔽 Autosuggest Dropdown */}
                                    {state.showBrandDropDown && state.filteredBrand.length > 0 && (
                                        <div
                                            className="position-absolute bg-white border shadow-sm"
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                width: '100%',
                                                maxHeight: '200px',
                                                border: '1px solid #ccc',
                                                overflowY: 'auto',
                                                zIndex: 9999
                                            }}
                                        >
                                            <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                <div className="col-5">Brand</div>
                                            </div>
                                            {state.filteredBrand.map((item, index) => (
                                                <div
                                                    key={item.BrandId}
                                                    className="px-2 py-1 border-bottom"
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor:
                                                            index === state.highlightedBrandIndex
                                                                ? '#e9ecef'
                                                                : 'white'
                                                    }}
                                                    onMouseDown={() =>
                                                        dispatch({
                                                            type: 'SELECT_BRAND',
                                                            payload: item
                                                        })
                                                    }
                                                >
                                                    {highlightText(item.BrandName, state.brandQuery)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Qty</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        name='qty'
                                        value={state.bottomData.qty}
                                        autoComplete="off"
                                        onChange={handleBottomChange}
                                    />
                                </div>


                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Rate</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        name='rate'
                                        value={state.bottomData.rate}
                                        onChange={handleBottomChange}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Taxable</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        name='taxable'
                                        value={state.bottomData.taxable}
                                        onChange={handleBottomChange}
                                        autoComplete="off"
                                        disabled
                                    />
                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Vat%</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        name='vatPer'
                                        value={state.bottomData.vatPer}
                                        autoComplete="off"
                                        onChange={handleBottomChange}
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Vat Amt</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                        name='vatAmt'
                                        value={state.bottomData.vatAmt}
                                        onChange={handleBottomChange}
                                        disabled
                                    />

                                </div>

                                <div className='mx-2' style={{ flex: '0 0 80px' }}>
                                    <label className='form-label fw-bold' style={{ fontSize: '15px', marginBottom: '2px' }}>Amount</label>
                                    <input
                                        type='number'
                                        className='form-control form-control-sm'
                                        name='amount'
                                        value={state.bottomData.amount}
                                        onChange={handleBottomChange}
                                        disabled
                                    />

                                </div>
                            </div>
                            {/* TextArea Box */}
                            <div className='d-flex align-items-center ' style={{ gap: '10px', marginTop: '5px' }}>
                                <textarea
                                    className='form-control form-control-sm mt-1 '
                                    rows={2}
                                    style={{
                                        width: '50%',
                                        marginLeft: '0.5%'

                                    }}
                                    name='description'
                                    value={state.bottomData.description}
                                    onChange={handleBottomChange}
                                    autoComplete="off"
                                />

                                <button
                                    className='btn btn-primary btn-sm'
                                    onClick={() => {
                                        if (state.editIndex !== null) {
                                            dispatch({ type: 'UPDATE_ROW' });
                                        } else {
                                            dispatch({ type: 'ADD_ROW' });
                                        }
                                    }}
                                >
                                    {state.editIndex
                                        ? 'Update'
                                        : state.isEditMode
                                            ? 'Update'
                                            : 'Add'
                                    }
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
                                                <th style={{ width: "120px" }} className="text-end">Actions</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.rows.map((r, index) => {
                                                console.log("RENDER ROWS", state.rows);

                                                return (
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
                                                        <td className="text-center">
                                                            {state.editIndex === index ? (
                                                                <>
                                                                    <button
                                                                        className="btn btn-sm btn-warning"
                                                                        style={{ padding: "0.2rem 0.4rem", fontSize: "8px" }}
                                                                        onClick={() => dispatch({ type: "CANCEL_EDIT" })}
                                                                    >
                                                                        Cancel Edit
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        className="btn btn-sm btn-secondary me-1"
                                                                        style={{ padding: "0.2rem 0.4rem", fontSize: "8px" }}
                                                                        onClick={() => dispatch({ type: "EDIT_ROW", index })}
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        className="btn btn-sm btn-danger"
                                                                        style={{ padding: "0.2rem 0.4rem", fontSize: "8px" }}
                                                                        onClick={() => dispatch({ type: "ASK_DELETE_ROW", index })}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>


                                    </table>

                                </div>
                                {/* Delete Modal */}
                                {state.showDeleteModal && (
                                    <div className="modal show d-block" tabIndex="-1">
                                        <div className="modal-dialog">
                                            <div className="modal-content">

                                                <div className="modal-header">
                                                    <h5 className="modal-title">Confirm Delete</h5>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        onClick={() => dispatch({ type: "CANCEL_DELETE_ROW" })}
                                                    />
                                                </div>

                                                <div className="modal-body">
                                                    <p>
                                                        Are you sure you want to delete this row?
                                                    </p>
                                                </div>

                                                <div className="modal-footer">
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => dispatch({ type: "CANCEL_DELETE_ROW" })}
                                                    >
                                                        No
                                                    </button>

                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => dispatch({ type: "CONFIRM_DELETE_ROW" })}
                                                    >
                                                        Yes
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )}


                            </div>
                        </div>
                        {/* Right panel */}
                        <div
                            style={{
                                flex: '0 0 30%',
                                paddingLeft: '15px'
                            }}
                        >
                            <h6
                                style={{
                                    display: 'inline-block',
                                    borderBottom: '2px solid #6a1b9a',
                                    paddingTop: ' 2px',
                                    marginBottom: '10px'
                                }}
                            >
                                Terms & Conditions
                            </h6>
                            <div className='mb-2 align-items-center mb-2'>
                                <label className='form-label fw-bold' style={{ fontSize: '0.85rem' }}>Payment</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    name='payment'
                                    value={state.topData.payment}
                                    onChange={handleTopChange}
                                    autoComplete="off"
                                />
                            </div>

                            <div className='mb-2 align-items-center mb-2'>
                                <label className='form-label fw-bold' style={{ fontSize: '0.85rem' }}>Delivery</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    name='delivery'
                                    value={state.topData.delivery}
                                    onChange={handleTopChange}
                                    autoComplete="off"
                                />
                            </div>

                            <div className='mb-2 align-items-center mb-2'>
                                <label className='form-label fw-bold' style={{ fontSize: '0.85rem' }}>Quotation Validity</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    name='qValidity'
                                    value={state.topData.qValidity}
                                    onChange={handleTopChange}
                                    autoComplete="off"
                                />
                            </div>

                            {/* Right side small 4 input box */}
                            <div className='mt-3'>

                                <div className='d-flex align-items-center mb-2'>
                                    <label className=' me-2 fw-bold' style={{ fontSize: '0.8rem', width: '70px' }}>Item</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        style={{ width: '80px' }}
                                        name='item'
                                        value={state.rows.length}
                                        onChange={handleTopChange}
                                        autoComplete="off"
                                        disabled
                                    />
                                </div>

                                <div className='d-flex align-items-center mb-2'>
                                    <label className=' me-2 fw-bold' style={{ fontSize: '0.8rem', width: '70px' }}>Total Amt</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        style={{ width: '80px' }}
                                        name='totalAmt'
                                        value={state.topData.totalAmt ?? ''}
                                        onChange={handleTopChange}
                                        autoComplete="off"
                                        disabled
                                    />
                                </div>

                                <div className='d-flex align-items-center mb-2'>
                                    <label className=' me-2 fw-bold' style={{ fontSize: '0.8rem', width: '70px' }}>Vat Amt</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        style={{ width: '80px' }}
                                        name='vatAmt'
                                        value={state.topData.vatAmt ?? ''}
                                        onChange={handleTopChange}
                                        autoComplete="off"
                                        disabled
                                    />
                                </div>

                                <div className='d-flex align-items-center mb-2'>
                                    <label className=' me-2 fw-bold' style={{ fontSize: '0.8rem', width: '70px' }}>Act Amt</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        style={{ width: '80px' }}
                                        name='actAmt'
                                        value={state.topData.actAmt ?? ''}
                                        onChange={handleTopChange}
                                        autoComplete="off"
                                        disabled
                                    />
                                </div>

                                <div className='d-flex align-items-center mb-2'>
                                    <label className=' me-2 fw-bold' style={{ fontSize: '0.8rem', width: '70px' }}>Round Off</label>
                                    <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        style={{ width: '80px' }}
                                        name='roundOff'
                                        value={state.topData.roundOff}
                                        onChange={handleTopChange}
                                        autoComplete="off"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Boxes */}
                    <div className='d-flex flex-wrap gap-3'>
                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Notes</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                                name='notes'
                                value={state.topData.notes}
                                onChange={handleTopChange}
                                autoComplete="off"
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Warranty</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                                name='warranty'
                                value={state.topData.warranty}
                                onChange={handleTopChange}
                                autoComplete="off"
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Inclusion</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                                name='inclusion'
                                value={state.topData.inclusion}
                                onChange={handleTopChange}
                                autoComplete="off"
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Exclusion</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                                name='exclusion'
                                value={state.topData.exclusion}
                                onChange={handleTopChange}
                                autoComplete="off"
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Scope</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                                name='scope'
                                value={state.topData.scope}
                                onChange={handleTopChange}
                                autoComplete="off"
                            />
                        </div>
                        {/* Bottom 8 Buttons */}
                        <div style={{
                            flex: '0 0 48%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            gap: '5px',
                            flexWrap: 'nowrap',
                            padddingTop: '18px',
                            overflowX: 'auto'
                        }}>
                            <button className='btn btn-sm btn-danger' onClick={() => navigate('/transaction/quotation/find')}>Find</button>
                            <button className='btn btn-sm btn-danger'
                                onClick={() => {
                                    if (state.isEditMode) {
                                        updateQuotation()
                                    } else {
                                        handleSave()
                                    }
                                }}
                            >{state.isEditMode ? 'Update' : 'Save'}</button>
                            <button className='btn btn-sm btn-danger' onClick={handlePrint} >Print</button>
                            <button className='btn btn-sm btn-danger' onClick={() => navigate('/transaction/quotation/find')}>Delete</button>
                            <button className='btn btn-sm btn-danger'
                                onClick={handleReset}
                            >Reset</button>

                        </div>
                        <>

                            <div
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    opacity: 0,
                                    pointerEvents: "none",
                                    width: "210mm",
                                }}
                            >
                                <GSTReport ref={reportRef} reportData={gstReportData || []} />
                            </div>
                        </>
                    </div>


                    {state.showFindModal && (
                        <FindModal state={state} dispatch={dispatch} />
                    )}

                </div>
            </div>
        </div>
    )
}

export default Quot;