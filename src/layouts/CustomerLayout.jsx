import CustomerHeader from './components/CustomerHeader';
import CustomerFooter from './components/CustomerFooter';

import { useState } from 'react';
function CustomerLayout({ heading, children }) {
    return (
        <div className="flex flex-col h-screen">
            <div className="grow-0">
                <CustomerHeader>{heading}</CustomerHeader>
            </div>
            <div>
                <main className="grow ">{children}</main>
            </div>
            <div className="grow-0">
                <CustomerFooter>{heading}</CustomerFooter>
            </div>
        </div>
    );
}

export default CustomerLayout;
