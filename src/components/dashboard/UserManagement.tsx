'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PasswordSchema } from '@/lib/zod'

type PasswordFormData = z.infer<typeof PasswordSchema>

export default function App() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(PasswordSchema),
  })

  async function onSubmit(data: PasswordFormData) {
    await authClient.changePassword(
      {
        newPassword: data.password,
        currentPassword: data.oldPassword,
        revokeOtherSessions: true,
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          toast({
            title: 'Password updated successfully',
            description: 'Your password has been changed.',
            variant: 'success',
          })
          reset()
        },
        onError: () => {
          toast({
            title: 'Failed to update password',
            description: 'Please check your current password and try again.',
            variant: 'destructive',
          })
        },
      },
    )
  }

  return (
    <div className="max-h-screen p-6">
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard settings
          </h1>
        </div>
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <KeyRound className="h-5 w-5" />
            <h2>Change your password</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Password must be at least 5 characters
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Current password</Label>
              <Input
                id="oldPassword"
                type="password"
                {...register('oldPassword')}
                className={errors.oldPassword ? 'border-destructive' : ''}
              />
              {errors.oldPassword && (
                <p className="text-sm text-destructive">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm new Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'border-destructive' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating password...
                </>
              ) : (
                'Update password'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
