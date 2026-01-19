import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';


const Company = () => {

    const [Company, setCompany] = useState({
        CompanyId: '',
        CompanyName: '',
        Add1: '',
        Add2: '',
        Place: '',
        Pincode: '',
        State: '',
        District: '',
        Mobile: '',
        Phone: '',
        FssaiNo: '',
        City: '',
        Pin: '',
        Tinno: '',
        GSTinNo: '',
    })

    useEffect(() => {
        loadCompany();
    }, [])

    const loadCompany = async () => {
        try {
            const res = await axios.get('http://192.168.31.101:85/api/companies')
            console.log('api data:', res.data)
            setCompany(res.data[0])
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const updateCompany = async () => {
        try {
            const payload = {
                CompanyId: Company.CompanyId,
                CompanyName: Company.CompanyName,
                Add1: Company.Add1,
                Add2: Company.Add2,
                City: Company.City,
                Pin: Company.Pin,
                State: Company.State,
                District: Company.District,
                Mobile: Company.Mobile,
                Phone: Company.Phone,
                Tinno: Company.Tinno
            }

            const res = await axios.put('http://192.168.31.101:85/api/companies/1', payload);
            alert('Company updated successfully ✅')
            console.log('Update response:', res.data);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='container-fluid mt-2'>
            <div
                className='card mx-auto shadow-lg'
                style={{
                    border: '2px solid #6a1b9a',
                    maxWidth: '95%'
                }}
            >
                {/* Header */}
                <div className='card-header'
                    style={{
                        color: '#6a1b9a',
                        padding: '20px',
                        backgroundColor: 'white'
                    }}
                >
                    <h4 ><FontAwesomeIcon icon={faBuilding} className="me-2" />Company Profile</h4>
                </div>
                {/* Body */}
                <div
                    className='card-body'
                    style={{ height: 'calc(100vh - 250px)', overflow: 'auto' }}
                >
                    <div className="row mb-2">
                        <div className="col-md-12 d-flex align-items-center">
                            <label className="col-md-2 form-label fw-bold text-nowrap mb-0">
                                Company Name <span className="required">*</span>
                            </label>
                            <div className="col-md-10">
                                <input type="text"
                                    name='CompanyName'
                                    value={Company.CompanyName}
                                    onChange={handleChange}
                                    className="form-control"
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-md-12 d-flex align-items-center">
                            <label className="col-md-2 form-label fw-bold text-nowrap mb-0">
                                Address 1 <span className="required">*</span>
                            </label>
                            <div className="col-md-10">
                                <input
                                    value={Company.Add1}
                                    type="text" className="form-control"
                                    onChange={handleChange}
                                    autoComplete='off'
                                    name="Add1"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-md-12 d-flex align-items-center">
                            <label className="col-md-2 form-label fw-bold text-nowrap mb-0">
                                Address 2 <span className="required">*</span>
                            </label>
                            <div className="col-md-10">
                                <input
                                    name="Add2"
                                    value={Company.Add2}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </div>


                    <div className="row mb-2">
                        <div className="col-md-6 d-flex align-items-center">
                            <label className="col-md-4 form-label fw-bold text-nowrap mb-0">
                                Place <span className="required">*</span>
                            </label>
                            <div className="col-md-8">
                                <input
                                    name="City"
                                    value={Company.City}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control "
                                    autoComplete='off'
                                />
                            </div>
                        </div>

                        <div className="col-md-6 d-flex align-items-center">
                            <label className="col-md-4 form-label fw-bold text-nowrap mb-0">
                                PinCode <span className="required">*</span>
                            </label>
                            <div className="col-md-8">
                                <input
                                    name="Pin"
                                    value={Company.Pin}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control "
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </div>


                    <div className="row mb-2">
                        <div className="col-md-6 d-flex align-items-center">
                            <label className="col-md-4 form-label fw-bold mb-0">State <span className="required">*</span></label>
                            <div className="col-md-8">
                                <input
                                    name="State"
                                    value={Company.State}
                                    onChange={handleChange}
                                    className="form-control "
                                    autoComplete='off'
                                />
                            </div>
                        </div>

                        <div className="col-md-6 d-flex align-items-center">
                            <label className="col-md-4 form-label fw-bold mb-0">District <span className="required">*</span></label>
                            <div className="col-md-8">
                                <input
                                    name="District"
                                    value={Company.District}
                                    onChange={handleChange}
                                    className="form-control "
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-md-6 d-flex align-items-center">
                            <label className="col-md-4 form-label fw-bold mb-0">Mobile <span className="required">*</span></label>
                            <div className="col-md-8">
                                <input
                                    name="Mobile"
                                    value={Company.Mobile}
                                    onChange={handleChange}
                                    className="form-control "
                                    autoComplete='off'
                                />
                            </div>
                        </div>

                        <div className="col-md-6 d-flex align-items-center">
                            <label className="col-md-4 form-label fw-bold mb-0">Phone <span className="required">*</span></label>
                            <div className="col-md-8">
                                <input
                                    name="Phone"
                                    value={Company.Phone}
                                    onChange={handleChange}
                                    className="form-control "
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-md-12 d-flex align-items-center">
                            <label className="col-md-2 form-label fw-bold text-nowrap mb-0">
                                GSTin No<span className="required">*</span>
                            </label>
                            <div className="col-md-10">
                                <input type="text"
                                    name='Tinno'
                                    value={Company.Tinno}
                                    onChange={handleChange}
                                    className="form-control"
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className=" d-flex mt-3">
                <button className='btn btn-primary fw-bold ms-5' onClick={updateCompany}>
                    📋 Update
                </button>
            </div>
        </div>

    )
}

export default Company;