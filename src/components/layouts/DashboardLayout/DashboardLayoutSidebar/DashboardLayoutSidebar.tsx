import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";


interface SidebarItems{
    key: string,
    label: string,
    href: string,
    icon: JSX.Element;
}

interface PropTypes {
    sidebarItems: SidebarItems[];
    isOpen: boolean;
}



export const DashboardLayoutSidebar =(props: PropTypes) => {
    const {sidebarItems, isOpen} = props;
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await signOut({ 
                redirect: true,
                callbackUrl: "/"
            });
        } catch (error) {
            console.error("Logout error:", error);
            // Fallback: redirect manually if signOut fails
            router.push("/");
        } finally {
            setIsLoggingOut(false);
        }
    };
    
    return (
        <div className={cn("fixed lg:relative z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:translate-x-0",
            {
                "translate-x-0" : isOpen
            }
        )}>
            <div>
                <div className="flex justify-center w-full">
                    <Image src={"/images/general/logo.svg"} alt="logo" width={180} height={60} className="mb-6
                    w-32" onClick={() => router.push("/")}/>
                    
                </div>
                <Listbox items={sidebarItems} variant="solid" aria-label="Dashboard Menu">
                        {
                            (item)=> (
                                <ListboxItem key={item.key} className={cn("my-1 h-12 text-2xl", {
                                    "bg-danger-500 text-white " : router.pathname.startsWith(item.href),
                                })}
                                startContent={item.icon}
                                textValue={item.label}
                                aria-labelledby={item.label}
                                aria-describedby={item.label}
                                >
                                    <p className="text-small">{item.label}</p>

                                </ListboxItem>
                            )
                        }
                    </Listbox>
            </div>
            <div className="flex item-center p-1">
                <Button 
                    color="danger" 
                    fullWidth 
                    variant="light" 
                    className="flex justify-start rounded-lg px-2 py-1.5" 
                    size="lg" 
                    onClick={handleLogout}
                    isLoading={isLoggingOut}
                    disabled={isLoggingOut}
                >
                    {!isLoggingOut && <CiLogout />}
                    {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
            </div>
        </div>
    )
}