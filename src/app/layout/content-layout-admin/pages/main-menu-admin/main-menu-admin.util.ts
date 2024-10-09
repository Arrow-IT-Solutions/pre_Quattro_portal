import { animate, style, transition, trigger } from '@angular/animations';

export interface NavbarData {
  routeLink?: string | '';
  icon?: string;
  label?: string;
  labelar?: string;
  expanded?: boolean;
  id?: string;
  idhash?: string;
  char?: string;
  items?: NavbarData[];
}

export const navbarData: NavbarData[] = [
  {
    label: 'Dashboard',
    labelar: 'لوحة التحكم',
    id: 'dashboard',
    icon: 'speed',
    routeLink: 'dashBoard'
  },
  {
  label: 'Users',
  labelar: 'المستخدمين',
  id: 'Users',
  icon: 'group',
  items: [
    {
      label: 'Clients',
      labelar: 'الزبائن',
      id: 'Clients',
      routeLink: "clients"
    },
    {
      label: 'Employees',
      labelar: 'الموظفين',
      id: 'Employees',
      
      routeLink: "employees"
    }

  ]},
   
  {
    label: 'Advertisement',
    labelar: 'الإعلانات',
    id: 'Advertisement',
    icon: 'receipt_long',
    routeLink: "Advertisement"
  },
 
  {
    label: 'Categories',
    labelar: ' الفئات',
    id: 'Categories',
    icon: 'category',
    routeLink: "categories"
  },


];
