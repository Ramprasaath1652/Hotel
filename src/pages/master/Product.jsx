import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons'
// import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';



const Product = () => {
    const [products, setProducts] = useState([]);
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [salesUnit, setSalesUnit] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [productId, setProductId] = useState('')
    const [productTamil, setProductTamil] = useState('')
    const [_groupId, setGroupId] = useState(null)
    const [packing, setPacking] = useState('')
    const [qty, setQty] = useState('')
    const [freeQty, setFreeQty] = useState('')
    const [vatPer, setVatPer] = useState('')
    const [comCode, setComCode] = useState('');
    const [sch, setSch] = useState('');
    const [HSNId, setHSNId] = useState('');
    const [SGST, setSGST] = useState('');
    const [IGST, setIGST] = useState('');
    const [CGST, setCGST] = useState('');
    const [HSNCode, setHSNCode] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [productToEdit, setProductToEdit] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [groupList, setGroupList] = useState([]);
    const [unitList, setUnitList] = useState([]);

    const [groupQuery, setGroupQuery] = useState('');
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);

    const [forceOpen, setForceOpen] = useState(false);
    const [_puId, setPuId] = useState()

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const [openPopup, setOpenPopup] = useState(false);

    const [activeIndex, setActiveIndex] = useState(-1);
    const [showAddGroupModal, setShowAddGroupModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showMessage_Error, setShowMessage_Error] = useState(false);

    const gapi = import.meta.env.VITE_API_URL;
    const API = `${gapi}/product/`;
    const API_PUNIT = `${gapi}/productunits`;

    useEffect(() => {

        loadProduct()
        loadGroup()
        loadUnit()

    }, [])

    const loadGroup = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/group/list`);
            console.log('group url : ' + gapi + '/group');
            setGroupList(res.data.Data)

        } catch (err) {
            console.error('Group Load Error:', err)
        }
    }

    const loadUnit = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/unit/list`);
            console.log('unit url : ' + gapi + '/unit');
            setUnitList(res.data.Data)
        } catch (err) {
            console.error('Unit Load Error:', err)
        }
    }

    const loadProduct = async () => {
        try {
            const res = await axiosInstance.get(API + 'list')
            setProducts(res.data.Data)

        } catch (err) {
            console.error('product fetching error', err);
            alert('Could not load product. Check API connection.');
        }
    }

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

    //Add

    const handleAddProductUnit = async (pid) => {
        const newUnit = {
            PUId: 0,
            ProductId: pid,
            UType: 'W',
            UnitId: salesUnit
        }
        try {
            const res = await axiosInstance.post(API_PUNIT, newUnit, {
                headers: { 'Content-Type': 'application/json' },
            })
            if (res.data?.Success === true) {
                showTempMessage(res.data.Message, 'true');
                await loadProduct();
            } else {
                showTempMessage(res.data?.Message, 'false');
            }

        } catch (err) {
            console.error('Add error:', err);
            alert("Failed to add product.");
        }
    }
    const handleUpdateProductUnit = async (puid, pid) => {
        const _updateUnit = {
            PUId: puid,
            ProductId: pid,
            UType: 'W',
            UnitId: salesUnit
        }
        try {
            const res = await axiosInstance.put(`${API_PUNIT}/${_puId}`, _updateUnit);
            console.log('put data :', res.data);
            await loadProduct();
            //alert("Product Updated Successfully!");
        } catch (err) {
            console.error('Add error:', err);
            alert("Failed to add product.");
        }
    }

    const handleAdd = async () => {
        if (!productCode.trim()) {
            setPopupMessage('Product Code must be filled')
            setShowPopup(true)
            return;
        }
        if (!productName.trim()) {
            setPopupMessage('Product Name must be filled')
            setShowPopup(true)
            return;
        }
        if (!groupQuery.trim()) {
            setPopupMessage('Select a group name')
            setShowPopup(true)
            return;
        }

        if (!salesUnit.trim()) {
            setPopupMessage('Sales unit must be filled')
            setShowPopup(true)
            return;
        }


        const newProduct = {
            ProductID: 0,
            CGST: Number(CGST) || 0,
            SGST: Number(SGST) || 0,
            IGST: Number(vatPer),
            ProductCode: productCode,
            ProductName: productName,
            ProductTamil: productName,
            GroupId: Number(_groupId),
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
        console.log("📌 NEW PRODUCT SENT TO API:", newProduct);

        try {
            const res = await axiosInstance.post(API + 'insert', newProduct, {
                headers: { 'Content-Type': 'application/json' },
            })
            console.log('API response:', res.data);


            if (res.data?.Success === true) {
                showTempMessage(res.data.Message, 'true');
                await loadProduct()
                setProductName('')
                setProductId(0)
                setEditingIndex(null);
                resetForm();
            } else {
                showTempMessage(res.data?.Message, 'false');
            }



            //alert("1 Project Added Successfully!");


            // alert("Product added successfully!")
        } catch (err) {
            console.log("❌ FULL ERROR:", err);

            if (err.response) {
                console.log("❌ STATUS:", err.response.status);
                console.log("❌ DATA:", err.response.data);
                console.log("❌ HEADERS:", err.response.headers);

                alert(err.response.data?.Message || "Server error");
            } else if (err.request) {
                console.log("❌ NO RESPONSE:", err.request);
                alert("Server not responding");
            } else {
                console.log("❌ ERROR MESSAGE:", err.message);
                alert('Add Err:', err.message);
            }
        }
    }
    const cancelEdit = () => {
        setShowEditModal(false);
        setProductToEdit(null);
        setEditingIndex(null);
        resetForm();
    };
    const handleEdit = (product) => {
        setProductToEdit(product);
        console.log('my productToEdit : ' + product);
        // setEditingIndex(product.ProductID);
        setShowEditModal(true);
    };
    // Edit
    const confirmEdit = () => {
        // console.log("🟦 confirmEdit() productToEdit:", productToEdit);
        if (!productToEdit) return;
        const p = productToEdit;

        setProductId(p.ProductID);

        console.log("🟩 Setting productId to:", p.ProductID);
        if (!productToEdit) return;
        setEditingIndex(productToEdit.ProductID)
        setProductId(productToEdit.ProductID);
        setProductCode(productToEdit.ProductCode);
        setProductName(productToEdit.ProductName);
        setIGST(productToEdit.IGST);
        setCGST(productToEdit.CGST);
        setSGST(productToEdit.SGST);
        setHSNCode(productToEdit.HSNCode);
        setHSNId(productToEdit.HSNId);

        setGroupQuery(productToEdit.GroupName);
        setSalesUnit(productToEdit.UnitId)
        setPacking(productToEdit.Packing);
        setProductTamil(productToEdit.ProductTamil);
        setFreeQty(productToEdit.FreeQty);
        setQty(productToEdit.Qty);
        setVatPer(productToEdit.VatPer);
        setComCode(productToEdit.ComCode);
        setSch(productToEdit.Sch);


        setGroupId(productToEdit.GroupId);
        setPuId(productToEdit.PUId)

        setShowEditModal(false);
    };
    const resetForm = () => {
        setIGST('')
        setCGST('')
        setSGST('')
        setHSNCode('')
        setHSNId('')
        setProductId('')
        setProductCode('')
        setProductName('')
        setGroupId(null);
        setGroupQuery('');
        setShowGroupDropdown(false);
        setActiveIndex(-1);
        setPacking('')
        setProductTamil('')
        setFreeQty('')
        setQty('')
        setVatPer('')
        setComCode('')
        setSch('')
        setEditingIndex(null);
        setProductToEdit(null);
        setSalesUnit('');
    };

    // Update group
    const handleUpdate = async () => {
        // console.log("🟦 handleUpdate() — productId:", productId);
        if (!productName.trim()) {
            alert("Please enter product name");
            return;
        }

        if (!productId) {
            alert("Invalid product selected");
            return;
        }

        const updatedProduct = {
            ProductID: productId,       // <-- MUST BE CORRECT
            CGST: Number(CGST),
            SGST: Number(SGST),
            IGST: Number(vatPer),
            ProductCode: productCode,
            ProductName: productName,
            ProductTamil: productName,
            GroupId: Number(_groupId),
            Packing: Number(packing),
            Qty: qty,
            FreeQty: freeQty,
            VatPer: Number(vatPer),
            ComCode: comCode,
            Sch: sch,
            HSNCode: HSNCode,
            HSNId: Number(HSNId),
            UnitId: Number(salesUnit),

        };
        console.log("🟩 productId BEFORE UPDATE:", productId);
        console.log("🟧 updatedProduct BEFORE UPDATE:", updatedProduct);
        try {
            // Update In Product Table
            const res = await axiosInstance.put(API + 'update', updatedProduct, {
                headers: { 'Content-Type': 'application/json' },
            });
            // Update in Product Unit Table
            // await handleUpdateProductUnit(_puId, productId);
            if (res.data?.Success === true) {
                showTempMessage(res.data.Message, 'true');
                await loadProduct()
                setProductId(0);
                setProductName('')
                setEditingIndex(null);
                setShowUpdateModal(false);
                resetForm()
            }
            // ❌ BACKEND LOGICAL ERROR
            else {
                showTempMessage(res.data?.Message, 'false');
            }


        } catch (err) {
            const backendError =
                err.response?.data?.Message ||
                err.response?.data ||
                err.message ||
                'Something went wrong';
            showTempMessage(backendError, 'false');
            console.error("Update error:", err);
        }
    };


    //console.log("🟥 PUT URL:", `${API}/${productId}`);

    // Delete
    const handleDelete = async () => {
        if (!productToDelete) return;
        setShowDeleteModal(false);

        try {
            const res = await axiosInstance.delete(`${API}delete/${productToDelete.ProductID}`);
            setProductToDelete(null);
            if (res.data?.Success === true) {
                showTempMessage(res.data.Message, 'true');
                await loadProduct();
                setProductName('')
                setProductId(0)
                setEditingIndex(null)
            } else {
                showTempMessage(res.data?.Message, 'false');
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    // Filtered data for search
    const filteredProducts = Array.isArray(products)
        ? products.filter(
            (item) =>
                item?.ProductName &&
                item.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const filteredGroup = Array.isArray(groupList)
        ? groupList.filter(item =>
            item.GroupName?.toLowerCase().includes(groupQuery?.toLowerCase() || '')
        )
        : [];


    const handleKeyDown = (e) => {
        if (!showGroupDropdown || filteredGroup.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev < filteredGroup.length - 1 ? prev + 1 : 0
            )
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : filteredGroup.length - 1
            )
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) {
                const selectedItem = filteredGroup[activeIndex];
                setGroupId(selectedItem.GroupID);
                setGroupQuery(selectedItem.GroupName);
                setShowGroupDropdown(false);
                setActiveIndex(-1);
            }
        }

        if (e.key === "Escape") {
            setShowGroupDropdown(false);
            setActiveIndex(-1);
        }
    }

    const handleAddGroup = () => {
        if (!groupQuery.trim()) return;

        const confirmAdd = window.confirm(
            `Are you sure you want to add "${groupQuery}"?`
        )
        if (confirmAdd) {
            addGroup();
        }
    }

    const addGroup = async () => {
        if (!groupQuery.trim()) return;

        try {
            const res = await axiosInstance.post(
                `${gapi}/group/insert`,
                {
                    GroupName: groupQuery.trim(),
                    GroupID: 0,
                    TGroupName: groupQuery.trim()
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            if (res.data?.Success === true) {

        console.log('data1:',res.data.Data)
        console.log('GN:',res.data.Data[0].GroupName)

              

                // 🔥 instant dropdown update
                // setGroupList(prev => [...prev, newGroup]);
                setGroupId(res.data.Data[0].GroupID);
                // setGroupQuery(newGroup.GroupName);
                // setGroupQuery("");
                setShowGroupDropdown(false);
                setActiveIndex(-1);
                showTempMessage(res.data.Message, 'true');
            } else {
                showTempMessage(res.data?.Message, 'false');
            }
        } catch (err) {
            console.error("Add Group Error", err);
            showTempMessage("Failed to add group ❌");
        }
    };

    const openAddGroupModal = () => {
        if (!groupQuery.trim()) return;
        setShowAddGroupModal(true);
    };

    const cancelAddGroup = () => {
        setShowAddGroupModal(false);
    };

    const confirmAddGroup = () => {
        setShowAddGroupModal(false);
        addGroup(); // ✅ actual API call
    };

    const highlightText = (text, query) => {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, "gi");

        return text.split(regex).map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span
                    key={index}
                    style={{
                        backgroundColor: "#ffc107",
                        fontWeight: "bold",
                    }}
                >
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    const handleReset = () => {
        setIGST('')
        setCGST('')
        setSGST('')
        setHSNCode('')
        setHSNId('')
        setProductId('')
        setProductCode('')
        setProductName('')
        setGroupId(null);
        setGroupQuery('');
        setShowGroupDropdown(false);
        setActiveIndex(-1);
        setPacking('')
        setProductTamil('')
        setFreeQty('')
        setQty('')
        setVatPer('')
        setComCode('')
        setSch('')
        setEditingIndex(null);
        setProductToEdit(null);
        setSalesUnit('');
    }
    return (
        <div className="container-fluid mt-2">
            <div className="card shadow-lg mx-auto" style={{ maxWidth: '95%', border: '2px solid #6a1b9a' }}>
                {/* Header */}
                <div className="card-header" style={{ color: '#6a1b9a', padding: '20px', backgroundColor: 'white' }}>
                    <h4 className="mb-0"><FontAwesomeIcon icon={faBox} className="me-2" />Product</h4>
                </div>

                {/* Body */}
                <div className="card-body" style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}
                >
                    <div className="row">
                        {/* Left - Form */}
                        <div className="col-md-4">

                            <div className="mb-3">
                                <label className="form-label fw-bold">Product Code <span className='required'>*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter product code"
                                    value={productCode}
                                    onChange={(e) => setProductCode(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Product Name <span className='required'>*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter product name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>




                            <div className='mb-3 position-relative'>
                                <label className='form-label fw-bold'>Group Name <span className='required'>*</span></label>
                                <label className='form-label'>{_groupId}</label>


                                {/* Input Box */}
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Group..."
                                    value={groupQuery}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setGroupQuery(value);
                                        setShowGroupDropdown(value.trim() !== "");
                                        setActiveIndex(-1);
                                    }}
                                    onFocus={() => {
                                        if (groupQuery.trim() !== '') setShowGroupDropdown(true);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setShowGroupDropdown(false);
                                        }, 150);
                                    }}

                                />

                                {/* Dropdown */}
                                {showGroupDropdown && (
                                    <div
                                        className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                        style={{ zIndex: 9999 }}
                                    >
                                        {filteredGroup.length > 0 ? (
                                            <>
                                                {/* Header ONLY when data exists */}
                                                <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                    <div className="col-12">Name</div>
                                                </div>

                                                {/* List */}
                                                {filteredGroup.map((item, index) => (
                                                    <div
                                                        key={item.GroupID}
                                                        className={`d-flex px-2 py-2 border-bottom ${index === activeIndex ? "bg-secondary text-white" : ""
                                                            }`}
                                                        style={{ cursor: "pointer" }}
                                                        onMouseEnter={() => setActiveIndex(index)}
                                                        onMouseDown={(e) => {
                                                            e.preventDefault
                                                            setGroupId(item.GroupID);
                                                            setGroupQuery(item.GroupName);
                                                            setShowGroupDropdown(false);
                                                            setActiveIndex(-1);
                                                        }}
                                                    >
                                                        <div className="col-12"> {highlightText(item.GroupName, groupQuery)}</div>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            /* SMALL Add Row */
                                            <div
                                                className="d-flex align-items-center px-2 py-2 text-primary"
                                                style={{ cursor: "pointer" }}
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={openAddGroupModal}
                                            >
                                                <span className="me-2 fw-bold">+</span>
                                                <span className='fw-bold'>Add Group</span><span className='ms-2'><i> (Click here to add a new Group)</i></span>
                                            </div>
                                        )}
                                    </div>
                                )}


                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Sales Unit <span className='required'>*</span></label>
                                <select
                                    className="form-control"
                                    value={salesUnit}
                                    onChange={(e) => setSalesUnit(e.target.value)}
                                    autoComplete="off"
                                >
                                    <option value="">-- Select Sales --</option>

                                    {unitList.map((g) => (
                                        <option key={g.UnitId} value={g.UnitId}>
                                            {g.UnitType}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3 ">
                                <label className="form-label fw-bold">Vat%</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Enter Vat%"
                                    value={vatPer}
                                    onChange={(e) => setVatPer(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>

                            <button
                                className="btn btn-success text-uppercase fw-bold btn-md "
                                onClick={() => {
                                    if (editingIndex !== null) {
                                        setShowUpdateModal(true);   // ✅ open update confirmation
                                    } else {
                                        handleAdd();
                                    }
                                }}
                            >
                                {editingIndex !== null ? '🛠️Update' : '📋Save'}
                            </button>
                            <button className='btn btn-md btn-danger m-2 fw-bold'
                                onClick={handleReset}
                            >
                                🔄️RESET
                            </button>
                        </div>

                        {/* Right - Table */}
                        <div className="col-md-8 mt-2 mt-md-0">
                            <label className="form-label fw-bold">Search for ProductName </label>
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                                <input
                                    type="text"
                                    className="form-control w-50"
                                    placeholder="🔎 Search Products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <h5 className="mb-0" style={{ color: '#6a1b9a' }}>Showing {filteredProducts.length} of {products.length} Records </h5>
                            </div>

                            {filteredProducts.length === 0 ? (
                                <p className="text-center text-muted">No records found.</p>
                            ) : (
                                <div
                                    style={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto', overflowX: 'auto' }}

                                >
                                    <table className="table table-bordered table-striped text-center align-middle">
                                        <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
                                            <tr>
                                                <th>Product Code</th>
                                                <th>Product Name</th>
                                                <th>Group Name</th>
                                                <th>Unit</th>
                                                <th>Vat %</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.map((item) => (
                                                <tr key={item.ProductID}>
                                                    <td>{highlightText(item.ProductCode, searchTerm)}</td>
                                                    <td className='text-start'>{highlightText(item.ProductName, searchTerm)}</td>
                                                    <td className='text-start'>{highlightText(item.GroupName, searchTerm)}</td>
                                                    <td className='text-start'>{highlightText(item.UnitType, searchTerm)}</td>
                                                    <td className='text-start'>{highlightText(item.VatPer, searchTerm)}</td>

                                                    <td>
                                                        <button className="btn btn-warning btn-sm me-2 fw-bold" onClick={() => handleEdit(item)}>
                                                            🖋️Edit
                                                        </button>
                                                        <button className="btn btn-danger btn-sm fw-bold"
                                                            onClick={() => {
                                                                setProductToDelete(item);
                                                                setShowDeleteModal(true);
                                                            }}
                                                        >
                                                            🗑️Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
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

                    {showPopup && (
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Product</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowPopup(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>{popupMessage}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-primary" onClick={() => setShowPopup(false)}>
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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
                                            {productToDelete?.ProductName}"?
                                        </p>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={cancelDelete}
                                        >
                                            No
                                        </button>
                                        <button className="btn btn-danger" onClick={handleDelete}>
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Confirmation Modal */}
                    {showEditModal && (
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Confirm Edit</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowEditModal(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Are you sure you want to edit "{productToEdit?.ProductName}"?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={cancelEdit}
                                        >
                                            No
                                        </button>
                                        <button className="btn btn-primary" onClick={confirmEdit}>
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {openPopup && (
                    <>
                        {/* Overlay */}
                        <div
                            className="ic-overlay"
                            onClick={() => setOpenPopup(false)}
                        />

                        {/* Popup Card */}
                        <div className="ic-popup">
                            {/* Header */}
                            <div className="ic-header">
                                <h4>Choose address</h4>
                                <button
                                    className="btn-close"
                                    onClick={() => setOpenPopup(false)}
                                ></button>
                            </div>

                            {/* Body */}
                            <div className="ic-body">
                                <div className="search-box">
                                    <input
                                        type="text"
                                        placeholder="Enter your address"
                                    />
                                    <span className="search-icon">🔍</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Add Group Modal */}
                {showAddGroupModal && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Add</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={cancelAddGroup}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p>
                                        Are you sure you want to add "
                                        <strong>{groupQuery}</strong>"?
                                    </p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={cancelAddGroup}
                                    >
                                        No
                                    </button>
                                    <button
                                        className="btn btn-success"
                                        onClick={confirmAddGroup}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Update Confirmation Modal */}
                {showUpdateModal && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Update</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowUpdateModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p>
                                        Are you sure you want to update "
                                        <strong>{productName}</strong>"?
                                    </p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowUpdateModal(false)}
                                    >
                                        No
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleUpdate}
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
    );
};

export default Product;
