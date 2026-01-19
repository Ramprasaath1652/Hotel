import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const UserMaster = () => {
    const [rows, setRows] = useState([
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
    ]);

    // column select all
    const toggleColumn = (key, checked) => {
        setRows(rows.map(r => ({ ...r, [key]: checked })));
    };

    // individual checkbox
    const toggleSingle = (id, key) => {
        setRows(
            rows.map(r =>
                r.id === id ? { ...r, [key]: !r[key] } : r
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
                    <h4 ><FontAwesomeIcon icon={faUsers} className="me-2" />User Master</h4>
                </div>
                {/* Body */}
                <div
                    className='card-body'
                    style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}
                >
                    <div className="row g-3">

                        {/* LEFT SIDE FORM */}
                        <div className="col-md-4">

                            {/* SAME LINE */}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="fw-bold">
                                        User Type  <span className="required">*</span>
                                    </label>
                                    <select className="form-select">
                                        <option>--Select User--</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="fw-bold">
                                        Emp No <span className="required">*</span>
                                    </label>
                                    <input className="form-control" value="011" disabled />
                                </div>
                            </div>

                            <div className="mt-3">
                                <label className="fw-bold">Name  <span className="required">*</span></label>
                                <input className="form-control" />
                            </div>

                            <div className="mt-3">
                                <label className="fw-bold">Mobile no  <span className="required">*</span></label>
                                <input className="form-control" />
                            </div>

                            <div className="mt-3">
                                <label className="fw-bold">User Name  <span className="required">*</span></label>
                                <input className="form-control" />
                            </div>

                            <div className="mt-3">
                                <label className="fw-bold">Password  <span className="required">*</span></label>
                                <input type="password" className="form-control" />
                            </div>
                        </div>

                        {/* RIGHT SIDE TABLE */}
                        <div className="col-md-8">
                            <div className="table-responsive" style={{ maxHeight: "420px", overflowY: "auto" }}>
                                <table className="table table-bordered table-sm text-center align-middle">

                                    <thead
                                        style={{
                                            position: "sticky",
                                            top: 0,
                                            backgroundColor: "#4f7bd9",
                                            color: "white",
                                            zIndex: 10
                                        }}
                                    >
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
                                        {rows.map((r, i) => (
                                            <tr key={r.id}>
                                                <td>{i + 1}</td>
                                                <td><b>{r.menuType}</b></td>
                                                <td><b>{r.name}</b></td>

                                                {["visible", "add", "view", "edit", "delete", "report", "print"].map(col => (
                                                    <td key={col}>
                                                        <input
                                                            type="checkbox"
                                                            checked={r[col]}
                                                            onChange={() => toggleSingle(r.id, col)}
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

            </div>

        </div>
    )
}

export default UserMaster