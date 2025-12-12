import React, { useReducer, useEffect } from 'react';
import axios from 'axios'

const initialState = {
    pData: '',
    sData: '',
    papi: [],
    sapi: [],
    tempSecondary: []
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_PDATA':
            return { ...state, pData: action.value }
        case 'SET_SDATA':
            return { ...state, sData: action.value }
        case 'LOAD_PRIMARY':
            return { ...state, papi: action.value }
        case 'LOAD_SECONDARY':
            return { ...state, sapi: action.value }
        case 'ADD_SECONDARY':
            return {
                ...state,
                tempSecondary: [...state.tempSecondary, state.sData],
                sData: ''
            }
        case 'CLEAR_ALL':
            return {
                ...state,
                pData: '',
                sData: '',
                tempSecondary: []
            }
        default:
            return state;
    }

}

const ReducerTest = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        loadPrimary();
        loadSecondary();
    }, [])

    const loadPrimary = async () => {
        const res = await axios.get("http://192.168.31.101:85/api/tblpdatas")
        dispatch({ type: 'LOAD_PRIMARY', value: res.data })
    }

    const loadSecondary = async () => {
        const res = await axios.get("http://192.168.31.101:85/api/tblpdatas")
        dispatch({ type: 'LOAD_SECONDARY', value: res.data })
    }

    const savePrimary = async () => {
        const body = {
            pid: 0,
            pdata: state.pData
        }

        const res = await axios.post("http://192.168.31.101:85/api/tblpdatas", body);
        alert('primary saved')
        console.log(res.data)
        const pid = res.data.RefId;
        return pid;
    }

    const saveSecondary = async (pid, sData) => {
        const body = {
            pid: pid,
            sdata: sData,
            sdetsid: 0
        }

        const res = await axios.post('http://192.168.31.101:85/api/tblsdatas', body);
        return res.data;
    }

    const handleSave = async () => {
        const pid = await savePrimary();

        if (!pid) {
            alert("Primary save failed");
            return;
        }

        // save all secondary rows
        for (let item of state.tempSecondary) {
            await saveSecondary(pid, item);
        }

       

        loadPrimary();
        loadSecondary();

        dispatch({ type: "CLEAR_ALL" });
    };

    return (
        <div className='mt-3'>
            <label className='form-label'>pData:</label>
            <input
                type='text'
                value={state.pData}
                onChange={(e) =>
                    dispatch({ type: 'SET_PDATA', value: e.target.value })
                }
            />
            {state.pData}
            <div>
                <label>sData</label>
                <input
                    type='text'
                    value={state.sData}
                    onChange={(e) => {
                        dispatch({ type: 'SET_SDATA', value: e.target.value })
                    }}
                />
                {state.sData}
                <button className='m-2' onClick={() => dispatch({ type: 'ADD_SECONDARY' })}>
                    Add
                </button>
            </div>
            <div className="mt-2">
                <button onClick={handleSave}>Save</button>
            </div>
            <h5>Secondary Data</h5>
            <table className="table table-bordered w-25">
                <thead>
                    <tr>
                        <th>SData</th>
                    </tr>
                </thead>
                <tbody>
                    {state.tempSecondary.map((item, i) => (
                        <tr key={i}>
                            <td>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ReducerTest;