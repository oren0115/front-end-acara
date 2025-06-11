import { CiGrid41, CiSettings, CiWallet, CiViewList, CiShoppingTag, CiBookmark } from "react-icons/ci";


const SIDEBAR_MEMBER =[
    {
        key: "dashboard",
        label: "Dashboard",
        href: "/member",
        icon: <CiGrid41 />
    },
    {
        key: "transaction",
        label: "Transaction",
        href: "/member/transaction",
        icon: <CiWallet />
    },
    {
        key: "settings",
        label: "Settings",
        href: "/member/settings",
        icon: <CiSettings />
    }

    
]

const SIDEBAR_ADMIN =[
    {
        key: "dashboard",
        label: "Dashboard",
        href: "/admin",
        icon: <CiGrid41 />
    },
    {
        key: "event",
        label: "Event",
        href: "/admin/event",
        icon: <CiViewList />
    },
    {
        key: "banner",
        label: "Banner",
        href: "/admin/banner",
        icon: <CiBookmark />
    },
    {
        key: "category",
        label: "Category",
        href: "/admin/category",
        icon: <CiShoppingTag />
    },
    {
        key: "transaction",
        label: "Transaction",
        href: "/admin/transaction",
        icon: <CiWallet />
    },
    
];


export default {SIDEBAR_ADMIN, SIDEBAR_MEMBER}