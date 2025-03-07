'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export function DeleteUser() {
  const router = useRouter()

  async function handleDelete() {
    await authClient.deleteUser(
      {},
      {
        onSuccess: () => {
          toast({
            title: 'Account deleted',
            description:
              'Your account has been successfully deleted. Redirecting to the home page...',
            variant: 'success',
          })
          setTimeout(() => {
            router.push('/')
          }, 1500)
        },
        onError: () => {
          toast({
            title: 'Failed to delete account',
            description: 'Try again later.',
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
          <h1 className="text-2xl font-bold tracking-tight text-red-700">
            Danger Zone
          </h1>
        </div>
        <div>
          <div className="mb-5 space-y-8">
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <h1>Delete your account</h1>
            </div>
            <h1 className="flex items-center gap-2 text-base text-muted-foreground">
              Once you delete your account, there is no going back. Please be
              certain.
            </h1>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="bg-red-700 hover:bg-red-800"
              >
                Delete account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-700 hover:bg-red-800"
                  onClick={() => {
                    handleDelete()
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
