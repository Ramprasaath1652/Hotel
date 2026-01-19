import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navRef = useRef(null);

    const [openMenu, setOpenMenu] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    /* ---------- one dropdown only open ---------- */
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const handleLogout = () => {
        navigate("/");
    };

    /* ---------- outside click close ---------- */
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    /* ---------- active route ---------- */
    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <nav
            ref={navRef}
            className="navbar navbar-expand-lg navbar-dark bg-airforceblue"
        >
            <div className="container-fluid">
                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu */}
                <div className={`collapse navbar-collapse ${mobileOpen ? "show" : ""}`}>
                    <ul className="navbar-nav me-auto">

                        {/* Home */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/home" ? "active" : ""
                                    }`}
                                to="/home"
                                onClick={() => {
                                    setOpenMenu(null);
                                    setMobileOpen(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faHouse} className="me-2" />
                                Home
                            </Link>
                        </li>


                        {/* Master */}
                        <li className="nav-item dropdown">
                            <span
                                className={`nav-link dropdown-toggle ${openMenu === "master" ? "active" : ""
                                    }`}
                                onClick={() => toggleMenu("master")}
                            >
                                <FontAwesomeIcon icon={faGear} className="me-2" />
                                Master
                            </span>

                            {openMenu === "master" && (
                                <ul className="dropdown-menu show">
                                    <li><Link className="dropdown-item" to="/master/group" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}> <FontAwesomeIcon icon={faUsers} className="me-2" />Group</Link></li>
                                    <li><Link className="dropdown-item" to="/master/brand-master" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faTags} className="me-2" />Brand</Link></li>
                                    <li><Link className="dropdown-item" to="/master/unit" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faRulerCombined} className="me-2" />Unit</Link></li>
                                    <li><Link className="dropdown-item" to="/master/product" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faBox} className="me-2" />Product</Link></li>
                                    <li><Link className="dropdown-item" to="/master/ledger-creation" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faBook} className="me-2" />Ledger</Link></li>
                                    <li><Link className="dropdown-item" to="/master/project-master" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faBriefcase} className="me-2" />Project</Link></li>
                                </ul>
                            )}
                        </li>

                        {/* Transaction */}
                        <li className="nav-item dropdown">
                            <span
                                className={`nav-link dropdown-toggle ${openMenu === "transaction" ? "active" : ""
                                    }`}
                                onClick={() => toggleMenu("transaction")}
                            >
                                <FontAwesomeIcon icon={faArrowRightArrowLeft} className="me-2" />
                                Transaction
                            </span>

                            {openMenu === "transaction" && (
                                <ul className="dropdown-menu show">
                                    {/* <li><Link className="dropdown-item" to="/transaction/suppquotation"><FontAwesomeIcon icon={faFileInvoice} className="me-2" />Supp Quotation</Link></li> */}
                                    <li><Link className="dropdown-item" to="/transaction/squot" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faFileSignature} className="me-2" />SQuot</Link></li>
                                    {/* <li><Link className="dropdown-item" to="/transaction/quotation"><FontAwesomeIcon icon={faFileLines} className="me-2" />Quotation</Link></li> */}
                                    <li><Link className="dropdown-item" to="/transaction/quot" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faReceipt} className="me-2" />Quot</Link></li>
                                    <li><Link className="dropdown-item" to="/transaction/sales" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faCartShopping} className="me-2" />Sales</Link></li>
                                    <li><Link className="dropdown-item" to="/transaction/purchase" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faTruck} className="me-2" />Purchase</Link></li>
                                    <li><Link className="dropdown-item" to="/transaction/stock-entry" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faBoxesStacked} className="me-2" />Stock Entry</Link></li>
                                    <li><Link className="dropdown-item" to="/transaction/stock-decrease" onClick={() => { setOpenMenu(null), setMobileOpen(false) }}><FontAwesomeIcon icon={faArrowDown} className="me-2" />Stock Decrease</Link></li>
                                </ul>
                            )}
                        </li>

                        {/* Accounts */}
                        <li className="nav-item dropdown">
                            <span
                                className={`nav-link dropdown-toggle ${openMenu === "accounts" ? "active" : ""}`}
                                onClick={() => toggleMenu("accounts")}
                            >
                                <FontAwesomeIcon icon={faCircleCheck} className="me-2" /> Accounts
                            </span>
                            {openMenu === "accounts" && (
                                <ul className="dropdown-menu show">
                                    <li><Link className="dropdown-item" to="/accounts/daybook-entry" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faBookOpen} className="me-2" />Daybook Entry</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/receipt" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />Receipt</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/payment" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faMoneyCheckDollar} className="me-2" />Payment</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/customer-balance" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faUserTie} className="me-2" />Customer Balance</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/category-statement" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faLayerGroup} className="me-2" />Category Statement</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/category-balance" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faChartPie} className="me-2" />Category Balance</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/supplier-balance" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faUserGear} className="me-2" />Supplier Balance</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/daybook" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faBook} className="me-2" />Daybook</Link></li>
                                    <li><Link className="dropdown-item" to="/accounts/ledger-statement" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2" />Ledger Statement</Link></li>
                                </ul>
                            )}
                        </li>

                        {/* Report */}
                        <li className="nav-item dropdown">
                            <span
                                className={`nav-link dropdown-toggle ${openMenu === "report" ? "active" : ""}`}
                                onClick={() => toggleMenu("report")}
                            >
                                <FontAwesomeIcon icon={faPrint} className="me-2" /> Report
                            </span>
                            {openMenu === "report" && (
                                <ul className="dropdown-menu show">
                                    <li><Link className="dropdown-item" to="/reports/address" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faAddressBook} className="me-2" />Address</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/gst-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faFileInvoice} className="me-2" />GST Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/receipt-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faReceipt} className="me-2" />Receipt Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/receipt-detail-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faListUl} className="me-2" />Receipt Details Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/payment-reports" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faMoneyCheck} className="me-2" />Payment Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/purchase-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faFileArrowDown} className="me-2" />Purchase Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/sales-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faFileArrowUp} className="me-2" />Sales Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/sales-return" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faRotateLeft} className="me-2" />Sales Return</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/purchase-return" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faRotateRight} className="me-2" />Purchase Return</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/stock-entry-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faBoxes} className="me-2" />Stock Entry Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/outstanding" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faHourglassHalf} className="me-2" />Outstanding</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/credit-note-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faFileCirclePlus} className="me-2" />Credit Note Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/debit-note-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faFileCircleMinus} className="me-2" />Debit Note Report</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/stock" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faWarehouse} className="me-2" />Stock</Link></li>
                                    <li><Link className="dropdown-item" to="/reports/ledgerob-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faFileLines} className="me-2" />Ledger OB Report</Link></li>
                                </ul>
                            )}
                        </li>

                        {/* Admin */}
                        <li className="nav-item dropdown">
                            <span
                                className={`nav-link dropdown-toggle ${openMenu === "admin" ? "active" : ""}`}
                                onClick={() => toggleMenu("admin")}
                            >
                                <FontAwesomeIcon icon={faEye} className="me-2" />
                                Admin
                            </span>

                            {openMenu === "admin" && (
                                <ul className="dropdown-menu show">
                                    <li><Link className="dropdown-item" to="/admin/company" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faBuilding} className="me-2" />Company</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/backup" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faDatabase} className="me-2" />Backup</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/change-password" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faKey} className="me-2" />Change Password</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/user-creation" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faUserPlus} className="me-2" />User Creation</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/rate-changes" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faPercent} className="me-2" />Rate Changes</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/gst-tax-updation" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faFileInvoice} className="me-2" />GST Tax Updation</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/stock-update" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faArrowsRotate} className="me-2" />Stock Update</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/stock-value-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faChartColumn} className="me-2" />Stock Value Report</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/opening-stock-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faBoxOpen} className="me-2" />Opening Stock Report</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/financial-year-change" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faRotateLeft} className="me-2" />Financial Year Change</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/financial-year-creation" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faCalendarPlus} className="me-2" />Financial Year Creation</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/printer-settings" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faPrint} className="me-2" />Printer Settings</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/usermaster" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faUsers} className="me-2" />User Master</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/usertype" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faRulerCombined} className="me-2" />User Type</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/userpermission" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faUserGear} className="me-2" />User Permission</Link></li>



                                </ul>
                            )}
                        </li>

                        {/* Help */}
                        <li className="nav-item dropdown">
                            <span
                                className={`nav-link dropdown-toggle ${openMenu === "help" ? "active" : ""}`}
                                onClick={() => toggleMenu("help")}
                            >
                                <FontAwesomeIcon icon={faHandshakeAngle} className="me-2" />
                                Help
                            </span>

                            {openMenu === "help" && (
                                <ul className="dropdown-menu show">
                                    <li><Link className="dropdown-item" to="/help/gst-sales-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2" />GST Sales Report</Link></li>
                                    <li><Link className="dropdown-item" to="/help/gst-purchase-report" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faFileInvoice} className="me-2" />GST Purchase Report</Link></li>
                                    <li><Link className="dropdown-item" to="/help/product-history" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faClockRotateLeft} className="me-2" />Product History</Link></li>
                                    <li><Link className="dropdown-item" to="/help/about" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><FontAwesomeIcon icon={faCircleInfo} className="me-2" />About</Link></li>
                                </ul>
                            )}
                        </li>


                        {/* Logout */}
                        <li className="nav-item">
                            <span className="nav-link" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" />
                                Logout
                            </span>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
