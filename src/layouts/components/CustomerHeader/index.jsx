import { Popover } from '@headlessui/react';
import PriceFormat from '../../../components/PriceFormat';

import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { accountSelector, orderSelector } from '../../../redux/selectors';
import { accountActions } from '../../../redux/slices/accountSlide';
import { orderActions } from '../../../redux/slices/orderSlice';

import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Search from './Search';

const LINK = [
    { Link: '/', Content: 'Trang chủ' },
    { Link: '/shop', Content: 'Sản phẩm' },
    { Link: '/post', Content: 'Bài viết' },
];
const TABS = [
    { Link: '/#product-type  ', Content: 'Danh mục' },
    { Link: '/#contact', Content: 'Liên hệ' },
];

function HeaderCustomer({ children }) {
    const order = useSelector(orderSelector);
    const dispatch = useDispatch();
    const account = useSelector(accountSelector);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [renderProduct, setRenderProduct] = useState([]);
    const [number, setNumber] = useState([]);
    function isHiddenItem(functionName) {
        if (!account) {
            return true;
        }
        if (!functionName) {
            return false;
        }
        const findResult = account?.functions?.find((_func) => _func?.name === functionName);
        if (findResult) {
            return false;
        }
        return true;
    }
    useEffect(() => {
        fetch('http://localhost:5000/api/product')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProducts(resJson.products);
                    setRenderProduct(resJson.products);
                } else {
                    setProducts([]);
                    setRenderProduct([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setProducts([]);
                setRenderProduct([]);
            });
    }, []);
    function handleSelectedTabChange(tab) {
        console.log('Tab change: ', tab);
        setPosts([]);
        var string = '';
        if (tab.id == 1) {
            string = 'posts';
            // selectedOption(OPTIONS[0]);
            setHide(true);
        } else {
            if (tab.id == 2) {
                string = 'posts/following/posts';
                setHide(false);
            } else {
                string = 'posts/saved/posts';
                setHide(false);
            }
        }
        fetch('http://localhost:8080/api/' + string, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                setPosts(resJson.posts);
                console.log(resJson.posts);
            })
            .catch((error) => {
                console.log(error);
                setPosts([]);
            });
    }
    useEffect(() => {
        setSelectedProducts(
            order.details.map((detail) => {
                const matchedProduct = products.find((product) => product._id === detail.product);
                if (!matchedProduct) {
                    return {
                        id: '',
                        image: '',
                        name: '',
                        price: 0,
                        quantity: 0,
                        discount: 0,
                    };
                }
                return {
                    _id: matchedProduct._id,
                    id: matchedProduct.id,
                    image: matchedProduct.image,
                    name: matchedProduct.name,
                    price: detail.price,
                    discount: detail.discount,
                    quantity: matchedProduct.quantity,
                    orderQuantity: detail.quantity,
                };
            })
        );
    }, [order, products]);

    const { pathname } = useLocation();
    console.log(pathname);
    function handleDeleteProduct(_id) {
        dispatch(orderActions.remove(_id));
    }
    function handleUpdateQuantityProduct(product, quantity) {
        dispatch(orderActions.updateQuantity({ product, quantity }));
    }

    return (
        <header className="flex border-2 border-green-400 min-h-[56px] h-14 w-full select-none items-center justify-between  font-medium text-slate-900">
            <div className="flex ml-40 items-center justify-center">
                <Link to="/" className="ml-10">
                    <img
                        className="h-11 w-11 object-contain"
                        src="https://png.pngtree.com/png-vector/20220518/ourlarge/pngtree-vegan-icon-png-image_4697174.png"
                    />
                </Link>
                Thuần Chay
            </div>

            <div className="flex space-x-3  mx-20">
                {LINK.map((tab, index) => (
                    <Link
                        to={tab.Link}
                        className={clsx(
                            'items-center justify-center   text-base font-normal hover:cursor-pointer hover:underline',
                            {
                                ' font-semibold ': pathname == tab.Link,
                            }
                        )}
                    >
                        {tab.Content}
                    </Link>
                ))}
                {TABS.map((tab, index) => (
                    <div
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => {
                                window.location.href = tab.Link;
                            }, 100);
                        }}
                        className={clsx(
                            'items-center justify-center   text-base font-normal hover:cursor-pointer hover:underline',
                            {
                                ' font-semibold ': pathname == tab.Link,
                            }
                        )}
                    >
                        {tab.Content}
                    </div>
                ))}

                <Search></Search>
                {/* <Link
                    to="/admin/product/add"
                    className={clsx('btn btn-md btn-green', {
                        hidden: isHiddenItem('product/delete'),
                    })}
                >
                    <span className="pr-1">
                        <i className="fa fa-share"></i>
                    </span>
                    <span>Thêm sản phẩm mới</span>
                </Link> */}
                <Popover
                    className={clsx('relative', {
                        hidden: isHiddenItem('product/read'),
                    })}
                >
                    {({ open }) => (
                        <>
                            <Popover.Button className="w-[66px] h-[34px] flex justify-start items-center rounded-[3px] btn bg-green-300 ">
                                <button className="h-full w-[34px] bg-green-500 rounded-[3px]">
                                    <span className="pr-1">
                                        <i className="fa fa-cart-shopping"></i>
                                    </span>
                                </button>
                                <div className=" flex grow items-center justify-center font-semibold text-white">
                                    {selectedProducts.length}
                                </div>
                            </Popover.Button>
                            <Popover.Panel className="absolute flex w-[450px] flex-col top-12 right-0 z-10 p-4 items-start gap-4 rounded-xl  bg-white shadow-md">
                                {selectedProducts?.length === 0 ? (
                                    <div className="mt-3 text-lg font-semibold">
                                        <div className="flex w-full justify-center">Chưa có sản phẩm trong hoá đơn</div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="border-b border-solid">
                                            {selectedProducts.map((product) => (
                                                <div className="flex items-center gap-4 justify-stretch hover:cursor-pointer">
                                                    <div>
                                                        <span className="pr-1">
                                                            <i className="fa fa-x font-light"></i>
                                                        </span>
                                                    </div>
                                                    <img
                                                        src={product?.image || '/placeholder.png'}
                                                        className="h-10 w-10 rounded-full object-cover object-center"
                                                    />
                                                    <div className="flex grow w-[300px] flex-col">
                                                        <div id="name" className="text-green-400">
                                                            {product.name}
                                                        </div>
                                                        <div id="price">
                                                            <PriceFormat>{product.price}</PriceFormat>
                                                        </div>
                                                    </div>
                                                    <div className="w-[58px] h-[32px]">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={product?.orderQuantity || ''}
                                                            onChange={(e) =>
                                                                handleUpdateQuantityProduct(product, e.target.value)
                                                            }
                                                            className={clsx(
                                                                'text-input w-16 py-1 text-right text-base'
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <p className="font-semibold">
                                                <span>Tổng tiền: </span>
                                                <span className="text-xl text-blue-600">
                                                    <span>
                                                        <PriceFormat>{order.totalPrice}</PriceFormat>
                                                    </span>
                                                    <span> VNĐ</span>
                                                </span>
                                            </p>
                                            <Link to="/cart" className="btn h-[36px] w-[150px] btn-green">
                                                <span className="pr-1">
                                                    <i className="fa fa-share"></i>
                                                </span>
                                                <span>Xem giỏ hàng</span>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </Popover.Panel>
                        </>
                    )}
                </Popover>

                {account ? (
                    <div className="flex items-center justify-end w-[170px]">
                        <div className="flex items-center space-x-1">
                            <Link to={'/'} className="h-9 w-9 overflow-hidden rounded-full ring-primary hover:ring-2">
                                <img
                                    className="h-full w-full object-cover"
                                    src="https://cdn.vn.alongwalk.info/wp-content/uploads/2023/01/05212422/image-30-hinh-nen-meo-cute-dung-cho-ca-dien-thoai-va-may-tinh-bfa19be160372b49145eb85b3f12be80.jpg"
                                />
                            </Link>

                            <Popover className="relative ">
                                <Popover.Button as="button" className="outline-none hover:text-primary-dark">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Popover.Button>

                                <Popover.Panel className="absolute top-full right-0 z-10 w-80 translate-y-3 space-y-3 rounded-lg border bg-white p-3 shadow-xl">
                                    <Link to={'/'} className="flex w-full items-center border-b pb-2">
                                        <div className="h-11 w-11 overflow-hidden rounded-full">
                                            <img
                                                className="h-full w-full object-cover"
                                                src="https://cdn.vn.alongwalk.info/wp-content/uploads/2023/01/05212422/image-30-hinh-nen-meo-cute-dung-cho-ca-dien-thoai-va-may-tinh-bfa19be160372b49145eb85b3f12be80.jpg"
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <p className="text-left font-bold">{account?.name}</p>
                                            <p className="text-left text-sm text-gray-600">{account?.email}</p>
                                        </div>
                                    </Link>

                                    {account?.role?.name === 'admin' && (
                                        <>
                                            <Link
                                                to="/admin/manage-member"
                                                className="flex justify-center rounded-md bg-gray-100 py-2 text-sm font-semibold hover:bg-gray-200"
                                            >
                                                Quản lý thành viên
                                            </Link>
                                            <Link
                                                to="/admin/manage-category"
                                                className="mt-2 flex justify-center rounded-md bg-gray-100 py-2 text-sm font-semibold hover:bg-gray-200"
                                            >
                                                Quản lý chủ đề
                                            </Link>
                                        </>
                                    )}

                                    <button
                                        onClick={() => dispatch(accountActions.logout())}
                                        className="flex h-9 w-full min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                                    >
                                        Đăng xuất
                                    </button>
                                </Popover.Panel>
                            </Popover>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Link
                            to="/signup"
                            className="flex h-9 min-w-[120px] items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary hover:text-white"
                        >
                            Đăng ký
                        </Link>
                        <Link
                            to="/login"
                            className="flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                        >
                            Đăng nhập
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default HeaderCustomer;
