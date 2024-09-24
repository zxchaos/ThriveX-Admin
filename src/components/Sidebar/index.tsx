import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';

import { BiEditAlt, BiFolderOpen, BiHomeSmile, BiSliderAlt, BiShieldQuarter, BiLineChart, BiCategoryAlt, BiBug } from "react-icons/bi";
import { LiaRssSolid } from "react-icons/lia";
import { TbBrandAirtable } from "react-icons/tb";

import { useUserStore } from '@/stores';
import { getRouteListAPI } from '@/api/Role'
import { Route } from '@/types/app/route';
import logo from '@/images/logo/logo.png'

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const store = useUserStore();

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

  // 路由列表
  const routesAll = [
    {
      group: "Menu",
      list: [
        {
          to: "/",
          path: "dashboard",
          icon: <BiHomeSmile className='text-[22px]' />,
          name: "仪表盘"
        },
        {
          to: "/create",
          path: "create",
          icon: <BiEditAlt className='text-[22px]' />,
          name: "创作"
        },
        {
          to: "#",
          path: "manage",
          icon: <BiCategoryAlt className='text-[22px]' />,
          name: "管理",
          subMenu: [
            {
              to: "/article",
              path: "article",
              name: "文章管理"
            },
            {
              to: "/tag",
              path: "tag",
              name: "标签管理"
            },
            {
              to: "/comment",
              path: "comment",
              name: "评论管理"
            },
            {
              to: "/cate",
              path: "cate",
              name: "分类管理"
            },
            {
              to: "/web",
              path: "web",
              name: "网站管理"
            },
            {
              to: "/swiper",
              path: "swiper",
              name: "轮播图管理"
            },
            {
              to: "/user",
              path: "user",
              name: "用户管理"
            },
            {
              to: "/footprint",
              path: "footprint",
              name: "足迹管理"
            }
          ]
        },
        {
          to: "#",
          path: "rights",
          icon: <BiShieldQuarter className='text-[22px]' />,
          name: "权限",
          subMenu: [
            {
              to: "/route",
              path: "route",
              name: "路由管理"
            },
            {
              to: "/role",
              path: "role",
              name: "角色管理"
            },
          ]
        },
        {
          to: "/setup",
          path: "setup",
          icon: <BiSliderAlt className='text-[22px]' />,
          name: "系统"
        }
      ]
    },
    {
      group: "New",
      list: [
        {
          to: "/work",
          path: "work",
          icon: <TbBrandAirtable className='text-[22px]' />,
          name: "工作台"
        },
        {
          to: "/rss",
          path: "rss",
          icon: <LiaRssSolid className='text-[22px]' />,
          name: "订阅中心"
        },
        {
          to: "/file",
          path: "file",
          icon: <BiFolderOpen className='text-[22px]' />,
          name: "文件系统"
        },
        {
          to: "/stats",
          path: "stats",
          icon: <BiLineChart className='text-[22px]' />,
          name: "数据可视化"
        },
        {
          to: "/iter",
          path: "iter",
          icon: <BiBug className='text-[22px]' />,
          name: "更新日志"
        }
      ]
    }
  ];

  const [routes, setRoutes] = useState<typeof routesAll>([])

  // 获取路由列表
  const getRouteList = async (id: number) => {
    const { data } = await getRouteListAPI(id)
    // 处理成路径
    const pathSet = new Set(data.map((item: Route) => item.path));

    // 过滤出接口中存在的路由
    const filteredRoutes = routesAll.map(group => ({
      ...group,
      list: group.list.map(item => {
        if (item.subMenu) {
          // 过滤出当前子菜单中所有存在的路由
          const filteredSubMenu = item.subMenu.filter(subItem => pathSet.has(subItem.to));
          return filteredSubMenu.length > 0 ? { ...item, subMenu: filteredSubMenu } : null;
        }

        return pathSet.has(item.to) ? item : null;
      }).filter(item => item !== null)
    })).filter(group => group.list.length > 0);

    setRoutes(filteredRoutes);
  }

  useEffect(() => {
    if (store.role.id) getRouteList(store.role.id)
  }, [store])

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex justify-center items-center gap-2 px-6 py-5.5 pb-2 lg:pt-6">
        <NavLink to="/">
          <img src={logo} alt="logo" className='w-30' />
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
          {routes.map((group, index) => (
            <div key={index}>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                {group.group}
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">
                {group.list.map((item, subIndex) => (
                  item.subMenu ? (
                    <SidebarLinkGroup
                      key={subIndex}
                      activeCondition={false}
                    >
                      {(handleClick, open) => (
                        <React.Fragment>
                          <NavLink
                            to={item.to}
                            className={`${sidebarItemSty}`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                            }}
                          >
                            {item.icon}
                            {item.name}
                            <Arrow open={open} />
                          </NavLink>

                          <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              {item.subMenu.map((subItem, subSubIndex) => (
                                <li key={subSubIndex}>
                                  <NavLink
                                    to={subItem.to}
                                    className={({ isActive }) =>
                                      'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                      (isActive && '!text-white')
                                    }
                                  >
                                    {subItem.name}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </React.Fragment>
                      )}
                    </SidebarLinkGroup>
                  ) : (
                    <li key={subIndex}>
                      <NavLink
                        to={item.to}
                        className={`${sidebarItemSty} ${pathname.includes(item.path) && sidebarItemActiveSty}`}
                      >
                        {item.icon}
                        {item.name}
                      </NavLink>
                    </li>
                  )
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
