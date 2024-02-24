'use client'

import { DASHBOARD_PAGE } from "@/config/pages-url.config"
import { Heading } from "@/entities/hending/Hending"
import { Button } from "@/feature/button/Button"
import Fields from "@/feature/fields/Fields"
import { authService } from "@/shared/api/services/auth.service"
import { IAuthForm } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export function Auth() {
    const {register, handleSubmit, reset} = useForm<IAuthForm>({
        mode: 'onChange'
    })

    const [isLoginForm, setIsLoginForm] = useState(false)

    const {push} = useRouter()

    const {mutate} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess() {
            toast.success('Вы успешно вошли')
            reset()
            push(DASHBOARD_PAGE.HOME)
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = data => {
        mutate(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading title="Auth"/>

                <Fields 
                    id="email"
                    label="Email:"
                    placeholder="Enter email"
                    type="email"
                    {...register('email', {
                        required: 'Email is required'
                    })}
                />
                <Fields 
                    id="password"
                    label="Password:"
                    placeholder="Enter password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required'
                    })}
                />
                <div>
                    <Button onClick={() => setIsLoginForm(true)}>Login</Button>
                    <Button onClick={() => setIsLoginForm(false)}>Register</Button>
                </div>
            </form>
        </div>
    )
}