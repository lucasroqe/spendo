'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { AuthSchema } from '@/lib/zod'
import { LoaderCircle, Eye, EyeOff } from 'lucide-react'

import { authClient } from '@/lib/auth-client'

export function SignUp({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  type RegisterType = z.infer<typeof AuthSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(AuthSchema),
    mode: 'onSubmit',
  })

  async function onSubmit(data: RegisterType) {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: '',
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          setLoading(false)
          console.log('usuario cadastrado', data)
          toast({
            title: 'Registration Successful',
            description:
              'Your account has been created. Redirecting to login page...',
            variant: 'success',
          })
          setTimeout(() => {
            router.push('/sign-in')
          }, 1500)
        },
        onError: (ctx: any) => {
          setLoading(false)
          toast({
            description: ctx.error.message,
          })
        },
      },
    )
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-emerald-500">Register</CardTitle>
          <CardDescription>
            Enter your email and password below to register your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-emerald-900">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register('email')}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-emerald-900">
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {(errors.password || errors.email) && (
                  <p className="text-sm text-red-500">
                    {errors.email?.message && (
                      <span>{errors.email.message}</span>
                    )}
                    <br />
                    {errors.password?.message && (
                      <span>{errors.password.message}</span>
                    )}
                  </p>
                )}
              </div>
              <Button
                disabled={loading}
                type="submit"
                className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
              >
                {loading ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  'Register'
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link
                href="/sign-in"
                className="text-emerald-900 underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
