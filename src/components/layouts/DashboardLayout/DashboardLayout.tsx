import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import sidebarConstants from "./DashboardLayout.constans";
import { Navbar, NavbarMenuToggle } from "@nextui-org/react";

const { SIDEBAR_ADMIN, SIDEBAR_MEMBER } = sidebarConstants;

interface PropTypes {
    children: ReactNode;
    title?: string;
    type: string;
    description?: string;
}

const DashboardLayout = (props: PropTypes) => {
    const {children, description, title, type = 'admin'} = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <PageHead title={title}/>

            <div className="flex h-screen w-full">
                {/* Sidebar */}
                <div className={`${open ? 'block' : 'hidden'} lg:block lg:w-80`}>
                    <DashboardLayoutSidebar 
                        sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
                        isOpen={open}
                    />
                </div>
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar className="flex justify-between bg-transparent px-4" isBlurred={false}
                    classNames={{wrapper: "p-0"}} 
                    position="static">
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <NavbarMenuToggle 
                            aria-label={open ? "Close Menu" : "Open Menu"} 
                            onClick={() => setOpen(!open)}
                            className="lg:hidden"
                        />
                    </Navbar>
                    
                    <div className="flex-1 overflow-y-auto p-4">
                        {description && <p className="mb-4 text-small">{description}</p>}
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;