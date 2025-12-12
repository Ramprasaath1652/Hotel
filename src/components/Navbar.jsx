import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/"); // go back to login
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-airforceblue">
            <div className="container-fluid">
                {/* Hamburger button for mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {/* Home */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>

                        {/* Master */}
                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                                style={{ cursor: 'pointer' }}
                            >
                                Master</span>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/master/group">Group</Link></li>
                                <li><Link className="dropdown-item" to="/master/group-reducer">Group Reduser</Link></li>
                                <li><Link className="dropdown-item" to="/master/group-use">Group Use</Link></li>
                                <li><Link className="dropdown-item" to="/master/brand-master">Brand Master</Link></li>
                                <li><Link className="dropdown-item" to="/master/unit">Unit</Link></li>
                                <li><Link className="dropdown-item" to="/master/product">Product</Link></li>
                                <li><Link className="dropdown-item" to="/master/ledger-creation">Ledger creation</Link></li>
                                <li><Link className="dropdown-item" to="/master/ledger-reducer">Ledger Reduce</Link></li>
                                <li><Link className="dropdown-item" to="/master/project-master">Project Master</Link></li>
                                <li><Link className="dropdown-item" to="/master/test">Test</Link></li>
                                <li><Link className="dropdown-item" to="/master/test-usestate">State Test</Link></li>
                                <li><Link className="dropdown-item" to="/master/test-reducer">Reducer Test</Link></li>



                            </ul>
                        </li>

                        {/* Transaction */}
                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ cursor: "pointer" }}
                            >
                                Transaction</span>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/transaction/suppquotation">Supp Quotation</Link></li>
                                <li><Link className="dropdown-item" to="/transaction/quotation">Quotation</Link></li>
                                <li><Link className="dropdown-item" to="/transaction/sales">Sales</Link></li>
                                <li><Link className="dropdown-item" to="/transaction/purchase">Purchase</Link></li>
                                <li><Link className="dropdown-item" to="/transaction/stock-entry">Stock Entry</Link></li>
                                <li><Link className="dropdown-item" to="/transaction/stock-decrease">Stock Decrease</Link></li>
                            </ul>
                        </li>

                        {/* Accounts */}
                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ cursor: "pointer" }}

                            >Accounts</span>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/accounts/daybook-entry">Daybook Entry</Link></li>
                                <li><Link className="dropdown-item" to="/accounts/receipt">Receipt</Link></li>
                                <li><Link className="dropdown-item" to="/accounts/payment">Payment</Link></li>
                                <li><Link className="dropdown-item" to="/accounts/customer-balance">Customer Balance</Link></li>
                                <li><Link className="dropdown-item" to="/accounts/category-statement">Category Statement</Link></li>
                                <li><Link className="dropdown-item" to="/accounts/category-balance">Category Balance</Link></li>
                                <li><Link className="dropdown-item" to="/accounts/supplier-balance">Supplier balance</Link></li>
                                <li><Link className="dropdown-item" to="/accounts/daybook">Daybook</Link></li>
                                <li><Link className="dropdown-item" to="/accounts/ledger-statement">Ledger Statement</Link></li>
                            </ul>
                        </li>

                        {/* Report */}
                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ cursor: "pointer" }}

                            >Report</span>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/reports/address">Address</Link></li>
                                <li><Link className="dropdown-item" to="/reports/gst-report">GST Report</Link></li>
                                <li><Link className="dropdown-item" to="/reports/receipt-report">Receipt Report</Link></li>
                                <li><Link className="dropdown-item" to="/reports/receipt-detail-report">Receipt Details Report</Link></li>
                                <li><Link className="dropdown-item" to="/reports/payment-reports">Payment Report</Link></li>
                                <li><Link className="dropdown-item" to="/reports/purchase-report">Purchase Report</Link></li>
                                <li><Link className="dropdown-item" to="/reports/sales-report">Sales Report</Link></li>
                                <li><Link className="dropdown-item" to="/reports/sales-return">Sales Return</Link></li>
                                <li><Link className="dropdown-item" to="/reports/purchase-return">Purchase Return</Link></li>
                                <li><Link className="dropdown-item" to="/reports/stock-entry-report">Stock Entry Report</Link></li>
                                <li><Link className="dropdown-item" to="/reports/outstanding">OutStanding</Link></li>
                                <li><Link className="dropdown-item" to="/reports/credit-note-report"> Credit Note Report</Link></li>
                                <li><Link className="dropdown-item" to="/reports/debit-note-report">Debit Note Report</Link></li>
                                <li><Link className="dropdown-item" to="/reports/stock"> Stock</Link></li>
                                <li><Link className="dropdown-item" to="/reports/ledgerob-report"> Ledger OB Report</Link></li>             
                            </ul>
                        </li>


                        {/* Admin */}
                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ cursor: "pointer" }}

                            >Admin</span>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/admin/company">Company</Link></li>
                                <li><Link className="dropdown-item" to="/admin/backup"> BackUp</Link></li>
                                <li><Link className="dropdown-item" to="/admin/change-password">Change Password</Link></li>
                                <li><Link className="dropdown-item" to="/admin/user-creation">UserCreation</Link></li>
                                <li><Link className="dropdown-item" to="/admin/rate-changes">Rate Changes</Link></li>
                                <li><Link className="dropdown-item" to="/admin/gst-tax-updation">GST Tax Updation</Link></li>
                                <li><Link className="dropdown-item" to="/admin/stock-update">Stock Update</Link></li>
                                <li><Link className="dropdown-item" to="/admin/stock-value-report">Stock Value Report</Link></li>
                                <li><Link className="dropdown-item" to="/admin/opening-stock-report">Opening Stock Report</Link></li>
                                <li><Link className="dropdown-item" to="/admin/financial-year-change">Financial Year Change</Link></li>
                                <li><Link className="dropdown-item" to="/admin/financial-year-creation">Financial Year Creation</Link></li>
                                <li><Link className="dropdown-item" to="/admin/printer-settings">Printer Settings</Link></li>
                                
                            </ul>
                        </li>

                        {/*Help */}

                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                                style={{ cursor: 'pointer' }}
                            >
                                Help</span>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/help/gst-sales-report">GST SALES REPORT</Link></li>
                                <li><Link className="dropdown-item" to="/help/gst-purchase-report">GST PURCHASE REPORT</Link></li>
                                <li><Link className="dropdown-item" to="/help/product-history">Product History</Link></li>
                                <li><Link className="dropdown-item" to="/help/about">About</Link></li>
                                

                            </ul>
                        </li>

                

                        {/* Logout */}
                        <li className="nav-item">
                            <span className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
