
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../api/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'
import FindSQuot from './FindSQuot';




const SQuot = () => {

    const [topData, setTopData] = useState({
        qNo: '',
        qDate: '',
        ledger: '',
        ledgerId: '',
        project: '',
        projectId: '',
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
        unitType: '',
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

    const [suppQuot, setSuppQuot] = useState([])
    const [suppQuotDet, setSuppQuotDet] = useState([])



    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showMessage_Error, setShowMessage_Error] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [showFind, setShowFind] = useState(false);
    const [showAddBrandModal, setShowAddBrandModal] = useState(false);
    const [showLedgerModal, setShowLedgerModal] = useState(false);

    const [ledgerName, setLedgerName] = useState('');
    const [ledger, setLedger] = useState('');
    const [ledgerPlace, setLedgerPlace] = useState('');
    const [ledgerGroup, setLedgerGroup] = useState('');
    const [ledgerState, setLedgerState] = useState('');
    const [accountGroups, setAccountGroups] = useState([]);
    const [statesList, setStatesList] = useState([]);

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
    const [isEditMode, setIsEditMode] = useState(false);






    const gapi = import.meta.env.VITE_API_URL;

    useEffect(() => {
        loadLedgers();
        loadProject();
        loadProduct();
        loadBrands();
        loadUnit();
        loadSupp();
        // loadSuppDets();
    }, [])


    // const navigate = useNavigate();
    // const { id } = useParams();
    // console.log("EDIT ID =", id);

    // useEffect(() => {
    //     console.log('Id:',id)
    //     if (id !== 'undefined') {
    //         loadById(id);
    //     }
    // }, [id]);

    useEffect(() => {
        axiosInstance.get(`${gapi}/accgroup/list`).then(res => setAccountGroups(res.data.Data));
        axiosInstance.get(`${gapi}/state/list`).then(res => setStatesList(res.data.Data));
    }, []);

    useEffect(() => {
        axiosInstance.get(`${gapi}/group/list`).then(res => setAddGroupList(res.data.Data));
        axiosInstance.get(`${gapi}/unit/list`).then(res => setAddUnitList(res.data.Data));
    }, []);

    useEffect(() => {
        axiosInstance.get(`${gapi}/ledger/list`).then(res => setProjectLedgerList(res.data.Data));
    }, []);

    const loadLedgers = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/ledger/list`);

            setLedgerList(Array.isArray(res.data?.Data) ? res.data.Data : []);

        } catch (err) {
            console.error(err);
            setLedgerList([]);   // 🔥 safety
        }
    };


    const loadProject = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/project/list`);

            if (res.data?.Success && Array.isArray(res.data.Data)) {
                setProjectList(res.data.Data);
            } else {
                setProjectList([]);   // 🔥 THIS IS THE KEY
            }

        } catch (err) {
            console.error('Error fetching groups:', err);
            setProjectList([]);     // 🔥 ALSO HERE
        }
    };

    const loadProduct = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/product/list`);

            if (res.data?.Success && Array.isArray(res.data.Data)) {
                setProductList(res.data.Data);
            } else {
                setProductList([]);   // 🔥 THIS IS THE KEY
            }

        } catch (err) {
            console.error('Error fetching groups:', err);
            setProductList([]);     // 🔥 ALSO HERE
        }
    };

    const loadBrands = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/brand/list`);
            if (res.data?.Success && Array.isArray(res.data.Data)) {
                setBrandList(res.data.Data);
            } else {
                setBrandList([])
            }
        } catch (err) {
            console.error("Error fetching brands:", err);
            setBrandList([])
        }
    };

    const loadUnit = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/unit/list`);
            if (res.data?.Success && Array.isArray(res.data.Data)) {
                setUnitList(res.data.Data)
            } else {
                setUnitList([]);
            }
        } catch (err) {
            console.error('Error fetching units:', err);
            setUnitList([]);
        }
    };

    const loadSupp = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/suppquo/list`);
            if (res.data?.Success && Array.isArray(res.data.Data)) {
                setSuppQuot(res.data.Data);
            } else {
                setSuppQuot([])
            }
        } catch (err) {
            console.error("Error fetching brands:", err);
            setSuppQuot([])
        }
    };

    const loadSuppDets = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/ `);
            console.log("LOAD detail RESPONSE:", res.data);
            setSuppQuotDet(res.data)
        } catch (err) {
            console.error("Error fetching suppQuo:", err);
        }
    }

    // useEffect(() => {
    //     loadPrimary()
    //     loadSecondary()
    // }, [id]);
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
            } else {
                showTempMessage(res.data?.Message, 'false');
            }
        } catch (err) {
            console.error("Add Group Error", err);
        }
    };



    const handleTopChange = (e) => {
        const { name, value } = e.target;
        setTopData((prev) => ({ ...prev, [name]: value }))
    }

    const handleBottomChange = (e) => {
        const { name, value } = e.target;
        setBottomData((prev) => ({ ...prev, [name]: value }))
    }

    const filteredUnit = (unitList ?? []).filter(u =>
        (u.UnitType || '').toLowerCase().includes(
            (unitQuery || '').toLowerCase()
        )
    );

    const filteredLedger = (ledgerList ?? []).filter(item =>
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
        (item?.ProjName || "").toLowerCase().includes(
            (projectQuery || "").toLowerCase()
        )
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
        if (e.key === "ArrowUp" && !showLedgerDropdown) {
            e.preventDefault();
            setLedgerQuery("");            // 🔥 empty query = all records
            setShowLedgerDropdown(true);
            setActiveLedgerIndex(-1);
            return;
        }
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
        if (e.key === 'ArrowUp' && !showProjectDropdown) {
            e.preventDefault();
            setProjectQuery('');
            setShowProjectDropdown(true);
            setActiveLedgerIndex(-1);
            return;
        }
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
        (item.ProductName || "").toLowerCase().includes(
            (productQuery || "").toLowerCase()
        )
    );

    const handleProductKeyDown = (e) => {
        if (e.key === 'ArrowUp' && !showProductDropdown) {
            e.preventDefault();
            setProductQuery('');
            setShowProductDropdown(true);
            setActiveLedgerIndex(-1);
            return;
        }

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


            unitId: item.UnitId || "",
            unitType: item.UnitType,
            vatPer: item.VatPer || "",

            productName: item.ProductName,
            unitType: item.UnitType || "",
        }));

        setShowProductDropdown(false);
        setActiveProductIndex(-1);
    };

    const filteredBrand = brandList.filter(item =>
        item.BrandName?.toLowerCase().includes(
            (brandQuery || '').toLowerCase()
        )
    );

    const handleBrandKeyDown = (e) => {
        if (e.key === 'ArrowUp' && !showBrandDropdown) {
            e.preventDefault();
            setBrandQuery('');
            setShowBrandDropdown(true);
            setActiveLedgerIndex(-1);
            return;
        }
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
            unitId: item.UnitId,
            unitType: item.UnitType,
        }));

        setShowUnitDropdown(false);
        setActiveUnitIndex(-1);
    };



    const handleAddRow = () => {
        // Validate minimal required fields before adding
        if (!bottomData.productId) {
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
            unit: ' ',
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

    // const calculateAll = (qty, rate, marPer, vatPer) => {
    //     qty = parseFloat(qty) || 0;
    //     rate = parseFloat(rate) || 0;
    //     marPer = parseFloat(marPer) || 0;
    //     vatPer = parseFloat(vatPer) || 0;

    //     // selling rate
    //     const marginValue = rate * (marPer / 100);
    //     const sRate = rate + marginValue;

    //     // taxable
    //     const taxable = qty * rate;

    //     // vat amount
    //     const vatAmt = (taxable * vatPer) / 100;

    //     // total
    //     const amount = taxable + vatAmt;

    //     return { sRate, taxable, vatAmt, amount };
    // };

    // const totalAmount = rows.reduce(
    //     (sum, r) => sum + Number(r.taxable || 0), 0
    // )

    // const totalVatAmount = rows.reduce(
    //     (sum, r) => sum + Number(r.vatAmt || 0), 0
    // )

    // const totalActAmt = rows.reduce(
    //     (sum, r) => sum + Number(r.amount || 0), 0
    // )
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
            marPer: row.marPer,
            sRate: row.sRate,
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

    //Row Add/ Update
    const handleAddOrUpdateRow = () => {
        const rowData = {
            ...bottomData,

            // 🔹 DISPLAY FIELDS (TABLE)
            productName: productName,



            productName: productQuery,
            brandName: brandQuery,
            unitType: unitQuery,
        };

        if (editIndex !== null) {
            const updatedRows = [...rows];
            updatedRows[editIndex] = rowData;
            setRows(updatedRows);
            setEditIndex(null);
        } else {
            setRows(prev => [...prev, rowData]);
        }

        // OPTIONAL: clear form after add
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
        });

        setProductQuery('');
        setBrandQuery('');
        setUnitQuery('');
    };

    // cancel edit row
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
        setUnitQuery('');
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
            const totalQty = rows.reduce((s, r) => s + Number(r.qty || 0), 0);
            const netAmt = rows.reduce((s, r) => s + Number(r.amount || 0), 0);

            const nRate = totalQty > 0 ? netAmt / totalQty : 0;

            const payload = {
                SQId: 0,
                SQNo: topData.qNo,
                SQDate: topData.qDate,

                ProjectId: Number(topData.projectId),
                LedgerId: Number(topData.ledgerId),

                TotTaxableAmt: rows.reduce(
                    (sum, r) => sum + Number(r.taxable || 0), 0
                ),
                TotVatAmt: rows.reduce(
                    (sum, r) => sum + Number(r.vatAmt || 0), 0
                ),
                NetAmount: netAmt,

                Terms: topData.terms || "",
                Narration: topData.narration || "",
                Create_By: 1,

                // 🔥 DETAILS ARRAY
                Details: rows.map((r, index) => ({
                    Sno: index + 1,
                    ProductId: Number(r.productId),
                    Des: r.description || "",

                    BrandId: Number(r.brandId || 0),
                    UnitId: Number(r.unitId || 0),

                    Qty: Number(r.qty || 0),
                    BRate: Number(r.rate || 0),
                    ProfPer: Number(r.marPer || 0),
                    SRate: Number(r.sRate || 0),

                    Taxable: Number(r.taxable || 0),
                    VatPer: Number(r.vatPer || 0),
                    VatAmt: Number(r.vatAmt || 0),

                    NetAmt: Number(r.amount || 0),
                    NRate: nRate,
                }))
            };
            // 🔥 SINGLE API CALL
            const res = await axiosInstance.post(
                `${gapi}/suppquo/insert`,
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


    // const handleSaveSuppQuo = async () => {
    //     try {


    //         const payload = {
    //             Create_By: 1,
    //             Create_On: new Date().toISOString(),

    //             LedgerId: topData.ledgerId,
    //             ProjectId: topData.projectId,
    //             SQNo: topData.qNo,
    //             SQDate: topData.qDate,

    //             Narration: topData.narration || "",
    //             Terms: topData.terms || "",

    //             TotTaxableAmt: rows.reduce((sum, r) => sum + Number(r.taxable || 0), 0),
    //             TotVatAmt: rows.reduce((sum, r) => sum + Number(r.vatAmt || 0), 0),

    //             NetAmount: rows.reduce((sum, r) => sum + Number(r.amount || 0), 0),

    //             SQId: 0
    //         };

    //         console.log("HEADER PAYLOAD:", payload);

    //         const res = await axiosInstance.post(`${gapi}/suppquo/list`, payload);

    //         console.log("HEADER SAVED:", res.data);

    //         // Return the created SQId. Try to read returned property in multiple casings
    //         return Number(res.data?.RefId) || 0;


    //     } catch (err) {
    //         console.error("❌ HEADER SAVE ERROR:", err);
    //         throw err;
    //     }
    // };

    // const saveSuppQuoDetails = async (sqId) => {
    //     if (!sqId || sqId <= 0) {
    //         throw new Error("Missing SQId for details save.");
    //     }
    //     const totalQty = rows.reduce((sum, r) => sum + Number(r.qty || 0), 0);
    //     const netAmt = rows.reduce((sum, r) => sum + Number(r.amount || 0), 0);

    //     // ✅ CALCULATE NRate (NetAmt / Qty)
    //     const nRate = totalQty > 0 ? netAmt / totalQty : 0;
    //     // Build detail objects and validate
    //     const detailItems = rows.map((r, index) => {
    //         return {
    //             SQDetId: r.SQDetId || 0,
    //             SQId: Number(sqId),
    //             SNo: index + 1,

    //             ProductId: Number(r.productId || 0),
    //             BrandId: Number(r.brandId || 0),
    //             UnitId: Number(r.unitId || 0),
    //             UnitType: r.unitType || "",

    //             Qty: Number(r.qty || 0),
    //             BRate: Number(r.rate || 0),
    //             ProfPer: Number(r.marPer || 0),
    //             SRate: Number(r.sRate || 0),

    //             Taxable: Number(r.taxable || 0),
    //             VatAmt: Number(r.vatAmt || 0),

    //             NetAmT: Number(r.amount || 0),
    //             Des: r.description || "",
    //             NRate: nRate,

    //         };
    //     });

    //     console.log("DETAIL ITEMS TO SEND (per-item):", detailItems);

    //     // Validate: ensure required fields are present. If any row lacks productId, skip or throw.
    //     for (let i = 0; i < detailItems.length; i++) {
    //         const it = detailItems[i];
    //         if (!it.ProductId || Number(it.ProductId) === 0) {
    //             // If you prefer to stop saving completely, throw. Otherwise skip.
    //             throw new Error(`Row ${i + 1} missing ProductId. Please select product for each row.`);
    //         }
    //         // optionally validate other required fields
    //     }

    //     // Post each detail item individually (backend expects single object per POST)
    //     try {
    //         const results = [];
    //         for (const item of detailItems) {
    //             // POST single object
    //             const res = await axiosInstance.post(`${gapi}/tblSuppQuoDets`, item);
    //             results.push(res.data);
    //             console.log("Saved detail:", res.data);
    //         }
    //         return results;
    //     } catch (err) {
    //         console.error("❌ DETAIL SAVE ERROR:", err);
    //         // If server returns .response.data include it
    //         console.error("Server response:", err.response?.data);
    //         throw err;
    //     }
    // };


    const handleEditFromFind = async (sqId) => {
        try {
            const res = await axiosInstance.get(`${gapi}/suppquo/edit/${sqId}`);
            const data = res.data.Data;

            console.log("FULL EDIT DATA 👉", data);
            console.log("HEADER 👉", data.Header);
            const header = data.Header?.[0] || {};

            setIsEditMode(true);
            // 🔹 Header load
            setTopData(prev => ({
                ...prev,
                SQId: Number(header.SQId),
                qNo: header.SQNo,
                qDate: header.SQDate?.split('T')[0],
                projectId: header.ProjectId,
                ledgerId: header.LedgerId,
                terms: header.Terms ?? '',
                narration: header.Narration ?? '',
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
                    productName: r.ProductName ?? '',
                    qty: r.Qty ?? 0,
                    sRate: r.BRate ?? 0,
                    unitId: r.UnitId,
                    unitType: r.UnitType ?? "",

                    rate: r.BRate ?? r.SRate ?? 0,
                    amount: r.NetAmt ?? 0,

                    vatPer: r.VatPer ?? 0,
                    vatAmt: r.VatAmt ?? 0,
                    marPer: r.ProfPer ?? 0,
                    brandId: r.BrandId ?? "",
                    brand: r.BrandName ?? "",
                    brandQuery: r.BrandName ?? '',
                    brandName: r.BrandName ?? '',
                    taxable: r.Taxable ?? '',
                    description: r.Des ?? "",

                    // 🔒 keep original also (safe)
                    _raw: r
                }))
            );
            // console.log("DETAIL ROWS 👉", data.Details);
            // if (data.Details && data.Details.length > 0) {
            //     const first = data.Details[0];

            //     setProductQuery(first.ProductName || "");
            //     setBrandQuery(first.BrandName || "");

            //     setShowProductDropdown(false);
            //     setShowBrandDropdown(false);
            // }

            // 🔹 Close find popup
            setShowFind(false);



        } catch (err) {
            console.error(err);
            showTempMessage("Failed to load quotation ❌", false);
        }
    };

    const handleUpdateSuppQuo = async () => {
        try {
            const payload = {
                SQId: Number(topData.SQId),        // 🔑 THIS IS WHAT BACKEND USES
                SQNo: topData.qNo,
                SQDate: topData.qDate,
                ProjectId: topData.projectId,
                LedgerId: topData.ledgerId,
                Terms: topData.terms,
                Narration: topData.narration,
                Create_By: 1, // or logged user id

                Details: rows.map((r, index) => ({
                    Sno: index + 1,
                    ProductId: r.productId,
                    Des: r.description ?? "",
                    BrandId: r.brandId,
                    UnitId: r.unitId,
                    Qty: Number(r.qty),
                    BRate: Number(r.rate),
                    ProfPer: Number(r.marPer),
                    SRate: Number(r.sRate),
                    Taxable: Number(r.taxable),
                    VatPer: Number(r.vatPer),
                    VatAmt: Number(r.vatAmt),
                    NetAmt: Number(r.amount),
                    NRate: Number(r.rate), // backend expects this
                }))
            };

            console.log("UPDATE PAYLOAD 👉", payload);

            const res = await axiosInstance.put(
                `${gapi}/suppquo/update`,   // 🔑 NO SQId in URL
                payload
            );
            if (res.data?.Success === true) {
                showTempMessage(res.data.Message, 'true');
                setIsEditMode(false);
                handleReset()
            } else {
                showTempMessage(res.data?.Message, 'false');
            }
        } catch (err) {
            const backendError =
                err.response?.data?.Message ||
                err.response?.data ||
                err.message ||
                'Something went wrong';

            showTempMessage(backendError, 'false');
            console.error('Update error:', err);
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




    const openAddBrandModal = () => {
        if (!brandQuery.trim()) return;
        setShowAddBrandModal(true)
    }

    const cancelAddBrand = () => {
        setShowAddBrandModal(false)
    }

    const confirmAddBrand = () => {
        setShowAddBrandModal(false)
        addBrand()
    }

    const handleAddLedger = async () => {
        if (!ledgerName.trim() || !ledgerGroup || !ledgerState) {
            return;
        }
        const payload = {
            LedgerId: 0,
            AccId: Number(ledgerGroup),
            LedgerName: ledgerName.trim(),
            TName: ledgerName.trim(),
            TPlace: ledgerPlace?.trim() || "",
            EPlace: ledgerPlace?.trim() || "",
            CategoryId: 1,
            State: Number(ledgerState),
        };
        try {
            const res = await axiosInstance.post(
                `${gapi}/ledger/insert`,
                payload,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            console.log("LEDGER RES 👉", res.data);

            // 🔥 SUCCESS CONDITION (THIS IS THE FIX)
            if (res.data?.Success === true) {

                const savedLedger = {
                    LedgerId: res.data.LedgerId,
                    LedgerName: res.data.LedgerName,
                    EPlace: res.data.EPlace || "-",
                    StateName:
                        statesList.find(s => s.StateId == res.data.State)?.StateName || "-"
                };

                // 🔥 instant dropdown update
                setLedgerList(prev => [...prev, savedLedger]);

                // 🔥 auto select
                setLedger(savedLedger.LedgerId);
                setLedgerQuery(savedLedger.LedgerName);

                // 🔥 reset + close
                setLedgerName("");
                setLedgerGroup("");
                setLedgerState("");
                setLedgerPlace("");
                setLedgerQuery("");
                setShowLedgerModal(false);
                setShowLedgerDropdown(false);
                showTempMessage(res.data.Message, 'true');
            } else {
                showTempMessage(res.data?.Message, 'false');
            }

        } catch (err) {
            console.error("Add Ledger Error", err);
            showTempMessage("Failed to add ledger ❌");
        }
    };

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


    return (
        <div className='container-fluid mt-2'>
            {/* Card */}
            <div className='card shadow-lg mx-auto'
                style={{
                    border: '2px solid #6a1b9a',
                    width: '95%'
                }}
            >
                {/* card - header */}
                <div
                    className='card-header '
                    style={{
                        color: '#6a1b9a',
                        padding: '20px',
                        backgroundColor: 'white'
                    }}
                >
                    <h4><FontAwesomeIcon icon={faFileSignature} className="me-2" />Supplier Quot</h4>
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
                                <label className='form-label fw-bold  mb-2 me-2'>QNo<span className='required'>*</span></label>
                                <input
                                    type='number'
                                    className='form-control form-control-sm fw-bold'
                                    name='qNo'
                                    value={topData.qNo}
                                    onChange={handleTopChange}
                                    autoComplete="off"
                                />

                            </div>
                        </div>

                        <div style={{ flex: '0 0 200px' }}>
                            <div className='d-flex align-items-center'>
                                <label
                                    className='form-label fw-bold mb-2 me-2'>Q.Date<span className='required'>*</span></label>
                                <input
                                    type='date'
                                    className='form-control form-control-sm fw-bold'
                                    name='qDate'
                                    value={topData.qDate}
                                    onChange={handleTopChange}
                                    autoComplete="off"
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
                                    className="form-control form-control-sm fw-bold"
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

                        <div style={{ flex: '0 0 700px' }}>
                            <div
                                className="d-flex align-items-center"
                                style={{ position: 'relative', width: '100%' }}
                            >
                                {/* Label */}
                                <label
                                    className="form-label fw-bold mb-0 me-2 text-nowrap"
                                    style={{ minWidth: '60px' }}
                                >
                                    Project<span className='required'>*</span>
                                </label>

                                {/* Input */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm fw-bold"
                                    name="project"
                                    placeholder="🔎 Search Project..."
                                    value={projectQuery}
                                    onChange={handleProjectChange}
                                    onKeyDown={handleProjectKeyDown}
                                    autoComplete="off"
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

                    </div>
                    <hr className='mt-1' />
                    {/* 12 bottom inputs */}
                    <div className='d-flex align-items-center gap-1 mb-0'>
                        <div style={{ flex: '0 0 100px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >S.No<span className='required'>*</span></label>
                                <input
                                    name='sNo'
                                    type='number'
                                    className='form-control form-control-sm fw-bold'
                                    value={bottomData.sNo}
                                    onChange={handleBottomChange}
                                    autoComplete="off"
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
                                    Product<span className='required'>*</span>
                                </label>

                                {/* INPUT */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm fw-bold"
                                    placeholder="🔎 Search Product..."
                                    value={productQuery}
                                    autoComplete="off"
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
                                {showProductDropdown && (
                                    <div
                                        className="position-absolute bg-white border shadow-sm w-100"
                                        style={{
                                            top: '100%',
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
                                                        onMouseDown={() => selectProduct(item)}
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
                                                onMouseDown={(e) => e.preventDefault()}
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
                                    className="form-control form-control-sm fw-bold"
                                    style={{ height: '28px' }}
                                    value={unitQuery}
                                    autoComplete="off"
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
                                    Brand<span className='required'>*</span>
                                </label>

                                {/* INPUT */}
                                <input
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
                                    onBlur={() =>
                                        setTimeout(() => setShowBrandDropdown(false), 150)
                                    }
                                />

                                {/* DROPDOWN */}
                                {showBrandDropdown && (
                                    <div
                                        className="position-absolute bg-white border shadow-sm w-100"
                                        style={{
                                            top: '100%',
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
                                                        onMouseDown={() => selectBrand(item)}
                                                    >
                                                        {highlightText(item.BrandName, brandQuery)}
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            /* SMALL Add Row */
                                            <div
                                                className="d-flex align-items-center px-2 py-2 text-primary"
                                                style={{ cursor: "pointer" }}
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={openAddBrandModal}
                                            >
                                                <span className="me-2 fw-bold">+</span>
                                                <span className='fw-bold'>Add Brand</span>
                                            </div>
                                        )}

                                    </div>
                                )}
                            </div>
                        </div>


                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Qty<span className='required'>*</span></label>
                                <input
                                    name='qty'
                                    type='number'
                                    className='form-control form-control-sm fw-bold'
                                    value={bottomData.qty}
                                    autoComplete="off"
                                    min={0}
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
                                    className='form-label fw-bold mb-2 me-2'  >Rate<span className='required'>*</span></label>
                                <input
                                    name='rate'
                                    type='number'
                                    autoComplete="off"
                                    className='form-control form-control-sm fw-bold'
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
                                    type='number'
                                    className='form-control form-control-sm fw-bold'
                                    value={bottomData.marPer}
                                    autoComplete="off"
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
                                    type='number'
                                    className='form-control form-control-sm fw-bold'
                                    value={bottomData.sRate}
                                    onChange={handleBottomChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 '  >Taxable</label>
                                <input
                                    name='taxable'
                                    type='number'
                                    className='form-control form-control-sm fw-bold'
                                    value={bottomData.taxable}
                                    onChange={handleBottomChange}
                                    autoComplete="off"
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
                                    type='number'
                                    className='form-control form-control-sm fw-bold'
                                    value={bottomData.vatPer}
                                    onChange={handleBottomChange}
                                    autoComplete="off"
                                    disabled
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
                                    className="form-control form-control-sm fw-bold"
                                    value={bottomData.vatAmt}
                                    onChange={handleBottomChange}
                                    autoComplete="off"
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
                                    className='form-control form-control-sm fw-bold'
                                    value={bottomData.amount}
                                    onChange={handleBottomChange}
                                    autoComplete="off"
                                    disabled
                                />
                            </div>
                        </div>

                    </div>
                    {/* textarea */}
                    <div className='d-flex align-items-center gap-2 mt-1'>
                        <textarea
                            name='description'
                            className='form-control form-control-sm mt-1 fw-bold'
                            rows={2}
                            style={{
                                width: '50%'
                            }}
                            value={bottomData.description}
                            onChange={handleBottomChange}
                            autoComplete="off"
                        />
                        <button className='btn btn-primary btn-sm' onClick={handleAddOrUpdateRow}>
                            {editIndex !== null ? 'Update' : '🎬Add'}
                        </button>
                    </div>

                    {/* custom color line */}
                    <div
                        style={{
                            height: '2px',
                            backgroundColor: '#6a1b9a',
                            marginTop: '8px',
                            marginBottom: '8px'
                        }}
                    ></div>
                    {/* middle container for table row */}

                    <div
                        className="mt-2 px-2 px-md-3"
                        style={{
                            border: '2px solid #6a1b9a',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                            minHeight: '300px',
                            padding: '10px',
                            overflowX: "auto"   // prevents overflow issue
                        }}
                    >
                        <table className="table table-bordered table-sm" style={{ fontSize: "12px", minWidth: "1200px" }}>
                            <thead className="table-light">
                                <tr >
                                    <th style={{ width: "60px" }} className="text-center">S.No</th>
                                    <th style={{ width: "100px" }} className="text-center">Product</th>
                                    <th style={{ width: "100px" }} className='text-center'>Unit</th>
                                    <th style={{ width: "100px" }} className="text-center">Brand</th>
                                    <th style={{ width: "70px" }} className="text-center">Qty</th>
                                    <th style={{ width: "80px" }} className="text-center">Rate</th>
                                    <th style={{ width: "80px" }} className="text-center">Mar %</th>
                                    <th style={{ width: "100px" }} className="text-center">S.Rate</th>
                                    <th style={{ width: "100px" }} className="text-center">Taxable</th>
                                    <th style={{ width: "60px" }} className="text-center">VAT %</th>
                                    <th style={{ width: "80px" }} className="text-center">VAT Amt</th>
                                    <th style={{ width: "80px" }} className="text-center">Amount</th>
                                    <th style={{ width: "100px" }} className="text-center">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r, index) => (
                                    <tr key={index}
                                        className={editIndex === index ? "edit-highlight" : ""}
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        <td className="text-center">{index + 1}</td>
                                        <td>{r.productName}</td>
                                        <td className='text-center'>{r.unitType || ""}</td>
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
                            border: '2px solid #6a1b9a',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                            alignItems: 'stretch'
                        }}
                    >
                        {/* left section */}
                        <div
                            className='d-flex align-items-center pe-3'
                            style={{ borderRight: '2px solid #6a1b9a', minWidth: '140px' }}
                        >
                            <label
                                className='fw-bold me-2 mb-0 '
                                style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                            >
                                Item
                            </label>
                            <input
                                type='text'
                                className='form-control form-control-sm fw-bold'
                                style={{ width: '80px', height: '28px' }}
                                value={rows.length}
                                autoComplete="off"
                                readOnly
                            />
                        </div>

                        {/* middle section 1 */}
                        <div
                            className='d-flex px-3 flex-column justify-content-center'
                            style={{ borderRight: '2px solid #6a1b9a', minWidth: '200px' }}
                        >
                            <div className='d-flex align-items-center mb-2'>
                                <label className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right', width: '90px' }}
                                >Total Amount</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm fw-bold'
                                    style={{ width: '300px', height: '28px' }}
                                    value={totalAmount}
                                    autoComplete="off"
                                    readOnly
                                />
                            </div>

                            <div className='d-flex align-items-center '>
                                <label className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right', width: '90px' }}
                                >Vat Amount</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm fw-bold'
                                    style={{ width: '300px', height: '28px' }}
                                    value={totalVatAmount}
                                    autoComplete="off"
                                    readOnly
                                />
                            </div>

                        </div>
                        {/* mid section-2 */}
                        <div
                            className='d-flex flex-column px-3 justify-content-center'
                            style={{ borderRight: ' 2px solid #6a1b9a', minWidth: '200px' }}
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
                                    className='form-control form-control-sm fw-bold'
                                    style={{
                                        width: '300px',
                                        height: '28px'
                                    }}
                                    value={totalActAmt}
                                    autoComplete="off"
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
                                    autoComplete="off"
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
                                className='form-control form-control-sm fw-bold'
                                rows={2}
                                value={topData.terms}
                                onChange={handleTopChange}
                                autoComplete="off"
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Narration</label>
                            <textarea
                                name='narration'
                                className='form-control form-control-sm fw-bold'
                                rows={2}
                                value={topData.narration}
                                onChange={handleTopChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* buttons */}
                    <div
                        className="mt-3 d-flex justify-content-center flex-wrap"
                        style={{ gap: '8px' }}
                    >
                        <button className="btn btn-sm btn-success"
                            onClick={isEditMode ? handleUpdateSuppQuo : handleSaveSuppQuo}
                        >
                            {isEditMode ? 'Update' : 'Save'}
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => setShowFind(true)}>🔎Find</button>
                        <button className="btn btn-sm btn-info text-white" onClick={() => setShowFind(true)}>🗑️Delete</button>
                        <button className="btn btn-sm btn-dark" onClick={() => {
                            handleReset()
                            setIsEditMode(false)
                        }}>🔄️Reset</button>
                    </div>

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

                    {showLedgerModal && (
                        <div className="modal show d-block mt-5" tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header" style={{ backgroundColor: '#6a1b9a' }}>
                                        <h5 className="modal-title" style={{ color: 'white' }}>Add Ledger</h5>
                                        <button className="btn-close" style={{ backgroundColor: 'white' }} onClick={() => setShowLedgerModal(false)}></button>
                                    </div>

                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label className="form-label" >Ledger Name </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={ledgerName}
                                                onChange={e => setLedgerName(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Account Group </label>
                                            <select
                                                className="form-control"
                                                value={ledgerGroup}
                                                onChange={e => setLedgerGroup(e.target.value)}
                                            >
                                                <option value="">-- Select Group --</option>
                                                {accountGroups.map(g => (
                                                    <option key={g.AccId} value={g.AccId}>{g.AccName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">State </label>
                                            <select
                                                className="form-control"
                                                value={ledgerState}
                                                onChange={e => setLedgerState(e.target.value)}
                                            >
                                                <option value="">-- Select State --</option>
                                                {statesList.map(s => (
                                                    <option key={s.StateId} value={s.StateId}>{s.StateName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Place</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={ledgerPlace}
                                                onChange={e => setLedgerPlace(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={() => setShowLedgerModal(false)}>Cancel</button>
                                        <button type="button" className="btn btn-primary" onClick={handleAddLedger}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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
                    {/* ===== FIND POPUP ===== */}
                    {showFind && (
                        <FindSQuot
                            onClose={() => setShowFind(false)}
                            onEdit={handleEditFromFind}
                            onReset={handleReset}
                            onBtnDelete={() => setIsEditMode(false)}
                            showTempMessage={showTempMessage}
                        />

                    )}
                </div>
            </div>
        </div>
    )
}

export default SQuot;