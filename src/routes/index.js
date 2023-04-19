import Home from '../pages/Home';
import Products from '../pages/Products';
import AddProduct from '../pages/AddProduct';
const publicRoutes = [
    {
        path: '/',
        component: Home,
        props: {
            heading: 'Trang chủ',
        },
    },

    // ORDER
    {
        path: '/order',
        component: Home,
        props: {
            heading: 'Danh sách hoá đơn',
        },
    },

    {
        path: '/order/add',
        component: Home,
        props: {
            heading: 'Đặt thêm sản phẩm',
        },
    },
    {
        path: '/order/detail/:id',
        component: Home,
        props: {
            heading: 'Chi tiết hoá đơn',
        },
    },
    {
        path: 'order/statistic',
        component: Home,
        props: {
            heading: 'Thống kê',
        },
    },

    // PRODUCT
    {
        path: '/product',
        component: Products,
        props: {
            heading: 'Danh sách sản phẩm',
        },
    },
    {
        path: '/product/detail/:id',
        component: Home,
        props: {
            heading: 'Chi tiết sản phẩm',
        },
    },
    {
        path: '/product/add',
        component: AddProduct,
        props: {
            heading: 'Thêm sản phẩm',
        },
    },
    {
        path: '/product/update/:id',
        component: Home,
        props: {
            heading: 'Chỉnh sửa sản phẩm',
        },
    },
    {
        path: '/product/views',
        component: Home,
        props: {
            heading: 'Danh sách sản phẩm dạng lưới',
        },
    },

    // PRODUCT TYPE
    {
        path: '/product-type',
        component: Home,
        props: {
            heading: 'Danh sách loại cây',
        },
    },
    {
        path: '/product-type/add',
        component: Home,
        props: {
            heading: 'Thêm mới loại sản phẩm',
        },
    },
    {
        path: '/product-type/detail/:id',
        component: Home,
        props: {
            heading: 'Chi tiết loại sản phẩm',
        },
    },
    {
        path: '/product-type/update/:id',
        component: Home,
        props: {
            heading: 'Chỉnh sửa loại sản phẩm',
        },
    },
    // Post
    {
        path: '/post',
        component: Home,
        props: {
            heading: 'Danh sách bài viết',
        },
    },
    {
        path: '/post/detail/:id',
        component: Home,
        props: {
            heading: 'Chi tiết bài viết',
        },
    },
    {
        path: '/post/add',
        component: Home,
        props: {
            heading: 'Thêm bài viết',
        },
    },
    {
        path: '/post/update/:id',
        component: Home,
        props: {
            heading: 'Chỉnh sửa bài viết',
        },
    },
    {
        path: '/post/views',
        component: Home,
        props: {
            heading: 'Danh sách bài viết dạng lưới',
        },
    },
    // CUSTOMER
    {
        path: '/customer',
        component: Home,
        props: {
            heading: 'Khách hàng',
        },
    },
    {
        path: '/customer/detail/:id',
        component: Home,
        props: {
            heading: 'Chi tiết khách hàng',
        },
    },
    {
        path: '/customer/add',
        component: Home,
        props: {
            heading: 'Thêm khách hàng',
        },
    },
    {
        path: '/customer/update/:id',
        component: Home,
        props: {
            heading: 'Chỉnh sửa khách hàng',
        },
    },
    // Account
    {
        path: '/account',
        component: Home,
        props: {
            heading: 'Tài khoản',
        },
    },
    {
        path: '/account/add',
        component: Home,
        props: {
            heading: 'Thêm tài khoản',
        },
    },
    {
        path: '/account/update/:id',
        component: Home,
        props: {
            heading: 'Chỉnh sửa tài khoản',
        },
    },
    {
        path: '/account/detail/:id',
        component: Home,
        props: {
            heading: 'Chi tiết tài khoản',
        },
    },

    // *****

    {
        path: '/login',
        // layout: FullLayout,
        component: Home,
    },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
