import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
const TABS = [
    { Link: '/', Content: 'Trang chủ' },
    { Link: '/shop', Content: 'Shop' },
    { Link: '/post', Content: 'Bài viết' },
    { Link: '/cart', Content: 'Giỏ hàng' },
];
function Footer({ children }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    console.log(pathname);
    return (
        <div className="flex flex-col border-t-2 border-gray-200  ">
            <header className="flex h-[180px]  mx-[200px] select-none items-center justify-around   font-medium text-slate-900 border-b-2 border-gray-200 ">
                <div className="flex space-x-4  w-full  items-start justify-around   ">
                    <div className="flex flex-col w-96 justify-start">
                        <div className="flex  items-center justify-start text-green-600 text-3xl">
                            <Link to="/admin/" className=" ">
                                <img
                                    className="h-11 w-11 bg-green-300 object-contain"
                                    src="https://png.pngtree.com/png-vector/20220518/ourlarge/pngtree-vegan-icon-png-image_4697174.png"
                                />
                            </Link>
                            Sạch
                        </div>
                        <div className="text-sm">
                            Cửa hàng sạch mang đến cho mọi người những món ăn ngon lành mạnh và những kiến thức hữu ích
                            trong việc duy trì thói quen ăn uống sạch!!!
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xl font-semibold">Liên hệ</div>
                        <div className="text-base font-normal hover:cursor-pointer hover:underline ">
                            Số điện thoại: 0365011369
                        </div>
                        <div className="text-base font-normal hover:cursor-pointer hover:underline ">
                            Facebook: Sa Đam BN
                        </div>
                        <div className="text-base font-normal hover:cursor-pointer hover:underline ">
                            Zalo: 0365011369
                        </div>
                    </div>
                    <div
                        className="flex flex-col"
                        onClick={() => {
                            navigate('/shop');
                        }}
                    >
                        <div className="text-xl font-semibold">Danh mục sản phẩm</div>
                        <div
                            className="text-base font-normal hover:cursor-pointer hover:underline "
                            onClick={() => {
                                navigate('/shop');
                            }}
                        >
                            Tất cả
                        </div>
                        <div className="text-base font-normal hover:cursor-pointer hover:underline ">Ăn vặt</div>
                        <div className="text-base font-normal hover:cursor-pointer hover:underline ">Gia vị</div>
                        <div className="text-base font-normal hover:cursor-pointer hover:underline ">Thực phẩm khô</div>
                        <div className="text-base font-normal hover:cursor-pointer hover:underline ">
                            Thực phẩm đông lạnh
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xl font-semibold">Truy cập nhanh</div>
                        {TABS.map((tab, index) => (
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
                    </div>
                    <div></div>
                </div>
            </header>
            <div className="flex items-center justify-center text-xs w-full my-1">
                © 2023 Sa Đam. All rights reserved
            </div>
        </div>
    );
}

export default Footer;
