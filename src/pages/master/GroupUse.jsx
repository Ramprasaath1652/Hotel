import React, { useState, useEffect } from 'react';
import axios from 'axios'

const GroupUse = () => {
    const [pData, setpData] = useState('');
    const [sData, setsData] = useState('');
    const [papi, setPapi] = useState([]);
    const [sapi, setSapi] = useState([]);

   

    const [tempSecondary, setTempSecondary] = useState([]);


    useEffect(() => {
        loadPrimary();
        loadSecondary();
    }, []);

    const loadPrimary = async () => {
        const res = await axios.get("http://192.168.31.101:85/api/tblpdatas");
        // console.log(res.data)
        setPapi(res.data);
    };

    const loadSecondary = async () => {
        const res = await axios.get("http://192.168.31.101:85/api/tblsdatas");
        // console.log(res.data)
        setSapi(res.data);

    };

    const savePrimary = async () => {
        const obj = {
            pid: 0,
            pdata: pData
        };
        const res = await axios.post("http://192.168.31.101:85/api/tblpdatas", obj);
        alert('posted primary success')

        console.log(res)
        const pid = res.data.RefId

        return pid;
    };

    const saveSecondary = async (pid , sData) => {

        const obj = {
            pid: pid,
            sdata: sData,
            sdetsid: 0
        };

        await axios.post("http://192.168.31.101:85/api/tblsdatas", obj);

    };

    const handleAddSecondary = () => {
        if (sData.trim() === "") return;

        // add to local table
        setTempSecondary([...tempSecondary, sData]);

        // clear input
        setsData("");
    };

    const handleSave = async () => {


        const pid = await savePrimary();

        if(!pid){
            alert('primary save failed');
            return;
        }

        for(let item of tempSecondary){
            await saveSecondary(pid,item)
        }

        

        alert(`Saved! PID = ${pid}`);


        loadPrimary();
        loadSecondary();


        setpData("");
        setsData("");
        setTempSecondary([]);
    };



    return (
        <div className='mt-3'>
            <div>
                <label className='form-label'>PData :</label>
                <input
                    type='text'
                    value={pData}
                    onChange={(e) => setpData(e.target.value)}
                />
                {pData}.
            </div>
            <div>
                <label className='form-label'>sData:</label>
                <input
                    type='text'
                    value={sData}
                    onChange={(e) => setsData(e.target.value)}
                />
                <button className='m-2' onClick={handleAddSecondary}>
                    Add
                </button>
            </div>
            <div className='mt-2'>
                <button onClick={handleSave}>
                    Save
                </button>
            </div>

            {/* SECONDARY TABLE */}
            <h5>Secondary Data </h5>
            <table className="table table-bordered w-25">
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

export default GroupUse;