import { ElementType } from 'react';

import { Menu } from '@headlessui/react';

import ComponentIsVisible from '@components/utils/IsVisible';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

interface IProps {
  name: string;
  icon: ElementType;
  onClick(): void;
  color?: string;
  hasSeparatorTop?: boolean;
}

function DropdownItem({
  color,
  hasSeparatorTop = false,
  icon: Icon,
  name,
  onClick,
}: IProps) {
  return (
    <>
      <ComponentIsVisible when={hasSeparatorTop}>
        <hr className="h-0.5 w-full border bg-gray-300" />
      </ComponentIsVisible>
      <Menu.Item>
        {({ active }) => (
          <button
            className={classNames(
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              `${color} flex w-full flex-row items-center gap-2 px-4 py-2 text-sm`,
            )}
            onClick={onClick}
            type="button"
          >
            <Icon size={20} />
            {name}
          </button>
        )}
      </Menu.Item>
    </>
  );
}

export type { IProps };
export default DropdownItem;
