import { useState } from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import axios from "axios";

const registerSchema = yup.object().shape({
    fullName: yup.string().required("Please input your full name"),
    username: yup.string().required("Please input your username"),
    email: yup.string().email("Email format not valid").required("Please input your email"),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Please input your password"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password")], "Password does not match")
        .required("Please confirm your password"),
});

const useRegister = () =>{
    const router = useRouter();
    const [visiblePassword, setVisiblePassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const {
        control, 
        handleSubmit, 
        formState:{errors},
        reset,
        setError,

    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const registerService = async (payload: IRegister) =>{
        try {
            console.log('Sending registration request:', payload);
            const result = await authServices.register(payload);
            console.log('Registration response:', result);
            return result;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const {
        mutate: mutateRegister, 
        isPending: isPendingRegister,

    } = useMutation({
        mutationFn: registerService,
        onError(error: any){
            console.error('Registration mutation error:', error);
            let errorMessage = 'Registration failed. Please try again.';
            
            if (error.response) {
                // Server responded with error
                const { status, data } = error.response;
                console.log('Error response:', { status, data });
                
                if (status === 404) {
                    errorMessage = 'Registration service not available. Please contact administrator.';
                } else if (status === 500) {
                    errorMessage = 'Server error. Please try again later.';
                } else if (data && data.message) {
                    errorMessage = data.message;
                }
            } else if (error.request) {
                // Request was made but no response
                errorMessage = 'Network error. Please check your connection.';
            }
            
            setError("root",{
                message: errorMessage,
            });
        },
        onSuccess: (data) =>{
            console.log('Registration successful:', data);
            router.push("/auth/register/success");
            reset();
        },
    });

    const handleRegister = (data: IRegister) => mutateRegister(data)

    const handleVisiblePassword = (key: "password" | "confirmPassword")=>{
        setVisiblePassword(
            {
                ...visiblePassword,
            [key]: !visiblePassword[key]
            }
        )
    };
    return {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors,
    }
};

export default useRegister;