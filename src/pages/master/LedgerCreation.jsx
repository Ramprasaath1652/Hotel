import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';


const LedgerCreation = () => {

    const [formData, setFormData] = useState({
        AccId: '',
        LedgerName: '',
        LedgerId: '',
        TName: '',
        Add1: '',
        Add2: '',
        TPlace: '',
        EPlace: '',
        District: '',
        Pin: '',
        Phone: '',
        Mobile: '',
        TinNo: '',
        Debit: '',
        Credit: '',
        CategoryId: '',
        State: '',
        TinStatus: '',
        LocalAgent: '',
        OtherState: '',
        GSTinNo: '',
        OtherNo: '',
        Country: '',
    });


    const [ledgers, setLedgers] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [accountGroups, setAccountGroups] = useState([]);

    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const [ledgerToDelete, setledgerToDelete] = useState(null);

    const [showEditModal, setshowEditModal] = useState(false);
    const [ledgerToEdit, setledgerToEdit] = useState(null);

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');




    const gapi = import.meta.env.VITE_API_URL;
    const API = `${gapi}/ledger`;

    useEffect(() => {
        console.log('main url : ' + gapi + '/ledger');
        loadLedgers();
        loadAccountGroups();
        loadStates();
        // setledgerToDelete({ ledgerName: 'Test Ledger' });
        // setshowDeleteModal(true);
        // setledgerToEdit({ ledgerName: 'Test Ledger' });
        // setshowEditModal(true);
    }, [])

    const loadLedgers = async () => {
        try {
            const res = await axiosInstance.get(API);
            console.log(' Ledgers received from API:', res.data)
            setLedgers(res.data);

        } catch (err) {
            console.error('Error fetching groups:', err);
            alert('Could not load groups. Check API connection.');
        }
    };

    const loadAccountGroups = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/accountgroups`);
            console.log("Account Groups:", res.data);
            setAccountGroups(res.data);
        } catch (err) {
            console.error("Error fetching account groups:", err);
            alert("Could not load account groups. Check API connection.");
        }
    };

    const loadStates = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/statemasters`);
            console.log("State masters:", res.data);
            setStateList(res.data);
        } catch (err) {
            console.error("Error fetching State master:", err);
            alert("Could not load state master. Check API connection.");
        }
    };


    //cancel delete
    const cancelDelete = () => {
        setshowDeleteModal(false);
        setledgerToDelete(null)
    }

    // Handle input changes
    const handleChange = (e) => {
        //alert(e.value());
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    //Add
    const handleAdd = async () => {

        if (!formData.AccId) {
            setShowPopup(true);
            setPopupMessage('Account Group must be selected')
            return;
        }

        if (!formData.LedgerName.trim()) {
            setShowPopup(true);
            setPopupMessage('Ledger Name must be filled')
            return;
        }

        if (!formData.EPlace.trim()) {
            setShowPopup(true);
            setPopupMessage('Place Name must be filled')
            return;
        }


        const newLedger = {
            LedgerId: 0,
            AccId: Number(formData.AccId) || 0,
            LedgerName: formData.LedgerName?.trim() || '',
            TName: formData.LedgerName?.trim() || '',
            Add1: formData.Add1?.trim() || '',
            Add2: formData.Add2?.trim() || '',
            TPlace: formData.EPlace?.trim() || '',
            EPlace: formData.EPlace?.trim() || '',
            District: formData.District?.trim() || '',
            Pin: formData.Pin?.trim() || '',
            Phone: formData.Phone?.trim() || '',
            Mobile: formData.Mobile?.trim() || '',
            TinNo: formData.TinNo?.trim() || '',
            Debit: !isNaN(parseFloat(formData.Debit)) ? parseFloat(formData.Debit) : 0,
            Credit: !isNaN(parseFloat(formData.Credit)) ? parseFloat(formData.Credit) : 0,
            CategoryId: Number(formData.CategoryId) || 1,
            State: Number(formData.State) || 0,
            TinStatus: formData.TinStatus?.trim() || 'No',
            LocalAgent: formData.LocalAgent?.trim() || 'No',
            OtherState: formData.OtherState?.trim() || 'No',
            GSTinNo: formData.TinNo?.trim() || '',
            OtherNo: formData.OtherNo?.trim() || '',
            Country: formData.Country?.trim() || ''
        };

        console.log("Payload sent to API:", newLedger);

        try {
            const res = await axiosInstance.post(API, newLedger, {
                headers: { 'Content-Type': 'application/json' },
            })
            // console.log("Full API response:", res);
            // console.log("Sent payload:", newLedger);
            // console.log("Returned from API:", res.data);

            //setLedgers(prev => [...prev, res.data]);                        
            //("✅ Ledger added successfully:", res.data);
            showTempMessage("Ledger added successfully ✅");
            loadLedgers();

            setFormData({
                AccId: '',
                LedgerName: '',
                LedgerId: '',
                TName: '',
                Add1: '',
                Add2: '',
                TPlace: '',
                EPlace: '',
                District: '',
                Pin: '',
                Phone: '',
                Mobile: '',
                TinNo: '',
                Debit: '',
                Credit: '',
                CategoryId: '',
                State: '',
                TinStatus: '',
                LocalAgent: '',
                OtherState: '',
                GSTinNo: '',
                OtherNo: '',
                Country: '',
            })

        } catch (err) {
            console.error('Add error:', err);
            alert("Failed to add ledger. Please check API connection.")
        }

    }

    // update
    const handleUpdate = async () => {
        if (!formData.LedgerName.trim()) {
            alert('Please enter Ledger Name');
            return;
        }

        if (editingIndex === null || editingIndex === undefined) {
            alert('Invalid ledger selected for update.');
            return;
        }

        const updatedLedger = {
            LedgerId: formData.LedgerId,
            AccId: (formData.AccId) || 0,
            LedgerName: formData.LedgerName,
            TName: formData.LedgerName,
            Add1: formData.Add1,
            Add2: formData.Add2,
            TPlace: formData.EPlace,
            EPlace: formData.EPlace,
            District: formData.District,
            Pin: formData.Pin,
            Phone: formData.Phone,
            Mobile: formData.Mobile,
            TinNo: formData.TinNo,
            Debit: parseFloat(formData.Debit) || 0,
            Credit: parseFloat(formData.Credit) || 0,
            CategoryId: Number(formData.CategoryId) || 1,
            State: Number(formData.State) || 0,
            TinStatus: formData.TinStatus,
            LocalAgent: formData.LocalAgent,
            OtherState: formData.OtherState,
            GSTinNo: formData.TinNo,
            OtherNo: formData.OtherNo,
            Country: formData.Country,

        };


        console.log("URL:", `${API}/${editingIndex}`);
        console.log("About to PUT ledger:", updatedLedger);


        try {
            await axiosInstance.put(`${API}/${updatedLedger.LedgerId}`, updatedLedger, {
                headers: { 'Content-type': 'application/json' }
            })

            console.log("✅ Ledger updated successfully:", updatedLedger);
            showTempMessage("Ledger updated successfully ✏️");


            await loadLedgers();
            setFormData({
                AccId: '',
                LedgerName: '',
                LedgerId: '',
                TName: '',
                Add1: '',
                Add2: '',
                TPlace: '',
                EPlace: '',
                District: '',
                Pin: '',
                Phone: '',
                Mobile: '',
                TinNo: '',
                Debit: '',
                Credit: '',
                CategoryId: '',
                State: '',
                TinStatus: '',
                LocalAgent: '',
                OtherState: '',
                GSTinNo: '',
                OtherNo: '',
                Country: '',
            });
            setEditingIndex(null);
        } catch (err) {
            console.error('Update error:', err);
            alert('Failed to update ledger . please check API connection')
        }

    }
    //Edit
    const confirmEdit = () => {
        if (!ledgerToEdit) return;

        setFormData({
            LedgerId: ledgerToEdit.LedgerId,
            AccId: ledgerToEdit.AccId ? ledgerToEdit.AccId : '',
            LedgerName: ledgerToEdit.LedgerName || "",
            TName: ledgerToEdit.TName || "",
            Add1: ledgerToEdit.Add1 || "",
            Add2: ledgerToEdit.Add2 || "",
            TPlace: ledgerToEdit.TPlace || "",
            EPlace: ledgerToEdit.EPlace || "",
            District: ledgerToEdit.District || "",
            Pin: ledgerToEdit.Pin || "",
            Phone: ledgerToEdit.Phone || "",
            Mobile: ledgerToEdit.Mobile || "",
            TinNo: ledgerToEdit.TinNo || "",
            Debit: ledgerToEdit.Debit || 0,
            Credit: ledgerToEdit.Credit || 0,
            CategoryId: ledgerToEdit.CategoryId || "",
            State: ledgerToEdit.State || '',
            TinStatus: ledgerToEdit.TinStatus || "",
            LocalAgent: ledgerToEdit.LocalAgent || "",
            OtherState: ledgerToEdit.OtherState || "",
            GSTinNo: ledgerToEdit.GSTinNo || "",
            OtherNo: ledgerToEdit.OtherNo || "",
            Country: ledgerToEdit.Country || "",
        })

        const index = ledgers.findIndex((l) => l.LedgerId === ledgerToEdit.LedgerId);
        setEditingIndex(index);

        setshowEditModal(false);

        console.log("Form data populated for editing:", ledgerToEdit);
    }

    //Delete Record
    const handleDelete = async () => {
        if (!ledgerToDelete) return;

        try {
            await axiosInstance.delete(`${API}/${ledgerToDelete.LedgerId}`)
            await loadLedgers();
            setshowDeleteModal(false);
            setledgerToDelete(null);
            showTempMessage("Ledger deleted successfully 🗑️");
        }
        catch (err) {
            console.error("Error deleting ledger:", err);
        }
    }


    // Filter List for search
    const filteredLedgers = Array.isArray(ledgers)
        ? ledgers.filter((item) => {
            const q = searchTerm?.toLowerCase() || '';

            return (
                item?.LedgerName?.toLowerCase().includes(q) ||
                item?.Add1?.toLowerCase().includes(q) ||
                item?.Add2?.toLowerCase().includes(q) ||
                item?.StateName?.toLowerCase().includes(q) ||
                item?.AccName?.toLowerCase().includes(q) ||
                item?.Debit?.toString().toLowerCase().includes(q) ||
                item?.Credit?.toString().toLowerCase().includes(q)
            );
        })
        : [];

    const handleReset = () => {
        setFormData({
            AccId: '',
            LedgerName: '',
            LedgerId: '',
            TName: '',
            Add1: '',
            Add2: '',
            TPlace: '',
            EPlace: '',
            District: '',
            Pin: '',
            Phone: '',
            Mobile: '',
            TinNo: '',
            Debit: '',
            Credit: '',
            CategoryId: '',
            State: '',
            TinStatus: '',
            LocalAgent: '',
            OtherState: '',
            GSTinNo: '',
            OtherNo: '',
            Country: '',
        });
    }

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

    const showTempMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };


    return (
        <div className='container-fluid mt-2'>
            <div className='card shadow-lg mx-auto'
                style={{
                    border: '2px solid #6a1b9a',
                    maxWidth: '95%'
                }}
            >
                <div className='card-header '
                    style={{
                        color: '#6a1b9a',
                        padding: '20px',
                        backgroundColor: 'white'
                    }}
                >
                    <h4 className='mb-0'> <FontAwesomeIcon icon={faBook} className="me-2" />Ledger Master</h4>
                </div>
                {/* Body */}
                <div className='card-body' style={{ height: 'calc(100vh - 200px', overflow: 'auto' }}>
                    <div className='row'>
                        {/* Left Form */}
                        <div className='col-md-4'>

                            <div className="row mb-3 align-items-center">
                                <label className="col-sm-4 col-form-label fw-bold">Account Group <span className='required'>*</span></label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-select"
                                        autoComplete="off"
                                        name="AccId"
                                        value={formData.AccId}
                                        onChange={handleChange}>
                                        <option value=''>-- Select Account Group --</option>
                                        {accountGroups.map((g) => (
                                            <option key={g.AccId} value={g.AccId}>
                                                {g.AccName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3 align-items-center">
                                <label className="col-sm-4 col-form-label fw-bold">Name <span className='required'>*</span></label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Name here"
                                        name="LedgerName"
                                        value={formData.LedgerName}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>


                            <div className=" row mb-3 align-items-center">
                                <label className='col-sm-4 col-form-label fw-bold' >Add 1</label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control '
                                        type='text'
                                        placeholder='Enter Add here'
                                        name='Add1'
                                        value={formData.Add1}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>

                            </div>



                            <div className="row mb-3 align-items-center">
                                <label className="col-sm-4 col-form-label fw-bold">Add 2</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Add here"
                                        name="Add2"
                                        value={formData.Add2}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>



                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label fw-bold'>Place <span className='required'>*</span></label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter Place here'
                                        name='EPlace'
                                        value={formData.EPlace}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>

                            </div>

                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label fw-bold'>P.O Box #</label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter p.o box here'
                                        name='Pin'
                                        value={formData.Pin}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>

                            </div>

                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label fw-bold'>State <span className='required'>*</span></label>
                                <div className='col-sm-8'>
                                    <select className='form-select'
                                        name='State'
                                        value={formData.State}
                                        autoComplete="off"
                                        onChange={handleChange}>
                                        <option value=''>-- Select State --</option>
                                        {stateList.map((group) => (
                                            <option key={group.StateId} value={String(group.StateId)}>
                                                {group.StateName}
                                            </option>
                                        ))}

                                    </select>
                                </div>


                            </div>

                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label fw-bold'>Country</label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter Country here '
                                        name='Country'
                                        value={formData.Country}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>

                            </div>

                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label fw-bold'>TRN #</label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter Country here '
                                        name='TinNo'
                                        value={formData.TinNo}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>

                            </div>


                            <div className='row mb-3 '>
                                <div className='col-md-6 d-flex align-items-center mb-2'>
                                    <label className='me-2 fw-bold' style={{ width: '100px' }}>Mobile</label>

                                    <input
                                        className='form-control'
                                        type='number'
                                        placeholder='Enter Mobile no here '
                                        name='Mobile'
                                        value={formData.Mobile}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />


                                </div>

                                <div className='col-md-6 d-flex align-items-center mb-2'>

                                    <label className='me-2 fw-bold' style={{ width: '100px' }}>Phone</label>

                                    <input
                                        className='form-control'
                                        type='number'
                                        placeholder='Enter Phone no here '
                                        name='Phone'
                                        value={formData.Phone}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />


                                </div>
                            </div>



                            <div className='row mb-3 '>
                                <div className='col-md-6 d-flex align-items-center mb-2'>
                                    <label className='me-2 fw-bold' style={{ width: '100px' }}>Debit</label>

                                    <input
                                        className='form-control'
                                        type='number'
                                        placeholder='Enter Debit here '
                                        name='Debit'
                                        value={formData.Debit}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />


                                </div>

                                <div className='col-md-6 d-flex align-items-center mb-2'>

                                    <label className='me-2 fw-bold' style={{ width: '100px' }}>Credit</label>

                                    <input
                                        className='form-control'
                                        type='number'
                                        placeholder='Enter Credit here '
                                        name='Credit'
                                        value={formData.Credit}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />


                                </div>
                            </div>


                            <button
                                className='btn btn-success text-uppercase fw-bold btn-md '
                                onClick={editingIndex !== null ? handleUpdate : handleAdd}
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
                        <div className='col-md-8 mt-2 mt-md-0'>
                            <label className="form-label fw-bold">Search for LedgerName </label>

                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                                <input
                                    type="text"
                                    className="form-control w-100 w-md-50"
                                    placeholder="🔎 search ledgers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />

                                <h5
                                    className="w-100 w-md-auto text-md-end"
                                    style={{ color: '#6a1b9a' }}
                                >
                                    Showing {filteredLedgers.length} of {ledgers.length} Records
                                </h5>

                            </div>

                            {filteredLedgers.length === 0 ? (<p className='text-center text-muted'>No records found.</p>
                            ) : (
                                <div
                                    style={{
                                        maxHeight: "calc(100vh - 350px)",
                                        overflowY: "auto",
                                        overflowX: "auto",
                                    }}
                                >
                                    <table className="table table-bordered table-striped text-center align-middle">
                                        <thead className="table-light" style={{ position: "sticky", top: 0 }}>
                                            <tr>
                                                <th>Ledger Name</th>
                                                <th>Address 1</th>
                                                <th>Address 2</th>
                                                <th>State</th>
                                                <th>Account Type</th>
                                                <th>Debit</th>
                                                <th>Credit</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredLedgers.map((l) => (
                                                <tr key={l.LedgerId}>
                                                    <td className='text-start'>{highlightText(l.LedgerName, searchTerm)}</td>
                                                    <td className='text-start'>{highlightText(l.Add1, searchTerm)}</td>
                                                    <td className='text-start'>{highlightText(l.Add2, searchTerm)}</td>
                                                    <td className='text-start'>{highlightText(l.StateName, searchTerm)}</td>
                                                    <td className='text-start'>{highlightText(l.AccName, searchTerm)}</td>
                                                    <td className='text-end'>{highlightText(l.Debit?.toString(), searchTerm)}</td>
                                                    <td className='text-end'>{highlightText(l.Credit?.toString(), searchTerm)}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm me-2 fw-bold"
                                                            onClick={() => {
                                                                setledgerToEdit(l);
                                                                setshowEditModal(true);
                                                            }}
                                                        >
                                                            🖋️Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm fw-bold"
                                                            onClick={() => {
                                                                setledgerToDelete(l);
                                                                setshowDeleteModal(true);
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

                    {showPopup && (
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Ledger</h5>
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

                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>
                                            Are you sure you want to delete "{ledgerToDelete?.LedgerName}
                                            "?
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
                                            onClick={handleDelete}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Modal */}

                    {showEditModal && (
                        <div className='modal show d-block' tabIndex="-1">
                            <div className='modal-dialog'>
                                <div className='modal-content'>
                                    <div className='modal-header'>
                                        <h5 className='modal-title'>Confirm Edit</h5>
                                        <button
                                            type='button'
                                            className='btn-close'
                                            onClick={() => setshowEditModal(false)}
                                        >
                                        </button>
                                    </div>

                                    <div className='modal-body'>
                                        <p>
                                            Do you want to edit "<strong>{ledgerToEdit?.LedgerName}</strong>"?
                                        </p>
                                    </div>

                                    <div className='modal-footer'>
                                        <button
                                            className='btn btn-secondary'
                                            onClick={() => setshowEditModal(false)}
                                        >
                                            No
                                        </button>

                                        <button
                                            className='btn btn-primary'
                                            onClick={confirmEdit}
                                        >
                                            Yes
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {showMessage && (
                        <div
                            className="position-fixed top-0 start-50 translate-middle-x mt-3"
                            style={{ zIndex: 9999, minWidth: '300px' }}
                        >
                            <div
                                className="alert alert-success alert-dismissible fade show mb-0"
                                role="alert"
                            >
                                {message}
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowMessage(false)}
                                ></button>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    )
}
export default LedgerCreation;