import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons'



const Unit = () => {
  const [units, setUnits] = useState([]);
  const [unitName, setUnitName] = useState('');
  const [UnitId, setUnitId] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  // New states for edit confirmation
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [unitToEdit, setUnitToEdit] = useState(null);

  const [showPopup, setShowPopup] = useState(false)
  const [showMessage_Error, setShowMessage_Error] = useState(false);


  const gapi = import.meta.env.VITE_API_URL;
  const API = `${gapi}/unit/`;


  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = async () => {
    try {
      const res = await axiosInstance.get(API + 'list');
      if (res.data?.Success && Array.isArray(res.data.Data)) {
        setUnits(res.data.Data)
      } else {
        setUnits([]);
      }
    } catch (err) {
      console.error('Error fetching units:', err);
      setUnits([]);
    }
  };

  const showTempMessage = (msg, msgtype) => {
    setMessage(msg);
    if (msgtype === 'true') {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } else {
      setShowMessage_Error(true);
      setTimeout(() => setShowMessage_Error(false), 3000);
    }

  };

  // Add new unit
  const handleAdd = async () => {
    if (!unitName.trim()) {
      setShowPopup(true);
      return;
    }

    const newUnit = {
      UnitId: 0,
      UnitType: unitName,
      TUnitType: unitName,
    };

    try {
      const res = await axiosInstance.post(API + 'insert', newUnit, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('API response:', res.data);
      console.log('gId:', res.data.UnitId)
      if (res.data?.Success === true) {
        showTempMessage(res.data.Message, 'true')
        await loadUnits();
        setUnitName('');
        setEditingIndex(null);
      } else {
        showTempMessage(res.data?.Message, ' false')
      }
      loadUnits()
      setUnitName('')
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  // Update unit
  const handleUpdate = async () => {
    if (!unitName.trim()) {
      alert('Please enter unit name');
      return;
    }

    if (UnitId === 0) {
      alert('Invalid unit selected');
      return;
    }

    const updatedUnit = {
      UnitId: UnitId,
      UnitType: unitName,
      TUnitType: unitName,
    };

    try {
      const res = await axiosInstance.put(API + 'update', updatedUnit, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data?.Success === true) {
        showTempMessage(res.data.Message, 'true');
        await loadUnits();
        setUnitName('');
        setUnitId(0);
        setEditingIndex(null);
        setShowUpdateModal(false);
      } else {
        showTempMessage(res.data?.Message, 'false');
      }

    } catch (err) {
      const backendError =
        err.response?.data?.Message ||
        err.response?.data ||
        err.message ||
        'Something went wrong';

      showTempMessage(backendError, 'false');
      console.error('Update error:', err);
    }
  };

  // Trigger edit confirmation modal
  const handleEdit = (unit) => {
    setUnitToEdit(unit);
    setShowEditModal(true);
  };

  // Confirm edit
  const confirmEdit = () => {
    if (!unitToEdit) return;
    setUnitName(unitToEdit.UnitType);
    setUnitId(unitToEdit.UnitId);
    setEditingIndex(units.indexOf(unitToEdit));
    setShowEditModal(false);
  };

  // Delete
  const handleDelete = async () => {
    if (!unitToDelete) return;
    setShowDeleteModal(false);

    try {
      const res = await axiosInstance.delete(`${API}delete/${unitToDelete.UnitId}`);
      setUnitToDelete(null);
      setShowDeleteModal(false);
      if (res.data?.Success === true) {
        showTempMessage(res.data.Message, 'true');
        await loadUnits();
        setUnitId(0);
        setEditingIndex(null);
      }
      // ❌ BACKEND LOGICAL ERROR
      else {
        showTempMessage(res.data?.Message, 'false');
      }

    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUnitToDelete(null);
  };

  const filteredUnits = Array.isArray(units)
    ? units.filter(
      (item) =>
        item?.UnitType &&
        item.UnitType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const highlightText = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, 'ig');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: '#ffc107', fontWeight: 'bold' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleReset = () => {
    setUnitName('')
    setEditingIndex(null);
  }

  return (
    <div className="container-fluid mt-2">
      <div
        className="card shadow-lg mx-auto"
        style={{
          maxWidth: '95%',
          border: '2px solid #6a1b9a',
        }}
      >
        {/* Header */}
        <div
          className="card-header "
          style={{
            color: '#6a1b9a',
            padding: '20px',
            backgroundColor: 'white'
          }}
        >
          <h4 className="mb-0"><FontAwesomeIcon icon={faRulerCombined} className="me-2" />Unit Master</h4>
        </div>

        {/* Body */}
        <div
          className="card-body"
          style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}
        >
          <div className="row">
            {/* Left - Form */}
            <div className="col-md-4">


              <div className="mb-3">
                <label className="form-label fw-bold">Unit Name <span className='required'>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Unit Name"
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <button
                className="btn btn-success fw-bold text-uppercase btn-md"
                onClick={() => {
                  if (editingIndex !== null) {
                    setShowUpdateModal(true);   // ✅ open confirmation modal
                  } else {
                    handleAdd();
                  }
                }}
              >
                {editingIndex !== null ? '🛠️Update' : '📋Save'}
              </button>
              <button className='btn btn-md btn-danger m-2'
                onClick={handleReset}
              >
                🔄️RESET
              </button>
            </div>

            {/* Right - Table with Search */}
            <div className="col-md-8 mt-2 mt-md-0">
              <label className="form-label fw-bold">Search for UnitName </label>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔎 Search Units..."
                  style={{ width: '250px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <h5
                  className='w-100 w-md-auto text-md-end'
                  style={{ color: '#6a1b9a' }}> Showing {filteredUnits.length} of {units.length} Records </h5>
              </div>

              {filteredUnits.length === 0 ? (
                <p className="text-center text-muted">No records found.</p>
              ) : (
                <div
                  style={{
                    maxHeight: 'calc(100vh - 350px)',
                    overflowY: 'auto',
                    overflowX: 'auto',
                  }}
                >
                  <table className="table table-bordered table-striped text-center align-middle">
                    <thead
                      className="table-light"
                      style={{ position: 'sticky', top: 0 }}
                    >
                      <tr>
                        <th>Unit Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUnits.map((item) => (
                        <tr key={item.UnitId}>
                          <td className='text-start'>{highlightText(item.UnitType, searchTerm)}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2 fw-bold"
                              onClick={() => handleEdit(item)}
                            >
                              🖋️Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm fw-bold"
                              onClick={() => {
                                setUnitToDelete(item);
                                setShowDeleteModal(true);
                              }}
                            >
                              🗑️Delete
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

          {/* Success Message */}
          {showMessage && (
            <div
              aria-live="polite"
              aria-atomic="true"
              className="toast-container position-fixed top-0 end-0 pe-3"
              style={{ zIndex: 9999 ,paddingTop: '70px'}}
            >
              <div
                className="toast show text-bg-success"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div
                  className="toast-header text-bg-blue"
                  style={{
                    backgroundColor: "#0f8532",
                    color: "#fff"
                  }}
                >
                  <strong className="me-auto">Success</strong>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowMessage(false)}
                  ></button>
                </div>

                <div
                  className="toast-body fw-bold"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000"
                  }}
                >
                  {message}
                </div>
              </div>
            </div>
          )}


          {showMessage_Error && (
            <div
              className="toast-container position-fixed top-0 end-0 pe-3"
              style={{ zIndex: 9999, paddingTop: '70px' }}
            >
              <div className="toast show" role="alert">

                <div
                  className="toast-header"
                  style={{
                    backgroundColor: "#d60707",
                    color: "#fff"
                  }}
                >
                  <strong className="me-auto">Error</strong>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowMessage_Error(false)}
                  ></button>
                </div>

                <div
                  className="toast-body fw-bold"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000"
                  }}
                >
                  {message}
                </div>
              </div>
            </div>
          )}

          {showPopup && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Unit Master</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowPopup(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Unit Name must be filled.
                    </p>
                  </div>
                  <div className="modal-footer">

                    <button className="btn btn-primary" onClick={() => setShowPopup(false)}>
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Delete</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={cancelDelete}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Are you sure you want to delete "{unitToDelete?.UnitType}
                      "?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={cancelDelete}
                    >
                      No
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Confirmation Modal */}
          {showEditModal && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Edit</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowEditModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Are you sure you want to edit "{unitToEdit?.UnitType}"?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowEditModal(false)}
                    >
                      No
                    </button>
                    <button className="btn btn-primary" onClick={confirmEdit}>
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Update Confirmation Modal */}
          {showUpdateModal && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Update</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowUpdateModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Are you sure you want to update "{unitName}"?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowUpdateModal(false)}
                    >
                      No
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleUpdate}
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
    </div>
  );
};

export default Unit;
