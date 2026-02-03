import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonTable from '../../components/CommonTable';
import CommonTableLayout from '../../components/CommonTableLayout';
import CommonModals from '../../components/CommonModals ';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons'




const Group = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessage_Error, setShowMessage_Error] = useState(false);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false)

  // Edit confirmation modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const gapi = import.meta.env.VITE_API_URL;
  const [showUpdateModal, setShowUpdateModal] = useState(false);


  //1. list
  //2. create
  //3.update , 4. delete/id
  const API = gapi + '/group/'; // Change to your actual API
  console.log('new', API)

  useEffect(() => {
    // console.log('main url : ' + gapi + '/group');
    // console.log('new:',API);
    loadGroups();
  }, []);//https://gtfin.in/abnapi/api/group/list

  const loadGroups = async () => {
    try {
      const res = await axiosInstance.get(API + 'list');

      if (res.data?.Success && Array.isArray(res.data.Data)) {
        setGroups(res.data.Data);
      } else {
        setGroups([]);   // 🔥 THIS IS THE KEY
      }

    } catch (err) {
      console.error('Error fetching groups:', err);
      setGroups([]);     // 🔥 ALSO HERE
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



  // Add new group
  const handleAdd = async () => {
    if (!groupName.trim()) {
      setShowPopup(true);
      return;
    }

    const newGroup = {
      GroupID: 0,
      GroupName: groupName,
      TGroupName: groupName
    };

    try {
      const res = await axiosInstance.post(API + 'insert', newGroup, { //https://gtfin.in/abnapi/api/group/insert
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('API response:', res.data);
      console.log('gId:', res.data.RefId)
      if (res.data?.Success === true) {
        showTempMessage(res.data.Message, 'true');
        await loadGroups();
        setGroupName('');
        setGroupId(0);
        setEditingIndex(null);
      }
      // ❌ BACKEND LOGICAL ERROR
      else {
        showTempMessage(res.data?.Message, 'false');
      }
      loadGroups();
      setGroupName('');
      // showTempMessage('Group added successfully!');
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
      TGroupName: groupName
    };

    try {
      // await axios.put(`${API}/${groupId}`, updatedGroup, {
      //   headers: { 'Content-Type': 'application/json' },
      // });
      setShowUpdateModal(false);
      const res = await axiosInstance.put(API + 'update', updatedGroup, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('UPDATE FULL RESPONSE 👉', res);
      console.log('UPDATE DATA 👉', res.data);
      if (res.data?.Success === true) {
        showTempMessage(res.data.Message, 'true');
        await loadGroups();
        setGroupName('');
        setGroupId(0);
        setEditingIndex(null);
      }
      // ❌ BACKEND LOGICAL ERROR
      else {
        showTempMessage(res.data?.Message, 'false');
      }

    } catch (err) {
      // ❌ NETWORK / 500 / CORS / SERVER DOWN
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
    setShowDeleteModal(false);

    try {
      const res = await axiosInstance.delete(`${API}delete/${groupToDelete.GroupID}`);
      console.log(`${API}delete/${groupToDelete.GroupID}`)
      console.log(res.data)
      setGroupToDelete(null);
      // showTempMessage('Group deleted successfully!');
      setShowDeleteModal(false);
      if (res.data?.Success === true) {
        showTempMessage(res.data.Message, 'true');
        await loadGroups();
        setGroupName('');
        setGroupId(0);
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

  const handleReset = () => {
    setGroupName('')
    setEditingIndex(null);
  }

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
        style={{ maxWidth: '95%', border: '2px solid #6a1b9a' }}
      >
        {/* Header */}
        <div
          className="card-header "
          style={{ color: '#6a1b9a', padding: '20px', backgroundColor: 'white' }}
        >
          <h4 className="mb-0"> <FontAwesomeIcon icon={faUsers} className="me-2" />Group Master</h4>
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
                <label className="form-label fw-bold">Group Name <span className='required'>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <button
                className="btn btn-success fw-bold text-uppercase btn-md"
                onClick={() => {
                  if (editingIndex !== null) {
                    setShowUpdateModal(true);   // 🔥 update confirm
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
            <CommonTableLayout
              title={
                <h5 className="mb-0 w-100 w-md-auto text-md-end" style={{ color: '#6a1b9a' }}>
                  Showing {filteredGroups.length || 0} of {groups.length || 0} Records
                </h5>
              }
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
            updateText={`Are you sure you want to update "${groupName}"?`}
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
              aria-live="polite"
              aria-atomic="true"
              className="toast-container position-fixed top-0 end-0 pe-3"
              style={{ zIndex: 9999, paddingTop: '70px' }}
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
        </div>
      </div>
    </div>
  );
};

export default Group;
