export interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
  scope?: 'member' | 'internal';
}
