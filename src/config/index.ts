export type IMenu = {
    id: number;
    path: string;
    name: string;
    icon: string;
  };
export const menus: IMenu[] = [
    { id: 1, path: "/", name: "首页", icon: "" },
    { id: 2, path: "/blog", name: "博客", icon: "" },
    { id: 3, path: "/tag", name: "标签", icon: "" },
    { id: 4, path: "/about", name: "关于", icon: "" },
];

export const siteTitle = '博客-nhdeng'