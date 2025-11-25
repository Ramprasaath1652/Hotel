import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectMaster = () => {


    const [projectNo, setProjectNo] = useState('')
    const [date, setDate] = useState('')
    const [projectName, setProjectName] = useState('')
    const [ledger, setLedger] = useState('')
    const [refPerson, setRefPerson] = useState('')
    const [description, setDescription] = useState('')
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pin, setPin] = useState('');
    const [mobile, setMobile] = useState('');
    const [projectId, setProjectId] = useState('')

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');


    const [projectToEdit, setProjectToEdit] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [ledgerList, setLedgerList] = useState([]);
    const [ledgerQuery, setLedgerQuery] = useState("");
    const [showLedgerDropdown, setShowLedgerDropdown] = useState(false);

    const [forceOpen, setForceOpen] = useState(false);




    const gapi = import.meta.env.VITE_API_URL;

    const API = `${gapi}/project`;

    useEffect(() => {
        console.log('main url : ' + gapi + '/project');
        // console.log(API);
        loadProjects();
        loadLedger();
    }, []);


    const loadLedger = async () => {
        try {
            const res = await axios.get(`${gapi}/ledger`);
            setLedgerList(res.data);
        } catch (err) {
            console.error("Ledger Load Error:", err);
        }
    };




    const loadProjects = async () => {
        try {
            const res = await axios.get(API);
            console.log("LOAD PROJECTS RESPONSE:", res.data);
            setProjects(res.data);
        } catch (err) {
            console.error('Error fetching groups:', err);
            console.log("Server error:", err.response?.data);
            alert('Could not load groups. Check API connection.');
        }
    };

    const showTempMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    const handleAdd = async () => {
        if (!projectName.trim()) {
            alert('Please enter group name');
            return;
        }

        const newProject = {
            ProjId: 0,                          // ← IMPORTANT
            ProjNo: Number(projectNo),
            ProjDate: date && date.trim() !== "" ? `${date}T00:00:00` : "2025-01-01T00:00:00",
            ProjName: projectName,
            LedgerId: Number(ledger),
            RefName: refPerson,
            Description: description,
            Add1: add1,
            Add2: add2,
            State: state ? Number(state) : 0,
            Country: country,
            Pin: pin,
            Mobile: mobile,
        };
        console.log("DATA SENT TO API:", newProject);
        try {
            const result = await axios.post(API, newProject, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log("Result RESPONSE:", result.data);

            await loadProjects();

            alert("Project Added Successfully!");
            setProjectId('')
            setProjectName('');
            setProjectNo('');
            setLedger('');
            setRefPerson('');
            setDescription('');
            setDate('');
            setAdd1('');
            setAdd2('');
            setState('');
            setCountry('');
            setPin('');
            setMobile('');
            setLedger(null);
            setLedgerQuery('');
            setShowLedgerDropdown(false)

            alert("Project added successfully!");
        } catch (err) {
            console.error('Add error:', err);
            alert("Failed to add project.");
        }
    }


    const handleEdit = (project) => {
        console.log("EDIT OBJECT:", project);

        setProjectToEdit(project);



        setShowEditModal(true);   // 👈 MUST BE PRESENT
    }


    const confirmEdit = () => {
        if (!projectToEdit) return;

        // Set form into real edit mode
        setProjectId(projectToEdit.ProjId);

        setProjectName(projectToEdit.ProjName ?? '');
        setProjectNo(projectToEdit.ProjNo ?? '');
        setDate(projectToEdit.ProjDate ? projectToEdit.ProjDate.split("T")[0] : '');
        setLedger(projectToEdit.LedgerId ?? '');
        setRefPerson(projectToEdit.RefName ?? '');
        setDescription(projectToEdit.Description ?? '');
        setAdd1(projectToEdit.Add1 ?? '');
        setAdd2(projectToEdit.Add2 ?? '');
        setState(projectToEdit.State ?? '');
        setCountry(projectToEdit.Country ?? '');
        setPin(projectToEdit.Pin ?? '');
        setMobile(projectToEdit.Mobile ?? '');


        const index = projects.findIndex(p => p.ProjId === projectToEdit.ProjId);
        setEditingIndex(index);



        setShowEditModal(false);   // close modal


    };


    const resetForm = () => {
        setProjectName('');
        setProjectNo('');
        setProjectId('');
        setDate('');
        setLedger('');
        setRefPerson('');
        setDescription('');
        setAdd1('');
        setAdd2('');
        setState('');
        setCountry('');
        setPin('');
        setMobile('');
        setEditingIndex(null);
        setProjectToEdit(null);
    };




    // Update group
    const handleUpdate = async () => {
        if (!projectName.trim()) {
            alert('Please enter group name');
            return;
        }

        if (projectId === 0) {
            alert('Invalid group selected');
            return;
        }

        const updatedProject = {
            ProjId: projectId,
            ProjNo: projectNo,
            ProjDate: date,
            ProjName: projectName,
            LedgerId: ledger,   // NOT LedgerName
            RefName: refPerson,
            Description: description,
            Add1: add1,
            Add2: add2,
            State: state,
            Country: country,
            Pin: pin,
            Mobile: mobile,
        };

        try {
            await axios.put(`${API}/${projectId}`, updatedProject, {
                headers: { 'Content-Type': 'application/json' },
            });
            loadProjects();
            setProjectName('');
            setProjectId(0);
            setEditingIndex(null);
            showTempMessage('Project updated successfully!');

            resetForm();
        } catch (err) {
            console.error('Update error:', err);
        }
    };






    // Delete
    const handleDelete = async () => {
        if (!projectToDelete) return;

        try {
            await axios.delete(`${API}/${projectToDelete.ProjId}`);
            setShowDeleteModal(false);
            setProjectToDelete(null);
            loadProjects();
            showTempMessage('project deleted successfully!');
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setProjectToDelete(null);
    };

    //Filtered list for search
    const filteredProject = Array.isArray(projects)
        ? projects.filter(
            (item) =>
                item?.ProjName &&
                item.ProjName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const filteredLedger = ledgerList.filter(item =>
        item.LedgerName?.toLowerCase().includes(ledgerQuery.toLowerCase())
    );

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            setShowLedgerDropdown(true);
            setForceOpen(true);
        }
    }




    return (
        <div className='container-fluid mt-2'>
            <div className='card mx-auto shadow-lg'
                style={{
                    border: '2px solid #5d8aa8',
                    maxWidth: '95%'
                }}
            >
                <div
                    className='card-header text-white'
                    style={{
                        backgroundColor: '#5d8aa8',
                        padding: '20px'
                    }}
                >
                    <h4 className='mb-0'>Project Master</h4>

                </div>
                {/* Body */}
                <div className='card-body ' style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
                    <div className='row'>
                        {/* Left Form */}
                        <div className='col-md-4'>
                            <h4 className='mb-3'>
                                Add Project
                            </h4>

                            <div className='row mb-3'>
                                <div className='col-md-6'>
                                    <label className='form-label'>Project No</label>
                                    <input
                                        name='projectNo'
                                        type='text'
                                        className='form-control'
                                        value={projectNo}
                                        onChange={(e) => setProjectNo(e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>

                                <div className='col-md-6'>
                                    <label className='form-label'>Date</label>
                                    <input
                                        name='date'
                                        type='date'
                                        className='form-control'
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>Project Name</label>
                                <input
                                    name='projectName'
                                    type='text'
                                    className='form-control'
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>

                            <div className='mb-3 position-relative'>
                                <label className='form-label'>Ledger</label>

                                {/* Input Box */}
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Ledger..."
                                    value={ledgerQuery}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setLedgerQuery(value);

                                        if (value.trim() === '') {
                                            setShowLedgerDropdown(false);
                                        } else {
                                            setShowLedgerDropdown(true);
                                        }
                                    }}
                                    onFocus={() => {
                                        if (ledgerQuery.trim() !== '') setShowLedgerDropdown(true);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setShowLedgerDropdown(false);
                                        }, 150);
                                    }}

                                />

                                {/* Dropdown */}
                                {showLedgerDropdown && filteredLedger.length > 0 && (
                                    <div
                                        className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                        style={{ maxHeight: "250px", overflowY: "auto", zIndex: 9999 }}
                                    >
                                        {/* Header */}
                                        <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                            <div className="col-5">Name</div>
                                            <div className="col-3">Place</div>
                                            <div className="col-4">State</div>
                                        </div>

                                        {/* List Items */}
                                        {filteredLedger.map((item) => (
                                            <div
                                                key={item.LedgerId}
                                                className="d-flex px-2 py-2 border-bottom hover-bg"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setLedger(item.LedgerId);           // Save ID
                                                    setLedgerQuery(item.LedgerName);    // Show selected name
                                                    setShowLedgerDropdown(false);
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.classList.add("bg-light")}
                                                onMouseLeave={(e) => e.currentTarget.classList.remove("bg-light")}
                                            >
                                                <div className="col-5">{item.LedgerName}</div>
                                                <div className="col-3">{item.EPlace || "-"}</div>
                                                <div className="col-4">{item.StateName || "-"}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Ref Person</label>
                                <input
                                    type='text'
                                    name='refPerson'
                                    className='form-control'
                                    value={refPerson}
                                    onChange={(e) => setRefPerson(e.target.value)}
                                />

                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>Description</label>
                                <textarea
                                    type='text'
                                    name='description'
                                    rows='3'
                                    className='form-control'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                            </div>
                            <button
                                className='btn btn-primary btn-sm'
                                onClick={editingIndex !== null ? handleUpdate : handleAdd}
                            >
                                {editingIndex !== null ? 'Update' : 'Insert'}
                            </button>
                        </div>
                        {/* Right - Table */}
                        <div className='col-md-8'>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <h5>Project Master</h5>
                                <input
                                    type='text'
                                    className='form-control w-50'
                                    placeholder='search ledgers...'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {filteredProject.length === 0 ? (<p className='text-center text-muted'>No records found.</p>
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
                                                <th>Proj No</th>
                                                <th>Proj Name</th>
                                                <th>Ledger</th>
                                                <th>Ref Name</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProject.map((item) => (
                                                <tr key={item.ProjId}>
                                                    <td>{item.ProjNo}</td>
                                                    <td>{item.ProjName}</td>
                                                    <td>{item.LedgerName}</td>
                                                    <td>{item.RefName}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm me-2"
                                                            onClick={() => handleEdit(item)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => {
                                                                setProjectToDelete(item);
                                                                setShowDeleteModal(true);
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


                    {/* Success Message */}
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
                                            {projectToDelete?.projectName}"?
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
                                        <p>Are you sure you want to edit "{projectToEdit?.projectName}"?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setShowEditModal(false)}
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
            </div>
        </div>
    )
}

export default ProjectMaster;