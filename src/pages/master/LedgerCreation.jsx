import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



const LedgerCreation = () => {

    const [formData, setFormData] = useState({
        accountGroups: '',
        ledgerName: '',
        tname: '',
        add1: '',
        add2: '',
        tplace: '',
        eplace: '',
        district: '',
        pin: '',
        phone: '',
        mobile: '',
        state: '',
        country: '',
        mobile: '',
        phone: '',
        tinno: '',
        debit: '',
        credit: '',
        categoryid: '',
        state: '',
        tinstatus: '',
        localagent: '',
        otherstate: '',
        gstinno: '',
        otherno: '',
        country: '',
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
            const res = await axios.get(API);
            console.log(res.data)
            setLedgers(res.data);

        } catch (err) {
            console.error('Error fetching groups:', err);
            alert('Could not load groups. Check API connection.');
        }
    };

    const loadAccountGroups = async () => {
        try {
            const res = await axios.get(`${gapi}/accountgroups`);
            console.log("Account Groups:", res.data);
            setAccountGroups(res.data);
        } catch (err) {
            console.error("Error fetching account groups:", err);
            alert("Could not load account groups. Check API connection.");
        }
    };

    const loadStates = async () => {
        try {
            const res = await axios.get(`${gapi}/statemasters`);
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
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    //Add
    const handleAdd = async () => {
        if (!formData.ledgerName.trim()) {
            alert('please enter ledger Name');
            return;
        }

        const newLedger = {
            LedgerId: 0,
            AccId: formData.accountGroups,
            LedgerName: formData.ledgerName,
            TName: formData.tname,
            Add1: formData.add1,
            Add2: formData.add2,
            TPlace: formData.tplace,
            EPlace: formData.eplace,
            District: formData.district,
            Pin: formData.pin,
            Phone: formData.phone,
            Mobile: formData.mobile,
            TinNo: formData.tinno,
            Debit: formData.debit,
            Credit: formData.credit,
            CategoryId: formData.categoryid,
            State: formData.state,
            TinStatus: formData.tinstatus,
            LocalAgent: formData.localagent,
            OtherState: formData.otherstate,
            GSTinNo: formData.gstinno,
            OtherNo: formData.otherno,
            Country: formData.country,
        }
        try {
            await axios.post(API, newLedger, {
                headers: { 'Content-Type': 'application/json' },
            })

            console.log("✅ Ledger added successfully:", newLedger);
            alert("Ledger added successfully!");

            await loadLedgers();
            setFormData({
                accountGroups: '',
                ledgerName: '',
                tname: '',
                add1: '',
                add2: '',
                tplace: '',
                eplace: '',
                district: '',
                pin: '',
                phone: '',
                mobile: '',
                state: '',
                country: '',
                mobile: '',
                phone: '',
                tinno: '',
                debit: '',
                credit: '',
                categoryid: '',
                state: '',
                tinstatus: '',
                localagent: '',
                otherstate: '',
                gstinno: '',
                otherno: '',
                country: '',
            })

        } catch (err) {
            console.error('Add error:', err);
            alert("Failed to add ledger. Please check API connection.")
        }

    }

    // update
    const handleUpdate = async () => {
        if (!formData.ledgerName.trim()) {
            alert('Please enter Ledger Name');
            return;
        }

        if (!ledgerToEdit?.LedgerId) {
            alert('Invalid ledger selected for update.');
            return;
        }

        const updatedLedger = {
            LedgerId: ledgerToEdit.LedgerId,
            AccId: formData.accountGroups,
            LedgerName: formData.ledgerName,
            TName: formData.tname,
            Add1: formData.add1,
            Add2: formData.add2,
            TPlace: formData.tplace,
            EPlace: formData.eplace,
            District: formData.district,
            Pin: formData.pin,
            Phone: formData.phone,
            Mobile: formData.mobile,
            TinNo: formData.tinno,
            Debit: formData.debit,
            Credit: formData.credit,
            CategoryId: formData.categoryid,
            State: formData.state,
            TinStatus: formData.tinstatus,
            LocalAgent: formData.localagent,
            OtherState: formData.otherstate,
            GSTinNo: formData.gstinno,
            OtherNo: formData.otherno,
            Country: formData.country,

        };

        try {
            await axios.put(`${API}/${updatedLedger.LedgerId}`, updatedLedger, {
                headers: { 'Content-type': 'application/json' }
            })

            console.log("✅ Ledger updated successfully:", updatedLedger);
            alert("Ledger updated successfully!");

            await loadLedgers();
            setFormData({
                accountGroups: '',
                ledgerName: '',
                tname: '',
                add1: '',
                add2: '',
                tplace: '',
                eplace: '',
                district: '',
                pin: '',
                phone: '',
                mobile: '',
                state: '',
                country: '',
                mobile: '',
                phone: '',
                tinno: '',
                debit: '',
                credit: '',
                categoryid: '',
                state: '',
                tinstatus: '',
                localagent: '',
                otherstate: '',
                gstinno: '',
                otherno: '',
                country: '',
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
            accountGroups: ledgerToEdit.AccId ? String(ledgerToEdit.AccId) : '',
            ledgerName: ledgerToEdit.LedgerName || "",
            tname: ledgerToEdit.TName || "",
            add1: ledgerToEdit.Add1 || "",
            add2: ledgerToEdit.Add2 || "",
            tplace: ledgerToEdit.TPlace || "",
            eplace: ledgerToEdit.EPlace || "",
            district: ledgerToEdit.District || "",
            pin: ledgerToEdit.Pin || "",
            phone: ledgerToEdit.Phone || "",
            mobile: ledgerToEdit.Mobile || "",
            tinno: ledgerToEdit.TinNo || "",
            debit: ledgerToEdit.Debit || "",
            credit: ledgerToEdit.Credit || "",
            categoryid: ledgerToEdit.CategoryId || "",
            state: ledgerToEdit.State ? String(ledgerToEdit.State) : '',
            tinstatus: ledgerToEdit.TinStatus || "",
            localagent: ledgerToEdit.LocalAgent || "",
            otherstate: ledgerToEdit.OtherState || "",
            gstinno: ledgerToEdit.GSTinNo || "",
            otherno: ledgerToEdit.OtherNo || "",
            country: ledgerToEdit.Country || "",
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
            await axios.delete(`${API}/${ledgerToDelete.LedgerId}`)
            await loadLedgers();
            setshowDeleteModal(false);
            setledgerToDelete(null);
            console.log(`Ledger "${ledgerToDelete.ledgerName}" deleted successfully.`);
        }
        catch (err) {
            console.error("Error deleting ledger:", err);
            alert('Failed to delete ledger. Please check the API connection or ID.')
        }
    }


    //Filter List for search
    const filteredLedgers = Array.isArray(ledgers)
        ? ledgers.filter((item) => {
            const ledgerName = item?.LedgerName?.toLowerCase() || '';
            const search = searchTerm?.toLowerCase() || '';
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
                                        name="accountGroups"
                                        value={formData.accountGroups}
                                        onChange={handleChange}
                                    >
                                        <option value=''>-- Select Account Group --</option>
                                        {accountGroups.map((group) => (
                                            <option key={group.AccId} value={String(group.AccId)}>
                                                {group.AccName}
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
                                        name="ledgerName"
                                        value={formData.ledgerName}
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
                                        name='add1'
                                        value={formData.add1}
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
                                        name="add2"
                                        value={formData.add2}
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
                                        name='eplace'
                                        value={formData.eplace}
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
                                        name='pin'
                                        value={formData.pin}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className="mb-3 row align-items-center">
                                <label className='col-sm-4 col-form-label'>State</label>
                                <div className='col-sm-8'>
                                    <select className='form-select'
                                        name='state'
                                        value={formData.state}
                                        onChange={handleChange}>
                                        <option>-- Select State --</option>
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
                                        name='country'
                                        value={formData.country}
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
                                        name='mobile'
                                        value={formData.mobile}
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
                                        name='tnr'
                                        value={formData.tinno}
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
                                        name='debit'
                                        value={formData.debit}
                                        onChange={handleChange}
                                    />


                                </div>

                                <div className='col-md-6 d-flex align-items-center mb-2'>

                                    <label className='me-2' style={{ width: '100px' }}>Credit</label>

                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter Credit here '
                                        name='credit'
                                        value={formData.credit}
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
                                            {filteredLedgers.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.LedgerName}</td>
                                                    <td>{item.Add1}</td>
                                                    <td>{item.Add2}</td>
                                                    <td>{item.state}</td>
                                                    <td>{item.accountGroups}</td>
                                                    <td>{item.Debit}</td>
                                                    <td>{item.Credit}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm me-2"
                                                            onClick={() => {
                                                                setledgerToEdit(item);
                                                                setshowEditModal(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => {
                                                                setledgerToDelete(item);
                                                                setshowDeleteModal(true);
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
                                            Are you sure you want to delete "{ledgerToDelete?.ledgerName}
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
                                            Do you want to edit "<strong>{ledgerToEdit?.ledgerName}</strong>"?
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

                </div>
            </div>
        </div>
    )
}
export default LedgerCreation;