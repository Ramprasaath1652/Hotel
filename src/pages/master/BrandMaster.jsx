import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../../api/axiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



const BrandMaster = () => {
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [BrandId, setBrandId] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // New states for edit confirmation
  const [showEditModal, setShowEditModal] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);

  const [showPopup, setShowPopup] = useState(false)
  const [showMessage_Error, setShowMessage_Error] = useState(false);


  const gapi = import.meta.env.VITE_API_URL;
  const API = `${gapi}/brand/`;

  useEffect(() => {
    console.log('main url: ' + gapi + '/brand')
    loadBrands();
  }, []);


  const loadBrands = async () => {
    try {
      const res = await axiosInstance.get(API + 'list');
      if (res.data?.Success && Array.isArray(res.data.Data)) {
        setBrands(res.data.Data);
      } else {
        setBrands([])
      }
    } catch (err) {
      console.error("Error fetching brands:", err);
      setBrands([])
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

  const handleAdd = async () => {
    if (!brandName.trim()) {
      setShowPopup(true);
      return;
    }

    const newBrand = {
      BrandId: 0,
      BrandName: brandName,
      TBrandName: brandName,
    };

    try {
      const res = await axiosInstance.post(API + 'insert', newBrand, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data?.Success === true) {
        showTempMessage(res.data.Message, 'true')
        await loadBrands();
        setBrandName("");
        setEditingIndex(null);
      } else {
        showTempMessage(res.data?.Message, ' false')
      }
      loadBrands()
      setBrandName('')
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleUpdate = async () => {
    if (!brandName.trim()) {
      alert("Please enter brand name");
      return;
    }

    if (BrandId === 0) {
      alert("Invalid brand selected");
      return;
    }

    const updatedBrand = {
      BrandId: BrandId,
      BrandName: brandName,
      TBrandName: brandName,
    };

    try {
      const res = await axiosInstance.put(API + 'update', updatedBrand, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data?.Success === true) {
        showTempMessage(res.data.Message, 'true');
        await loadBrands();
        setBrandName("");
        setBrandId(0);
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
  const handleEdit = (id) => {
    const b = brands.find((brand) => brand.BrandId === id);
    if (!b) return;
    setBrandToEdit(b);
    setShowEditModal(true);
  };

  // Confirm edit
  const confirmEdit = () => {
    if (!brandToEdit) return;
    setBrandName(brandToEdit.BrandName);
    setBrandId(brandToEdit.BrandId);
    setEditingIndex(brands.indexOf(brandToEdit));
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    if (!brandToDelete) return;

    try {
      const res = await axiosInstance.delete(`${API}delete/${brandToDelete.BrandId}`);
      console.log("DELETE RESPONSE:", res.data);
      setShowDeleteModal(false);
      setBrandToDelete(null);
      if (res.data?.Success === true) {
        showTempMessage(res.data.Message, 'true');
        await loadBrands()
        setBrandId(0)
        setEditingIndex(null);
      } else {
        showTempMessage(res.data?.Message, 'false');
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBrandToDelete(null);
  };

  const filteredBrands = Array.isArray(brands)
    ? brands.filter(
      (item) =>
        item?.BrandName &&
        item.BrandName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={index}
          style={{
            backgroundColor: "#ffc107",
            fontWeight: "bold",
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
    setBrandName('')
    setEditingIndex(null);
  }

  return (
    <div className="container-fluid mt-2">
      <div
        className="card shadow-lg mx-auto"
        style={{ border: "2px solid #6a1b9a", maxWidth: "95%" }}
      >
        {/* Header */}
        <div
          className="card-header "
          style={{ color: "#6a1b9a", padding: "20px", backgroundColor: 'white' }}
        >
          <h4 className="mb-0"><FontAwesomeIcon icon={faTags} className="me-2" />Brand Master</h4>
        </div>

        {/* Body */}
        <div
          className="card-body"
          style={{ height: "calc(100vh - 200px)", overflow: "auto" }}
        >
          <div className="row">
            {/* Left - Form */}
            <div className="col-md-4">


              <div className="mb-3">
                <label className="form-label fw-bold">Brand Name <span className='required'>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Brand Name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <button
                className="btn btn-success btn-md fw-bold text-uppercase"
                onClick={() => {
                  if (editingIndex !== null) {
                    setShowUpdateModal(true);
                  } else {
                    handleAdd();
                  }
                }}
              >
                {editingIndex !== null ? "🛠️Update" : "📋Save"}
              </button>
              <button className='btn btn-md btn-danger m-2'
                onClick={handleReset}
              >
                🔄️RESET
              </button>
            </div>

            {/* Right - Table */}
            <div className="col-md-8 mt-2 mt-md-0">
              <label className="form-label fw-bold">Search for BrandName </label>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "250px" }}
                  placeholder="🔎 Search Brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <h5 className="mb-0" style={{ color: '#6a1b9a' }}>Showing {filteredBrands.length} of {brands.length} Records  </h5>
              </div>

              {filteredBrands.length === 0 ? (
                <p className="text-center text-muted">No records found.</p>
              ) : (
                <div
                  style={{
                    maxHeight: "calc(100vh - 350px)",
                    overflowY: "auto",
                    overflowX: "auto",
                  }}
                >
                  <table className="table table-bordered table-striped text-center align-middle">
                    <thead
                      className="table-light"
                      style={{ position: "sticky", top: 0 }}
                    >
                      <tr>
                        <th>Brand Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBrands.map((item) => (
                        <tr key={item.BrandId}>
                          <td className="text-start">{highlightText(item.BrandName, searchTerm)}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2 fw-bold"
                              onClick={() => handleEdit(item.BrandId)}
                            >
                              🖋️Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm fw-bold"
                              onClick={() => {
                                setBrandToDelete(item);
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
              className="toast-container position-fixed top-0 end-0  pe-3"
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
                      Brand Name must be filled.
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
                      Are you sure you want to delete "
                      {brandToDelete?.BrandName}"?
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
                    <p>Are you sure you want to update "{brandName}"?</p>
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
                      Are you sure you want to edit "{brandToEdit?.BrandName}"?
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

export default BrandMaster;
