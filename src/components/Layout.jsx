import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '30px' }}>
                <Outlet />
            </div>


        </>

    )
}

export default Layout;

