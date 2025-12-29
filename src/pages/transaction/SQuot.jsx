import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



const SQuot = () => {

    const [topData, setTopData] = useState({
        qNo: '',
        qDate: '',
        ledger: '',
        ledgerId: '',
        project: '',
    });

    const [bottomData, setBottomData] = useState({
        sNo: '',
        product: '',
        unit: '',
        brand: '',
        qty: '',
        rate: '',
        marPer: '',
        sRate: '',
        taxable: '',
        vatPer: '',
        vatAmt: '',
        amount: '',
        description: '',
    })

    const [ledgerList, setLedgerList] = useState([]);
    const [ledgerQuery, setLedgerQuery] = useState('');
    const [showLedgerDropdown, setShowLedgerDropdown] = useState(false);

    const [projectList, setProjectList] = useState([]);
    const [projectQuery, setProjectQuery] = useState('');
    const [showProjectDropdown, setShowProjectDropdown] = useState(false);

    const [productList, setProductList] = useState([]);
    const [productQuery, setProductQuery] = useState('');
    const [showProductDropdown, setShowProductDropdown] = useState(false);





    const gapi = import.meta.env.VITE_API_URL;

    useEffect(() => {
        loadLedgers();
        loadProject();
    }, [])

    const loadLedgers = async () => {
        try {
            const res = await axios.get(`${gapi}/ledger`)
            // console.log('ledgers res:',res.data)
            setLedgerList(res.data)
        } catch (err) {
            console.error('Ledger Load Error:', err)
        }
    }

    const loadProject = async () => {
        try {
            const res = await axios.get(`${gapi}/project`)
            console.log('project res:', res.data)
            setProjectList(res.data)
        } catch (err) {
            console.error('Project load error:', err)
        }
    }

    const handleTopChange = (e) => {
        const { name, value } = e.target;
        setTopData((prev) => ({ ...prev, [name]: value }))
    }

    const handleLedgerChange = (e) => {
        const value = e.target.value;
        setLedgerQuery(value);
        setShowLedgerDropdown(true);
    };

    const handleLedgerSelect = (item) => {
        setLedgerQuery(item.LedgerName);
        setTopData(prev => ({
            ...prev,
            ledgerId: item.LedgerId
        }));
        setShowLedgerDropdown(false);
    };

    const filteredLedger = ledgerList.filter(item =>
        item.LedgerName?.toLowerCase().includes(ledgerQuery.toLowerCase())
    );

    const handleProjectChange = (e) => {
        const value = e.target.value;
        setProjectQuery(value);
        setShowProjectDropdown(value.trim() !== '');
    };
    const handleProjectSelect = (item) => {
        setProjectQuery(item.ProjName);
        setTopData(prev => ({
            ...prev,
            projectId: item.ProjId
        }));
        setShowProjectDropdown(false);
    };


    const filteredProject = projectList.filter(item =>
        item.ProjName?.toLowerCase().includes(projectQuery.toLowerCase())
    );






    return (
        <div className='container-fluid mt-2'>
            {/* Card */}
            <div className='card shadow-lg mx-auto'
                style={{
                    border: '2px solid #5d8aa8',
                    width: '95%'
                }}
            >
                {/* card - header */}
                <div
                    className='card-header text-white'
                    style={{
                        backgroundColor: '#5d8aa8',
                        padding: '20px'
                    }}
                >
                    <h4>SQuot</h4>
                </div>
                {/* card-body */}
                <div
                    className='card-body'
                    style={{
                        height: 'calc(100vh - 200px)'
                    }}
                >
                    {/* top row */}
                    <div className='d-flex align-items-center gap-3'>
                        <div style={{ flex: '0 0 100px' }}>
                            <div className='d-flex'>
                                <label className='form-label fw-bold  mb-2 me-2'>QNo</label>
                                <input
                                    type='number'
                                    className='form-control form-control-sm'
                                    name='qNo'
                                    value={topData.qNo}
                                    onChange={handleTopChange}
                                />

                            </div>
                        </div>

                        <div style={{ flex: '0 0 200px' }}>
                            <div className='d-flex align-items-center'>
                                <label
                                    className='form-label fw-bold mb-2 me-2'>Q.Date</label>
                                <input
                                    type='date'
                                    className='form-control form-control-sm'
                                    name='qDate'
                                    value={topData.qDate}
                                    onChange={handleTopChange}
                                />
                            </div>
                        </div>

                        <div style={{ flex: '1 1 700px' }}>
                            <div
                                className="d-flex align-items-center"
                                style={{ position: 'relative', width: '100%' }}
                            >
                                {/* LABEL */}
                                <label
                                    className="form-label fw-bold mb-0 me-2"
                                    style={{ minWidth: '70px' }}
                                >
                                    Ledger
                                </label>

                                {/* INPUT */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Search Ledger..."
                                    value={ledgerQuery}
                                    onChange={handleLedgerChange}
                                    onFocus={() => {
                                        if (ledgerQuery.trim() !== '') setShowLedgerDropdown(true);
                                    }}
                                    onBlur={() => {
                                        setTimeout(() => setShowLedgerDropdown(false), 150);
                                    }}
                                />

                                {/* DROPDOWN */}
                                {showLedgerDropdown && filteredLedger.length > 0 && (
                                    <div
                                        className="position-absolute bg-white border shadow-sm"
                                        style={{
                                            top: '100%',
                                            left: '70px',                 // label width
                                            width: 'calc(100% - 70px)',   // input width
                                            maxHeight: '250px',
                                            overflowY: 'auto',
                                            zIndex: 9999
                                        }}
                                    >
                                        {/* Header */}
                                        <div className="d-flex fw-bold border-bottom bg-light px-2 py-2">
                                            <div className="col-5">Name</div>
                                            <div className="col-3">Place</div>
                                            <div className="col-4">State</div>
                                        </div>

                                        {/* Rows */}
                                        {filteredLedger.map(item => (
                                            <div
                                                key={item.LedgerId}
                                                className="d-flex px-2 py-2 border-bottom"
                                                style={{ cursor: 'pointer' }}
                                                onMouseDown={() => handleLedgerSelect(item)}
                                            >
                                                <div className="col-5">{item.LedgerName}</div>
                                                <div className="col-3">{item.EPlace || '-'}</div>
                                                <div className="col-4">{item.StateName || '-'}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ flex: '0 0 700px' }}>
                            <div
                                className="d-flex align-items-center"
                                style={{ position: 'relative', width: '100%' }}
                            >
                                {/* Label */}
                                <label
                                    className="form-label fw-bold mb-0 me-2"
                                    style={{ minWidth: '60px' }}
                                >
                                    Project
                                </label>

                                {/* Input */}
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name="project"
                                    placeholder="Search Project..."
                                    value={projectQuery}
                                    onChange={handleProjectChange}
                                    // onKeyDown={handleProjectKeyDown}
                                    onFocus={() => projectQuery && setShowProjectDropdown(true)}
                                    onBlur={() => setTimeout(() => setShowProjectDropdown(false), 150)}
                                />

                                {/* Dropdown */}
                                {showProjectDropdown && filteredProject.length > 0 && (
                                    <div
                                        className="position-absolute bg-white border shadow-sm"
                                        style={{
                                            top: '100%',
                                            left: '60px',
                                            width: 'calc(100% - 60px)',
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                            zIndex: 9999
                                        }}
                                    >
                                        <div className="fw-bold border-bottom bg-light px-2 py-2">
                                            Name
                                        </div>

                                        {filteredProject.map((item, index) => (
                                            <div
                                                key={item.ProjId}
                                                className="px-2 py-2 border-bottom"

                                                onMouseDown={() => handleProjectSelect(item)}
                                            >
                                                {item.ProjName}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <hr className='mt-1' />
                    {/* 12 bottom inputs */}
                    <div className='d-flex align-items-center gap-1 mb-0'>
                        <div style={{ flex: '0 0 100px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >S.No</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 320px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Product</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>


                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'>Unit</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 210px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Brand</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Qty</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Rate</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 110px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Mar%</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >SRate</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 '  >Taxable</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>

                        </div>

                        <div style={{ flex: '0 0 100px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 me-2'  >Vat%</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 120px' }}>
                            <div>

                                <label
                                    className="form-label fw-bold mb-2 "
                                    style={{
                                        maxWidth: "70px",
                                        whiteSpace: "normal",
                                        lineHeight: "1.1",

                                    }}
                                >
                                    VatAmt
                                </label>

                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    style={{
                                        flex: "1 1 auto",
                                        minWidth: 0
                                    }}
                                />

                            </div>
                        </div>


                        <div style={{ flex: '0 0 150px' }}>
                            <div >
                                <label
                                    className='form-label fw-bold mb-2 '>Amount</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                />
                            </div>
                        </div>

                    </div>
                    {/* textarea */}
                    <div className='d-flex align-items-center gap-2 mt-1'>
                        <textarea
                            className='form-control form-control-sm mt-1'
                            rows={2}
                            style={{
                                width: '50%'
                            }}
                        />
                        <button className='btn btn-primary btn-sm'>
                            Add
                        </button>
                    </div>

                    {/* custom color line */}
                    <div
                        style={{
                            height: '2px',
                            backgroundColor: '#5d8aa8',
                            marginTop: '8px',
                            marginBottom: '8px'
                        }}
                    ></div>
                    {/* middle container for table row */}

                    <div
                        className="mt-2 px-2 px-md-3"
                        style={{
                            border: '2px solid #5d8aa8',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                            minHeight: '300px',
                            padding: '10px',
                            overflowX: "auto"   // prevents overflow issue
                        }}
                    ></div>

                    {/* Footer final amount display area */}
                    <div
                        className='mt-1 px-3 py-2 d-flex'
                        style={{
                            border: '2px solid #5d8aa8',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                            alignItems: 'stretch'
                        }}
                    >
                        {/* left section */}
                        <div
                            className='d-flex align-items-center pe-3'
                            style={{ borderRight: '2px solid #5d8aa8', minWidth: '140px' }}
                        >
                            <label
                                className='fw-bold me-2 mb-0 '
                                style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                            >
                                Item
                            </label>
                            <input
                                type='text'
                                className='form-control form-control-sm'
                                style={{ width: '80px', height: '28px' }}
                            />
                        </div>

                        {/* middle section 1 */}
                        <div
                            className='d-flex px-3 flex-column justify-content-center'
                            style={{ borderRight: '2px solid #5d8aa8', minWidth: '200px' }}
                        >
                            <div className='d-flex align-items-center mb-2'>
                                <label className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right', width: '90px' }}
                                >Total Amount</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{ width: '300px', height: '28px' }}

                                />
                            </div>

                            <div className='d-flex align-items-center '>
                                <label className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', minWidth: '75px', textAlign: 'right', width: '90px' }}
                                >Vat Amount</label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{ width: '300px', height: '28px' }}
                                />
                            </div>

                        </div>
                        {/* mid section-2 */}
                        <div
                            className='d-flex flex-column px-3 justify-content-center'
                            style={{ borderRight: ' 2px solid #5d8aa8', minWidth: '200px' }}
                        >
                            <div className='d-flex align-items-center mb-2'>
                                <label
                                    className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', textAlign: 'right', minWidth: '75px' }}
                                >
                                    Act Amt
                                </label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{
                                        width: '300px',
                                        height: '28px'
                                    }}
                                />
                            </div>

                            <div className='d-flex align-items-center mb-2'>
                                <label
                                    className='me-2 mb-0 fw-bold'
                                    style={{ fontSize: '0.85rem', textAlign: 'right', minWidth: '75px' }}
                                >
                                    Round Off
                                </label>
                                <input
                                    type='text'
                                    className='form-control form-control-sm'
                                    style={{
                                        width: '300px',
                                        height: '28px'
                                    }}
                                />
                            </div>
                        </div>
                        {/* net amount display part */}

                    </div>

                    {/* terms & condition */}
                    <div className='d-flex flex-wrap gap-1'>
                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Term & Conditions</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                            />
                        </div>

                        <div style={{ flex: '0 0 48%' }}>
                            <label className='form-label fw-bold'>Narration</label>
                            <textarea
                                className='form-control form-control-sm'
                                rows={2}
                            />
                        </div>
                    </div>
                    {/* buttons */}
                    <div
                        className="mt-3 d-flex justify-content-center flex-wrap"
                        style={{ gap: '8px' }}
                    >
                        <button className="btn btn-sm btn-primary">New</button>
                        <button className="btn btn-sm btn-secondary">Edit</button>
                        <button className="btn btn-sm btn-success" >Save</button>
                        <button className="btn btn-sm btn-danger">Find</button>
                        <button className="btn btn-sm btn-warning text-white">Print</button>
                        <button className="btn btn-sm btn-info text-white">Delete</button>
                        <button className="btn btn-sm btn-dark">Reset</button>
                        <button className="btn btn-sm btn-outline-primary">Close</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SQuot;