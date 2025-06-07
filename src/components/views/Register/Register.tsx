import { Button, button, Card, CardBody, Input, Link } from "@nextui-org/react";
import Image from "next/image";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";


const Register = () => {
    const {visiblePassword, handleVisiblePassword} = useRegister();
    return(
        <div className="flex w-full items-center justify-center gap-10 lg:gap-20 flex-col lg:flex-row">
            <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
                <Image src="/images/general/logo.svg" alt="logo" width={180} height={180}/>
                <Image 
                    src="/images/ilustration/login.svg" 
                    alt="login" 
                    width={1024} 
                    height={1024}
                    className="w-2/3 lg:w-full"
                    />
            </div>
            <Card className="p-8">
                <CardBody>
                    <h2 className="text-xl font-bold text-danger-500">Create Account</h2>
                    <p className="text-small mb-4">Have an account?&nbsp;
                        <Link href="/login" className="font-semibold text-danger-400">Login here</Link>
                    </p>
                    <form className="flex w-80 flex-col gap-4">
                        <Input 
                            type="text" 
                            label="fullName" 
                            variant="bordered" 
                            autoComplete="off"
                        />
                        <Input 
                            type="text" 
                            label="username" 
                            variant="bordered" 
                            autoComplete="off"
                        />
                        <Input 
                            type="email" 
                            label="email" 
                            variant="bordered" 
                            autoComplete="off" 
                        />
                        <Input 
                            type={visiblePassword.password ? " text" : "password"}
                            label="password" 
                            variant="bordered" 
                            autoComplete="off"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={() => handleVisiblePassword("password")}
                                >
                                    {visiblePassword.password ? (
                                        <FaEye className="text-xl text-default-400 pointer-events-none"/>
                                    ): (
                                        <FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>

                            }
                        />
                        <Input 
                            type={visiblePassword.confirmPassword ? " text" : "password"}
                            label="confirm password" 
                            variant="bordered" 
                            autoComplete="off"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={() => handleVisiblePassword("confirmPassword")}
                                >
                                    {visiblePassword.confirmPassword ? (
                                        <FaEye className="text-xl text-default-400 pointer-events-none"/>
                                    ): (
                                        <FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>

                            }
                        />
                        <Button color="danger" size="lg" type="submit"> Register</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Register;