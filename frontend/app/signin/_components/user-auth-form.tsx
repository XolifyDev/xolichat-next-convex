"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { toast } = useToast();
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        const r = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: (event.target as HTMLFormElement).email.value,
                password: (event.target as HTMLFormElement).password.value,
            }),
        })

        const response = await r.json();

        if (!response.success) {
            toast({
                variant: "destructive",
                // title: "Error Occurred.",
                description: response.message,
            })
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            // value="        "
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In with Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button className="text-lg" variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-6 w-6" />
                )}{" "}
                GitHub
            </Button>
        </div>
    )
}