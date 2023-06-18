// Layouts
import FullLayout from '../layouts/FullLayout';
import OnlyHeaderLayout from '../layouts/OnlyHeaderLayout2';
import DefaultLayout from '../layouts/DefaultLayout';
import CustomerLayout from '../layouts/CustomerLayout';

// Pages ADMIN
import Home from '../pages/Home';
import Order from '../pages/Order';
import Accounts from '../pages/Account';
import AddAccount from '../pages/AddAccount';
import DetailAccount from '../pages/DetailAccount';
import UpdateAccount from '../pages/UpdateAccount';
import AddOrder from '../pages/AddOrder';
import Products from '../pages/Products';
import AddProduct from '../pages/AddProduct';
import ProductType from '../pages/ProductType';
import ProductsView from '../pages/ProductsView';
import Customers from '../pages/Customers';
import Statistic from '../pages/Statistic';
import DetailProduct from '../pages/DetailProduct';
import DetailCustomer from '../pages/DetailCustomer';
import Login from '../pages/Login';
import Roles from '../pages/Roles';
import AddRole from '../pages/AddRole';
import UpdateRole from '../pages/UpdateRole';
import UpdateProduct from '../pages/UpdateProduct';
import AddCustomer from '../pages/AddCustomer';
import UpdateCustomer from '../pages/UpdateCustomer';
import AddProductType from '../pages/AddProductType';
import DetailProductType from '../pages/DetailProductType';
import UpdateProductType from '../pages/UpdateProductType';
import DetailOrder from '../pages/DetailOrder';
import DetailRole from '../pages/DetailRole';
import Posts from '../pages/Posts';
import AddPost from '../pages/AddPost';
import UpdatePost from '../pages/UpdatePost';
import DetailPost from '../pages/DetailPost';

//PAGE CUSTOMER
import HomeCustomer from '../pages/AAACUSTOMER/HomeCustomer';
import ShopCustomer from '../pages/AAACUSTOMER/ShopCustomer';
import ProductTypeCustomer from '../pages/AAACUSTOMER/ProductTypeCustomer';
import ContactCustomer from '../pages/AAACUSTOMER/ContactCustomer';
import DetailProductCustomeer from '../pages/AAACUSTOMER/HomeCustomer';

// Public routes
const publicRoutes = [
    //CUSTOMER HOME
    {
        path: '/',
        component: HomeCustomer,
        layout: CustomerLayout,
        props: {
            heading: 'Trang chủ',
        },
    },
    //CUSTOMER SHOP
    {
        path: '/shop',
        component: ShopCustomer,
        layout: CustomerLayout,
        props: {
            heading: 'Shop',
        },
    },
    //CUSTOMER SHOP
    {
        path: '/product-type',
        component: ProductTypeCustomer,
        layout: CustomerLayout,
        props: {
            heading: 'Danh mục',
        },
    },
    //CUSTOMER contact
    {
        path: '/contact',
        component: ContactCustomer,
        layout: CustomerLayout,
        props: {
            heading: 'Liên hệ',
        },
    },
];

