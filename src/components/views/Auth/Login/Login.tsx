import { Button, button, Card, CardBody, Input, Link, Spinner, toggle } from "@nextui-org/react";
import Image from "next/image";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import { error } from "console";


const Login = () => {
    const {
        isVisible, 
        toggleVisibility,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    } = useLogin();
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
                    <h2 className="text-xl font-bold text-danger-500"> Login</h2>
                    <p className="text-small mb-4">Dont have an account?&nbsp;
                        <Link href="/auth/register" className="font-semibold text-danger-400">register here</Link>
                    </p>
                    {errors.root &&  (
                        <p className="mb-2 font-medium text-danger">
                            {errors?.root?.message}
                        </p>
                    )}
                    <form className={cn("flex w-80 flex-col gap-4", Object.keys(errors).length> 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleLogin)}>
                        <Controller 
                            name="identifier" 
                            control={control} 
                            render={({field}) => (
                                <Input 
                                    {...field}
                                    type="text" 
                                    label="username or email" 
                                    variant="bordered" 
                                    autoComplete="off"
                                    isInvalid={errors.identifier !== undefined}
                                    errorMessage={errors.identifier?.message}
                                />
                            )}
                        />
                        <Controller 
                            name="password" 
                            control={control} 
                            render={({field}) => (
                               <Input  
                               {...field}
                                type={isVisible ? " text" : "password"}
                                label="password" 
                                variant="bordered" 
                                autoComplete="off"
                                isInvalid={errors.password !== undefined}
                                    errorMessage={errors.password?.message}
                                endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? (
                                        <FaEye className="text-xl text-default-400 pointer-events-none"/>
                                    ): (
                                        <FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>

                                }
                                />
                            )}
                        />
                        <Button color="danger" size="lg" type="submit">
                            {isPendingLogin ? (
                                <Spinner color="white" size="sm"/>
                            ): "Login"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Login;