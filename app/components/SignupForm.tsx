"use client"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid"
import { Input } from "@heroui/react"
import { useState } from "react";

const SignupForm = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
  return (
   
        <div className="max-w-[500px]">
            <h3>Registration</h3>

            <form>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Input label="First Name" size="sm" />
                        <Input label="Last Name" size="sm"  />
                    </div>
                    <Input label="Email" size="md" type="email" />
                    <Input
                        className=""
                        
                        label="Password"

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
                        label="Confirm password"
                        type={isVisible ? "text" : "password"}
                    />
                </div>

            </form>
        </div>
       
    
  )
}

export default SignupForm