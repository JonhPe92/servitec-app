'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

const MenuItem = ({ item }: { item: SideNavItem }) => {
    const pathname = usePathname();
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const toggleSubMenu = () => {
      setSubMenuOpen(!subMenuOpen);
    };
  
    return (
      <div className="">
        {item.submenu ? (
          <>
            <button
              onClick={toggleSubMenu}
              className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between text-gray-50 hover:bg-zinc-100 hover:text-secondary ${
                pathname.includes(item.path) ? 'bg-zinc-100 hover:text-secondary' : ''
              }`}
            >
              <div className="flex flex-row space-x-4 items-center">
                {item.icon}
                <span className="font-semibold text-md hover:text-secondary flex">{item.title}</span>
              </div>
  
              <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
                <Icon icon="lucide:chevron-down" width="24" height="24" />
              </div>
            </button>
  
            {subMenuOpen && (
              <div className="my-2 ml-12 flex flex-col space-y-2">
                {item.subMenuItems?.map((subItem, idx) => {
                  return (
                    <Link
                      key={idx}
                      href={subItem.path}
                      className={`rounded-lg p-1.5 hover:bg-zinc-100 hover:text-secondary text-gray-50 ${
                        subItem.path === pathname ? 'bg-primary' : ''
                      }`}
                    >
                      <span className='text-sm'>{subItem.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.path}
            className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 hover:text-secondary text-gray-50 ${
              item.path === pathname ? 'bg-primary' : ''
            }`}
          >
            {item.icon}
            <span className="font-semibold text-md flex hover:text-secondary">{item.title}</span>
          </Link>
        )}
      </div>
    );
  };

  export default MenuItem