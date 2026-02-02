import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

const FindSQuot = ({ onClose, onEdit, onReset, onBtnDelete, showTempMessage }) => {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [quot, setQuot] = useState([]);
    const [ledgerList, setLedgerList] = useState([]);
    const [projectList, setProjectList] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [rowToDelete, setRowToDelete] = useState(null);


    const gapi = import.meta.env.VITE_API_URL;




    useEffect(() => {
        loadMasters();
        loadSQuot();
    }, []);

    // 🔹 Step 1 - Load ledger & project masters
    const loadMasters = async () => {
        try {
            const ledgers = await axiosInstance.get(`${gapi}/ledger/list`);
            setLedgerList(ledgers.data.Data);

            const projects = await axiosInstance.get(`${gapi}/project/list`);
            setProjectList(projects.data.Data);
        } catch (err) {
            console.error('Masters load error:', err);
        }
    };

    // 🔹 Step 2 - Load Quotations
    const loadSQuot = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/suppquo/list`);
            const data = res.data.Data;

            // Map to include LedgerName & ProjName if missing
            const mapped = data.map(r => ({
                ...r,
                LedgerName:
                    r.LedgerName ||
                    ledgerList.find(l => l.LedgerId === r.LedgerId)?.LedgerName ||
                    '',
                ProjName:
                    r.ProjName ||
                    projectList.find(p => p.ProjId === r.ProjectId)?.ProjName ||
                    '',
            }));

            setQuot(mapped);
            setFiltered(mapped);
        } catch (err) {
            console.error(err);
        }
    };

    // 🔹 Step 3 - Filter function
    const handleFilter = value => {
        setSearch(value);
        const q = value.toLowerCase();

        const result = quot.filter(r =>
            (r.SQNo ?? '').toString().toLowerCase().includes(q) ||
            (r.ProjName ?? '').toLowerCase().includes(q) ||
            (r.LedgerName ?? '').toLowerCase().includes(q)
        );
        setFiltered(result);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setRowToDelete(null);
    };

    const confirmDelete = async () => {
        setShowDeleteModal(false)
        try {
            const res = await axiosInstance.delete(
                `${gapi}/suppquo/delete/${rowToDelete}`
            );
            setShowDeleteModal(false);
            onClose();
            if (res.data?.Success === true) {
                showTempMessage(res.data.Message, "true");
                setFiltered(prev => prev.filter(r => r.SQId !== rowToDelete));
                setQuot(prev => prev.filter(r => r.SQId !== rowToDelete));
                onReset();
                onBtnDelete();
                setRowToDelete(null);
            } else {
                showTempMessage(res.data?.Message, "false");
            }

        } catch (err) {
            console.error("Delete Error", err);
            showTempMessage(res.data?.Message, "false");
        }
    };


    return (
        <div className="find-overlay"
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 9999 }}
        >
            <div className="find-container" onClick={e => e.stopPropagation()}>
                <div className="text-white px-3 py-2" style={{ backgroundColor: '#6a1b9a' }}>
                    <h6>SQuot</h6>
                </div>

                <div className="mt-3">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        style={{ width: '50%' }}
                        placeholder="Search for Quotation..."
                        value={search}
                        onChange={e => handleFilter(e.target.value)}
                    />
                </div>

                <div className="mt-3 px-2 px-md-3"
                    style={{ border: '1px solid #6a1b9a', minHeight: '500px', borderRadius: '5px', padding: '10px', overflow: 'auto' }}
                >
                    <table className="table table-bordered table-sm" style={{ fontSize: '12px', minWidth: '900px' }}>
                        <thead className="table-light">
                            <tr>
                                <th className="text-center" style={{ width: '60px' }}>Q.No</th>
                                <th className="text-center" style={{ width: '80px' }}>Q.Date</th>
                                <th className="text-center" style={{ width: '120px' }}>Project</th>
                                <th className="text-center" style={{ width: '120px' }}>Ledger</th>
                                <th className="text-center" style={{ width: '70px' }}>Act amount</th>
                                <th className="text-center" style={{ width: '100px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted">No data found</td>
                                </tr>
                            ) : filtered.map((r, i) => (
                                <tr key={i} style={{ cursor: 'pointer' }}>
                                    <td className="text-center">{r.SQNo}</td>
                                    <td className="text-center">{r.SQDate ? new Date(r.SQDate).toLocaleDateString('en-GB') : ''}</td>
                                    <td className="text-center">{r.ProjName}</td>
                                    <td className="text-center">{r.LedgerName}</td>
                                    <td className="text-center">{r.TotTaxableAmt}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-secondary me-1"
                                            style={{ padding: '0.2rem 0.4rem', fontSize: '8px' }}
                                            onClick={() => {
                                                console.log("Row SQId 👉", r.SQId);
                                                onEdit(r.SQId);
                                            }}
                                        >🖋️Edit</button>
                                        <button className="btn btn-sm btn-danger"
                                            style={{ padding: '0.2rem 0.4rem', fontSize: '8px' }}
                                            onClick={() => {
                                                setRowToDelete(r.SQId);
                                                setShowDeleteModal(true);
                                            }}
                                        >🗑️Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-end">
                    <button className="btn btn-sm btn-danger" onClick={onClose}>Close</button>
                </div>

                {showDeleteModal && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Delete</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={cancelDelete}
                                    />
                                </div>

                                <div className="modal-body">
                                    <p>Are you sure you want to delete this quotation?</p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={cancelDelete}
                                    >
                                        No
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={confirmDelete}
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
    );
};

export default FindSQuot;
