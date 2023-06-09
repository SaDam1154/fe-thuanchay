import { useState } from 'react';
import { Link, NavLink, useLocation, useMatch } from 'react-router-dom';
import clsx from 'clsx';

function GroupMenu({ groupMenu }) {
    const [isOpen, setIsOpen] = useState(false);
    let MainComp = 'div';
    if (!groupMenu.children) {
        MainComp = Link;
    }
    const { pathname } = useLocation();

    const pathFirst = pathname.split('/admin')[1];
    const mainPath = groupMenu.main.link?.split('/admin')[1];

    return (
        <li>
            <MainComp
                className={clsx(
                    'flex cursor-pointer select-none  items-center justify-between rounded-md px-4 py-3 text-white bg  hover:bg-blue-400',
                    {
                        'bg-blue-400': pathFirst === mainPath,
                    }
                )}
                onClick={() => setIsOpen(!isOpen)}
                to={!groupMenu.children ? groupMenu.main?.link : undefined}
            >
                <div className="flex items-center">
                    <span className="pr-2">
                        <i className={groupMenu.main.iconClassname}></i>
                    </span>
                    <span className="select-none font-medium ">{groupMenu.main.text}</span>
                </div>
                {groupMenu.children && (
                    <span className={clsx('transition', { 'rotate-90': isOpen })}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </span>
                )}
            </MainComp>
            {groupMenu.children && isOpen && (
                <div className="space-y-2">
                    {groupMenu.children.map((item, index) => (
                        <NavLink
                            key={index}
                            className={({ isActive }) =>
                                clsx('flex cursor-pointer items-center pl-10 pr-3 text-white hover:underline', {
                                    'font-semibold underline': isActive,
                                })
                            }
                            to={groupMenu.main.link + item.link}
                        >
                            <span className="pr-2">
                                <i className={item.iconClassname}></i>
                            </span>
                            <span>{item.text}</span>
                        </NavLink>
                    ))}
                </div>
            )}
        </li>
    );
}

export default GroupMenu;
