"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";

export default function UserManagement() {
  const { register, handleSubmit } = useForm();
  const { toast } = useToast();

  async function onSubmit(dataPassword: any) {

    const { password, oldPassword } = dataPassword

    try {
      await authClient.changePassword(
        {
          newPassword: password,
          currentPassword: oldPassword,
          revokeOtherSessions: true,
        },
        {
          onResponse: () => {},
          onRequest: () => {},
          onSuccess: (ctx) => {
            toast({
              title: "Changed password!",
              description: "Your password has been changed!",
              variant: "success",
            });
            console.log(ctx.response);
            
          },
          onError: (ctx) => {
            toast({
              title: "Something went wrong!",
              description: "Please try again later!",
              variant: "destructive",
            });
            console.log(ctx.error);
            
          },
        }
      );
    } catch (error) {
      console.log("Error in catch");
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        Settings
      </h1>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details.
      </p>
      <br />
      <Tabs defaultValue="tab1" className="mt-8">
        <div>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-semibold text-gray-900 dark:text-gray-50">
              Password
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Update your password associated with this workspace.
            </p>
            <div className="mt-4">
              <Label htmlFor="oldPassword" className="font-medium">
                Old password
              </Label>
              <Input
                type="password"
                id="oldPassword"
                placeholder="Old password"
                className="mt-2 w-full sm:max-w-lg"
                {...register("oldPassword")}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="password" className="font-medium">
                New password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="password"
                className="mt-2 w-full sm:max-w-lg"
                {...register("password")}
              />
            </div>
            <Button className="mt-6">Update password</Button>
          </form>
        </div>
      </Tabs>
    </>
  );
}
