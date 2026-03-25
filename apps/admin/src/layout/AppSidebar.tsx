import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';

import {
    ChevronDownIcon,
    GridIcon,
    HorizontaLDots,
    ListIcon,
    ChefHatIcon,
    FolderIcon,
} from '@/icons';
import { PATHS } from '@/const/paths';
import { useSidebar } from '@/context/SidebarContext';

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const collectionItems: NavItem[] = [
    {
        icon: <FolderIcon />,
        name: '컬렉션 그룹 관리',
        path: PATHS.APP.COLLECTION_GROUP.LIST,
    },
];

const recipeItems: NavItem[] = [
    {
        icon: <FolderIcon />,
        name: '레시피 그룹 관리',
        path: PATHS.APP.RECIPE_GROUP.LIST,
    },
];

const userItems: NavItem[] = [
    {
        icon: <GridIcon />,
        name: '사용자 컬렉션 관리',
        path: PATHS.APP.USER_COLLECTION.LIST,
    },
    {
        icon: <ListIcon />,
        name: '사용자 레시피 관리',
        path: PATHS.APP.USER_RECIPE.LIST,
    },
];

const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: string;
        index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {},
    );
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // const isActive = (path: string) => location.pathname === path;
    const isActive = useCallback(
        (path: string) => location.pathname === path,
        [location.pathname],
    );

    useEffect(() => {
        let submenuMatched = false;
        ['collection', 'recipe', 'user'].forEach((menuType) => {
            const items =
                menuType === 'collection'
                    ? collectionItems
                    : menuType === 'recipe'
                      ? recipeItems
                      : userItems;
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: menuType,
                                index,
                            });
                            submenuMatched = true;
                        }
                    });
                }
            });
        });

        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [location, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number, menuType: string) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.type === menuType &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { type: menuType, index };
        });
    };

    const renderMenuItems = (items: NavItem[], menuType: string) => (
        <ul className='flex flex-col gap-4'>
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`menu-item group ${
                                openSubmenu?.type === menuType &&
                                openSubmenu?.index === index
                                    ? 'menu-item-active'
                                    : 'menu-item-inactive'
                            } cursor-pointer ${
                                !isExpanded && !isHovered
                                    ? 'lg:justify-center'
                                    : 'lg:justify-start'
                            }`}
                        >
                            <span
                                className={`menu-item-icon-size  ${
                                    openSubmenu?.type === menuType &&
                                    openSubmenu?.index === index
                                        ? 'menu-item-icon-active'
                                        : 'menu-item-icon-inactive'
                                }`}
                            >
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className='menu-item-text'>
                                    {nav.name}
                                </span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                        openSubmenu?.type === menuType &&
                                        openSubmenu?.index === index
                                            ? 'rotate-180 text-brand-500'
                                            : ''
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                to={nav.path}
                                className={`menu-item group ${
                                    isActive(nav.path)
                                        ? 'menu-item-active'
                                        : 'menu-item-inactive'
                                }`}
                            >
                                <span
                                    className={`menu-item-icon-size ${
                                        isActive(nav.path)
                                            ? 'menu-item-icon-active'
                                            : 'menu-item-icon-inactive'
                                    }`}
                                >
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className='menu-item-text'>
                                        {nav.name}
                                    </span>
                                )}
                            </Link>
                        )
                    )}
                    {nav.subItems &&
                        (isExpanded || isHovered || isMobileOpen) && (
                            <div
                                ref={(el) => {
                                    subMenuRefs.current[
                                        `${menuType}-${index}`
                                    ] = el;
                                }}
                                className='overflow-hidden transition-all duration-300'
                                style={{
                                    height:
                                        openSubmenu?.type === menuType &&
                                        openSubmenu?.index === index
                                            ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                            : '0px',
                                }}
                            >
                                <ul className='mt-2 space-y-1 ml-9'>
                                    {nav.subItems.map((subItem) => (
                                        <li key={subItem.name}>
                                            <Link
                                                to={subItem.path}
                                                className={`menu-dropdown-item ${
                                                    isActive(subItem.path)
                                                        ? 'menu-dropdown-item-active'
                                                        : 'menu-dropdown-item-inactive'
                                                }`}
                                            >
                                                {subItem.name}
                                                <span className='flex items-center gap-1 ml-auto'>
                                                    {subItem.new && (
                                                        <span
                                                            className={`ml-auto ${
                                                                isActive(
                                                                    subItem.path,
                                                                )
                                                                    ? 'menu-dropdown-badge-active'
                                                                    : 'menu-dropdown-badge-inactive'
                                                            } menu-dropdown-badge`}
                                                        >
                                                            new
                                                        </span>
                                                    )}
                                                    {subItem.pro && (
                                                        <span
                                                            className={`ml-auto ${
                                                                isActive(
                                                                    subItem.path,
                                                                )
                                                                    ? 'menu-dropdown-badge-active'
                                                                    : 'menu-dropdown-badge-inactive'
                                                            } menu-dropdown-badge`}
                                                        >
                                                            pro
                                                        </span>
                                                    )}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                </li>
            ))}
        </ul>
    );

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
            isExpanded || isMobileOpen
                ? 'w-[290px]'
                : isHovered
                  ? 'w-[290px]'
                  : 'w-[90px]'
        }
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`py-8 px-6 flex items-center gap-3 border-b border-gray-100 ${
                    !isExpanded && !isHovered
                        ? 'lg:justify-center'
                        : 'justify-start'
                }`}
            >
                <Link to='/' className='flex items-center gap-3'>
                    <ChefHatIcon className='size-8' />
                    {(isExpanded || isHovered || isMobileOpen) && (
                        <div className='flex flex-col'>
                            <span className='text-lg font-bold text-gray-900 leading-tight'>
                                JollyPot
                            </span>
                            <span className='text-xs text-gray-500'>
                                관리자
                            </span>
                        </div>
                    )}
                </Link>
            </div>
            <div className='flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar'>
                <nav className='mb-6 mt-4'>
                    <div className='flex flex-col gap-6'>
                        <div>
                            <h2
                                className={`mb-2 px-3 text-[12px] font-semibold uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered
                                        ? 'lg:justify-center'
                                        : 'justify-start'
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    '컬렉션 노출 관리'
                                ) : (
                                    <HorizontaLDots className='size-6' />
                                )}
                            </h2>
                            {renderMenuItems(collectionItems, 'collection')}
                        </div>
                        <div>
                            <h2
                                className={`mb-2 px-3 text-[12px] font-semibold uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered
                                        ? 'lg:justify-center'
                                        : 'justify-start'
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    '레시피 노출 관리'
                                ) : (
                                    <HorizontaLDots className='size-6' />
                                )}
                            </h2>
                            {renderMenuItems(recipeItems, 'recipe')}
                        </div>
                        <div className=''>
                            <h2
                                className={`mb-2 px-3 text-[12px] font-semibold uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered
                                        ? 'lg:justify-center'
                                        : 'justify-start'
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    '사용자 관리'
                                ) : (
                                    <HorizontaLDots />
                                )}
                            </h2>
                            {renderMenuItems(userItems, 'user')}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
