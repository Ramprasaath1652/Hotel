import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse, faGear, faArrowRightArrowLeft, faEye, faPrint, faCircleCheck, faHandshakeAngle, faArrowRightFromBracket, faUsers,
    faTags,
    faRulerCombined,
    faBox,
    faBook,
    faBriefcase,
    faFileInvoice,
    faFileSignature,
    faFileLines,
    faReceipt,
    faCartShopping,
    faTruck,
    faBoxesStacked,
    faArrowDown,
    faBookOpen,
    faMoneyBillWave,
    faMoneyCheckDollar,
    faUserTie,
    faLayerGroup,
    faChartPie,
    faUserGear,
    faFileInvoiceDollar, faAddressBook,
    faListUl,
    faMoneyCheck,
    faFileArrowDown,
    faFileArrowUp,
    faRotateLeft,
    faRotateRight,
    faBoxes,
    faHourglassHalf,
    faFileCirclePlus,
    faFileCircleMinus,
    faWarehouse, faBuilding,
    faDatabase,
    faKey,
    faUserPlus,
    faPercent,
    faArrowsRotate,
    faChartColumn,
    faBoxOpen,
    faCalendarPlus,
    faClockRotateLeft,
    faCircleInfo

} from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/"); // go back to login
    };

    return (
        <>

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
                                <Link className="nav-link" to="/home">  <FontAwesomeIcon icon={faHouse} className="me-2" />Home</Link>
                            </li>

                            {/* Master */}
                            <li className="nav-item dropdown" >
                                <span
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                    style={{ cursor: 'pointer' }}
                                >
                                    <FontAwesomeIcon icon={faGear} className="me-2" /> Master</span>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/master/group">  <FontAwesomeIcon icon={faUsers} className="me-2" />Group</Link></li>
                                    <li><Link className="dropdown-item" to="/master/brand-master"> <FontAwesomeIcon icon={faTags} className="me-2" />Brand Master</Link></li>
                                    <li><Link className="dropdown-item" to="/master/unit"> <FontAwesomeIcon icon={faRulerCombined} className="me-2" />Unit</Link></li>
                                    <li><Link className="dropdown-item" to="/master/product"> <FontAwesomeIcon icon={faBox} className="me-2" />Product</Link></li>
                                    <li><Link className="dropdown-item" to="/master/ledger-creation"> <FontAwesomeIcon icon={faBook} className="me-2" />Ledger creation</Link></li>
                                    <li><Link className="dropdown-item" to="/master/project-master"> <FontAwesomeIcon icon={faBriefcase} className="me-2" />Project Master</Link></li>
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
                                    <FontAwesomeIcon icon={faArrowRightArrowLeft} className="me-2" /> Transaction</span>
                                <ul className="dropdown-menu">
                                    {/* <li><Link className="dropdown-item" to="/transaction/suppquotation"><FontAwesomeIcon icon={faFileInvoice} className="me-2" />Supp Quotation</Link></li> */}
                                    <li><Link className="dropdown-item" to="/transaction/squot"><FontAwesomeIcon icon={faFileSignature} className="me-2" />SQuot</Link></li>
                                    {/* <li><Link className="dropdown-item" to="/transaction/quotation"><FontAwesomeIcon icon={faFileLines} className="me-2" />Quotation</Link></li> */}
                                    <li><Link className="dropdown-item" to="/transaction/quot"><FontAwesomeIcon icon={faReceipt} className="me-2" />Quot</Link></li>
                                    <li><Link className="dropdown-item" to="/transaction/sales"><FontAwesomeIcon icon={faCartShopping} className="me-2" />Sales</Link></li>
                                    <li><Link className="dropdown-item" to="/transaction/purchase"><FontAwesomeIcon icon={faTruck} className="me-2" />Purchase</Link></li>
                                    <li><Link className="dropdown-item" to="/transaction/stock-entry"><FontAwesomeIcon icon={faBoxesStacked} className="me-2" />Stock Entry</Link></li>
                                    <li><Link className="dropdown-item" to="/transaction/stock-decrease"><FontAwesomeIcon icon={faArrowDown} className="me-2" />Stock Decrease</Link></li>
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

                                ><FontAwesomeIcon icon={faCircleCheck} className="me-2" />Accounts</span>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/accounts/daybook-entry"><FontAwesomeIcon icon={faBookOpen} className="me-2" />Daybook Entry</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/receipt"><FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />Receipt</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/payment"><FontAwesomeIcon icon={faMoneyCheckDollar} className="me-2" />Payment</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/customer-balance"><FontAwesomeIcon icon={faUserTie} className="me-2" />Customer Balance</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/category-statement"><FontAwesomeIcon icon={faLayerGroup} className="me-2" />Category Statement</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/category-balance"><FontAwesomeIcon icon={faChartPie} className="me-2" />Category Balance</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/supplier-balance"><FontAwesomeIcon icon={faUserGear} className="me-2" />Supplier balance</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/daybook"><FontAwesomeIcon icon={faBook} className="me-2" />Daybook</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/ledger-statement"><FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2" />Ledger Statement</Link></li>
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

                                ><FontAwesomeIcon icon={faPrint} className="me-2" />Report</span>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/reports/address"><FontAwesomeIcon icon={faAddressBook} className="me-2" />Address</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/gst-report"><FontAwesomeIcon icon={faFileInvoice} className="me-2" />GST Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/receipt-report"><FontAwesomeIcon icon={faReceipt} className="me-2" />Receipt Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/receipt-detail-report"><FontAwesomeIcon icon={faListUl} className="me-2" />Receipt Details Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/payment-reports"><FontAwesomeIcon icon={faMoneyCheck} className="me-2" />Payment Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/purchase-report"><FontAwesomeIcon icon={faFileArrowDown} className="me-2" />Purchase Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/sales-report"><FontAwesomeIcon icon={faFileArrowUp} className="me-2" />Sales Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/sales-return"><FontAwesomeIcon icon={faRotateLeft} className="me-2" />Sales Return</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/purchase-return"><FontAwesomeIcon icon={faRotateRight} className="me-2" />Purchase Return</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/stock-entry-report"><FontAwesomeIcon icon={faBoxes} className="me-2" />Stock Entry Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/outstanding"><FontAwesomeIcon icon={faHourglassHalf} className="me-2" />OutStanding</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/credit-note-report"><FontAwesomeIcon icon={faFileCirclePlus} className="me-2" /> Credit Note Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/debit-note-report"><FontAwesomeIcon icon={faFileCircleMinus} className="me-2" />Debit Note Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/stock"><FontAwesomeIcon icon={faWarehouse} className="me-2" /> Stock</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/ledgerob-report"><FontAwesomeIcon icon={faFileLines} className="me-2" /> Ledger OB Report</Link></li>
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

                                ><FontAwesomeIcon icon={faEye} className="me-2" />Admin</span>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin/company"><FontAwesomeIcon icon={faBuilding} className="me-2" />Company</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/backup"><FontAwesomeIcon icon={faDatabase} className="me-2" /> BackUp</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/change-password"><FontAwesomeIcon icon={faKey} className="me-2" />Change Password</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/user-creation"><FontAwesomeIcon icon={faUserPlus} className="me-2" />UserCreation</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/rate-changes"><FontAwesomeIcon icon={faPercent} className="me-2" />Rate Changes</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/gst-tax-updation"><FontAwesomeIcon icon={faFileInvoice} className="me-2" />GST Tax Updation</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/stock-update"><FontAwesomeIcon icon={faArrowsRotate} className="me-2" />Stock Update</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/stock-value-report"><FontAwesomeIcon icon={faChartColumn} className="me-2" />Stock Value Report</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/opening-stock-report"><FontAwesomeIcon icon={faBoxOpen} className="me-2" />Opening Stock Report</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/financial-year-change"><FontAwesomeIcon icon={faRotateLeft} className="me-2" />Financial Year Change</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/financial-year-creation"><FontAwesomeIcon icon={faCalendarPlus} className="me-2" />Financial Year Creation</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/printer-settings"><FontAwesomeIcon icon={faPrint} className="me-2" />Printer Settings</Link></li>

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
                                    <FontAwesomeIcon icon={faHandshakeAngle} className="me-2" /> Help</span>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/help/gst-sales-report"><FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2" />GST SALES REPORT</Link></li>
                                    <li><Link className="dropdown-item" to="/help/gst-purchase-report"><FontAwesomeIcon icon={faFileInvoice} className="me-2" />GST PURCHASE REPORT</Link></li>
                                    <li><Link className="dropdown-item" to="/help/product-history"><FontAwesomeIcon icon={faClockRotateLeft} className="me-2" />Product History</Link></li>
                                    <li><Link className="dropdown-item" to="/help/about"><FontAwesomeIcon icon={faCircleInfo} className="me-2" />About</Link></li>

                                </ul>
                            </li>



                            {/* Logout */}
                            <li className="nav-item">
                                <span className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}><FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" />Logout</span>
                            </li>





                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
