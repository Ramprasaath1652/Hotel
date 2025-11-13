import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectMaster = () => {
    const [formData, setFormData] = useState({
        projectNo: '',
        date: '',
        projectName: '',
        ledger: '',
        refPerson: '',
        description: '',
    });


    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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

    const handleEdit = (index) => {
        setFormData(projects[index])
        setEditingIndex(index)
    }

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
        ? projects.filter((item) =>
            item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
        ) : [];

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
                                        value={formData.projectNo}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='col-md-6'>
                                    <label className='form-label'>Date</label>
                                    <input
                                        name='date'
                                        type='date'
                                        className='form-control'
                                        value={formData.date}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>Project Name</label>
                                <input
                                    name='projectName'
                                    type='text'
                                    className='form-control'
                                    value={formData.projectName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>Ledger</label>
                                <input
                                    name='ledger'
                                    type='text'
                                    className='form-control'
                                    value={formData.ledger}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>Ref Person</label>
                                <input
                                    type='text'
                                    name='refPerson'
                                    className='form-control'
                                    value={formData.refPerson}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>Description</label>
                                <textarea
                                    type='text'
                                    name='description'
                                    rows='3'
                                    className='form-control'
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>
                            <button
                                className='btn btn-primary btn-sm'
                                onClick={handleInsertOrUpdate}
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
                                            {filteredProject.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.projectNo}</td>
                                                    <td>{item.projectName}</td>
                                                    <td>{item.ledger}</td>
                                                    <td>{item.refPerson}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm me-2"
                                                            onClick={() => handleEdit(index)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDelete(index)}
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