import React, { useState, useEffect } from "react";

const TestTableDropdown = () => {
    const [count, setCount] = useState(0)
  useEffect(()=>{
    console.log('hello')
    return () =>{
        console.log('Bye')
    }
  },[])

    return (
        <>
            <p>{count}</p>
            <button onClick={()=> setCount(count + 1)}>Increase</button>
        </>

    );
};

export default TestTableDropdown;
