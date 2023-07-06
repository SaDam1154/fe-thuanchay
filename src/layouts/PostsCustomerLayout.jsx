import CustomerHeader from './components/CustomerHeader';
import Sidebar from './components/Sidebar';
import Sidebar2 from './components/SidebarPost';
import { useState } from 'react';
function DefaultLayout({ heading, children }) {
    const [search, setSearch] = useState('');

    return (
        <div className="flex items-center justify-center h-screen  overflow-hidden">
            <div className="flex h-screen  flex-1 flex-col">
                <CustomerHeader>{heading}</CustomerHeader>
                <main className="flex-1 p-5">
                    <div className=" h-screen overflow-hidden">
                        <main className="mx-auto grid  grid-cols-3 gap-7  px-7">
                            <div className="col-span-2">{children}</div>
                            <Sidebar2 />
                        </main>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;
