import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SamplePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();



  const [rows, setRows] = useState([]);        // full API list
  const [filtered, setFiltered] = useState([]); // filtered list

  const [rowToDelete, setRowToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    axios.get('http://192.168.31.101:85/api/quoinfo')
      .then(res => {
        setRows(res.data)
        setFiltered(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const handleEdit = (row) => {
    navigate(`/transaction/sample/${row.QId}`);
  };
  const handleAskDelete = (row) => {
    setRowToDelete(row);
    setShowDeleteModal(true);
  };

 


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
          <h6 className='mb-0 '>Sample</h6>
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
                {filtered.length > 0 ? (
                  filtered.map((r, i) => (
                    <tr key={r.QId} style={{ cursor: 'pointer' }}>
                      <td className="text-center">{r.QNo}</td>
                      <td className="text-center">
                        {r.QDate
                          ? new Date(r.QDate).toLocaleDateString('en-GB')
                          : ''}
                      </td>
                      <td className="text-center">{r.ProjName}</td>
                      <td className="text-center">{r.LedgerName}</td>
                      <td className="text-center">{r.TotTaxableAmt}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-secondary me-1"
                          style={{ padding: "0.2rem 0.4rem", fontSize: "8px" }}
                          onClick={() => handleEdit(r)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          style={{ padding: "0.2rem 0.4rem", fontSize: "8px" }}
                          onClick={() => handleAskDelete(r)}
                        >
                          Delete
                        </button>
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





        <div className='text-end mt-4'>
          <button className='btn btn-sm btn-danger' onClick={() => window.history.back()}>
            Close
          </button>
        </div>
      </div>



    </div>

  )
}

export default SamplePage;