import React from "react";
import { FiHome, FiShoppingCart, FiUsers } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { BsBox } from "react-icons/bs";


export const LINKS = [
  {
    id: 1,
    name: "Dashboard",
    route: "/dashboard",
    icon: React.createElement(FiHome)
  },
  {
    id: 2,
    name: "Categories",
    route: "/dashboard/categories",
    icon: React.createElement(BiCategory)
  },
  {
    id: 3,
    name: "Products",
    route: "/dashboard/products",
    icon: React.createElement(BsBox)
  },
  {
    id: 4,
    name: "Orders",
    route: "/dashboard/orders",
    icon: React.createElement(FiShoppingCart)
  },
  {
    id: 5,
    name: "Users",
    route: "/dashboard/users",
    icon: React.createElement(FiUsers)
  },
  
]
