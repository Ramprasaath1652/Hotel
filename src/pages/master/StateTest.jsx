import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StateTest = () => {
    const [pData, setpData] = useState('');
    const [sData, setsData] = useState('');
    const [papi, setPapi] = useState([]);
    const [sapi, setSapi] = useState([]);
    const [tempSecondary, setTempSecondary] = useState([])



    useEffect(() => {
        loadPrimary();
        loadSecondary();
    }, [])

    const loadPrimary = async () => {
        const res = await axios.get('http://192.168.31.101:85/api/tblpdatas')
        setPapi(res.data)
    }

    const loadSecondary = async () => {
        const res = await axios.get('http://192.168.31.101:85/api/tblsdatas')
        console.log(res.data)
        setSapi(res.data)
    }



    const savePrimary = async () => {
        const obj = {
            pid: 0,
            pdata: pData

        };
        const res = await axios.post('http://192.168.31.101:85/api/tblpdatas', obj)
        alert('posted priimary table')

        const pid = res.data.RefId;
        return pid;
    }

    const saveSecondary = async (pid , item) => {
        const obj = {
            pid: pid,
            sdata: item,
            sdetsid: 0
        };
        await axios.post('http://192.168.31.101:85/api/tblsdatas', obj)

    }
    const handleAdd = () => {
        if (sData.trim() === '') return;

        setTempSecondary([...tempSecondary, sData]);
        setsData('')
    }

    const handleSave = async () => {
        const pid = await savePrimary();

        if (!pid) {
            alert('primary save failed')
            return
        }

        for (let item of tempSecondary) {
            await saveSecondary(pid, item)
        }

        loadPrimary();
        loadSecondary();

        setpData('')
        setsData('')
        setTempSecondary([]);
    }

    return (
        <div className='mt-3'>
            <label>pData:</label>
            <input
                type='text'
                value={pData}
                onChange={(e) => setpData(e.target.value)}
            />


            <div className='mt-3'>
                <label>sData:</label>
                <input
                    type='text'
                    value={sData}
                    onChange={(e) => setsData(e.target.value)}
                />
                <button className='m-2' onClick={handleAdd}>
                    Add
                </button>
            </div>

            <div className='mt-2'>
                <button onClick={handleSave}>
                    Save
                </button>
            </div>
            <h5>Secondary Data</h5>
            <table className='table table-bordered w-25'>
                <thead>
                    <tr>
                        <th>SData</th>
                    </tr>
                </thead>
                <tbody>
                    {tempSecondary.map((item, i) => (
                        <tr key={i}>
                            <td>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default StateTest;