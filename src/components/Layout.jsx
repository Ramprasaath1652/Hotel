import React from 'react';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const noNavbarRoutes = [
        '/reports',
        '/pdf-viewer',
        '/print-preview'
    ];

    const hideNavbar = noNavbarRoutes.some(route =>
        location.pathname.startsWith(route)
    );
    return (
        <>
            {!hideNavbar  && <Navbar />}
            <div>
                <Outlet />
            </div>


        </>

    )
}

export default Layout;

