import React from "react";
import { FiShoppingCart, FiHeart, FiSettings} from "react-icons/fi";

export const LINKS = [
  {
    id: 1,
    name: "New Arriaval",
    route: "/product/search?categoryName=&sort=newArrivals",
  },
  {
    id: 2,
    name: "Men",
    route: "/product/search?categoryName=men",
  },
  {
    id: 3,
    name: "Women",
    route: "/product/search?categoryName=women",
  },
  {
    id: 4,
    name: "Kids",
    route: "/product/search?categoryName=kids"
  },
  {
    id: 5,
    name: "Newborn",
    route: "/product/search?categoryName=newborn"
  },
  {
    id: 6,
    name: "Accessories",
    route: "/product/search?categoryName=accessories"
  },
  {
    id: 7,
    name: "Footwear",
    route: "/product/search?categoryName=footwear"
  },
]


export const PROFILE_LINKS = [
  {
    id: 1,
    text: "My Orders",
    Icon: React.createElement(FiShoppingCart),
    link: "/account/profile?section=orders",
  },
  {
    id: 2,
    text: "Saved List",
    Icon: React.createElement(FiHeart),
    link: "/account/profile?section=wishlist",
  },
  {
    id: 3,
    text: "Profile Settings",
    Icon: React.createElement(FiSettings),
    link: "/account/profile?section=settings",
  },
]