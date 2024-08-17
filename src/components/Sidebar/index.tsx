import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { BiEditAlt, BiFolderOpen, BiHomeSmile, BiSliderAlt } from "react-icons/bi";
import { LuCrown } from "react-icons/lu";
import { BiCategoryAlt, BiBug } from "react-icons/bi";
import { LiaRssSolid } from "react-icons/lia";
import { BiLineChart } from "react-icons/bi";
import { BiShieldQuarter } from "react-icons/bi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  // 导航项样式
  const sidebarItemSty = "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
  // 导航选中样式
  const sidebarItemActiveSty = "bg-graydark dark:bg-meta-4"

  const Arrow = ({ open }: { open: boolean }) => {
    return <svg
      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
        }`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
        fill=""
      />
    </svg>
  }

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex justify-center items-center gap-2 px-6 py-5.5 pb-2 lg:pt-6">
        <NavLink to="/">
          <h1 className='flex items-center text-2xl font-bold text-white'>
            <LuCrown className='mr-2' /> Thrive Admin
          </h1>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="py-4 px-4 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              Menu
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/"
                  className={`${sidebarItemSty} ${pathname.includes('dashboard') && sidebarItemActiveSty}`}
                >
                  <BiHomeSmile className='text-[22px]' />
                  仪表盘
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/create"
                  className={`${sidebarItemSty} ${pathname.includes('create') && sidebarItemActiveSty}`}
                >
                  <BiEditAlt className='text-[22px]' />
                  创作
                </NavLink>
              </li>

              <SidebarLinkGroup
                activeCondition={false}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`${sidebarItemSty}`}
                        onClick={(e) => {
                          e.preventDefault();

                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <BiCategoryAlt className='text-[22px]' />
                        管理
                        <Arrow open={open} />
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/article"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              文章管理
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/tag"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              标签管理
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/comment"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              评论管理
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/cate"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              分类管理
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/web"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              网站管理
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/swiper"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              轮播图管理
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/user"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              用户管理
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/role"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              角色管理
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <NavLink
                  to="/rights"
                  className={`${sidebarItemSty} ${pathname.includes('rights') && sidebarItemActiveSty}`}
                >
                  <BiShieldQuarter className='text-[22px]' />
                  权限
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/setup"
                  className={`${sidebarItemSty} ${pathname.includes('setup') && sidebarItemActiveSty}`}
                >
                  <BiSliderAlt className='text-[22px]' />
                  系统
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              New
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/rss"
                  className={`${sidebarItemSty} ${pathname.includes('rss') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <LiaRssSolid className='text-[22px]' />
                  订阅中心
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/chart"
                  className={`${sidebarItemSty} ${pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <BiFolderOpen className='text-[22px]' />
                  文件系统
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/stats"
                  className={`${sidebarItemSty} ${pathname.includes('stats') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <BiLineChart className='text-[22px]' />
                  数据可视化
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/iterative"
                  className={`${sidebarItemSty} ${pathname.includes('iterative') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <BiBug className='text-[22px]' />
                  更新日志
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
