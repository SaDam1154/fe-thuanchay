import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from '@headlessui/react';
import { userSelector } from '../../../redux/selectors';
import { accountSlice } from '../../../redux/slices/accountSlide';
import Search from './Search';

function Header({ children }) {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    return (
        <header className="flex pt-5 pb-8 h-24 w-full  items-center justify-between border-b bg-white pl-10 pr-16">
            {/* tite + reload btn */}

            {/* Action group */}
            <div className="flex grow">
                {/* Search */}
                <div className="mr-2 flex grow">
                    <Search></Search>
                </div>
                <div className="w-48"></div>
                <Link
                    to="/admin/posts/add"
                    className={clsx('btn btn-md btn-green', {
                        // hidden: isHiddenItem('customer/create'),
                    })}
                >
                    <span className="pr-1">
                        <i className="fa fa-share"></i>
                    </span>
                    <span>Thêm bài viết</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
