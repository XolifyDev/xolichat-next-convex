import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "./_components/user-auth-form"

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/examples/authentication-light.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/authentication-dark.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block"
                />
            </div>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/signup"
                    className={cn(
                        buttonVariants({ variant: "default" }),
                        "absolute right-4 px-10 top-4 md:right-8 md:top-8"
                    )}
                >
                    Signup
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 gap-4 flex items-center text-lg font-medium">
                        <Image src={"https://cdn.xolify.store/u/xolifycdn/jxbXxECOLW.png"} height={50} width={50} alt="logo" />
                        Xolify Development - Xolichat
                    </div>
                    <div className="relative mt-72 z-20 flex items-center text-lg font-medium">
                        <Image src={"https://cdn.xolify.store/u/xolifycdn/JevDnDdVwW.png"} className="rounded-md" height={900} width={900} alt="Image" />
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login into your account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password to sign in.
                            </p>
                        </div>
                        <UserAuthForm />
                    </div>
                </div>
            </div>
        </>
    )
}