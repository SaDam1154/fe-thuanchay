import Home from '../pages/Home';
import Product from '../pages/Product';
import AddProduct from '../pages/AddProduct';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/product/add', component: AddProduct },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
