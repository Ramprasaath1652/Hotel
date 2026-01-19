import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons';



const UserType = () => {
    return (
        <div className='container-fluid mt-2'>
            <div
                className='card mx-auto shadow-lg'
                style={{
                    border: '2px solid #6a1b9a',
                    maxWidth: '95%'
                }}
            >
                {/* Header */}
                <div className='card-header'
                    style={{
                        color: '#6a1b9a',
                        padding: '20px',
                        backgroundColor: 'white'
                    }}
                >
                    <h4 ><FontAwesomeIcon icon={faRulerCombined} className="me-2" />User Type</h4>
                </div>
                {/* Body */}
                <div
                    className='card-body'
                    style={{ height: 'calc(100vh - 250px)', overflow: 'auto' }}
                >
                    <div className="row position-relative">

                        {/* LEFT SIDE */}
                        <div className="col-md-6 pe-4">
                            <div className="mb-2">
                                <label className="form-label fw-bold">
                                    User Type <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter User Type...(ex: Admin, Manager, Cashier, etc..)"
                                />
                            </div>

                            <div className="mt-3">
                                <button className="btn btn-primary me-2 fw-bold">
                                    💾 Save
                                </button>
                                <button className="btn btn-danger fw-bold">
                                    🔄 Reset
                                </button>
                            </div>
                        </div>

                        {/* VERTICAL DIVIDER */}
                        <div className="vertical-divider d-none d-md-block"></div>

                        {/* RIGHT SIDE */}
                        <div className="col-md-6 ps-4">
                            {/* Search */}
                            <div className="mb-2">
                                <label className="form-label fw-bold">Search</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                />
                            </div>

                            {/* Table */}
                            <div className="table-responsive">
                                <table className="table table-bordered table-sm">
                                    <thead className="table-primary text-center">
                                        <tr>
                                            <th>Ledger Name</th>
                                            <th>View</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td className="text-start">Admin edit</td>
                                            <td>👁️</td>
                                            <td>✏️</td>
                                            <td>🗑️</td>
                                        </tr>
                                        <tr>
                                            <td className="text-start">User</td>
                                            <td>👁️</td>
                                            <td>✏️</td>
                                            <td>🗑️</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div className=" d-flex mt-3">
                <button className='btn btn-primary fw-bold ms-5'>
                    📋 Update
                </button>
            </div>
        </div>
    )
}

export default UserType;