import { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { CaretDown } from '@phosphor-icons/react';

import helperUniqueId from '@helpers/uniqueId';

import DropdownItem, { IProps as ItemProps } from './Item';

interface IProps {
  items: ItemProps[];
}

function ComponentDropdown({ items }: IProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Ações
        <CaretDown aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((item) => (
            <DropdownItem
              color={item.color}
              hasSeparatorTop={item.hasSeparatorTop}
              icon={item.icon}
              key={helperUniqueId()}
              name={item.name}
              onClick={item.onClick}
            />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ComponentDropdown;