const privateRoutes = [
    //ADMIN HOME
    {
        path: '/admin/',
        component: Home,
        props: {
            heading: 'Trang chủ',
        },
    },

    // ORDER
    {
        path: '/admin/order',
        component: Order,
        props: {
            heading: 'Danh sách hoá đơn',
        },
    },

    {
        path: '/admin/order/add',
        component: AddOrder,
        props: {
            heading: 'Đặt thêm sản phẩm',
        },
    },
    {
        path: '/admin/order/detail/:id',
        component: DetailOrder,
        props: {
            heading: 'Chi tiết hoá đơn',
        },
    },
    {
        path: '/admin/order/statistic',
        component: Statistic,
        props: {
            heading: 'Thống kê',
        },
    },

    // PRODUCT
    {
        path: '/admin/product',
        component: Products,
        props: {
            heading: 'Danh sách sản phẩm',
        },
    },
    {
        path: '/admin/product/detail/:id',
        component: DetailProduct,
        props: {
            heading: 'Chi tiết sản phẩm',
        },
    },
    {
        path: '/admin/product/add',
        component: AddProduct,
        props: {
            heading: 'Thêm sản phẩm',
        },
    },
    {
        path: '/admin/product/update/:id',
        component: UpdateProduct,
        props: {
            heading: 'Chỉnh sửa sản phẩm',
        },
    },
    {
        path: '/admin/product/views',
        // layout: CustomerLayout,
        component: ProductsView,
        props: {
            heading: 'Danh sách sản phẩm',
        },
    },

    // PRODUCT TYPE
    {
        path: '/admin/product-type',
        component: ProductType,
        props: {
            heading: 'Danh sách loại sản phẩm',
        },
    },
    {
        path: '/admin/product-type/add',
        component: AddProductType,
        props: {
            heading: 'Thêm mới loại sản phẩm',
        },
    },
    {
        path: '/admin/product-type/detail/:id',
        component: DetailProductType,
        props: {
            heading: 'Chi tiết loại sản phẩm',
        },
    },
    {
        path: '/admin/product-type/update/:id',
        component: UpdateProductType,
        props: {
            heading: 'Chỉnh sửa loại sản phẩm',
        },
    },

    // POST
    {
        path: '/admin/posts',
        component: Posts,
        props: {
            heading: 'Danh sách bài viết',
        },
    },
    {
        path: '/admin/post/:id',
        component: DetailPost,
        props: {
            heading: 'Chi tiết bài viết',
        },
    },
    {
        path: '/admin/posts/add',
        component: AddPost,
        props: {
            heading: 'Thêm bài viết',
        },
    },
    {
        path: '/admin/posts/update/:id',
        component: UpdatePost,
        props: {
            heading: 'Chỉnh sửa bài viết',
        },
    },

    // CUSTOMER
    {
        path: '/admin/customer',
        component: Customers,
        props: {
            heading: 'Khách hàng',
        },
    },
    {
        path: '/admin/customer/detail/:id',
        component: DetailCustomer,
        props: {
            heading: 'Chi tiết khách hàng',
        },
    },
    {
        path: '/admin/customer/add',
        component: AddCustomer,
        props: {
            heading: 'Thêm khách hàng',
        },
    },
    {
        path: '/admin/customer/update/:id',
        component: UpdateCustomer,
        props: {
            heading: 'Chỉnh sửa khách hàng',
        },
    },
    // Account
    {
        path: '/admin/account',
        component: Accounts,
        props: {
            heading: 'Tài khoản',
        },
    },
    {
        path: '/admin/account/add',
        component: AddAccount,
        props: {
            heading: 'Thêm tài khoản',
        },
    },
    {
        path: '/admin/account/update/:id',
        component: UpdateAccount,
        props: {
            heading: 'Chỉnh sửa tài khoản',
        },
    },
    {
        path: '/admin/account/detail/:id',
        component: DetailAccount,
        props: {
            heading: 'Chi tiết tài khoản',
        },
    },

    // *****

    {
        path: '/admin/role',
        component: Roles,
        props: {
            heading: 'Quy định',
        },
    },
    {
        path: '/admin/role/add',
        component: AddRole,
        props: {
            heading: 'Thêm chức vụ',
        },
    },
    {
        path: '/admin/role/detail/:id',
        component: DetailRole,
        props: {
            heading: 'Chi tiết chức vụ',
        },
    },
    {
        path: '/admin/role/update/:id',
        component: UpdateRole,
        props: {
            heading: 'Sửa chức vụ',
        },
    },
    {
        path: '/admin/roles/detail/:id',
        component: DetailRole,
        props: {
            heading: 'Chi tiết chức vụ',
        },
    },

    {
        path: '/admin/login',
        layout: FullLayout,
        component: Login,
    },
];

export { publicRoutes, privateRoutes };
