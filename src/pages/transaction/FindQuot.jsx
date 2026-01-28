import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/axiosInstance';

const FindQuot = ({ onClose, onEdit }) => {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [quot, setQuot] = useState([]);
    const [ledgerList, setLedgerList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const gapi = import.meta.env.VITE_API_URL;

    useEffect(() => {
        loadMasters();
        loadQuot();
    }, []);

    const loadMasters = async () => {
        try {
            const ledgers = await axiosInstance.get(`${gapi}/ledger/list`);
            setLedgerList(ledgers.data.Data);

            const projects = await axiosInstance.get(`${gapi}/project/list`);
            setProjectList(projects.data.Data);
        } catch (err) {
            console.error('Masters load error:', err);
        }
    }

    const loadQuot = async () => {
        try {
            const res = await axiosInstance.get(`${gapi}/quo/list`);
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
            </div>
        </div>
    )
}

export default FindQuot;