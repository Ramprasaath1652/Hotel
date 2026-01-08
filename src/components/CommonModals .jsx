import React from "react";

const CommonModals = ({
  showDelete,
  showEdit,
  showUpdate,
  showAlert,

  deleteText,
  editText,
  updateText,
  alertText,

  onConfirmDelete,
  onConfirmEdit,
  onConfirmUpdate,
  onClose,
}) => {
  return (
    <>
      {/* ALERT MODAL */}
      {showAlert && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Alert</h5>
                <button className="btn-close" onClick={onClose}></button>
              </div>

              <div className="modal-body text-center">
                <p>{alertText}</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={onClose}>
                  OK
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button className="btn-close" onClick={onClose}></button>
              </div>

              <div className="modal-body">
                <p>{deleteText}</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>
                  No
                </button>
                <button className="btn btn-danger" onClick={onConfirmDelete}>
                  Yes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Confirm Edit</h5>
                <button className="btn-close" onClick={onClose}></button>
              </div>

              <div className="modal-body">
                <p>{editText}</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>
                  No
                </button>
                <button className="btn btn-danger" onClick={onConfirmEdit}>
                  Yes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* UPDATE MODAL */}
      {showUpdate && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Confirm Update</h5>
                <button className="btn-close" onClick={onClose}></button>
              </div>

              <div className="modal-body">
                <p>{updateText}</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>
                  No
                </button>
                <button className="btn btn-primary" onClick={onConfirmUpdate}>
                  Yes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommonModals;
