import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../../components/CustomerFooter';
import Search from '../../../components/SearchPost';
import Filter from '../../../components/FilterPost';
import PriceFormat from '../../../components/PriceFormat';
import clsx from 'clsx';

import { useSelector } from 'react-redux';
import { accountSelector } from '../../../redux/selectors';

function HomeCustomer() {
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

    return (
        <div className="flex flex-col justify-between h-[689px] overflow-y-scroll">
            <div className="flex flex-col  justify-around   px-[200px]">
                <div id="gr1" className="flex flex-col justify-around h-[250px]">
                    <div id="gr1-title" className="flex flex-col justify-around h-[200px] ">
                        <div className="flex  w-full border-l-4 border-green-500">
                            <div className="text-base font-normal w-[125px]">Trang chủ/ Shop/ </div>
                            <div className="text-base font-light"> Ăn vặt</div>
                        </div>
                        <div className="font-semibold text-4xl w-full text-green-600">Ăn vặt</div>
                        <div className="flex">
                            <div className="text-base font-light w-[300px]">
                                Những món ăn nhẹ đơn giản thuần chay, lành mạnh, giàu chất dinh dưỡng.
                            </div>
                        </div>
                    </div>
                </div>
                <div id="gr3" className="flex flex-col">
                    <div id="gr3-title" className="flex justify-between">
                        <div id="gr1-title-name flex flex-col">
                            <div className="text-sm font-medium mx-4 my-1">Danh mục</div>
                            <div className="flex mt-8 h-[100px] flex-col overflow-hidden">
                                <div className="flex">
                                    <div className=" cursor-pointer select-none rounded-none  mb-4  ">
                                        <div
                                            className={clsx(
                                                'rounded-lg border-2 border-green-500 mx-2 text-green-600 overflow-hidden items-center justify-center',
                                                'bg-green-500 text-white'
                                            )}
                                        >
                                            <div className=" h-[50px] px-2 min-w-[100px] flex items-center justify-center   rounded-none text-center bg-gradient-to-r ">
                                                <div>Ăn vặt</div>
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
                                                    { 'bg-green-500 text-white': index == 10 }
                                                )}
                                            >
                                                <div
                                                    className=" h-[50px] min-w-[50px] px-2 flex items-center justify-center   rounded-none text-center bg-gradient-to-r "
                                                    _
                                                >
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
                            <div className="text-2xl font-semibold"> 8Sản phẩm</div>
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
                                                        hidden: isHiddenItem('product/delete'),
                                                    })}
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
