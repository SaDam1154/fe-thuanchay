import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { accountSelector } from '../../../redux/selectors';
import { accountActions } from '../../../redux/slices/accountSlide';
import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Search from './Search';

const LINK = [
    { Link: '/', Content: 'Trang chủ' },
    { Link: '/shop', Content: 'Shop' },
];
const TABS = [
    { Link: '/#product-type  ', Content: 'Danh mục' },
    { Link: '/#contact', Content: 'Liên hệ' },
];

function HeaderCustomer({ children }) {
    const dispatch = useDispatch();
    const account = useSelector(accountSelector);
    const navigate = useNavigate();

    const { pathname } = useLocation();
    console.log(pathname);

    return (
        <header className="flex border-2 border-green-400 min-h-[56px] h-14 w-full select-none items-center justify-between  font-medium text-slate-900">
            <div className="flex ml-40 items-center justify-center">
                <Link to="/admin/" className="ml-10">
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
                {account ? (
                    <div className="flex items-center justify-end w-[248px]">
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
                            to="/admin/signup"
                            className="flex h-9 min-w-[120px] items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary hover:text-white"
                        >
                            Đăng ký
                        </Link>
                        <Link
                            to="/admin/login"
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
