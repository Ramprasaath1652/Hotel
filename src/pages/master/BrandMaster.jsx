import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const gapi = import.meta.env.VITE_API_URL;
  const API = `${gapi}/brand`;

  useEffect(() => {
    console.log('main url: ' + gapi + '/brand')
    loadBrands();
  }, []);


  const loadBrands = async () => {
    try {
      const res = await axios.get(API);
      setBrands(res.data);
    } catch (err) {
      console.error("Error fetching brands:", err);
      alert("Could not load brands. Please check API connection.");
    }
  };

  const showTempMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
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
      await axios.post(API, newBrand, {
        headers: { "Content-Type": "application/json" },
      });
      loadBrands();
      setBrandName("");
      showTempMessage("Brand added successfully!");
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
      await axios.put(`${API}/${BrandId}`, updatedBrand, {
        headers: { "Content-Type": "application/json" },
      });
      loadBrands();
      setBrandName("");
      setBrandId(0);
      setEditingIndex(null);
      showTempMessage("Brand updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
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
      await axios.delete(`${API}/${brandToDelete.BrandId}`);
      setShowDeleteModal(false);
      setBrandToDelete(null);
      loadBrands();
      showTempMessage("Brand deleted successfully!");
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

  return (
    <div className="container-fluid mt-2">
      <div
        className="card shadow-lg mx-auto"
        style={{ border: "2px solid #5d8aa8", maxWidth: "95%" }}
      >
        {/* Header */}
        <div
          className="card-header text-white"
          style={{ backgroundColor: "#5d8aa8", padding: "20px" }}
        >
          <h4 className="mb-0">Brand Master</h4>
        </div>

        {/* Body */}
        <div
          className="card-body"
          style={{ height: "calc(100vh - 200px)", overflow: "auto" }}
        >
          <div className="row">
            {/* Left - Form */}
            <div className="col-md-4">
              <h5 className="mb-3">
                {editingIndex !== null ? "Edit Brand" : "Add Brand"}
              </h5>

              <div className="mb-3">
                <label className="form-label">Brand Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Brand Name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  if (editingIndex !== null) {
                    setShowUpdateModal(true);
                  } else {
                    handleAdd();
                  }
                }}
              >
                {editingIndex !== null ? "Update" : "Insert"}
              </button>
            </div>

            {/* Right - Table */}
            <div className="col-md-8">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Brand List</h5>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "250px" }}
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                          <td>{item.BrandName}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(item.BrandId)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setBrandToDelete(item);
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
              style={{ zIndex: 9999, minWidth: "300px" }}
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
