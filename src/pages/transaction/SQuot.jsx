import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom';




const SQuot = () => {

    const [topData, setTopData] = useState({
        qNo: '',
        qDate: '',
        ledger: '',
        ledgerId: '',
        project: '',
        terms: '',
        narration: '',
        netAmount: 0,
        totalTaxableAmt: 0,
        totVatAmt: 0,
    });

    const [bottomData, setBottomData] = useState({
        sNo: '',
        product: '',
        productId: '',
        unit: '',
        unitId: '',
        brand: '',
        brandId: '',
        qty: '',
        rate: '',
        marPer: '',
        sRate: '',
        taxable: '',
        vatPer: '',
        vatAmt: '',
        amount: '',
        description: '',
    })

    const [ledgerList, setLedgerList] = useState([]);
    const [ledgerQuery, setLedgerQuery] = useState('');
    const [showLedgerDropdown, setShowLedgerDropdown] = useState(false);
    const [activeLedgerIndex, setActiveLedgerIndex] = useState(-1);


    const [projectList, setProjectList] = useState([]);
    const [projectQuery, setProjectQuery] = useState('');
    const [showProjectDropdown, setShowProjectDropdown] = useState(false);
    const [activeProjectIndex, setActiveProjectIndex] = useState(-1);

    const [productList, setProductList] = useState([]);   // API data
    const [productQuery, setProductQuery] = useState("");
    const [showProductDropdown, setShowProductDropdown] = useState(false);
    const [activeProductIndex, setActiveProductIndex] = useState(-1);

    const [brandList, setBrandList] = useState([]);
    const [brandQuery, setBrandQuery] = useState("");
    const [showBrandDropdown, setShowBrandDropdown] = useState(false);
    const [activeBrandIndex, setActiveBrandIndex] = useState(-1);

    const [unitList, setUnitList] = useState([]);
    const [unitQuery, setUnitQuery] = useState("");
    const [showUnitDropdown, setShowUnitDropdown] = useState(false);
    const [activeUnitIndex, setActiveUnitIndex] = useState(-1);

    const [rows, setRows] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [rowToDelete, setRowToDelete] = useState(null);

    const [suppQuot, setSuppQuot] = useState([]);
    const [suppQuotDet, setSuppQuotDet] = useState([]);





    const gapi = import.meta.env.VITE_API_URL;

    useEffect(() => {
        loadLedgers();
        loadProject();
        loadProduct();
        loadBrands();
        loadUnit();
        loadSupp();
        loadSuppDets();
    }, [])

    const { sqId } = useParams();
    const navigate = useNavigate();
    const ignoreRowsLoadRef = useRef(false);

    useEffect(() => {
        if (sqId) {
            loadSQPrimary(sqId);
            loadSQSecondary(sqId);
        }
    }, [sqId]);


    const loadSQPrimary = async (sqId) => {
        try {
            const res = await axios.get(`${gapi}/tblSuppQuo/${sqId}`);
            const d = res.data;

            // 🔹 Main state (IDs + values)
            setTopData({
                qNo: d.SQNo || '',
                qDate: d.SQDate?.substring(0, 10) || '',
                ledgerId: d.LedgerId || '',
                projectId: d.ProjectId || '',
                narration: d.Narration || '',
                terms: d.Terms || '',
                totalTaxableAmt: d.TotTaxableAmt || 0,
                totVatAmt: d.TotVatAmt || 0,
                netAmount: d.NetAmount || 0
            });

            // 🔹 UI textboxes (VERY IMPORTANT)
            setLedgerQuery(d.LedgerName || '');
            setProjectQuery(d.ProjName || '');

        } catch (err) {
            console.error("Primary load failed", err);
        }
    };


    const loadSQSecondary = async (id) => {
        try {
            const res = await axios.get(`${gapi}/tblSuppQuoDets`);

            const filtered = res.data.filter(
                r => r.SQId === Number(id)
            );

            const mapped = filtered.map((r, index) => ({
                sNo: index + 1,
                SQDetsId: r.SQDetsId,

                productId: r.ProductId,
                productName: r.ProductName || '',

                // ✅ BRAND
                brandId: r.BrandId,
                brandName: r.BrandName || '',

                // ✅ UNIT
                unitId: r.UnitId,
                unitType: r.UnitType || '',

                qty: r.Qty,
                rate: r.SRate,
                taxable: r.Taxable,
                vatPer: r.VatPer,
                vatAmt: r.VatAmt,
                amount: r.NetAmt,

                marPer: r.ProfPer,
                sRate: r.NRate
            }));

            setRows(mapped);
        } catch (err) {
            console.error("Secondary load failed", err);
        }
    };


    const loadLedgers = async () => {
        try {
            const res = await axios.get(`${gapi}/ledger`)
            // console.log('ledgers res:',res.data)
            setLedgerList(res.data)
        } catch (err) {
            console.error('Ledger Load Error:', err)
        }
    }

    const loadProject = async () => {
        try {
            const res = await axios.get(`${gapi}/project`)
            console.log('project res:', res.data)
            setProjectList(res.data)
        } catch (err) {
            console.error('Project load error:', err)
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

    const loadUnit = async () => {
        try {
            const res = await axios.get(`${gapi}/unit`);
            //console.log("LOAD UNIT RESPONSE:", res.data);
            setUnitList(res.data)
        } catch (err) {
            console.error('Unit Load Error:', err)
        }
    }

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


    const handleTopChange = (e) => {
        const { name, value } = e.target;
        setTopData((prev) => ({ ...prev, [name]: value }))
    }

    const handleBottomChange = (e) => {
        const { name, value } = e.target;
        setBottomData((prev) => ({ ...prev, [name]: value }))
    }

    const filteredUnit = unitList.filter(u =>
        u.UnitType?.toLowerCase().includes(
            unitQuery.toLowerCase()
        )
    );

    const filteredLedger = ledgerList.filter(item =>
        item.LedgerName?.toLowerCase().includes(ledgerQuery.toLowerCase())
    );

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
        item.ProjName?.toLowerCase().includes(projectQuery.toLowerCase())
    );

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

    const handleLedgerChange = (e) => {
        const value = e.target.value;
        setLedgerQuery(value);
        setShowLedgerDropdown(value.trim() !== "");
        setActiveLedgerIndex(-1);
    };


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

    const filteredProduct = productList.filter(item =>
        item.ProductName?.toLowerCase().includes(
            productQuery.toLowerCase()
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

    const filteredBrand = brandList.filter(item =>
        item.BrandName?.toLowerCase().includes(
            brandQuery.toLowerCase()
        )
    );
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

        setShowProductDropdown(false);
        setShowBrandDropdown(false);

        // Focus first input for convenience
        document.getElementById("productInput")?.focus();
    };

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
        (sum, r) => sum + Number(r.taxable || 0), 0
    )

    const totalVatAmount = rows.reduce(
        (sum, r) => sum + Number(r.vatAmt || 0), 0
    )

    const totalActAmt = rows.reduce(
        (sum, r) => sum + Number(r.amount || 0), 0
    )

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
    const updateSQPrimary = async () => {
        const payload = {
            SQId: sqId,
            SQNo: topData.sqNo,
            SQDate: topData.sqDate,
            ProjectId: topData.projectId,
            LedgerId: topData.ledgerId,
            Narration: topData.narration,
            TotTaxableAmt: topData.totalAmt,
            TotVatAmt: topData.vatAmt,
            NetAmount: topData.netAmt,
            Terms: topData.terms,
            Update_By: 1,
            Update_On: new Date().toISOString()
        };

        await axios.put(`${gapi}/tblSuppQuo/${sqId}`, payload);
    };

    const updateSQSecondary = async () => {
        for (let row of rows) {

            const payload = {
                SQDetsId: row.SQDetsId,
                SQId: sqId,

                ProductId: row.productId,
                BrandId: row.brandId,
                UnitId: row.unitId,

                Qty: row.qty,
                SRate: row.rate,
                Taxable: row.taxable,
                VatPer: row.vatPer,
                VatAmt: row.vatAmt,
                NetAmt: row.amount,

                BRate: row.bRate,
                NRate: row.nRate,
                Sno: row.sNo
            };

            await axios.put(
                `${gapi}/tblSuppQuoDets/${row.SQDetsId}`,
                payload
            );
        }
    };

    const handleReset = () => {
        setTopData({
            qNo: '',
            qDate: '',
            ledger: '',
            ledgerId: '',
            project: '',
            terms: '',
            narration: '',
            netAmount: null,
            totalTaxableAmt: null,
            totVatAmt: null,
        });

        setBottomData({
            sNo: '',
            product: '',
            productId: '',
            unit: '',
            unitId: '',
            brand: '',
            brandId: '',
            qty: '',
            rate: '',
            marPer: '',
            sRate: '',
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
    const handleUpdate = async () => {
        try {
            await updateSQPrimary();
            await updateSQSecondary();

            alert("Supply Quotation Updated Successfully ✅");

            navigate('/transaction/squot');
        } catch (err) {
            console.error(err);
            alert("Update failed ❌");
        }
    };

    return (
        <div className='container-fluid mt-2'>
            {/* Card */}
            <div className='card shadow-lg mx-auto'
                style={{
                    border: '2px solid #5d8aa8',
                    width: '95%'
                }}
            >
                {/* card - header */}
                <div
                    className='card-header text-white'
                    style={{
                        backgroundColor: '#5d8aa8',
                        padding: '20px'
                    }}
                >
                    <h4><FontAwesomeIcon icon={faFileSignature} className="me-2" />SQuot</h4>
                </div>
                {/* card-body */}
                <div
                    className='card-body'
                    style={{
                        height: 'calc(100vh - 200px)'
                    }}
                >
                    {/* top row */}
                    <div className='d-flex align-items-center gap-3'>
                        <div style={{ flex: '0 0 100px' }}>
                            <div className='d-flex'>
                                <label className='form-label fw-bold  mb-2 me-2'>QNo</label>
                                <input
                                    type='number'
                                    className='form-control form-control-sm'
                                    name='qNo'
                                    value={topData.qNo}
                                    onChange={handleTopChange}
                                />

                            </div>
                        </div>

                        <div style={{ flex: '0 0 200px' }}>
                            <div className='d-flex align-items-center'>
                                <label
                                    className='form-label fw-bold mb-2 me-2'>Q.Date</label>
                                <input
                                    type='date'
                                    className='form-control form-control-sm'
                                    name='qDate'
                                    value={topData.qDate}
                                    onChange={handleTopChange}
                                />
                            </div>
                        </div>

                        <div style={{ flex: '1 1 700px' }}>
                            <div
                                className="d-flex align-items-center"
                                style={{ position: 'relative', width: '100%' }}
                            >
                                {/* LABEL */}
                                <label
                                    className="form-label fw-bold mb-0 me-2"
                                    style={{ minWidth: '70px' }}
                                >
                                    Ledger<span className='required'>*</span>
                                </label>

                                {/* INPUT */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="🔎 Search Ledger..."
                                    value={ledgerQuery}
                                    onChange={handleLedgerChange}
                                    onFocus={() => {
                                        if (ledgerQuery.trim() !== '') setShowLedgerDropdown(true);
                                    }}
                                    onKeyDown={handleLedgerKeyDown}
                                    onBlur={() => {
                                        setTimeout(() => setShowLedgerDropdown(false), 150);
                                    }}
                                />

                                {/* DROPDOWN */}
                                {showLedgerDropdown && filteredLedger.length > 0 && (
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
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ flex: '0 0 700px' }}>
                            <div
                                className="d-flex align-items-center"
                                style={{ position: 'relative', width: '100%' }}
                            >
                                {/* Label */}
                                <label
                                    className="form-label fw-bold mb-0 me-2"
                                    style={{ minWidth: '60px' }}
                                >
                                    Project
                                </label>

                                {/* Input */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name="project"
                                    placeholder="🔎 Search Project..."
                                    value={projectQuery}
                                    onChange={handleProjectChange}
                                    onKeyDown={handleProjectKeyDown}
                                    onFocus={() => projectQuery && setShowProjectDropdown(true)}
                                    onBlur={() => setTimeout(() => setShowProjectDropdown(false), 150)}
                                />

                                {/* Dropdown */}
                                {showProjectDropdown && filteredProject.length > 0 && (
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
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <hr className='mt-1' />
                    {/* 12 bottom inputs */}
                    <div className='d-flex align-items-center gap-1 mb-0'>
                        <div style={{ flex: '0 0 100px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >S.No</label>
                                <input
                                    name='sNo'
                                    type='text'
                                    className='form-control form-control-sm'
                                    value={bottomData.sNo}
                                    onChange={handleBottomChange}
                                    disabled
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 320px' }}>
                            <div
                                style={{ position: 'relative', width: '100%' }}
                            >
                                {/* LABEL */}
                                <label className="form-label fw-bold mb-1">
                                    Product
                                </label>

                                {/* INPUT */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="🔎 Search Product..."
                                    value={productQuery}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setProductQuery(value);
                                        setShowProductDropdown(value.trim() !== "");
                                        setActiveProductIndex(-1);
                                    }}
                                    onFocus={() => {
                                        if (productQuery.trim() !== "")
                                            setShowProductDropdown(true);
                                    }}
                                    onKeyDown={handleProductKeyDown}
                                    onBlur={() =>
                                        setTimeout(() => setShowProductDropdown(false), 150)
                                    }
                                />

                                {/* DROPDOWN */}
                                {showProductDropdown && filteredProduct.length > 0 && (
                                    <div
                                        className="position-absolute bg-white border shadow-sm w-100"
                                        style={{
                                            top: '100%',
                                            maxHeight: '250px',
                                            overflowY: 'auto',
                                            zIndex: 9999
                                        }}
                                    >
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
                                                onMouseDown={() => selectProduct(item)}
                                            >
                                                <div className="col-7">
                                                    {highlightText(item.ProductName, productQuery)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* Unit */}
                        <div className="mx-2" style={{ flex: '0 0 120px' }}>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <label
                                    className="fw-bold"
                                    style={{ fontSize: '15px', marginBottom: '2px' }}
                                >
                                    Unit
                                </label>

                                {/* INPUT */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    style={{ height: '28px' }}
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
                                    onBlur={() =>
                                        setTimeout(() => setShowUnitDropdown(false), 150)
                                    }
                                    disabled
                                />

                                {/* DROPDOWN */}
                                {showUnitDropdown && filteredUnit.length > 0 && (
                                    <div
                                        className="position-absolute bg-white border shadow-sm w-100"
                                        style={{
                                            top: '100%',
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
                                                onMouseEnter={() =>
                                                    setActiveUnitIndex(index)
                                                }
                                                onMouseDown={() => selectUnit(u)}
                                            >
                                                {u.UnitType}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>



                        <div style={{ flex: '0 0 210px' }}>
                            <div style={{ position: 'relative', width: '100%' }}>
                                {/* LABEL */}
                                <label className="form-label fw-bold mb-1">
                                    Brand
                                </label>

                                {/* INPUT */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="🔎 Search Brand..."
                                    value={brandQuery}
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
                                    onBlur={() =>
                                        setTimeout(() => setShowBrandDropdown(false), 150)
                                    }
                                />

                                {/* DROPDOWN */}
                                {showBrandDropdown && filteredBrand.length > 0 && (
                                    <div
                                        className="position-absolute bg-white border shadow-sm w-100"
                                        style={{
                                            top: '100%',
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                            zIndex: 9999
                                        }}
                                    >
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
                                                onMouseDown={() => selectBrand(item)}
                                            >
                                                {highlightText(item.BrandName, brandQuery)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>


                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Qty</label>
                                <input
                                    name='qty'
                                    type='text'
                                    className='form-control form-control-sm'
                                    value={bottomData.qty}
                                    onChange={(e) => {
                                        const qty = e.target.value;
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
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Rate</label>
                                <input
                                    name='rate'
                                    type='text'
                                    className='form-control form-control-sm'
                                    value={bottomData.rate}
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
                        </div>

                        <div style={{ flex: '0 0 110px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Mar%</label>
                                <input
                                    name='marPer'
                                    type='text'
                                    className='form-control form-control-sm'
                                    value={bottomData.marPer}
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
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >SRate</label>
                                <input
                                    name='sRate'
                                    type='text'
                                    className='form-control form-control-sm'
                                    value={bottomData.sRate}
                                    onChange={handleBottomChange}

                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 '  >Taxable</label>
                                <input
                                    name='taxable'
                                    type='text'
                                    className='form-control form-control-sm'
                                    value={bottomData.taxable}
                                    onChange={handleBottomChange}
                                    disabled
                                />
                            </div>

                        </div>

                        <div style={{ flex: '0 0 100px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Vat%</label>
                                <input
                                    name='vatPer'
                                    type='text'
                                    className='form-control form-control-sm'
                                    value={bottomData.vatPer}
                                    onChange={handleBottomChange}

                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div>

                                <label
                                    className="form-label fw-bold mb-2 "
                                    style={{
                                        maxWidth: "70px",
                                        whiteSpace: "normal",
                                        lineHeight: "1.1",

                                    }}
                                >
                                    VatAmt
                                </label>

                                <input
                                    name='vatAmt'
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={bottomData.vatAmt}
                                    onChange={handleBottomChange}
                                    disabled
                                    style={{
                                        flex: "1 1 auto",
                                        minWidth: 0
                                    }}
                                />
                            </div>
                        </div>


                        <div style={{ flex: '0 0 150px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 '>Amount</label>
                                <input
                                    name='amount'
                                    type='text'
                                    className='form-control form-control-sm'
                                    value={bottomData.amount}
                                    onChange={handleBottomChange}
                                    disabled
                                />
                            </div>
                        </div>

                    </div>
                    {/* textarea */}
                    <div className='d-flex align-items-center gap-2 mt-1'>
                        <textarea
                            name='description'
                            className='form-control form-control-sm mt-1'
                            rows={2}
                            style={{
                                width: '50%'
                            }}
                            value={bottomData.description}
                            onChange={handleBottomChange}
                        />
                        <button className='btn btn-primary btn-sm' onClick={handleAddOrUpdateRow}>
                            {editIndex !== null ? 'Update' : 'Add'}
                        </button>
                    </div>

                    {/* custom color line */}
                    <div
                        style={{
                            height: '2px',
                            backgroundColor: '#5d8aa8',
                            marginTop: '8px',
                            marginBottom: '8px'
                        }}
                    ></div>
                    {/* middle container for table row */}

                    <div
                        className="mt-2 px-2 px-md-3"
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

                    {/* Footer final amount display area */}
                    <div
                        className='mt-1 px-3 py-2 d-flex'
                        style={{
                            border: '2px solid #5d8aa8',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                            alignItems: 'stretch'
                        }}
                    >
                        {/* left section */}
                        <div
                            className='d-flex align-items-center pe-3'
                            style={{ borderRight: '2px solid #5d8aa8', minWidth: '140px' }}
                        >
                            <label
                                className='fw-bold me-2 mb-0 '
                                style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                            >
                                Item
                            </label>
                            <input
                                type='text'
                                className='form-control form-control-sm'
                                style={{ width: '80px', height: '28px' }}
                                value={rows.length}
                                readOnly
                            />
                        </div>

                        {/* middle section 1 */}
                        <div
                            className='d-flex px-3 flex-column justify-content-center'
                            style={{ borderRight: '2px solid #5d8aa8', minWidth: '200px' }}
                        >
                            <div className='d-flex align-items-center mb-2'>
                                <label className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right', width: '90px' }}
                                >Total Amount</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{ width: '300px', height: '28px' }}
                                    value={totalAmount}
                                    readOnly
                                />
                            </div>

                            <div className='d-flex align-items-center '>
                                <label className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right', width: '90px' }}
                                >Vat Amount</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{ width: '300px', height: '28px' }}
                                    value={totalVatAmount}
                                    readOnly
                                />
                            </div>

                        </div>
                        {/* mid section-2 */}
                        <div
                            className='d-flex flex-column px-3 justify-content-center'
                            style={{ borderRight: ' 2px solid #5d8aa8', minWidth: '200px' }}
                        >
                            <div className='d-flex align-items-center mb-2'>
                                <label
                                    className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', textAlign: 'right', minWidth: '75px' }}
                                >
                                    Act Amt
                                </label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{
                                        width: '300px',
                                        height: '28px'
                                    }}
                                    value={totalActAmt}
                                    readOnly
                                />
                            </div>

                            <div className='d-flex align-items-center mb-2'>
                                <label
                                    className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', textAlign: 'right', minWidth: '75px' }}
                                >
                                    Round Off
                                </label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{
                                        width: '300px',
                                        height: '28px'
                                    }}
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* net amount display part */}

                    </div>

                    {/* terms & condition */}
                    <div className='d-flex flex-wrap gap-1'>
                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Term & Conditions</label>
                            <textarea
                                name='terms'
                                className='form-control form-control-sm'
                                rows={2}
                                value={topData.terms}
                                onChange={handleTopChange}
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Narration</label>
                            <textarea
                                name='narration'
                                className='form-control form-control-sm'
                                rows={2}
                                value={topData.narration}
                                onChange={handleTopChange}
                            />
                        </div>
                    </div>
                    {/* buttons */}
                    <div
                        className="mt-3 d-flex justify-content-center flex-wrap"
                        style={{ gap: '8px' }}
                    >
                        <button className="btn btn-sm btn-success" onClick={handleSave}>Save</button>
                        <button className="btn btn-sm btn-danger" onClick={() => navigate('/transaction/quotation/sfind')}>Find</button>
                        <button className="btn btn-sm btn-info text-white">Delete</button>
                        <button className="btn btn-sm btn-dark" onClick={handleReset}>Reset</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SQuot;