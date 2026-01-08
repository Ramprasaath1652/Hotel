import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'



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
    const [activeLedgerIndex, setActiveLedgerIndex] = useState(-1);


    const [forceOpen, setForceOpen] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const [showLedgerModal, setShowLedgerModal] = useState(false);
    const [ledgerName, setLedgerName] = useState('');
    const [ledgerPlace, setLedgerPlace] = useState('');
    const [ledgerGroup, setLedgerGroup] = useState('');
    const [ledgerState, setLedgerState] = useState('');
    const [accountGroups, setAccountGroups] = useState([]);
    const [statesList, setStatesList] = useState([]);

    const [showUpdateModal, setShowUpdateModal] = useState(false);






    const gapi = import.meta.env.VITE_API_URL;

    const API = `${gapi}/project`;

    useEffect(() => {
        // console.log('main url : ' + gapi + '/project');
        // console.log(API);
        loadProjects();
        loadLedger();
    }, []);

    useEffect(() => {
        axios.get(`${gapi}/accountgroups`).then(res => setAccountGroups(res.data));
        axios.get(`${gapi}/statemasters`).then(res => setStatesList(res.data));
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
            // console.log("LOAD PROJECTS RESPONSE:", res.data);
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
        if (!projectNo.trim()) {
            setShowPopup(true);
            setPopupMessage('Project No must be filled')
            return;
        }

        if (!projectName.trim()) {
            setShowPopup(true);
            setPopupMessage('Project Name must be filled')
            return;
        }

        if (!ledger) {
            setShowPopup(true);
            setPopupMessage('Ledger  must be filled')
            return;
        }

        const newProject = {
            ProjId: 0,
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
        // console.log("DATA SENT TO API:", newProject);
        try {
            const result = await axios.post(API, newProject, {
                headers: { 'Content-Type': 'application/json' },
            });

            // console.log("Result RESPONSE:", result.data);

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
            setShowUpdateModal(false);
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
    // const filteredProject = Array.isArray(projects)
    //     ? projects.filter(
    //         (item) =>
    //             item?.ProjName &&
    //             item.ProjName.toLowerCase().includes(searchTerm.toLowerCase())
    //     )
    //     : [];

    const filteredLedger = Array.isArray(ledgerList)
        ? ledgerList.filter(item => {
            const query = ledgerQuery.toLowerCase();

            const name = item?.LedgerName?.toLowerCase() || '';
            const place = item?.EPlace?.toLowerCase() || '';
            const state = item?.StateName?.toLowerCase() || '';

            return (
                name.includes(query) ||
                place.includes(query) ||
                state.includes(query)
            );
        })
        : [];

    const filteredProject = projects.filter(item => {
        const q = searchTerm.toLowerCase();

        return (
            item?.ProjNo?.toString().toLowerCase().includes(q) ||
            item?.ProjName?.toLowerCase().includes(q) ||
            item?.LedgerName?.toLowerCase().includes(q) ||
            item?.RefName?.toLowerCase().includes(q)
        );
    });



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
                setLedger(selected.LedgerId);
                setLedgerQuery(selected.LedgerName);
                setShowLedgerDropdown(false);
                setActiveLedgerIndex(-1);
            }
        }
    };

    const handleAddLedger = async () => {
        if (!ledgerName.trim() || !ledgerGroup || !ledgerState) {
            alert("Please fill required fields!");
            return;
        }

        try {
            const res = await axios.post(
                `${gapi}/ledger`,
                {
                    LedgerId: 0,
                    CategoryId: 1,
                    LedgerName: ledgerName.trim(),
                    AccId: ledgerGroup,      // ✅ backend match
                    State: ledgerState,      // ✅ backend match
                    EPlace: ledgerPlace || ""
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            console.log("LEDGER RES 👉", res.data);

            // 🔥 SUCCESS CONDITION (THIS IS THE FIX)
            if (res.data?.LedgerId) {

                const newLedger = {

                    LedgerId: res.data.LedgerId,
                    LedgerName: res.data.LedgerName,
                    EPlace: res.data.EPlace || "-",
                    StateName:
                        statesList.find(s => s.StateId == res.data.State)?.StateName || "-"
                };

                // 🔥 instant dropdown update
                setLedgerList(prev => [...prev, newLedger]);

                // 🔥 auto select
                setLedger(newLedger.LedgerId);
                setLedgerQuery(newLedger.LedgerName);

                // 🔥 reset + close
                setLedgerName("");
                setLedgerGroup("");
                setLedgerState("");
                setLedgerPlace("");
                setLedgerQuery("");
                setShowLedgerModal(false);
                setShowLedgerDropdown(false);


                showTempMessage("Ledger added successfully ✅");
            } else {
                showTempMessage("Ledger save failed ❌");
            }

        } catch (err) {
            console.error("Add Ledger Error", err);
            showTempMessage("Failed to add ledger ❌");
        }
    };

    const highlightText = (text, search) => {
        if (!search || !text) return text;

        const regex = new RegExp(`(${search})`, 'ig');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
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
                    <h4 className='mb-0'><FontAwesomeIcon icon={faBriefcase} className="me-2" />Project Master</h4>

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
                                    <label className='form-label'>Project No <span className='required'>*</span></label>
                                    <input
                                        name='projectNo'
                                        type='number'
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
                                <label className='form-label'>Project Name <span className='required'>*</span></label>
                                <input
                                    name='projectName'
                                    type='text'
                                    className='form-control'
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>

                            <div className='mb-3 position-relative'>
                                <label className='form-label'>
                                    Ledger <span className='required'>*</span>
                                </label>
                                <label className='form-label'>{ledger}</label>

                                {/* <label className='form-label'>{ledger}</label> */}


                                {/* Input Box */}
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Ledger..."
                                    value={ledgerQuery}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setLedgerQuery(value);
                                        setShowLedgerDropdown(value.trim() !== "");
                                        setActiveLedgerIndex(-1);
                                    }}
                                    onFocus={() => {
                                        if (ledgerQuery.trim() !== '') setShowLedgerDropdown(true);
                                    }}
                                    onKeyDown={handleLedgerKeyDown}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setShowLedgerDropdown(false);
                                        }, 150);
                                    }}
                                />

                                {/* Dropdown */}
                                {showLedgerDropdown && (
                                    <div
                                        className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
                                        style={{
                                            maxHeight: "250px", overflowY: "auto", zIndex: 9999, pointerEvents: "auto", position: "absolute"
                                        }}
                                    >
                                        {/* Header */}
                                        {filteredLedger.length > 0 ? (
                                            <>
                                                {/* Header */}
                                                <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                                    <div className="col-5">Name</div>
                                                    <div className="col-3">Place</div>
                                                    <div className="col-4">State</div>
                                                </div>

                                                {/* List */}
                                                {filteredLedger.map((item, index) => (
                                                    <div
                                                        key={item.LedgerId}
                                                        className={`d-flex px-2 py-2 border-bottom ${index === activeLedgerIndex
                                                            ? "bg-secondary text-white"
                                                            : ""
                                                            }`}
                                                        style={{ cursor: "pointer" }}
                                                        onMouseEnter={() => setActiveLedgerIndex(index)}
                                                        onMouseDown={(e) => {
                                                            console.log("CLICK FIRED", item.LedgerName);
                                                            e.preventDefault();
                                                            setLedger(item.LedgerId);
                                                            setLedgerQuery(item.LedgerName);
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
                                onClick={() => {
                                    if (editingIndex !== null) {
                                        setShowUpdateModal(true);   // ✅ open update confirm modal
                                    } else {
                                        handleAdd();
                                    }
                                }}
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
                                    placeholder='🔎 search ledgers...'
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
                                                    <td>{highlightText(item.ProjNo?.toString(), searchTerm)}</td>
                                                    <td>{highlightText(item.ProjName, searchTerm)}</td>
                                                    <td>{highlightText(item.LedgerName, searchTerm)}</td>
                                                    <td>{highlightText(item.RefName, searchTerm)}</td>
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

                    {showPopup && (
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Project</h5>
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

                    {showLedgerModal && (
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header" style={{ backgroundColor: '#5d8aa8' }}>
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
                                            <strong>{projectName}</strong>"?
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
        </div>
    )
}

export default ProjectMaster;