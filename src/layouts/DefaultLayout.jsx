import Header from './components/Header';
import HeaderAdmin from './components/AdminHeader';
import Sidebar from './components/Sidebar';
import Sidebar2 from './components/SidebarPost';
import { useState } from 'react';
function DefaultLayout({ heading, children }) {
    const [search, setSearch] = useState('');

    return heading !== 'Danh sách bài viết' && heading !== 'Chi tiết bài viết' ? (
        <div className="flex h-screen  overflow-hidden">
            <Sidebar></Sidebar>
            <div className="flex h-screen  flex-1 flex-col">
                <Header>{heading}</Header>
                <main className="flex-1 p-5">{children}</main>
            </div>
        </div>
    ) : (
        <div className="flex h-screen  overflow-hidden">
            <Sidebar></Sidebar>
            <div className="flex h-screen  flex-1 flex-col">
                <Header>{heading}</Header>
                <HeaderAdmin search={search} setSearch={setSearch} />
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
