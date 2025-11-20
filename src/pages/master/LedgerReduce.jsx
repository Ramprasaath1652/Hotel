import React, { useReducer, useEffect } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const initialState = {
    formData: {
        AccId: '',
        LedgerName: '',
        LedgerId: '',
        TName: '',
        Add1: "",
        Add2: "",
        TPlace: "",
        EPlace: "",
        District: "",
        Pin: "",
        Phone: "",
        Mobile: "",
        TinNo: "",
        Debit: "",
        Credit: "",
        CategoryId: "",
        State: "",
        TinStatus: "",
        LocalAgent: "",
        OtherState: "",
        GSTinNo: "",
        OtherNo: "",
        Country: "",
    },

    ledgers: [],
    stateList: [],
    searchTerm: '',
    editingIndex: null,
    accountGroups: [],

    showDeleteModal: false,
    ledgerToDelete: null,

    showEditModal: false,
    ledgerToEdit: null,
}

function reducer(state, action) {
    switch (action.type) {
        case "SET_FORM_FIELD":
            return {
                ...state,
                formData: { ...state.formData, [action.field]: action.value },
            };

        case "SET_FORM_DATA":
            return { ...state, formData: { ...action.payload } };

        case "RESET_FORM":
            return { ...state, formData: { ...initialState.formData } };

        case "SET_LEDGERS":
            return { ...state, ledgers: action.payload };

        case "SET_ACCOUNT_GROUPS":
            return { ...state, accountGroups: action.payload };

        case "SET_STATES":
            return { ...state, stateList: action.payload };

        case "SET_SEARCH_TERM":
            return { ...state, searchTerm: action.payload };

        case "SET_EDIT_INDEX":
            return { ...state, editingIndex: action.payload };

        case "SHOW_DELETE_MODAL":
            return { ...state, showDeleteModal: true, ledgerToDelete: action.payload };

        case "HIDE_DELETE_MODAL":
            return { ...state, showDeleteModal: false, ledgerToDelete: null };

        case "SHOW_EDIT_MODAL":
            return { ...state, showEditModal: true, ledgerToEdit: action.payload };

        case "HIDE_EDIT_MODAL":
            return { ...state, showEditModal: false, ledgerToEdit: null };

        default:
            return state;
    }
}


