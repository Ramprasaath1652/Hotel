import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginCard from './components/LoginCard';
//pages
import Home from './pages/Home';

//Master section
import Layout from './components/Layout';
import Group from './pages/master/Group';
import GroupReduce from './pages/master/GroupReduce';
import BrandMaster from './pages/master/BrandMaster';
import Unit from './pages/master/Unit';
import Product from './pages/master/Product';
import LedgerCreation from './pages/master/LedgerCreation';
import ProjectMaster from './pages/master/ProjectMaster';
import LedgerReduce from './pages/master/LedgerReduce';
import Test from './pages/master/test';

//Transaction Master
import SuppQuotation from './pages/transaction/SuppQuotation';
import Quotation from './pages/transaction/Quotation';
import Sales from './pages/transaction/Sales';
import Purchase from './pages/transaction/Purchase';
import StockEntry from './pages/transaction/StockEntry';
import StockDecrease from './pages/transaction/StockDecrease';

//Accounts
import DaybookEntry from './pages/accounts/DaybookEntry';
import Receipt from './pages/accounts/Receipt';
import Payment from './pages/accounts/Payment';
import CustomerBalance from './pages/accounts/CustomerBalance';
import CategoryBalance from './pages/accounts/CategoryBalance';
import CategoryStatement from './pages/accounts/CategoryStatement';
import SupplierBalance from './pages/accounts/SupplierBalance';
import Daybook from './pages/accounts/Daybook';
import LedgerStatement from './pages/accounts/LedgerStatement';


//Reports
import Address from './pages/reports/Address';
import GSTReport from './pages/reports/GSTReport';
import ReceiptReport from './pages/reports/ReceiptReport';
import ReceiptDetailsReport from './pages/reports/ReceiptDetailsReport';
import PaymentReports from './pages/reports/PaymentReports';
import PurchaseReport from './pages/reports/PurchaseReport';
import SalesReport from './pages/reports/SalesReport';
import SalesReturn from './pages/reports/SalesReturn';
import PurchaseReturn from './pages/reports/PurchaseReturn';
import StockEntryReport from './pages/reports/StockEntryReport';
import OutStanding from './pages/reports/OutStanding';
import CreditNoteReport from './pages/reports/CreditNoteReport';
import DebitNoteReport from './pages/reports/DebitNoteReport';
import Stock from './pages/reports/Stock';
import LedgerOBReport from './pages/reports/LedgerOBReport';

//Admin
import Company from './pages/admin/Company';
import BackUp from './pages/admin/BackUp';
import ChangePassword from './pages/admin/ChangePassword';
import UserCreation from './pages/admin/UserCreation';
import RateChanges from './pages/admin/RateChanges';
import GSTTaxUpdation from './pages/admin/GSTTaxUpdation';
import StockUpdate from './pages/admin/StockUpdate';
import StockValueReport from './pages/admin/StockValueReport';
import OpeningStockReport from './pages/admin/OpeningStockReport';
import FinancialYearChange from './pages/admin/FinancialYearChange';
import FinancialYearCreation from './pages/admin/FinancialYearCreation';
import PrinterSettings from './pages/admin/PrinterSettings';

//Help
import GSTSalesReport from './pages/help/GSTSalesReport';
import GSTPurchaseReport from './pages/help/GSTPurchaseReport';
import ProductHistory from './pages/help/ProductHistory';
import About from './pages/help/About';





