import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonTable from '../../components/CommonTable';
import CommonTableLayout from '../../components/CommonTableLayout';
import CommonModals from '../../components/CommonModals ';


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
  const [showPopup, setShowPopup] = useState(false)

  // Edit confirmation modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const gapi = import.meta.env.VITE_API_URL;
  const [showUpdateModal, setShowUpdateModal] = useState(false);


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
      setShowPopup(true);
      return;
    }

    const newGroup = {
      GroupID: 0,
      GroupName: groupName,
    };

    try {
      const res = await axios.post(API, newGroup, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('API response:', res.data);
      console.log('gId:', res.data.GroupID)
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
      await loadGroups();
      setGroupName('');
      setGroupId(0);
      setEditingIndex(null);
      setShowUpdateModal(false);
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

  const highlightText = (text, search) => {
    if (!search || !text) return text;

    const regex = new RegExp(`(${search})`, "ig");
    const parts = text.toString().split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span
          key={index}
          style={{
            backgroundColor: "#ffc107",
            fontWeight: "bold",
            padding: "0 2px",
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const groupColumns = [
    {
      header: "Group Name",
      accessor: "GroupName",
      render: (value) => highlightText(value, searchTerm),
    },
  ];


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
                <label className="form-label">Group Name <span className='required'>*</span></label>
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
                onClick={() => {
                  if (editingIndex !== null) {
                    setShowUpdateModal(true);   // 🔥 update confirm
                  } else {
                    handleAdd();
                  }
                }}
              >
                {editingIndex !== null ? 'Update' : 'Insert'}
              </button>
            </div>

            {/* Right - Table with Search */}
            <CommonTableLayout
              title="Group List"
              placeholder="🔎 Search Groups..."
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              dataLength={filteredGroups.length}
            >
              <CommonTable
                columns={groupColumns}
                data={filteredGroups}
                rowKey="GroupID"
                onEdit={(row) => {
                  setGroupToEdit(row);
                  setShowEditModal(true);
                }}
                onDelete={(row) => {
                  setGroupToDelete(row);
                  setShowDeleteModal(true);
                }}
              />
            </CommonTableLayout>
          </div>

          <CommonModals
            showDelete={showDeleteModal}
            showUpdate={showUpdateModal}
            showEdit={showEditModal}
            showAlert={showPopup}
            deleteText={`Are you sure you want to delete "${groupToDelete?.GroupName}"?`}
            editText={`Are you sure you want to edit "${groupToEdit?.GroupName}"?`}
            updateText={`Are you sure you want to update "${groupName}"?`}   // ✅
            alertText="Group Name must be filled"
            onConfirmDelete={handleDelete}
            onConfirmEdit={confirmEdit}
            onConfirmUpdate={handleUpdate}
            onClose={() => {
              setShowDeleteModal(false);
              setShowEditModal(false);
              setShowUpdateModal(false);
              setShowPopup(false);
            }}
          />

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

        </div>
      </div>
    </div>
  );
};

export default Group;
