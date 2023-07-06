import Footer from '../../../components/CustomerFooter';
import Search from './Search';
import Filter from './Filter';
import { useEffect, useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PriceFormat from '../../../components/PriceFormat';
import clsx from 'clsx';
import { accountSelector } from '../../../redux/selectors';
import { orderActions } from '../../../redux/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

const bag2 =
    'https://cdn.vn.alongwalk.info/wp-content/uploads/2023/01/05212422/image-30-hinh-nen-meo-cute-dung-cho-ca-dien-thoai-va-may-tinh-bfa19be160372b49145eb85b3f12be80.jpg';

function HomeCustomer() {
    const refContact = useRef(null);
    const dispatch = useDispatch();

    const showSuccessNoti = () => toast.success('Thêm thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const navigate = useNavigate();
    const [img, setImg] = useState();
    const account = useSelector(accountSelector);
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
        //cleanup
        return () => {
            img && URL.revokeObjectURL(img.preview);
        };
    }, [img]);

    const [selectedProductTypes, setSelectedProductTypes] = useState([]);
    useEffect(() => {
        callApi();
        callApiProductTypes();
    }, []);

    function callApi() {
        fetch('http://localhost:5000/api/product')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProducts(resJson.products);
                } else {
                    setProducts([]);
                }
            });
    }
    function callApiProductTypes() {
        fetch('http://localhost:5000/api/product-type')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProductTypes(resJson.productTypes);
                } else {
                    setProductTypes([]);
                }
            });
    }

    function linkToDetail(id) {
        navigate('/admin/product/detail/' + id);
    }
    function handleAddProduct(product) {
        dispatch(orderActions.add(product));
        showSuccessNoti();
    }
    function handleDeleteProduct(_id) {
        dispatch(orderActions.remove(_id));
    }
    function handleUpdateQuantityProduct(product, quantity) {
        dispatch(orderActions.updateQuantity({ product, quantity }));
    }
    return (
        <div className="flex flex-col justify-between h-[689px] overflow-y-scroll">
            <div className="flex flex-col  justify-around   px-[200px]">
                <div id="gr1" className="flex flex-col justify-around h-[350px]">
                    <div id="gr1-title" className="flex flex-col justify-around h-[200px] ">
                        <div className="font-semibold text-4xl w-full text-green-600">Thực phẩm thuần chay</div>
                        <div
                            onClick={() => {
                                refContact.current?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="font-semibold hover:cursor-pointer text-4xl w-full"
                        >
                            Ngon, bổ, rẻ.
                        </div>
                        <div className="flex">
                            <div className="btn btn-green btn-md hover:cursor-pointer">Đi ngay</div>

                            <div className="btn btn-green btn-md hover:cursor-pointer">Tìm hiểu thêm</div>
                        </div>
                    </div>
                    <div id="gr1-search" className="flex h-[100px] items-center justify-center">
                        <div className="flex w-11/12">
                            <Search></Search>
                            <Filter></Filter>
                        </div>
                    </div>
                </div>
                <div id="gr2" className="flex flex-col">
                    <div id="gr2-title" className="flex justify-between">
                        <div id="gr1-title-name flex flex-col">
                            <div className="text-2xl font-semibold">Sản phẩm</div>
                            <div className="text-4xl font-semibold text-green-600">Mới nhất</div>
                        </div>
                        <Link
                            to={'/shop'}
                            id="gr1-title-button"
                            className="btn btn-md btn-green h-[50px] hover:cursor-pointer"
                        >
                            Đến shop ngay
                        </Link>
                    </div>
                    <div id="gr2-item" className="">
                        <div className="flex mt-8 h-[590px] flex-col overflow-y-hidden">
                            <div className="grid grid-cols-4 gap-4 ">
                                {products
                                    .filter((product) => {
                                        if (search === '') {
                                            return product;
                                        } else {
                                            if (
                                                removeVietnameseTones(product.name.toLowerCase()).includes(
                                                    removeVietnameseTones(search.toLowerCase())
                                                ) ||
                                                removeVietnameseTones(product?.type.name.toLowerCase()).includes(
                                                    removeVietnameseTones(search.toLowerCase())
                                                )
                                            ) {
                                                var id = product.id.toString();
                                                return product.id.toString().includes(id);
                                            }
                                        }
                                    })

                                    .map((product) => (
                                        <div
                                            key={product.id}
                                            className=" cursor-pointer select-none rounded border mb-4  "
                                        >
                                            <div className="rounded-3xl overflow-hidden">
                                                <img
                                                    className=" w-[296px] h-[222px] bg-gray-300 rounded text-center object-contain"
                                                    src={product.image}
                                                />
                                            </div>
                                            <div
                                                className={clsx('text-sm font-medium mx-4 my-1', {
                                                    'line-through': product.quantity === 0,
                                                })}
                                            >
                                                {product.name}
                                            </div>
                                            <div className="text-base mx-2  font-light">
                                                {product.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                            </div>
                                            <div className="flex justify-center">
                                                <button
                                                    className={clsx('btn btn-sm btn-blue', {
                                                        hidden: `hover:`,
                                                    })}
                                                >
                                                    <span className="pr-1">
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </span>
                                                    <span>Sửa</span>
                                                </button>
                                                <button
                                                    className={clsx('btn btn-sm btn-green my-1 w-10/12', {
                                                        hidden: isHiddenItem('product/read'),
                                                    })}
                                                    onClick={() => handleAddProduct(product)}
                                                >
                                                    <span className="pr-1 ">
                                                        <i className="fa-solid fa-cart-shopping"></i>
                                                    </span>
                                                    <span>Thêm vào giỏ hàng</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="product-type" className="flex flex-col select-none">
                    <div id="gr3-title" className="flex justify-between">
                        <div id="gr1-title-name flex flex-col">
                            <div className="text-2xl font-semibold">Phân loại</div>
                            <div className="text-4xl font-semibold text-green-600">Danh mục</div>
                        </div>
                    </div>
                    <div id="gr3-item" className="">
                        <div className="flex mt-8 h-[290px] flex-col overflow-hidden">
                            <div className="grid grid-cols-4 gap-4 ">
                                {productTypes.map((product) => (
                                    <div
                                        key={product.id}
                                        className=" cursor-pointer select-none rounded  mb-4  "
                                        onClick={() => {
                                            navigate('/shop');
                                        }}
                                    >
                                        <div className="rounded-3xl overflow-hidden items-center justify-center">
                                            <div className="w-[269px] h-[100px] flex items-center justify-center   rounded text-center bg-gradient-to-r from-purple-200 to-pink-200 hover:from-purple-300 hover:to-pink-300">
                                                <div>{product?.name}</div>
                                                {/* <img
                                                    src="
                                                    https://cdn.vn.alongwalk.info/wp-content/uploads/2023/01/05212422/image-30-hinh-nen-meo-cute-dung-cho-ca-dien-thoai-va-may-tinh-bfa19be160372b49145eb85b3f12be80.jpg"
                                                    alt=""
                                                ></img> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="gr4" className="flex flex-col">
                    <div id="gr4-title" className="flex justify-between">
                        <div id="gr1-title-name flex flex-col">
                            <div className="text-2xl font-semibold">Các bước</div>
                            <div className="text-4xl font-semibold text-green-500">Mua Hàng</div>
                        </div>
                    </div>
                    <div id="gr4-item" className="flex items-center h-[300px] ">
                        <div className="flex flex-col h-[250px] w-[370px] justify-around px-4 py-10  border-x-2  ">
                            <div className="text-5xl font-semibold text-green-500">01.</div>
                            <div className="text-2xl font-semibold">Chọn sản phẩm</div>
                            <div className="text-base font-normal">
                                Lựa chọn những sản phẩm mà bạn muốn mua trong trang web
                            </div>
                        </div>
                        <div className="flex flex-col h-[224px] w-[370px] justify-around px-4  ">
                            <div className="text-5xl font-semibold text-green-500">02.</div>
                            <div className="text-2xl font-semibold">Nhập thông tin nhận hàng</div>
                            <div className="text-base font-normal">
                                Nhập đầy đủ thông tin nhận hàng để shop tiện liên lạc và giao hàng chính xác
                            </div>
                        </div>
                        <div className="flex flex-col h-[224px] w-[370px] justify-around px-4  border-x-2 ">
                            <div className="text-5xl font-semibold text-green-500">03.</div>
                            <div className="text-2xl font-semibold">Xác nhận và nhận hàng</div>
                            <div className="text-base font-normal">Nhận cuộc gọi xác nhận đơn hàng và nhận hàng</div>
                        </div>
                    </div>
                </div>
                <div id="contact" className="flex flex-col select-none">
                    <div id="gr5-title" className="flex justify-between">
                        <div id="gr1-title-name flex flex-col">
                            <div className="text-2xl font-semibold">Thông tin</div>
                            <div className="text-4xl font-semibold text-green-500">Liên hệ</div>
                        </div>
                    </div>
                    <div id="gr5-item" className="flex items-center h-[300px] ">
                        <div className="flex  h-[224px] w-[370px] items-center px-4 border-x-2 ">
                            <button
                                className={clsx('btn btn-sm btn-green h-[75px] min-w-[75px] rounded-full m-2 ', {
                                    hidden: isHiddenItem('order/delete'),
                                })}
                                onClick={(e) => {
                                    {
                                        e.stopPropagation();
                                        setShowDeleteDialog(true);
                                        setDeletingOrderId(order.id);
                                    }
                                }}
                            >
                                <span className="">
                                    <i className="fa-solid fa-phone fa-2xl"></i>
                                </span>
                            </button>
                            <div className="flex flex-col">
                                <div className="text-2xl font-semibold">Số điện thoại</div>
                                <div className="text-base font-normal">0365011369</div>
                            </div>
                        </div>
                        <div className="flex h-[224px] w-[370px] items-center px-4 ">
                            <button
                                className={clsx('btn btn-sm btn-green h-[75px] min-w-[75px] rounded-full m-2 ', {
                                    hidden: isHiddenItem('order/delete'),
                                })}
                                onClick={(e) => {
                                    {
                                        e.stopPropagation();
                                        setShowDeleteDialog(true);
                                        setDeletingOrderId(order.id);
                                    }
                                }}
                            >
                                <div className="flex items-center justify-center h-[29px] max-w-[24px] rounded-full bg-white">
                                    <i className="fa-brands fa-facebook fa-2xl text-blue-500 "></i>
                                </div>
                            </button>
                            <div className="flex flex-col">
                                <div className="text-2xl font-semibold">Facebook</div>
                                <div className="text-base font-normal">Sa Đam BN</div>
                            </div>
                        </div>
                        <div className="flex  h-[224px] w-[370px] items-center px-4 border-x-2 ">
                            <button
                                className={clsx('btn btn-sm btn-green h-[75px] min-w-[75px] rounded-full m-2 ', {
                                    hidden: isHiddenItem('order/delete'),
                                })}
                                onClick={(e) => {
                                    {
                                        e.stopPropagation();
                                        setShowDeleteDialog(true);
                                        setDeletingOrderId(order.id);
                                    }
                                }}
                            >
                                <span className="">
                                    <i className="fa-solid fa-z fa-2xl"></i>
                                </span>
                            </button>
                            <div className="flex flex-col">
                                <div className="text-2xl font-semibold">Zalo</div>
                                <div className="text-base font-normal">Sa Đam BN</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomeCustomer;
