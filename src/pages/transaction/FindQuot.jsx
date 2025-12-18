import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
    qId: '',
    data: [],
    loading: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_QID':
            return { ...state, qId: action.value };
        case 'LOADING':
            return { ...state, loading: true };
        case 'SET_DATA':
            return{ }
    }

}

const FindQuot = () => {
    return (
        <div className="find-overlay ">

            <div className="find-container">
                <div className=' text-white px-3 py-2 align-item-center' style={{ backgroundColor: '#5d8aa8' }}>
                    <h6 className='mb-0 '>Quotation</h6>
                </div>
                <div className='mt-3'>
                    <input
                        type='text'
                        className='form-control form-control-sm'
                        placeholder='Search for Quotation...'
                        style={{
                            width: '50%'
                        }}
                    />
                </div>
                <div
                    className="mt-3 px-2 px-md-3"
                    style={{
                        border: '1px solid #5d8aa8',
                        borderRadius: '5px',
                        backgroundColor: '#fff',
                        minHeight: '500px',
                        padding: '10px',
                        overflowX: "auto"   // prevents overflow issue
                    }}

                >

                    <div className='mt-2' style={{ width: '100%' }}>
                        {/* future content */}
                        <table className="table table-bordered table-sm" style={{ fontSize: "12px", minWidth: "900px" }}>
                            <thead className="table-light">
                                <tr>
                                    <th style={{ width: "60px" }} className="text-center">Q.No</th>
                                    <th style={{ width: "80px" }} className='text-center'>Q.Date</th>
                                    <th style={{ width: "120px" }} className="text-center">Project</th>
                                    <th style={{ width: "120px" }} className='text-center'>Ledger</th>
                                    <th style={{ width: "70px" }} className="text-center">Act amount</th>
                                    <th style={{ width: "100px" }} className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className="text-center">1</td>
                                    <td className="text-center">16/12/2025</td>
                                    <td className="text-center">Billing</td>
                                    <td className="text-center">harsha</td>
                                    <td className="text-center">450</td>
                                    <td className="text-center"></td>



                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className='mt-4 text-end'>
                    <button className='btn btn-sm btn-danger' onClick={() => window.history.back()}>
                        Close
                    </button>
                </div>

            </div>

        </div>
    );
};

export default FindQuot;
