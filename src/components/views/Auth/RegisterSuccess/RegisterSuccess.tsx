import { Button } from "@nextui-org/react";
import Image from "next/image"
import { Router, useRouter } from "next/router";


const RegisterSuccess = () => {
    const router = useRouter();
    return (
        <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image src="/images/general/logo.svg" alt="logo" width={180} height={180}/>
                <Image 
                    src="/images/ilustration/email-send.svg" 
                    alt="success" 
                    width={300} 
                    height={300}
                    // className="w-2/3 lg:w-full"
                />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold text-danger-500">
                    Create Account Success
                </h1>
                <p className="text-xl font-bold text-default-500">
                    Check your email for account activation
                </p>
                <Button className="mt-4 w-fit" variant="bordered" color="danger" onClick={()=> router.push("/")}>
                    Back to home
                </Button>
            </div>
        </div>
    );
};

export default RegisterSuccess;