// 'use client';

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserManagement() {
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
        <div className="mt-8 space-y-8">
          <form action="#" method="POST">
            <h2 className="font-semibold text-gray-900 dark:text-gray-50">
              Email
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Update your email address associated with this workspace.
            </p>
            <div className="mt-6">
              <Label htmlFor="email" className="font-medium">
                Update email address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="john@company.com"
                className="mt-2 w-full sm:max-w-lg"
              />
            </div>
            <Button type="submit" className="mt-6">
              Update email
            </Button>
          </form>
            <br />
          <form action="#" method="POST">
            <h2 className="font-semibold text-gray-900 dark:text-gray-50">
              Password
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Update your password associated with this workspace.
            </p>
            <div className="mt-6">
              <Label htmlFor="current-password" className="font-medium">
                Current password
              </Label>
              <Input
                type="password"
                id="current-password"
                name="current-password"
                placeholder="password"
                className="mt-2 w-full sm:max-w-lg"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="new-password" className="font-medium">
                New password
              </Label>
              <Input
                type="password"
                id="new-password"
                name="new-password"
                placeholder="password"
                className="mt-2 w-full sm:max-w-lg"
              />
            </div>
            <Button className="mt-6">Update password</Button>
          </form>
        </div>
      </Tabs>
    </>
  );
}
