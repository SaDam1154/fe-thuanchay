import CustomerHeader from './components/CustomerHeader';
import { useState } from 'react';

function CustomerLayout({ heading, children }) {
    return (
        <div className="flex flex-col justify-between h-screen overflow-hidden">
            <div className="grow-0">
                <CustomerHeader>{heading}</CustomerHeader>
            </div>
            <div>
                <main className="grow ">{children}</main>
            </div>
        </div>
    );
}

export default CustomerLayout;
