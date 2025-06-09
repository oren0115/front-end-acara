import { useState } from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin, IRegister } from "@/types/Auth";
import authServices from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import axios from "axios";
import { signIn } from "next-auth/react";

const loginSchema = yup.object().shape({
    identifier: yup.string().required("Please input your email or username"),
    password: yup.string()
        .required("Please input your password"),
});

const useLogin = () =>{
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const callbackUrl: string = (router.query.callbackUrl as string) || "/"

    const {
        control, 
        handleSubmit, 
        formState:{errors},
        reset,
        setError,

    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const loginService = async (payload: ILogin) =>{
            const result = await signIn("credentials", {
                ...payload,
                redirect: false,
                callbackUrl,
            });
            if(result?.error && result?.status === 401){
                throw new Error ("email or username no match with your password");
            }
    };

    const {
        mutate: mutateLogin, 
        isPending: isPendingLogin,

    } = useMutation({
        mutationFn: loginService,
        onError(error: any){           
            setError("root",{
                message: error.message,
            });
        },
        onSuccess: (data) =>{
            router.push(callbackUrl);
            reset();
        },
    });

    const handleLogin = (data: ILogin) => mutateLogin(data)

    
    return {
        isVisible,
        handleLogin,
        control,
        handleSubmit,
        toggleVisibility,
        isPendingLogin,
        errors,
    }
};

export default useLogin;