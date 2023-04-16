import Home from '../pages/Home';
import Product from '../pages/Product';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product', conponent: Product },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
