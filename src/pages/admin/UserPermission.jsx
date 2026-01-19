import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";

const UserPermission = () => {
    const [data, setData] = useState([
        {
            id: 1,
            menuType: "Master",
            name: "GroupMaster",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 2,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 4,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },

        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
        {
            id: 3,
            menuType: "Transaction",
            name: "Purchase",
            visible: false,
            add: false,
            view: false,
            edit: false,
            delete: false,
            report: false,
            print: false,
        },
    ]);

    // column select all
    const toggleColumn = (key, checked) => {
        setData(data.map(row => ({ ...row, [key]: checked })));
    };

    // single checkbox
    const toggleSingle = (id, key) => {
        setData(
            data.map(row =>
                row.id === id ? { ...row, [key]: !row[key] } : row
            )
        );
    };

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
                    <h4 ><FontAwesomeIcon icon={faUserGear} className="me-2" />User Permission</h4>
                </div>
                {/* Body */}
                <div
                    className='card-body'
                    style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}
                >
                    <div className="row align-items-end g-3">
                        {/* Input */}
                        <div className="col-md-4 d-flex align-items-center text-nowrap ">
                            <label className="form-label fw-bold ">
                                User Type <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control ms-3"
                                placeholder="Enter User Type"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="col-md-4 d-flex gap-3">
                            <button className="btn btn-primary btn-md fw-bold px-4">
                                💾 Save
                            </button>

                            <button className="btn btn-danger btn-md fw-bold px-4">
                                🔄 Reset
                            </button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered text-center align-middle mt-4"
                            style={{
                                maxHeight: "350px",
                                overflowY: "auto"
                            }}
                        >
                            <thead className="table-primary" style={{
                                position: "sticky",
                                top: 0,
                                zIndex: 10,
                                
                            }}>
                                <tr>
                                    <th>#</th>
                                    <th>MenuType</th>
                                    <th>Name</th>

                                    {["visible", "add", "view", "edit", "delete", "report", "print"].map(col => (
                                        <th key={col}>
                                            <input
                                                type="checkbox"
                                                onChange={(e) => toggleColumn(col, e.target.checked)}
                                            />{" "}
                                            {col.charAt(0).toUpperCase() + col.slice(1)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={row.id}>
                                        <td>{index + 1}</td>
                                        <td className="fw-bold">{row.menuType}</td>
                                        <td className="fw-bold">{row.name}</td>

                                        {["visible", "add", "view", "edit", "delete", "report", "print"].map(col => (
                                            <td key={col}>
                                                <input
                                                    type="checkbox"
                                                    checked={row[col]}
                                                    onChange={() => toggleSingle(row.id, col)}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserPermission;