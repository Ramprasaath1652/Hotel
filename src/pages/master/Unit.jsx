import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [unitToEdit, setUnitToEdit] = useState(null);
  
  const gapi = import.meta.env.VITE_API_URL;
  const API = `${gapi}/unit`;

  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = async () => {
    try {
      const res = await axios.get(API);
      console.log('Fetched Units:', res.data);
      setUnits(res.data);
    } catch (err) {
      console.error('Error fetching units:', err);
      alert('Could not load units. Please check API connection');
    }
  };

  const showTempMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  // Add new unit
  const handleAdd = async () => {
    if (!unitName.trim()) {
      alert('Please enter unit name');
      return;
    }

    const newUnit = {
      UnitId: 0,
      UnitType: unitName,
      TUnitType: unitName,
    };

    try {
      await axios.post(API, newUnit, {
        headers: { 'Content-Type': 'application/json' },
      });
      loadUnits();
      setUnitName('');
      showTempMessage('Unit added successfully!');
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
      await axios.put(`${API}/${UnitId}`, updatedUnit, {
        headers: { 'Content-Type': 'application/json' },
      });
      loadUnits();
      setUnitName('');
      setUnitId(0);
      setEditingIndex(null);
      showTempMessage('Unit updated successfully!');
    } catch (err) {
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

    try {
      await axios.delete(`${API}/${unitToDelete.UnitId}`);
      setShowDeleteModal(false);
      setUnitToDelete(null);
      loadUnits();
      showTempMessage('Unit deleted successfully!');
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

  return (
    <div className="container-fluid mt-2">
      <div
        className="card shadow-lg mx-auto"
        style={{
          maxWidth: '95%',
          border: '2px solid #5d8aa8',
        }}
      >
        {/* Header */}
        <div
          className="card-header text-white"
          style={{
            backgroundColor: '#5d8aa8',
            padding: '20px',
          }}
        >
          <h4 className="mb-0">Unit Master</h4>
        </div>

        {/* Body */}
        <div
          className="card-body"
          style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}
        >
          <div className="row">
            {/* Left - Form */}
            <div className="col-md-4">
              <h5 className="mb-3">
                {editingIndex !== null ? 'Edit Unit' : 'Add Unit'}
              </h5>

              <div className="mb-3">
                <label className="form-label">Unit Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Unit Name"
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={editingIndex !== null ? handleUpdate : handleAdd}
              >
                {editingIndex !== null ? 'Update' : 'Insert'}
              </button>
            </div>

            {/* Right - Table with Search */}
            <div className="col-md-8">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Unit List</h5>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Units..."
                  style={{ width: '250px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                          <td>{item.UnitType}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setUnitToDelete(item);
                                setShowDeleteModal(true);
                              }}
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

          {/* Success Message */}
          {showMessage && (
            <div
              className="position-fixed top-0 start-50 translate-middle-x mt-3"
              style={{
                zIndex: 9999,
                minWidth: '300px',
              }}
            >
              <div
                className="alert alert-success alert-dismissible fade show mb-0"
                role="alert"
              >
                {message}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowMessage(false)}
                ></button>
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
        </div>
      </div>
    </div>
  );
};

export default Unit;
