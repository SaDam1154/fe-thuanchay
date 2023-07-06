import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../../components/CustomerFooter';
import Search from '../../../components/SearchPost';
import Filter from '../../../components/FilterPost';
import PriceFormat from '../../../components/PriceFormat';
import clsx from 'clsx';
import { accountSelector } from '../../../redux/selectors';
import { orderActions } from '../../../redux/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

function HomeCustomer() {
    const dispatch = useDispatch();
    const showSuccessNoti = () => toast.success('Thêm thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [isSelectedProductTypes, setIsSelectedProductTypes] = useState('');
    const [count, setCount] = useState(products.length);
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
                    setCount(resJson.products.length);
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
                <div id="gr1" className="flex flex-col justify-around h-[250px] select-none">
                    <div id="gr1-title" className="flex flex-col justify-around h-[200px] ">
                        <div className="flex  w-full border-l-4 border-green-500">
                            <div className="text-base font-normal w-[125px]">Trang chủ/ Shop/ </div>
                            {/* <div className="text-base font-light"> Ăn vặt</div> */}
                        </div>
                        <div className="font-semibold text-4xl w-full text-green-600">Thuần Chay</div>
                        <div className="flex">
                            <div className="text-base font-light w-[300px]">
                                Tìm kiếm những món ăn đơn giản thuần chay, lành mạnh, giàu chất dinh dưỡng thông qua các
                                danh mục sản phẩm
                            </div>
                        </div>
                    </div>
                </div>
                <div id="gr3" className="flex flex-col">
                    <div id="gr3-title" className="flex justify-between">
                        <div id="gr1-title-name flex flex-col">
                            <div className="h-[2px] w-12 bg-black rounded"></div>
                            <div className="text-sm font-medium my-1">Danh mục</div>
                            <div className="flex mt-8 h-[100px] flex-col overflow-hidden">
                                <div className="flex">
                                    <div className=" cursor-pointer select-none rounded-none  mb-4  ">
                                        <div
                                            className={clsx(
                                                'rounded-lg border-2 border-green-500 mx-2 text-green-600 overflow-hidden items-center justify-center',
                                                { 'bg-green-500 text-white': '' == isSelectedProductTypes }
                                            )}
                                            onClick={() => {
                                                setIsSelectedProductTypes('');
                                                setCount(products.count);
                                            }}
                                        >
                                            <div className=" h-[50px] px-2 min-w-[100px] flex items-center justify-center   rounded-none text-center bg-gradient-to-r ">
                                                <div>Tất cả</div>
                                            </div>
                                        </div>
                                    </div>
                                    {productTypes.map((product, index) => (
                                        <div
                                            key={product.id}
                                            className=" cursor-pointer select-none rounded-none  mb-4  "
                                        >
                                            <div
                                                className={clsx(
                                                    'rounded-lg border-2 border-green-500 mx-2 text-green-600 overflow-hidden items-center justify-center',
                                                    { 'bg-green-500 text-white': product.id == isSelectedProductTypes }
                                                )}
                                                onClick={() => {
                                                    setIsSelectedProductTypes(product.id);
                                                    console.log(isSelectedProductTypes);
                                                }}
                                            >
                                                <div className=" h-[50px] min-w-[50px] px-2 flex items-center justify-center   rounded-none text-center bg-gradient-to-r ">
                                                    <div>{product?.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="gr3-item" className=""></div>
                </div>
                <div id="gr2" className="flex flex-col">
                    <div id="gr2-title" className="flex justify-between">
                        <div id="gr1-title-name flex flex-col">
                            <div className="text-2xl font-semibold">Danh sách sản phẩm</div>
                        </div>
                        <div id="gr1-title-button" className="btn btn-md btn-green hover:cursor-pointer">
                            Đến shop ngay
                        </div>
                    </div>
                    <div id="gr2-item" className="">
                        <div className="flex mt-8 h-[690px] flex-col overflow-hidden">
                            <div className="grid grid-cols-4 gap-4 ">
                                {products
                                    .filter((product) => {
                                        if (isSelectedProductTypes === '') {
                                            return product;
                                        } else {
                                            var id = product.type.id.toString();
                                            console.log(id);
                                            if (id == isSelectedProductTypes) return product;
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
            </div>
            <Footer />
        </div>
    );
}

export default HomeCustomer;
