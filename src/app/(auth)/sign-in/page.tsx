import { SignIn } from "@/components/authform/SignIn";

export default async function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm"><SignIn/></div>
    </div>
  );
}
