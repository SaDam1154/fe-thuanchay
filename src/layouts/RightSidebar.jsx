import Header from './components2/HeaderPink';
import Sidebar from './components2/Sidebar';

function RightSidebar({ children }) {
    return (
        <div className=" h-screen overflow-hidden">
            <Header />
            <main className="mx-auto grid  grid-cols-3 gap-7 py-h-header px-7">
                <div className="col-span-2">{children}</div>
                <Sidebar />
            </main>
        </div>
    );
}

export default RightSidebar;
