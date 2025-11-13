import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  // Edit confirmation modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const gapi = import.meta.env.VITE_API_URL;

  const API = `${gapi}/group`; // Change to your actual API

  useEffect(() => {
    console.log('main url : ' + gapi + '/group');
    // console.log(API);
    loadGroups();
  }, []);

  const loadGroups = async () => {   
    try {
      const res = await axios.get(API);
      setGroups(res.data);

    } catch (err) {
      console.error('Error fetching groups:', err);
      alert('Could not load groups. Check API connection.');
    }
  };

  const showTempMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  // Add new group
  const handleAdd = async () => {
    if (!groupName.trim()) {
      alert('Please enter group name');
      return;
    }

    const newGroup = {
      GroupID: 0,
      GroupName: groupName,
    };

    try {
      await axios.post(API, newGroup, {
        headers: { 'Content-Type': 'application/json' },
      });
      loadGroups();
      setGroupName('');
      showTempMessage('Group added successfully!');
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  // Update group
  const handleUpdate = async () => {
    if (!groupName.trim()) {
      alert('Please enter group name');
      return;
    }

    if (groupId === 0) {
      alert('Invalid group selected');
      return;
    }

    const updatedGroup = {
      GroupID: groupId,
      GroupName: groupName,
    };

    try {
      await axios.put(`${API}/${groupId}`, updatedGroup, {
        headers: { 'Content-Type': 'application/json' },
      });
      loadGroups();
      setGroupName('');
      setGroupId(0);
      setEditingIndex(null);
      showTempMessage('Group updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  // Trigger edit confirmation modal
  const handleEdit = (group) => {
    setGroupToEdit(group);
    setShowEditModal(true);
  };

  // Confirm edit
  const confirmEdit = () => {
    if (!groupToEdit) return;
    setGroupName(groupToEdit.GroupName);
    setGroupId(groupToEdit.GroupID);
    setEditingIndex(groups.indexOf(groupToEdit));
    setShowEditModal(false);
  };

  // Delete
  const handleDelete = async () => {
    if (!groupToDelete) return;

    try {
      await axios.delete(`${API}/${groupToDelete.GroupID}`);
      setShowDeleteModal(false);
      setGroupToDelete(null);
      loadGroups();
      showTempMessage('Group deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setGroupToDelete(null);
  };

  const filteredGroups = Array.isArray(groups)
    ? groups.filter(
      (item) =>
        item?.GroupName &&
        item.GroupName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  return (
    <div className="container-fluid mt-2">
      <div
        className="card shadow-lg mx-auto"
        style={{ maxWidth: '95%', border: '2px solid #5d8aa8' }}
      >
        {/* Header */}
        <div
          className="card-header text-white"
          style={{ backgroundColor: '#5d8aa8', padding: '20px' }}
        >
          <h4 className="mb-0">Group Master</h4>
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
                {editingIndex !== null ? 'Edit Group' : 'Add Group'}
              </h5>

              <div className="mb-3">
                <label className="form-label">Group Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
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
                <h5 className="mb-0">Group List</h5>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Groups..."
                  style={{ width: '250px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {filteredGroups.length === 0 ? (
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
                        <th>Group Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGroups.map((item) => (
                        <tr key={item.GroupID}>
                          <td>{item.GroupName}</td>
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
                                setGroupToDelete(item);
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
              style={{ zIndex: 9999, minWidth: '300px' }}
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
                      Are you sure you want to delete "
                      {groupToDelete?.GroupName}"?
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
                    <p>Are you sure you want to edit "{groupToEdit?.GroupName}"?</p>
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

export default Group;
