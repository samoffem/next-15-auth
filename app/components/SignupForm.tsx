"use client"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid"
import { Button, Input } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be atleast 2 characters")
        .max(45, "First name must be less than 45 characters")
        .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed"),
    lastName: z
        .string()
        .min(2, "Last name must be atleast 2 characters")
        .max(45, "Last name must be less than 45 characters")
        .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed"),
    email: z.string().email("Please enter a valid email"),
    password: z
        .string()
        .min(6, "Password must be atleast 6 characters")
        .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
        .string()
        .min(6, "Password must be atleast 6 characters")
        .max(50, "Password must be less than 50 characters"),
    
}).refine(data=> data.password === data.confirmPassword, {
    message: "Password and confirm password dont match",
    path: ["password", "confirmPassword"]
})

type InputType = z.infer<typeof FormSchema>

const SignupForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const {register, handleSubmit, reset, control,watch, formState: {errors}} = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    })
    const [passStrength, setPasswordStrength] = useState(0)

    useEffect(()=>{
        setPasswordStrength(passwordStrength(watch().password).id)
    }, [watch().password])

    const saveUser: SubmitHandler<InputType> = async (data)=>{
        console.log(data)
    }


  return (
   
        <div className="w-[500px] border border-gray-400 px-5 py-4 rounded-lg">
            <h3 className="mb-2 font-semibold text-xl">Registration</h3>

            <form onSubmit={handleSubmit(saveUser)}>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <Input 
                            errorMessage={errors.firstName?.message}
                            isInvalid = {!!errors.firstName}
                            {...register("firstName")} 
                            label="First Name" 
                            size="sm" 
                        />
                       
                        <Input 
                            errorMessage={errors.lastName?.message}
                            isInvalid = {!!errors.lastName}
                            {...register("lastName")} 
                            label="Last Name" size="sm"  
                        />
                    </div>
                    <Input
                        errorMessage={errors.email?.message}
                        isInvalid = {!!errors.email}
                        {...register("email")} 
                        label="Email" size="md" type="email" 
                    />
                    <Input
                        className=""
                        errorMessage={errors.password?.message}
                        isInvalid = {!!errors.password}
                        label="Password"
                        {...register("password")}
                        endContent={
                            <button
                              aria-label="toggle password visibility"
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleVisibility}
                            >
                              {isVisible ? (
                                <EyeSlashIcon width={25} height={25} className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <EyeIcon width={25} height={25} className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                    
                      
                       
                        type={isVisible ? "text" : "password"}
                        
                    />
                    <Input
                        className=""
                        errorMessage={errors.confirmPassword?.message}
                        isInvalid = {!!errors.confirmPassword}
                        {...register("confirmPassword")}
                        label="Confirm password"
                        type={isVisible ? "text" : "password"}
                    />
                </div>
                {/* <Controller 
                    control={control}
                    name="accep"
                /> */}
                <Button type="submit" color="primary" variant="solid" className="w-full mt-5">
                    Register Now
                </Button>

                <div className="mt-5 text-center text-sm">
                    <p>Already have an account? <Link href="/auth/login" className="text-blue-400">Login here</Link>
                    </p>
                </div>
               

            </form>
        </div>
       
    
  )
}

export default SignupForm