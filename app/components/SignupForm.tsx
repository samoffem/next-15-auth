"use client"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid"
import { Button, Input } from "@heroui/react"
import Link from "next/link";
import { useState } from "react";

const SignupForm = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
  return (
   
        <div className="w-[500px] border border-gray-400 px-5 py-4 rounded-lg">
            <h3 className="mb-2 font-semibold text-xl">Registration</h3>

            <form>
                <div className="flex flex-col gap-4">
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
               
                <Button color="primary" variant="solid" className="w-full mt-5">
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