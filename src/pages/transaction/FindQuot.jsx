import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/axiosInstance';

const FindQuot = ({ onClose, onEdit, onReset, onBtnDelete, showTempMessage }) => {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [quot, setQuot] = useState([]);
    const [quotLedgerList, setQuotLedgerList] = useState([]);
    const [quotProjectList, setQuotProjectList] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const gapi = import.meta.env.VITE_API_URL;

    useEffect(() => {
        loadMasters();
        loadQuot();
    }, []);

    const loadMasters = async () => {
        try {
            const ledgers = await axiosInstance.get(`${gapi}/ledger/list`);
            setQuotLedgerList(ledgers.data.Data);

            const projects = await axiosInstance.get(`${gapi}/project/list`);
            setQuotProjectList(projects.data.Data);
        } catch (err) {
            console.error('Masters load error:', err);
        }
    }

    const loadQuot = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/quo/list`);
            console.log('Quot res:', res);

            const data = res.data?.Data ?? [];   // 🔥 IMPORTANT

            const mapped = data.map(r => ({
                ...r,
                LedgerName:
                    r.LedgerName ||
                    quotLedgerList?.find(l => l.LedgerId === r.LedgerId)?.LedgerName ||
                    '',
                ProjName:
                    r.ProjName ||
                    quotProjectList?.find(p => p.ProjId === r.ProjectId)?.ProjName ||
                    '',
            }));

            setQuot(mapped);
            setFiltered(mapped);

        } catch (err) {
            console.error(err);
        }
    };


    const handleFilter = value => {
        setSearch(value);
        const q = value.toLowerCase();

        const result = quot.filter(r =>
            (r.QNo ?? '').toString().toLowerCase().includes(q) ||
            (r.ProjName ?? '').toLowerCase().includes(q) ||
            (r.LedgerName ?? '').toLowerCase().includes(q)
        );
        setFiltered(result);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setRowToDelete(null);
    }

    const confirmDelete = async () => {
        try {
            const res = await axiosInstance.delete(`${gapi}/quo/delete/${rowToDelete}`);
            console.log("DELETE RESPONSE:", res.data);
            if (res.data?.Success === true) {
                setFiltered(prev => prev.filter(r => r.QId !== rowToDelete));
                setQuot(prev => prev.filter(r => r.QId !== rowToDelete));
                showTempMessage(res.data.Message, "true");
                onClose(); // optional → close find popup also
                onReset();
                onBtnDelete();
                setShowDeleteModal(false);
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
                    <h6>Quotation</h6>
                </div>

                <div className="mt-3">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        style={{ width: '50%' }}
                        placeholder="🔎Search for Quotation..."
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
                                    <td className="text-center">{r.QNo}</td>
                                    <td className="text-center">{r.QDate ? new Date(r.QDate).toLocaleDateString('en-GB') : ''}</td>
                                    <td className="text-center">{r.ProjName}</td>
                                    <td className="text-center">{r.LedgerName}</td>
                                    <td className="text-center">{r.NetAmount}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-secondary me-1"
                                            style={{ padding: '0.2rem 0.4rem', fontSize: '8px' }}
                                            onClick={() => {
                                                console.log("Row SQId 👉", r.QId);
                                                onEdit(r.QId);
                                            }}
                                        >🖋️Edit</button>
                                        <button className="btn btn-sm btn-danger"
                                            style={{ padding: '0.2rem 0.4rem', fontSize: '8px' }}
                                            onClick={() => {
                                                setRowToDelete(r.QId)
                                                setShowDeleteModal(true)
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
    )
}

export default FindQuot;