const LedgerReduce = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        formData,
        ledgers,
        stateList,
        searchTerm,
        editingIndex,
        accountGroups,
        showDeleteModal,
        ledgerToDelete,
        showEditModal,
        ledgerToEdit,
    } = state;

    const gapi = import.meta.env.VITE_API_URL;
    const API = `${gapi}/ledger`;

    useEffect(()=>{
        loadLedgers();
        loadAccountGroups();
        loadStates();
    },[])

    const loadLedgers = async() =>{
        try{
            const res = await axios.get(`${gapi}/ledger`);
             console.log('main url : ' + gapi + '/ledger');
            dispatch({type: 'SET_LEDGERS',payload: res.data})
        } catch (err){
            alert("Could not load account groups.")
        }
    }

    
    const loadAccountGroups = async () => {
        try {
            const res = await axios.get(`${gapi}/accountgroups`);
            dispatch({ type: "SET_ACCOUNT_GROUPS", payload: res.data });
        } catch (err) {
            alert("Could not load account groups.");
        }
    };

     const loadStates = async () => {
        try {
            const res = await axios.get(`${gapi}/statemasters`);
            dispatch({ type: "SET_STATES", payload: res.data });
        } catch (err) {
            alert("Could not load state master.");
        }
    };

    
    const cancelDelete = () => {
        dispatch({ type: "HIDE_DELETE_MODAL" });
    };

    const handleChange = (e) => {
        dispatch({
            type: "SET_FORM_FIELD",
            field: e.target.name,
            value: e.target.value,
        });
    };

        const handleAdd = async () => {
        if (!formData.LedgerName.trim()) {
            alert("please enter ledger Name");
            return;
        }

        const newLedger = {
            LedgerId: 0,
            AccId: Number(formData.AccId) || 0,
            LedgerName: formData.LedgerName?.trim() || "",
            TName: formData.LedgerName?.trim() || "",
            Add1: formData.Add1?.trim() || "",
            Add2: formData.Add2?.trim() || "",
            TPlace: formData.EPlace?.trim() || "",
            EPlace: formData.EPlace?.trim() || "",
            District: formData.District?.trim() || "",
            Pin: formData.Pin?.trim() || "",
            Phone: formData.Phone?.trim() || "",
            Mobile: formData.Mobile?.trim() || "",
            TinNo: formData.TinNo?.trim() || "",
            Debit: !isNaN(parseFloat(formData.Debit))
                ? parseFloat(formData.Debit)
                : 0,
            Credit: !isNaN(parseFloat(formData.Credit))
                ? parseFloat(formData.Credit)
                : 0,
            CategoryId: Number(formData.CategoryId) || 1,
            State: Number(formData.State) || 0,
            TinStatus: formData.TinStatus?.trim() || "No",
            LocalAgent: formData.LocalAgent?.trim() || "No",
            OtherState: formData.OtherState?.trim() || "No",
            GSTinNo: formData.TinNo?.trim() || "",
            OtherNo: formData.OtherNo?.trim() || "",
            Country: formData.Country?.trim() || "",
        };

        try {
            await axios.post(API, newLedger);
            alert("Ledger added successfully!");
            loadLedgers();
            dispatch({ type: "RESET_FORM" });
        } catch (err) {
            alert("Failed to add ledger.");
        }
    };

        const handleUpdate = async () => {
        if (!formData.LedgerName.trim()) {
            alert("Please enter Ledger Name");
            return;
        }

        if (!ledgerToEdit) {
            alert("Invalid ledger selected for update.");
            return;
        }

        const updatedLedger = {
            ...formData,
            Debit: parseFloat(formData.Debit) || 0,
            Credit: parseFloat(formData.Credit) || 0,
            CategoryId: Number(formData.CategoryId) || 1,
            State: Number(formData.State) || 0,
            GSTinNo: formData.TinNo || "",
        };

        try {
            await axios.put(`${API}/${updatedLedger.LedgerId}`, updatedLedger);
            alert("Ledger updated successfully!");

            await loadLedgers();
            dispatch({ type: "RESET_FORM" });
            dispatch({ type: "SET_EDIT_INDEX", payload: null });

        } catch (err) {
            alert("Failed to update ledger.");
        }
    };


        const confirmEdit = () => {
        if (!ledgerToEdit) return;

        dispatch({
            type: "SET_FORM_DATA",
            payload: {
                LedgerId: ledgerToEdit.LedgerId,
                AccId: ledgerToEdit.AccId ? ledgerToEdit.AccId : "",
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
                State: ledgerToEdit.State || "",
                TinStatus: ledgerToEdit.TinStatus || "",
                LocalAgent: ledgerToEdit.LocalAgent || "",
                OtherState: ledgerToEdit.OtherState || "",
                GSTinNo: ledgerToEdit.GSTinNo || "",
                OtherNo: ledgerToEdit.OtherNo || "",
                Country: ledgerToEdit.Country || "",
            },
        });

        const index = ledgers.findIndex(
            (l) => l.LedgerId === ledgerToEdit.LedgerId
        );

        dispatch({ type: "SET_EDIT_INDEX", payload: index });
        dispatch({ type: "HIDE_EDIT_MODAL" });
    };


    const handleDelete = async () => {
        if (!ledgerToDelete) return;

        try {
            await axios.delete(`${API}/${ledgerToDelete.LedgerId}`);
            await loadLedgers();
            dispatch({ type: "HIDE_DELETE_MODAL" });
        } catch (err) {
            alert("Failed to delete ledger.");
        }
    };

     const filteredLedgers = Array.isArray(ledgers)
        ? ledgers.filter((item) => {
              const ledgerName = item?.LedgerName?.toLowerCase() || "";
              const search = searchTerm?.toLowerCase() || "";
              return ledgerName.includes(search);
          })
        : [];

    return (
        <div className='container-fluid mt-2'>
            <div className='card shadow-lg mx-auto'
                style={{
                    border: '2px solid #5d8aa8',
                    maxWidth: '95%'
                }}
            >
                <div className='card-header text-white'
                    style={{
                        backgroundColor: '#5d8aa8',
                        padding: '20px'
                    }}
                >
                    <h4 className='mb-0'>Ledger Master</h4>
                </div>
                {/* Body */}
                <div className='card-body' style={{ height: 'calc(100vh - 200px', overflow: 'auto' }}>
                    <div className='row'>
                        {/* Left Form */}
                        <div className='col-md-4'>
                            <h4 className='mb-3 '>
                                {editingIndex !== null ? 'Edit Ledger' : 'Add Ledger'}
                            </h4>
                            <div className="row mb-3 align-items-center">
                                <label className="col-sm-4 col-form-label">Account Group</label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-select"
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
                                <label className="col-sm-4 col-form-label">Name</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Name here"
                                        name="LedgerName"
                                        value={formData.LedgerName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>


                            <div className=" row mb-3 align-items-center">
                                <label className='col-sm-4 col-form-label' >Add 1</label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control '
                                        type='text'
                                        placeholder='Enter Add here'
                                        name='Add1'
                                        value={formData.Add1}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>



                            <div className="row mb-3 align-items-center">
                                <label className="col-sm-4 col-form-label">Add 2</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Add here"
                                        name="Add2"
                                        value={formData.Add2}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>



                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label'>Place</label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter Place here'
                                        name='EPlace'
                                        value={formData.EPlace}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label'>P.O Box #</label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter p.o box here'
                                        name='Pin'
                                        value={formData.Pin}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label'>State</label>
                                <div className='col-sm-8'>
                                    <select className='form-select'
                                        name='State'
                                        value={formData.State}
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
                                <label className='col-sm-4 col-form-label'>Country</label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter Country here '
                                        name='Country'
                                        value={formData.Country}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label'>Mobile.No</label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter Country here '
                                        name='Mobile'
                                        value={formData.Mobile}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label'>TNR #</label>
                                <div className='col-sm-8'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter Country here '
                                        name='TinNo'
                                        value={formData.TinNo}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>


                            <div className='row mb-3 '>
                                <div className='col-md-6 d-flex align-items-center mb-2'>
                                    <label className='me-2' style={{ width: '100px' }}>Debit</label>

                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter Debit here '
                                        name='Debit'
                                        value={formData.Debit}
                                        onChange={handleChange}
                                    />


                                </div>

                                <div className='col-md-6 d-flex align-items-center mb-2'>

                                    <label className='me-2' style={{ width: '100px' }}>Credit</label>

                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter Credit here '
                                        name='Credit'
                                        value={formData.Credit}
                                        onChange={handleChange}
                                    />


                                </div>
                            </div>

                            <div className='d-flex flex-wrap gap-2 mt-2'>
                                <button
                                    className='btn btn-primary btn-sm'
                                    onClick={editingIndex !== null ? handleUpdate : handleAdd}
                                >
                                    {editingIndex !== null ? 'Update' : 'Insert'}
                                </button>
                            </div>
                        </div>

                        {/* Right - Table */}
                        <div className='col-md-8'>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <h5>Ledger List</h5>
                                <input
                                    type='text'
                                    className='form-control w-50'
                                    placeholder='search ledgers...'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />

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
                                                    <td>{l.LedgerName}</td>
                                                    <td>{l.Add1}</td>
                                                    <td>{l.Add2}</td>
                                                    <td>{l.StateName}</td>
                                                    <td>{l.AccName}</td>
                                                    <td>{l.Debit}</td>
                                                    <td>{l.Credit}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm me-2"
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: 'SHOW_EDIT_MODAL',
                                                                    payload: l,
                                                                })
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: 'SHOW_DELETE_MODAL',
                                                                    payload: l,
                                                                })              
                                                            }}
                                                        >
                                                            Delete
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
                                            onClick={() => dispatch({type: "HIDE_EDIT_MODAL"})}
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
                                            onClick={() =>{
                                                dispatch({
                                                    type: 'HIDE_EDIT_MODAL'
                                                })
                                            }}
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

                </div>
            </div>
        </div>
    )
}

export default LedgerReduce;