const App = ()=>{
    return(
     <Router>
        <Routes>
            <Route path='/' element={<LoginCard/>} />
            <Route element ={<Layout/>}>
             <Route path='/home' element={<Home />}/>

             {/*Master Section */}
             <Route path='/master/group' element={<Group/>} />
             <Route path='/master/group-reducer' element={<GroupReduce/>} />
             <Route path='/master/brand-master' element={<BrandMaster/>} />
             <Route path='/master/unit' element={<Unit/>} />
             <Route path='/master/product' element={<Product/>} />
             <Route path='/master/ledger-creation' element={<LedgerCreation/>} />
             <Route path='/master/ledger-reducer' element={<LedgerReduce/>} />
             <Route path='/master/project-master' element={<ProjectMaster/>} />
             <Route path='/master/test' element={<Test/>} />

             {/* Transaction Master */}
             <Route path='/transaction/supp-quotation' element={<SuppQuotation/>} />
             <Route path='/transaction/quotation' element={<Quotation/>} />
             <Route path='/transaction/sales' element={<Sales/>} />
             <Route path='/transaction/purchase' element={<Purchase/>} />
             <Route path='/transaction/stock-entry' element={<StockEntry/>} />
             <Route path='/transaction/stock-decrease' element={<StockDecrease/>} />

             {/* Accounts*/}
             <Route path='/accounts/daybook-entry' element={<DaybookEntry/>} />
             <Route path='/accounts/receipt' element={<Receipt/>} />
             <Route path='/accounts/payment' element={<Payment/>} />
             <Route path='/accounts/customer-balance' element={<CustomerBalance/>} />
             <Route path='/accounts/category-statement' element={<CategoryStatement/>} />
             <Route path='/accounts/category-balance' element={<CategoryBalance/>} />
             <Route path='/accounts/supplier-balance' element={<SupplierBalance/>} />
             <Route path='/accounts/daybook' element={<Daybook/>} />
             <Route path='/accounts/ledger-statement' element={<LedgerStatement/>} />

             {/* Reports */}
             <Route path='/reports/address' element={<Address/>} />
             <Route path='/reports/gst-report' element={<GSTReport/>} />
             <Route path='/reports/receipt-report' element={<ReceiptReport/>} />
             <Route path='/reports/receipt-detail-report' element={<ReceiptDetailsReport/>} />
             <Route path='/reports/payment-reports' element={<PaymentReports/>} />
             <Route path='/reports/purchase-report' element={<PurchaseReport/>} />
             <Route path='/reports/sales-report' element={<SalesReport/>} />
             <Route path='/reports/sales-return' element={<SalesReturn/>} />
             <Route path='/reports/purchase-return' element={<PurchaseReturn/>} />
             <Route path='/reports/stock-entry-report' element={<StockEntryReport/>} />
             <Route path='/reports/outstanding' element={<OutStanding/>} />
             <Route path='/reports/credit-note-report' element={<CreditNoteReport/>} />
             <Route path='/reports/debit-note-report' element={<DebitNoteReport/>} />
             <Route path='/reports/stock' element={<Stock/>} />
             <Route path='/reports/ledgerob-report' element={<LedgerOBReport/>} />

             {/* Admin */}
             <Route path='/admin/company' element={<Company/>} />
             <Route path='/admin/backup' element={<BackUp/>} />
             <Route path='/admin/change-password' element={<ChangePassword/>} />
             <Route path='/admin/user-creation' element={<UserCreation/>} />
             <Route path='/admin/rate-changes' element={<RateChanges/>} />
             <Route path='/admin/gst-tax-updation' element={<GSTTaxUpdation/>} />
             <Route path='/admin/stock-update' element={<StockUpdate/>} />
             <Route path='/admin/stock-value-report' element={<StockValueReport/>} />
             <Route path='/admin/opening-stock-report' element={<OpeningStockReport/>} />
             <Route path='/admin/financial-year-change' element={<FinancialYearChange/>} />
             <Route path='/admin/financial-year-creation' element={<FinancialYearCreation/>} />
             <Route path='/admin/printer-settings' element={<PrinterSettings/>} />

             {/* Help */}
             <Route path='/help/gst-sales-report' element={<GSTSalesReport/>} />
             <Route path='/help/gst-purchase-report' element={<GSTPurchaseReport/>} />
             <Route path='/help/product-history' element={<ProductHistory/>} />
             <Route path='/help/about' element={<About/>} />




            </Route>
        </Routes>
     </Router>
    )
}

export default App;