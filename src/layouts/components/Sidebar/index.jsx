import GroupMenu from './GroupMenu';

const groupMenus = [
    {
        main: {
            iconClassname: 'fa-solid fa-house',
            text: 'Trang chủ',
            link: '/admin/',
        },
    },
    {
        main: {
            iconClassname: 'fa-solid fa-clipboard',
            text: 'Đơn hàng',
            link: '/admin/order',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Chốt đơn',
                link: '/acc',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
            },
            {
                iconClassname: 'fa-solid fa-table',
                text: 'Thống kê',
                link: '/statistic',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-box-open',
            text: 'Sản phẩm',
            link: '/admin/product',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
            },
        ],
    },

    {
        main: {
            iconClassname: 'fa-solid fa-boxes-stacked',
            text: 'Loại sản phẩm',
            link: '/admin/product-type',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-box-open',
            text: 'Bài viết',
            link: '/admin/posts',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-users',
            text: 'Khách hàng',
            link: '/admin/customer',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
            },
        ],
    },

    {
        main: {
            iconClassname: ' fa-solid fa-user',
            text: 'Tài khoản',
            link: '/admin/account',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
            },
        ],
    },
];

function Sidebar() {
    return (
        <div className="flex h-full min-w-[240px] flex-col bg-blue-500">
            <header className="mb-8 flex h-16 w-full select-none flex-col items-center justify-center text-white">
                <div className="text-lg font-extrabold">QUẢN LÝ</div>
                <div className="font-bold">Thực Phẩm Sạch</div>
            </header>

            <ul className="flex flex-1 select-none flex-col space-y-0.5 p-2 " style={{ overflowY: 'overlay' }}>
                {groupMenus.map((groupMenu, index) => (
                    <GroupMenu key={index} groupMenu={groupMenu} />
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
