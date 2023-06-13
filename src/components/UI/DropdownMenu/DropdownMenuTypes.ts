type MenuItem = {
  id?: string;
  title: string;
  to?: string;
};

export type DropdownMenuProps = {
  title: string;
  dropdownItems: MenuItem[];
};
