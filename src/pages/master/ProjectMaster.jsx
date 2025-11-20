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
    const [add1 , setAdd1] = useState('');
    const [add2 , setAdd2] = useState('');
    const [state , setState] = useState('');
    const [country , setCountry] = useState('');
    const [pin , setPin] = useState('');
    const [mobile , setMobile] = useState('');

    const gapi = import.meta.env.VITE_API_URL;

    const API = `${gapi}/project`;

    useEffect(() => {
        console.log('main url : ' + gapi + '/project');
        // console.log(API);
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const res = await axios.get(API);

            console.log("AFTER ADD, projects:", res.data);

            setProjects(res.data);


        } catch (err) {
            console.error('Error fetching groups:', err);
            console.log("Server error:", err.response?.data);
            alert('Could not load groups. Check API connection.');
        }
    };

    const handleAdd = async () => {
        if (!projectName.trim()) {
            alert('Please enter group name');
            return;
        }

        const newProject = {
            ProjId: 0,
            ProjNo: Number(projectNo),
            ProjDate: date ? `${date}T00:00:00` : null,
            ProjName: projectName,
            LedgerId: Number(ledger),   // NOT LedgerName
            RefName: refPerson,
            Description: description,
            Add1: add1 || "",
            Add2: add2 || "",
            State: Number(state) || 0,
            Country: country || "",
            Pin: pin || "",
            Mobile: mobile || ""
        };
        console.log("DATA SENT TO API:", newProject);
        console.log("DATA SENT TO API:", {
            projectNo,
            date,
            projectName,
            ledger,
            refPerson,
            description
        });

        try {
            await axios.post(API, newProject, {
                headers: { 'Content-Type': 'application/json' },
            });

            await loadProjects();

            alert("Project Added Successfully!");

            setProjectName('');
            setProjectNo('');
            setProjectName('');
            setLedger('');
            setRefPerson('');
            setDescription('');
            setDate('');
            alert("Project added successfully!");
        } catch (err) {
            console.error('Add error:', err);
            alert("Failed to add project.");
        }
    }

    const handleEdit = (index) => {
        setFormData(projects[index])
        setEditingIndex(index)
    }




    const handleInsertOrUpdate = () => {
        if (!formData.projectName.trim()) {
            alert('please enter project name')
        }
        if (editingIndex !== null) {
            const updated = [...projects];
            updated[editingIndex] = formData;
            setProjects(updated);
            setEditingIndex(null);
        } else {
            setProjects([...projects, formData])
        }

        setFormData({
            projectNo: '',
            date: '',
            projectName: '',
            ledger: '',
            refPerson: '',
            description: '',
        });
    };




    const handleDelete = (index) => {
        const updated = projects.filter((_, i) => i !== index);
        setProjects(updated);
        if (editingIndex === index) {
            setEditingIndex(null);
            setFormData({
                projectNo: '',
                date: '',
                projectName: '',
                ledger: '',
                refPerson: '',
                description: '',
            })
        }
    }

    //Filtered list for search
    const filteredProject = Array.isArray(projects)
        ? projects.filter(
            (item) =>
                item?.projName &&
                item.projName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];


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

                            <div className='mb-3'>
                                <label className='form-label'>Ledger</label>
                                <input
                                    name='ledger'
                                    type='text'
                                    className='form-control'
                                    value={ledger}
                                    onChange={(e) => setLedger(e.target.value)}
                                />
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

                            {projects.length === 0 ? (<p className='text-center text-muted'>No records found.</p>
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
                                            {projects.map((item) => (
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
                                                            onClick={() => handleDelete(item)}
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
                </div>
            </div>
        </div>
    )
}

export default ProjectMaster;