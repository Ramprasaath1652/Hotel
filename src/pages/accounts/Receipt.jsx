// PaymentVoucherLayout.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LabeledField = ({ label, children, labelWidth = 120 }) => (
  <div className="d-flex align-items-center" style={{ gap: 8 }}>
    <label style={{ minWidth: labelWidth, maxWidth: labelWidth }}>{label}</label>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

const PaymentVoucherLayout = () => {
  return (
    <div className="container-fluid mt-2">
      <div
        className="card shadow-lg mx-auto"
        style={{
          border: "2px solid #5d8aa8",
          maxWidth: "95%",
        }}
      >
        {/* Header */}
        <div
          className="card-header text-white"
          style={{
            backgroundColor: "#5d8aa8",
            padding: "20px 18px",
          }}
        >
          <h4 className="mb-0">Receipt Voucher</h4>
        </div>

        {/* Body */}
        <div
          className="card-body d-flex flex-column"
          style={{
            height: "calc(100vh - 200px)",
            overflow: "hidden",
            padding: 12,
          }}
        >
          {/* Top form area: use two halves */}
          <div className="row" style={{ flex: "0 0 auto", marginBottom: 8 }}>
            {/* LEFT 50% */}
            <div className="col-6">
              <div className="d-flex align-items-center mb-2" style={{ gap: 8 }}>
                <label style={{ width: 90 }}>Receipt No.</label>
                <input type="text" className="form-control" style={{ maxWidth: 110 }} />
                <label style={{ width: 40, marginLeft: 12 }}>Date</label>
                <input type="date" className="form-control" style={{ maxWidth: 170 }} />
              </div>

              <div className="d-flex align-items-center mb-2" style={{ gap: 8 }}>
                <label style={{ width: 90 }}>Ledger Name</label>
                <input type="text" className="form-control" />
              </div>

              <div className="d-flex align-items-center mb-2" style={{ gap: 8 }}>
                <label style={{ width: 90 }}>Amount</label>
                <input type="number" className="form-control" style={{ maxWidth: 220 }} />
                <label style={{ width: 110, marginLeft: 12 }}>Paid Ledger</label>
                <select className="form-control" style={{ maxWidth: 160 }}>
                  <option>Cash</option>
                  <option>Bank</option>
                </select>
              </div>

              <div className="d-flex align-items-center mb-2" style={{ gap: 8 }}>
                <label style={{ width: 90 }}>Narration</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            {/* RIGHT 50% */}
            <div className="col-6">
              <div className="d-flex align-items-center mb-2" style={{ gap: 8 }}>
                <label style={{ width: 90 }}>Type</label>
                <select className="form-control" style={{ maxWidth: 150 }}>
                  <option>New</option>
                  <option>Old</option>
                </select>

                <label style={{ width: 70, marginLeft: 12 }}>Inv No.</label>
                <input type="text" className="form-control" style={{ maxWidth: 140 }} />
              </div>

              <div className="d-flex align-items-center mb-2" style={{ gap: 8 }}>
                <label style={{ width: 90 }}>Balance Amount:</label>
                <div style={{ fontWeight: 700, color: "#b40404" }}>0.00</div>
              </div>

              {/* Buttons row */}
              <div className="d-flex align-items-center gap-2 mt-3">
                <button className="btn btn-light">Edit</button>
                <button className="btn btn-primary">Save</button>
                <button className="btn btn-light">Print</button>
                <button className="btn btn-light">Delete</button>
                <button className="btn btn-light">Reset</button>
                <button className="btn btn-light">Close</button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "3px solid #cfe3ee", marginBottom: 8 }} />

          {/* Bottom listing area (two panels) */}
          <div style={{ flex: 1, display: "flex", gap: 8, minHeight: 0 }}>
            {/* Large left table area */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div style={{ background: "#e6f0f8", padding: "6px 8px", fontWeight: 700, color: "#0b57a4" }}>
                Press F1 To Refresh Collection List
              </div>

              <div style={{ flex: 1, overflow: "auto", border: "1px solid #b9cde0", background: "#fff" }}>
                {/* Table header imitation */}
                <div style={{ display: "flex", background: "#0b62a4", color: "#fff", fontSize: 13 }}>
                  <div style={{ padding: "6px 8px", minWidth: 80 }}>RecNo</div>
                  <div style={{ padding: "6px 8px", minWidth: 120 }}>RecDate</div>
                  <div style={{ padding: "6px 8px", minWidth: 220 }}>Ledger Name</div>
                  <div style={{ padding: "6px 8px", minWidth: 120 }}>InvoiceNo</div>
                  <div style={{ padding: "6px 8px", minWidth: 120 }}>PaidAmount</div>
                  <div style={{ padding: "6px 8px", minWidth: 80 }}>M.O.P</div>
                  <div style={{ padding: "6px 8px", minWidth: 80 }}>Type</div>
                </div>

                {/* placeholder body */}
                <div style={{ padding: 12, minHeight: 200 }}>
                  {/* empty list area */}
                </div>
              </div>
            </div>

            {/* Narrow right panel */}
            <div style={{ width: 320, display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div style={{ background: "#e6f0f8", padding: "6px 8px", fontWeight: 700, color: "#0b57a4", textAlign: "right" }}>
                <span style={{ marginRight: 8 }}>Press Insert Key</span>
                <span style={{ fontWeight: 800, color: "#b40404" }}>0.00</span>
              </div>

              <div style={{ flex: 1, overflow: "auto", border: "1px solid #b9cde0", background: "#fff" }}>
                {/* right table header */}
                <div style={{ display: "flex", background: "#0b62a4", color: "#fff", fontSize: 13 }}>
                  <div style={{ padding: "6px 8px", minWidth: 200 }}>PaidLedgerName</div>
                  <div style={{ padding: "6px 8px", minWidth: 100, textAlign: "right" }}>Amount</div>
                </div>

                {/* placeholder body */}
                <div style={{ padding: 12 }} />
              </div>
            </div>
          </div>

          {/* bottom small footer spacing */}
          <div style={{ height: 6 }} />
        </div>
      </div>
    </div>
  );
};

export default PaymentVoucherLayout;
