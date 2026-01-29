import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../api/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons'
import FindQuot from './FindQuot';


const Sales = () => {
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
        item: '',
        qValidity: '',
        totalAmt: '',
        totVatAmt: '',
        totActAmt: '',
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

    const [productList, setProductList] = useState([]);
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
    const [editIndex, setEditIndex] = useState(null);
    const [rowToDelete, setRowToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [message, setMessage] = useState('');
    const [showMessage_Error, setShowMessage_Error] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const [Quot, setQuot] = useState([]);
    const [showFind, setShowFind] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [showProjectModal, setShowProjectModal] = useState(false)
    const [project, setProject] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectNo, setProjectNo] = useState('');
    const [projectDate, setProjectDate] = useState('');
    const [projectLedger, setProjectLedger] = useState('');
    const [projectLedgerList, setProjectLedgerList] = useState([]);

    const [showProductModal, setShowProductModal] = useState(false);
    const [productName, setProductName] = useState('');
    const [productCode, setProductCode] = useState('');
    const [vatPer, setVatPer] = useState('');
    const [salesUnit, setSalesUnit] = useState('');
    const [groupQuery, setGroupQuery] = useState('');
    const [addUnitList, setAddUnitList] = useState([]);
    const [addGroupList, setAddGroupList] = useState([]);
    const [product, setProduct] = useState(null);

    const [showAddBrandModal, setShowAddBrandModal] = useState(false);
    const [invType, setInvType] = useState("");

    const [qNoQuery, setQNoQuery] = useState('');

    // quotation master list
    const [quotationList, setQuotationList] = useState([]);
    const [filteredQuotation, setFilteredQuotation] = useState([]);

    // input
    const [quotationQuery, setQuotationQuery] = useState("");
    const [showQuotationDropdown, setShowQuotationDropdown] = useState(false);
    const [activeQuotationIndex, setActiveQuotationIndex] = useState(-1);

    // selected
    const [selectedQId, setSelectedQId] = useState(null);

    const quotationInputRef = useRef(null);

    const [qId, setQId] = useState('')









    const gapi = import.meta.env.VITE_API_URL;

    useEffect(() => {
        loadProject();
        loadLedgers();
        loadProduct();
        loadUnit();
        loadBrands();
        loadQuo();
        loadQuotationById();
    }, [])

    useEffect(() => {
        axiosInstance.get(`${gapi}/ledger/list`).then(res => setProjectLedgerList(res.data.Data));
    }, []);

    useEffect(() => {
        axiosInstance.get(`${gapi}/group/list`).then(res => setAddGroupList(res.data.Data));
        axiosInstance.get(`${gapi}/unit/list`).then(res => setAddUnitList(res.data.Data));
    }, []);

    useEffect(() => {
        loadQuotation();
    }, []);

    const loadQuotation = async () => {
        const res = await axiosInstance.get(`${gapi}/quo/list`);
        setQuotationList(res.data.Data);
        setFilteredQuotation(res.data.Data);
    };

    const handleQuotationChange = (e) => {
        const value = e.target.value;
        setQuotationQuery(value);

        if (value.trim() === "") {
            setShowQuotationDropdown(false);
            return;
        }

        const result = quotationList.filter(q =>
            q.QNo?.toString().includes(value) ||
            q.ProjName?.toLowerCase().includes(value.toLowerCase()) ||
            q.LedgerName?.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredQuotation(result);
        setShowQuotationDropdown(true);
        setActiveQuotationIndex(-1);
    };

    const selectQuotation = async (item) => {
        try {
            // show QID beside input
            setSelectedQId(item.QId);

            // close dropdown
            setShowQuotationDropdown(false);
            setQuotationQuery(item.QNo);

            const res = await axiosInstance.get(
                `${gapi}/quo/edit/${item.QId}`
            );

            const data = res.data.Data;

            const header = data.Header?.[0] || {};

            // ============================
            // ✅ HEADER LOAD
            // ============================
            setTopData(prev => ({
                ...prev,
                qNo: header.QNo ?? '',
                rNo: header.QRevNo ?? '',
                qDate: header.QDate?.split('T')[0] ?? '',

                projectId: header.ProjId ?? '',
                project: header.ProjName ?? '',

                ledgerId: header.LedgerId ?? '',
                ledger: header.LedgerName ?? '',

                subject: header.Subject ?? '',
                payment: header.Terms ?? '',
                delivery: header.Delivery ?? '',
                qValidity: header.Validity ?? '',

                totalAmt: header.TotTaxableAmt ?? 0,
                totVatAmt: header.TotVatamt ?? 0,
                totActAmt: header.NetAmount ?? 0,

                notes: header.Notes ?? '',
                warranty: header.Warranty ?? '',
                inclusion: header.Inclusion ?? '',
                exclusion: header.Exclusion ?? '',
                scope: header.Scope ?? '',
            }));

            // ============================
            // ✅ DETAILS LOAD
            // ============================
            const mappedRows = (data.Details || []).map((r, i) => ({
                RowId: i + 1,

                productId: r.ProductId,
                product: r.ProductName,

                unitId: r.UnitId,
                unitType: r.UnitType,

                brandId: r.BrandId,
                brand: r.BrandName,

                qty: r.Qty,
                rate: r.Rate,

                taxable: r.Taxable,
                vatPer: r.VatPer,
                vatAmt: r.VatAmt,

                amount: r.NetAmt,
                description: r.ProdDes ?? ''
            }));

            setRows(mappedRows);

        } catch (err) {
            console.error(err);
            alert("Quotation load failed ❌");
        }
    };


    const loadQuotationById = async (qid) => {
        try {
            const res = await axiosInstance.get(
                `${gapi}/quotation/edit/${qid}`
            );

            const header = res.data.Data.Header[0];
            const details = res.data.Data.Details;

            loadHeader(header);
            loadDetails(details);

        } catch (err) {
            console.error("Quotation load error", err);
        }
    };


    const handleQuotationKeyDown = (e) => {

        // 🔼 UP ARROW → show full list
        if (e.key === "ArrowUp") {
            e.preventDefault();

            setFilteredQuotation(quotationList); // full list
            setShowQuotationDropdown(true);
            setActiveQuotationIndex(-1);
        }

        // 🔽 DOWN ARROW
        if (e.key === "ArrowDown") {
            e.preventDefault();

            setShowQuotationDropdown(true);
            setActiveQuotationIndex(prev =>
                prev < filteredQuotation.length - 1 ? prev + 1 : prev
            );
        }

        // ⏎ ENTER
        if (e.key === "Enter") {
            e.preventDefault();

            if (activeQuotationIndex >= 0) {
                selectQuotation(filteredQuotation[activeQuotationIndex]);
            }
        }

        // ❌ ESC
        if (e.key === "Escape") {
            setShowQuotationDropdown(false);
        }
    };






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
        setLedgerQuery(item.LedgerName || '')
        setTopData(prev => ({
            ...prev,
            project: item.ProjName,
            projectId: item.ProjId,
            ledger: item.LedgerName,
            ledgerId: item.LedgerId
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
            unitId: item.UnitId || "",
            unitType: item.UnitType,
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

    // cancel edit Table row
    const handleCancelEdit = () => {
        setEditIndex(null); // exit edit mode
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
        setUnitQuery('');
    };

    // Edit table row
    const handleEditRow = (index) => {
        const row = rows[index];
        setBottomData({
            sNo: index + 1,
            product: row.product,
            productId: row.productId,
            unit: row.unit,
            unitId: row.unitId,
            brand: row.brand,
            brandId: row.brandId,
            qty: row.qty,
            rate: row.rate,
            taxable: row.taxable,
            vatPer: row.vatPer,
            vatAmt: row.vatAmt,
            amount: row.amount,
        });
        setProductQuery(row.productName || '');
        setBrandQuery(row.brandName || '');
        setUnitQuery(row.unitType || '');
        setEditIndex(index);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setRowToDelete(null);
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

    const loadQuo = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/suppquo/list`)
            console.log("Quo Data:", res.data)
            setQuot(res.data.Data)

        } catch (err) {
            console.error("Error fetching suppQuo:", err);
        }
    }

    const handleSaveQuo = async () => {
        try {
            const totalQty = rows.reduce((s, r) => s + Number(r.qty || 0), 0);
            const netAmt = rows.reduce((s, r) => s + Number(r.amount || 0), 0);

            const nRate = totalQty > 0 ? netAmt / totalQty : 0;

            const payload = {
                QId: 0,
                QNo: topData.qNo,
                QDate: topData.qDate,
                QRevNo: topData.rNo,
                ProjId: Number(topData.projectId),
                LedgerId: Number(topData.ledgerId),
                Subject: topData.subject,
                Delivery: topData.delivery,
                Validity: topData.qValidity,
                Terms: topData.payment,
                Notes: topData.notes,
                Warranty: topData.warranty,
                Inclusion: topData.inclusion,
                Exclusion: topData.exclusion,
                Scope: topData.scope,
                TotTaxableAmt: rows.reduce(
                    (sum, r) => sum + Number(r.taxable || 0), 0
                ),
                TotVatamt: rows.reduce(
                    (sum, r) => sum + Number(r.vatAmt || 0), 0
                ),
                NetAmount: netAmt,

                Terms: topData.terms || "",
                Narration: topData.narration || "",
                Create_By: 1,

                // 🔥 DETAILS ARRAY
                Details: rows.map((r, index) => ({
                    SNo: index + 1,
                    ProductId: Number(r.productId),
                    ProdDes: r.description || "",

                    BrandId: Number(r.brandId || 0),
                    UnitId: Number(r.unitId || 0),

                    Qty: Number(r.qty || 0),
                    Rate: Number(r.rate || 0),

                    Taxable: Number(r.taxable || 0),
                    VatPer: Number(r.vatPer || 0),
                    VatAmt: Number(r.vatAmt || 0),

                    NetAmt: Number(r.amount || 0),
                    NRate: nRate,
                }))
            };
            console.log('Quo Payload', payload)
            // 🔥 SINGLE API CALL
            const res = await axiosInstance.post(
                `${gapi}/quo/insert`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );
            if (res.data?.Success === true) {
                showTempMessage(res.data.Message, 'true');
                handleReset()
            } else {
                showTempMessage(res.data?.Message, 'false');
            }
        }
        catch (err) {
            console.error("❌ SAVE ERROR:", err.response?.data || err);
        }
    };


    const handleEditFromFind = async (qId) => {
        try {
            const res = await axiosInstance.get(`${gapi}/quo/edit/${qId}`);
            const data = res.data.Data;

            console.log("FULL EDIT DATA 👉", data);
            console.log("HEADER 👉", data.Header);
            const header = data.Header?.[0] || {};

            setIsEditMode(true);
            // 🔹 Header load
            setTopData(prev => ({
                ...prev,
                QId: Number(header.QId),
                qNo: header.QNo,
                qDate: header.QDate?.split('T')[0],
                projectId: header.ProjId,
                ledgerId: header.LedgerId,
                rNo: header.QRevNo,
                subject: header.Subject,
                payment: header.Terms,
                delivery: header.Delivery,
                qValidity: header.Validity,
                totalAmt: header.TotTaxableAmt,
                totVatAmt: header.TotVatamt,
                totActAmt: header.NetAmount,
                notes: header.Notes,
                warranty: header.Warranty,
                inclusion: header.Inclusion,
                exclusion: header.Exclusion,
                scope: header.Scope,
            }));
            setLedgerQuery(header.LedgerName ?? '');
            setProjectQuery(header.ProjName ?? '');

            // 🔹 Details rows
            setRows(
                (data.Details || []).map((r, i) => ({
                    // 🔑 UI expects these
                    RowId: i + 1,
                    productId: r.ProductId ?? '',
                    product: r.ProductName ?? '',
                    productQuery: r.ProductName ?? '',
                    qty: r.Qty ?? 0,
                    unitId: r.UnitId,
                    unitType: r.UnitType ?? "",

                    rate: r.Rate ?? r.NRate ?? 0,
                    amount: r.NetAmt ?? 0,

                    vatPer: r.VatPer ?? 0,
                    vatAmt: r.VatAmt ?? 0,
                    brandId: r.BrandId ?? "",
                    brand: r.BrandName ?? "",
                    brandQuery: r.BrandName ?? '',
                    taxable: r.Taxable ?? '',
                    description: r.ProdDes ?? "",
                    _raw: r
                }))
            );

            setShowFind(false);
        } catch (err) {
            console.error(err);
            showTempMessage("Failed to load quotation ❌", false);
        }
    };


    const handleUpdateSuppQuo = async () => {
        try {
            const payload = {
                QId: Number(topData.QId),        // 🔑 THIS IS WHAT BACKEND USES
                QNo: topData.qNo,
                QDate: topData.qDate,
                QRevNo: topData.rNo,
                Subject: topData.subject,
                Scope: topData.scope,
                Notes: topData.notes,
                Warranty: topData.warranty,
                Inclusion: topData.inclusion,
                Exclusion: topData.exclusion,
                TotTaxableAmt: totalAmount,
                TotVatamt: totalVatAmount,
                NetAmount: totalActAmt,
                Terms: topData.payment,
                Delivery: topData.delivery,
                Validity: topData.qValidity,
                ProjId: topData.projectId,
                LedgerId: topData.ledgerId,
                Update_By: 1,

                Details: rows.map((r, index) => ({
                    QDetsId: 0,
                    QId: 0,
                    SNo: index + 1,
                    ProductId: r.productId,
                    ProdDes: r.description ?? "",
                    BrandId: r.brandId,
                    UnitId: r.unitId,
                    Qty: Number(r.qty),
                    Rate: Number(r.rate),
                    Taxable: Number(r.taxable),
                    VatPer: Number(r.vatPer),
                    VatAmt: Number(r.vatAmt),
                    NetAmt: Number(r.amount),
                    NRate: Number(r.rate),

                }))
            };

            console.log("UPDATE PAYLOAD 👉", payload);

            const res = await axiosInstance.put(
                `${gapi}/quo/update`,
                payload
            );
            console.log("UPDATE Popup 👉", res.data)
            showTempMessage(res.data?.Message);
            setIsEditMode(false);
            handleReset();

        } catch (err) {
            console.error(err);
        }
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

    //common msg alert for all and to display error msg from be
    const showTempMessage = (msg, msgtype) => {
        setMessage(msg);
        if (msgtype === 'true') {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        } else {
            setShowMessage_Error(true);
            setTimeout(() => setShowMessage_Error(false), 3000);
        }
    };

    const handleReset = () => {
        setTopData({
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

        setBottomData({
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
        });
        setLedgerQuery('');
        setProductQuery('');
        setProjectQuery('');
        setBrandQuery('');
        setUnitQuery('');
        setRows([]);
    };

    const handleProjectAdd = async () => {
        const payload = {
            // ProjId: 0,
            // ProjNo: Number(projectNo),
            // ProjDate: projectDate && projectDate.trim() !== "" ? `${projectDate}T00:00:00` : "2025-01-01T00:00:00",
            // ProjName: projectName,
            // LedgerId: Number(projectLedger),

            ProjId: 0,
            ProjNo: Number(projectNo),
            ProjDate: projectDate && projectDate.trim() !== "" ? `${projectDate}T00:00:00` : "2025-01-01T00:00:00",
            ProjName: projectName,
            LedgerId: Number(projectLedger),
            RefName: null,
            Description: null,
        }
        try {
            const res = await axiosInstance.post(
                `${gapi}/project/insert`,
                payload,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            if (res.data?.Success === true) {
                showTempMessage(res.data.Message, 'true');
                const savedProject = {
                    ProjId: res.data.ProjId,
                    ProjName: res.data.ProjName,
                    ProjNo: res.data.ProjNo,
                    LedgerName:
                        projectLedgerList.find(s => s.LedgerId == res.data.LedgerId)?.LedgerName || "-"
                };
                loadProject();
                setProjectList(prev => [...prev, savedProject])
                setProject(savedProject.ProjId);
                setProjectQuery(savedProject.ProjName);
                setProject('')
                setProjectName('')
                setProjectNo('')
                setProjectDate('')
                setProjectLedger('')
                setShowProjectModal(false)
                showTempMessage(res.data.Message, 'true');
            } else {
                showTempMessage(res.data?.Message, 'false');
            }

        } catch (err) {
            console.error("Add Project Error", err);
            showTempMessage("Failed to add Project ❌");
        }
    }

    const handleAddProductFromSQuot = async () => {

        if (!productName.trim() || !groupQuery || !salesUnit) {
            return;
        }

        const payload = {
            // ProductID: 0,
            // ProductCode: productCode?.trim() || "",
            // ProductName: productName.trim(),
            // GroupId: Number(groupQuery),
            // UnitId: Number(salesUnit),
            // VatPer: Number(vatPer) || 0,


            ProductID: 0,
            CGST: 0,
            SGST: 0,
            IGST: Number(vatPer),
            ProductCode: productCode,
            ProductName: productName,
            ProductTamil: productName,
            GroupId: Number(groupQuery),
            Packing: 1.000,
            Qty: null,
            FreeQty: null,
            VatPer: Number(vatPer),
            ComCode: "",
            Sch: null,
            HSNCode: "",
            HSNId: 0,
            UnitId: Number(salesUnit)


        };
        console.log('Product:', payload)
        try {
            const res = await axiosInstance.post(
                `${gapi}/product/insert`,
                payload,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            console.log("PRODUCT RES 👉", res.data);

            // 🔥 SUCCESS CHECK (ledger maari)
            if (res.data?.Success === true) {
                showTempMessage(res.data.Message, 'true');
                const savedProduct = {
                    ProductID: res.data.ProductID,
                    ProductName: res.data.ProductName,
                    ProductCode: res.data.ProductCode,
                    GroupName:
                        addGroupList.find(g => g.GroupID == res.data.GroupId)?.GroupName || "-",
                    UnitType:
                        addUnitList.find(u => u.UnitId == res.data.UnitId)?.UnitType || "-"
                };
                loadProduct();
                // 🔥 instant product dropdown update
                setProductList(prev => [...prev, savedProduct]);

                // 🔥 auto select newly added product
                setProduct(savedProduct.ProductID);
                setProductQuery(savedProduct.ProductName);

                // 🔥 reset + close
                setProductCode("");
                setProductName("");
                setGroupQuery("");
                setSalesUnit("");
                setVatPer("");
                setShowProductModal(false);
                setShowProductDropdown(false);
                showTempMessage(res.data.Message, 'true');

            } else {
                showTempMessage(res.data?.Message || "Product add failed", 'false');
            }

        } catch (err) {
            console.error("Add Product Error", err);
            showTempMessage("Failed to add product ❌");
        }
    };

    const openAddBrandModal = () => {
        if (!brandQuery.trim()) return;
        setShowAddBrandModal(true)
    }

    const confirmAddBrand = () => {
        setShowAddBrandModal(false)
        addBrand()
    }

    const cancelAddBrand = () => {
        setShowAddBrandModal(false)
    }

    const addBrand = async () => {
        if (!brandQuery.trim()) return;

        try {
            const res = await axiosInstance.post(
                `${gapi}/brand/insert`,
                {
                    BrandName: brandQuery.trim(),
                    BrandId: 0,
                    TBrandName: brandQuery.trim()
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            if (res.data?.Success === true) {
                // 🔥 instant dropdown update
                // setGroupList(prev => [...prev, newGroup]);

                // setGroupQuery(newGroup.GroupName);
                // setGroupQuery("");
                setShowBrandDropdown(false);
                showTempMessage(res.data.Message, 'true');
                setBrandQuery('')
            } else {
                showTempMessage(res.data?.Message, 'false');
            }
        } catch (err) {
            console.error("Add Group Error", err);
        }
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
                    <h4 className='mb-0'><FontAwesomeIcon icon={faReceipt} className="me-2" />Sales</h4>
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
                                minHeight: '530px',
                            }}
                        >
                            <div className="row gap-1 align-items-center">
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center gap-1">
                                        <label className="fw-bold mb-0" style={{ whiteSpace: 'nowrap' }}>
                                            Inv.Type
                                        </label>
                                        <select
                                            className='form-control form-control-sm'
                                            value={invType}
                                            onChange={(e) => setInvType(e.target.value)}
                                        >
                                            <option value="" disabled hidden className='text-center'>-- Select Invoice --</option>
                                            <option value='proforma'>Proforma Inv</option>
                                            <option value='Invoice'>Inv No</option>

                                        </select>
                                    </div>
                                </div>

                                {/* Q.NO SEARCH DROPDOWN */}
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="d-flex align-items-center gap-2" >
                                        <label className="fw-bold mb-1">Q.No</label>

                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="🔎 Search Quotation..."
                                            ref={quotationInputRef}
                                            value={quotationQuery}
                                            onChange={handleQuotationChange}
                                            onKeyDown={handleQuotationKeyDown}
                                            onFocus={() => {
                                                if (quotationQuery.trim() !== "")
                                                    setShowQuotationDropdown(true);
                                            }}
                                        />
                                        🔎
                                        {selectedQId && (
                                            <div
                                                className="px-2 py-1 rounded"
                                                style={{
                                                    background: "#f1f3f5",
                                                    border: "1px solid #ccc",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                QID : {selectedQId}
                                            </div>
                                        )}

                                        {showQuotationDropdown && quotationInputRef.current && (
                                            <div
                                                className="position-fixed bg-white border shadow-sm"
                                                style={{
                                                    top: quotationInputRef.current.getBoundingClientRect().bottom,
                                                    left: quotationInputRef.current.getBoundingClientRect().left,
                                                    width: quotationInputRef.current.getBoundingClientRect().width,
                                                    maxHeight: "250px",
                                                    overflowY: "auto",
                                                    zIndex: 9999
                                                }}
                                            >
                                                {/* HEADER */}
                                                <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                    <div className="col-3">Q.No</div>
                                                    <div className="col-5">Project</div>
                                                    <div className="col-4 text-end">Amount</div>
                                                </div>

                                                {/* ROWS */}
                                                {filteredQuotation.map((item, index) => (
                                                    <div
                                                        key={item.QId}
                                                        className={`d-flex px-2 py-2 border-bottom
                                                         ${index === activeQuotationIndex
                                                                ? "bg-secondary text-white"
                                                                : "hover-bg"}`}
                                                        style={{ cursor: "pointer" }}
                                                        onMouseEnter={() => setActiveQuotationIndex(index)}
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            selectQuotation(item);
                                                        }}
                                                    >
                                                        <div className="col-3">{item.QNo}</div>
                                                        <div className="col-5">{item.ProjName}</div>
                                                        <div className="col-4 text-end">{item.NetAmount}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>


                            </div>


                            {/* Row 1 */}
                            <div className="row g align-items-center mt-2">

                                {/* Q.No */}
                                <div className="col-12 col-md-6 col-lg-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <label className="fw-bold mb-0" style={{ whiteSpace: 'nowrap' }}>
                                            Inv.No
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



                                {/* Project */}
                                <div className="col-12 col-md-6 col-lg-5  ">
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
                                <div className="col-12 col-md-6 col-lg-5  ">
                                    <div className="d-flex align-items-center gap-2"
                                        style={{ position: 'relative', width: '100%' }}
                                    >
                                        <label className="form-label fw-bold" style={{ whiteSpace: 'nowrap' }}>Ledger</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            onChange={handleLedgerChange}
                                            value={ledgerQuery}
                                            onFocus={() => {
                                                if (ledgerQuery.trim() !== '') setShowLedgerDropdown(true);
                                            }}
                                            onKeyDown={handleLedgerKeyDown}
                                            onBlur={() => {
                                                setTimeout(() => setShowLedgerDropdown(false), 150);
                                            }}
                                            disabled
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
                                        <label className="form-label fw-bold" style={{ whiteSpace: 'nowrap' }}>Inv.Date</label>
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
                                                        disabled
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
                                                                    onClick={openAddBrandModal}
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
                                                    disabled
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
                                    {editIndex !== null ? 'Update' : 'Add'}
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
                                            {rows && rows.length > 0 ? (
                                                rows.map((row, index) => (
                                                    <tr key={index}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{row.product}</td>
                                                        <td className="text-center">{row.unit}</td>
                                                        <td>{row.brand}</td>
                                                        <td className="text-center">{row.qty}</td>
                                                        <td className="text-end">{row.rate}</td>
                                                        <td className="text-end">{row.taxable}</td>
                                                        <td className="text-center">{row.vatPer}</td>
                                                        <td className="text-end">{row.vatAmt}</td>
                                                        <td className="text-end">{row.amount}</td>
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
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="11" className="text-center text-muted">
                                                        No data available
                                                    </td>
                                                </tr>
                                            )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
                                        onChange={handleTopChange}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="fw-bold small">Delivery</label>
                                    <input
                                        className="form-control form-control-sm"
                                        name='delivery'
                                        value={topData.delivery}
                                        onChange={handleTopChange}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="fw-bold small">Quotation Validity</label>
                                    <input
                                        className="form-control form-control-sm"
                                        name='qValidity'
                                        value={topData.qValidity}
                                        onChange={handleTopChange}
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
                                                value={rows.length}
                                                onChange={handleTopChange}
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
                                                value={totalAmount}
                                                onChange={handleTopChange}
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
                                                value={totalVatAmount}
                                                onChange={handleTopChange}
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
                                                value={totalActAmt}
                                                onChange={handleTopChange}
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
                                                onChange={handleTopChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="d-flex gap-2 flex-column flex-md-row">

                        {/* LEFT */}
                        <div style={{ width: "33%" }} className="col-md-6">
                            <label className="fw-bold small mb-1">Notes</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='notes'
                                value={topData.notes}
                                onChange={handleTopChange}
                            />
                        </div>

                        {/* RIGHT */}
                        <div style={{ width: "33%" }} className="col-md-6">
                            <label className="fw-bold small mb-1">Warranty</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='warranty'
                                value={topData.warranty}
                                onChange={handleTopChange}
                            />
                        </div>

                        <div style={{ width: "33%" }} className="col-md-6">
                            <label className="fw-bold small mb-1">Inclusion</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='inclusion'
                                value={topData.inclusion}
                                onChange={handleTopChange}
                            />
                        </div>

                    </div>

                    <div className="d-flex gap-2 flex-column flex-md-row">

                        {/* LEFT */}
                        <div style={{ width: "33%" }} className="col-md-6">
                            <label className="fw-bold small mb-1">Exclusion</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='inclusion'
                                value={topData.inclusion}
                                onChange={handleTopChange}
                            />
                        </div>

                        {/* RIGHT */}
                        <div style={{ width: "33%" }} className="col-md-6">
                            <label className="fw-bold small mb-1">Scope</label>
                            <textarea
                                className="form-control form-control-sm"
                                rows={2}
                                name='exclusion'
                                value={topData.exclusion}
                                onChange={handleTopChange}
                            />
                        </div>

                        <div style={{ width: "33%" }} className="col-md-6 d-flex align-items-center justify-content-center mt-3 gap-2">
                            <button className='btn btn-sm btn-primary' onClick={() => setShowFind(true)}>Find</button>
                            <button className='btn btn-sm btn-success' onClick={isEditMode ? handleUpdateSuppQuo : handleSaveQuo}
                            >
                                {isEditMode ? 'Update' : 'Save'}
                            </button>
                            <button className='btn btn-sm btn-secondary'>Print</button>
                            <button className='btn btn-sm btn-danger' onClick={() => setShowFind(true)}>Delete</button>
                            <button className='btn btn-sm btn-warning' onClick={handleReset}>Reset</button>
                        </div>

                    </div>



                    {/* Error Message */}
                    {showMessage_Error && (
                        <div
                            className="toast-container position-fixed top-0 end-0 pe-3"
                            style={{ zIndex: 9999, paddingTop: '70px' }}
                        >
                            <div className="toast show" role="alert">

                                <div
                                    className="toast-header"
                                    style={{
                                        backgroundColor: "#d60707",
                                        color: "#fff"
                                    }}
                                >
                                    <strong className="me-auto">Error</strong>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowMessage_Error(false)}
                                    ></button>
                                </div>

                                <div
                                    className="toast-body fw-bold"
                                    style={{
                                        backgroundColor: "#fff",
                                        color: "#000"
                                    }}
                                >
                                    {message}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {showMessage && (
                        <div
                            aria-live="polite"
                            aria-atomic="true"
                            className="toast-container position-fixed top-0 end-0  pe-3"
                            style={{ zIndex: 9999, paddingTop: '70px' }}
                        >
                            <div
                                className="toast show text-bg-success"
                                role="alert"
                                aria-live="assertive"
                                aria-atomic="true"
                            >
                                <div
                                    className="toast-header text-bg-blue"
                                    style={{
                                        backgroundColor: "#0f8532",
                                        color: "#fff"
                                    }}
                                >
                                    <strong className="me-auto">Success</strong>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowMessage(false)}
                                    ></button>
                                </div>

                                <div
                                    className="toast-body fw-bold"
                                    style={{
                                        backgroundColor: "#fff",
                                        color: "#000"
                                    }}
                                >
                                    {message}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Project Model */}

                    {showProjectModal && (
                        <div className="modal show d-block mt-5" tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header" style={{ backgroundColor: '#6a1b9a' }}>
                                        <h5 className="modal-title" style={{ color: 'white' }}>Add Project</h5>
                                        <button className="btn-close" style={{ backgroundColor: 'white' }} onClick={() => setShowProjectModal(false)}></button>
                                    </div>

                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label className="form-label" >Project No</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={projectNo}
                                                onChange={e => setProjectNo(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={projectDate}
                                                onChange={e => setProjectDate(e.target.value)}
                                            />
                                        </div>


                                        <div className="mb-3">
                                            <label className="form-label">Project Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={projectName}
                                                onChange={e => setProjectName(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Ledger</label>
                                            <select
                                                className="form-control"
                                                value={projectLedger}
                                                onChange={e => setProjectLedger(e.target.value)}
                                            >
                                                <option value="">-- Select Ledger --</option>
                                                {projectLedgerList.map(s => (
                                                    <option key={s.LedgerId} value={s.LedgerId}>{s.LedgerName}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="modal-footer">
                                            <button className="btn btn-secondary" onClick={() => setShowProjectModal(false)}>Cancel</button>
                                            <button type="button" className="btn btn-primary" onClick={handleProjectAdd}>Save</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Model */}

                    {showProductModal && (
                        <div className="modal show d-block mt-5" tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header" style={{ backgroundColor: '#6a1b9a' }}>
                                        <h5 className="modal-title" style={{ color: 'white' }}>Add Product</h5>
                                        <button className="btn-close" style={{ backgroundColor: 'white' }} onClick={() => setShowProductModal(false)}></button>
                                    </div>

                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label className="form-label" >Product Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={productCode}
                                                onChange={e => setProductCode(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Product Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={productName}
                                                onChange={e => setProductName(e.target.value)}
                                            />
                                        </div>


                                        <div className="mb-3">
                                            <label className="form-label">Group Name</label>
                                            <select
                                                className="form-control"
                                                value={groupQuery}
                                                onChange={e => setGroupQuery(e.target.value)}
                                            >
                                                <option value="">-- Select Group --</option>
                                                {addGroupList.map(s => (
                                                    <option key={s.GroupID} value={s.GroupID}>{s.GroupName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Sales Unit</label>
                                            <select
                                                className="form-control"
                                                value={salesUnit}
                                                onChange={e => setSalesUnit(e.target.value)}
                                            >
                                                <option value="">-- Select Unit --</option>
                                                {addUnitList.map(s => (
                                                    <option key={s.UnitId} value={s.UnitId}>{s.UnitType}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Vat %</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={vatPer}
                                                onChange={e => setVatPer(e.target.value)}
                                            />
                                        </div>


                                        <div className="modal-footer">
                                            <button className="btn btn-secondary" onClick={() => setShowProductModal(false)}>Cancel</button>
                                            <button type="button" className="btn btn-primary" onClick={handleAddProductFromSQuot}>Save</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add Brand Modal */}
                    {showAddBrandModal && (
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Confirm Add</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={cancelAddBrand}
                                        ></button>
                                    </div>

                                    <div className="modal-body">
                                        <p>
                                            Are you sure you want to add "
                                            <strong>{brandQuery}</strong>"?
                                        </p>
                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={cancelAddBrand}
                                        >
                                            No
                                        </button>
                                        <button
                                            className="btn btn-success"
                                            onClick={confirmAddBrand}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ===== FIND POPUP ===== */}
                    {showFind && (
                        <FindQuot
                            onClose={() => setShowFind(false)}
                            onEdit={handleEditFromFind}
                        />
                    )}

                </div>
            </div>
        </div >

    )
}

export default Sales;
