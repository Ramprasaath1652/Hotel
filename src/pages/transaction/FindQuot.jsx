import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
    //Edit
    search: '',
    data: [],
    filtered: [],
    loading: false,

    //Delete
    showDeleteModal: false,
    rowToDelete: null
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_SEARCH':
            return {
                ...state,
                search: action.value
            };

        case 'SET_DATA':
            return {
                ...state,
                data: Array.isArray(action.value) ? action.value : [],
                filtered: Array.isArray(action.value) ? action.value : [],
                loading: false
            };

        case 'SET_SEARCH':
            return {
                ...state,
                search: action.value
            };

        case 'FILTER':
            const q = state.search.toLowerCase();

            return {
                ...state,
                filtered: state.data.filter(r =>
                    (r.QNo ?? '').toString().toLowerCase().includes(q) ||
                    (r.ProjName ?? '').toLowerCase().includes(q) ||
                    (r.LedgerName ?? '').toLowerCase().includes(q)
                )
            };

        case 'ASK_DELETE':
            return {
                ...state,
                rowToDelete: action.payload,
                showDeleteModal: true
            }

        case 'CONFIRM_DELETE':
            return {
                ...state,
                data: state.data.filter(r => r.QId !== state.rowToDelete.QId),
                filtered: state.filtered.filter(r => r.QId !== state.rowToDelete.QId),
                rowToDelete: null,
                showDeleteModal: false
            }

        case 'CANCEL_DELETE':
            return {
                ...state,
                rowToDelete: null,
                showDeleteModal: false
            }

        default:
            return state;
    }

}

const FindQuot = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const gapi = import.meta.env.VITE_API_URL;



    useEffect(() => {
        axios
            .get('http://192.168.31.101:85/api/quoinfo')
            .then(res => {
                dispatch({
                    type: 'SET_DATA',
                    value: res.data
                });
                console.log(res)
            });

    }, [])

    const handleConfirmDelete = async () => {
        try {
            const qid = state.rowToDelete.QId;
            console.log("Deleting QId:", qid)

            // const res = await axios.get(`${gapi}/tblQuodets/${qid}`)

            // const details = res.data
            //     ? Array.isArray(res.data)
            //         ? res.data
            //         : [res.data]   
            //     : [];
            // console.log("Secondary GET response:", res.data);

            // for (const d of details) {
            //     await axios.delete(`${gapi}/tblQuodets/${d.QDetsId}`)
            // }

            await axios.delete(`${gapi}/tblQuos/${qid}`)
            dispatch({ type: 'CONFIRM_DELETE' })
        } catch (err) {
            console.error(err);
            alert('Delete failed')
        }
    }

    return (
        <div className="find-overlay"
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.3)',
                zIndex: 9999
            }}
            onClick={() => {
                navigate('/transaction/quot');
            }}
        >

            <div className="find-container" onClick={(e) => e.stopPropagation()}>
                <div className=' text-white px-3 py-2 align-item-center' style={{ backgroundColor: '#5d8aa8' }}>
                    <h6 className='mb-0 '>Quotation</h6>
                </div>
                <div className='mt-3'>
                    <input
                        type='text'
                        className='form-control form-control-sm'
                        placeholder='Search for Quotation...'
                        style={{
                            width: '50%'
                        }}
                        value={state.search || ''}
                        onChange={(e) => {
                            dispatch({ type: 'SET_SEARCH', value: e.target.value });
                            dispatch({ type: 'FILTER' });
                        }}
                    />
                </div>
                <div
                    className="mt-3 px-2 px-md-3"
                    style={{
                        border: '1px solid #5d8aa8',
                        borderRadius: '5px',
                        backgroundColor: '#fff',
                        minHeight: '500px',
                        padding: '10px',
                        overflowY: "auto"   // prevents overflow issue
                    }}
                >

                    <div className='mt-2' style={{ width: '100%' }}>
                        {/* future content */}
                        <table className="table table-bordered table-sm" style={{ fontSize: "12px", minWidth: "900px" }}>
                            <thead className="table-light">
                                <tr>
                                    <th style={{ width: "60px" }} className="text-center">Q.No</th>
                                    <th style={{ width: "80px" }} className='text-center'>Q.Date</th>
                                    <th style={{ width: "120px" }} className="text-center">Project</th>
                                    <th style={{ width: "120px" }} className='text-center'>Ledger</th>
                                    <th style={{ width: "70px" }} className="text-center">Act amount</th>
                                    <th style={{ width: "100px" }} className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.filtered && state.filtered.length > 0 ? (
                                    state.filtered.map((r, i) => (
                                        <tr
                                            key={i}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td className="text-center">{r.QNo}</td>
                                            <td className="text-center">{r.QDate ? new Date(r.QDate).toLocaleDateString('en-GB') : ''}</td>
                                            <td className="text-center">{r.ProjName}</td>
                                            <td className="text-center">{r.LedgerName}</td>
                                            <td className="text-center">{r.TotTaxableAmt}</td>
                                            <td className="text-center">
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-secondary me-1"
                                                        style={{ padding: "0.2rem 0.4rem", fontSize: "8px" }}
                                                        onClick={() => {
                                                            navigate(`/transaction/quot/${r.QId}`, {
                                                                
                                                            });
                                                        }}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        style={{ padding: "0.2rem 0.4rem", fontSize: "8px" }}
                                                        onClick={() => dispatch({ type: 'ASK_DELETE', payload: r })}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='mt-4 text-end'>
                    <button className='btn btn-sm btn-danger' onClick={() => window.history.back()}>
                        Close
                    </button>
                </div>

            </div>
            {state.showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content">

                            <div className="modal-header">
                                <h6 className="modal-title">Confirm Delete</h6>
                            </div>

                            <div className="modal-body">
                                <p>
                                    Are you sure you want to delete
                                    <br />
                                    <b>Quotation No: {state.rowToDelete?.QNo}</b> ?
                                </p>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() =>
                                        dispatch({ type: 'CANCEL_DELETE' })
                                    }
                                >
                                    No
                                </button>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={handleConfirmDelete}
                                >
                                    Yes
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default FindQuot;
