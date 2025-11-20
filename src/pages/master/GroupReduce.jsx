import React, { useReducer } from 'react';

const initialState = {
    LedgerName: '',
    Add1: '',
    Add2: '',
    ledgers: []
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };

        case "ADD-LEDGER":
            return {
                ...state,
                ledger: [...state.ledgers, action.payload],
                LedgerName: "",
                Add1: "",
                Add2: ""
            }

        default:
            return state;
    }
}


const GroupReduce = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleAdd = () => {
        if (!state.LedgerName) {
            alert("Ledger Name is required");
            return;
        }
        if (!state.Add1) {
            alert("Address 1 is required");
            return;
        }
        if (!state.Add2) {
            alert("Address 2 is required");
            return;
        }
    }
    return (
        <div>
            <h2>Ledger Test</h2>

            <input
                type='text'
                placeholder='Enter Name'
                value={state.LedgerName}
                onChange={(e) => {
                    dispatch({
                        type: 'SET_FIELD',
                        field: 'LedgerName',
                        value: e.target.value,
                    })
                }}
            />

            <p>Current Value: {state.LedgerName}</p>

            <input
                type='text'
                placeholder='Enter Add 1'
                value={state.Add1}
                onChange={(e) => {
                    dispatch({
                        type: 'SET_FIELD',
                        field: 'Add1',
                        value: e.target.value
                    })
                }}
            />
            <p>Current Value: {state.Add1}</p>

            <input
                type='text'
                placeholder='Enter add2'
                value={state.Add2}
                onChange={(e) =>
                    dispatch({
                        type: 'SET_FIELD',
                        field: 'Add2',
                        value: e.target.value,
                    })
                }
            />
            <p>Current Value: {state.Add2}</p>
            <button onClick={handleAdd}>
                Add Ledger
            </button>
        </div>

    )
}

export default GroupReduce;