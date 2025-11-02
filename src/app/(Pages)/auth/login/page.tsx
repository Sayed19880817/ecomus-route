"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  Star,
  CheckCircle,
  LogIn,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Logo from "@/components/design/Logo";
import OauthBtns from "@/components/auth/OauthBtns";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const loginSchema = zod.object({
  email: zod
    .string()
    .nonempty("Email is required")
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid"
    ),
  password: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/,
      "password is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  // Login form
  const loginForm = useForm<zod.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  // 2. Define a submit handler.
  async function onSubmit(values: zod.infer<typeof loginSchema>) {
    setErrMsg("");
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.ok) {
      router.push(callbackUrl ?? "/");
    } else {
      setErrMsg("Incorrect email or password");
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center py-10">
      <div className="w-full max-w-md px-2">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mt-5">
            <Link className="scale-150" href={"/"}>
              <Logo />
            </Link>
          </div>
        </div>

        <Card className="shadow-2xl border-2 dark:bg-slate-900/70 bg-white backdrop-blur-md">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center">
              Sign In
              <svg
                width="81"
                height="13"
                viewBox="0 0 81 13"
                fill="none"
                className="w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.83129C11.2362 3.01698 48.4961 -0.511728 79 4.83131C63.1658 4.83131 42.5354 5.37158 29.252 11"
                  stroke="#3F96D2"
                  strokeWidth="3"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to complete shopping
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Form */}
            <div className="space-y-4">
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Email */}
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="youremail@gmail.com"
                              className={cn(
                                "pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-colors",
                                loginForm.formState.errors.email &&
                                  "border-red-400!"
                              )}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    // control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="********"
                              className={cn(
                                "pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-colors",
                                loginForm.formState.errors.password &&
                                  "border-red-400!"
                              )}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h3 className="text-red-400 text-center">{errMsg}</h3>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    // onClick={loginForm.handleSubmit(onSubmit)}
                    className="w-full h-12 text-base text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                  >
                    {isLoading && (
                      <Loader2 className="animate-spin size-5 text-white" />
                    )}
                    Sign In
                    <LogIn className="w-4 h-4" />
                  </Button>
                </form>
              </Form>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <Button
                  variant="link"
                  asChild
                  className="text-sm text-blue-600 hover:text-blue-700 p-0"
                >
                  <Link href={"/auth/forgot-password"}>Forgot password?</Link>
                </Button>
              </div>
            </div>

            {/* Switch to Signup */}
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
              </span>
              <Button
                variant="link"
                asChild
                className="text-sm text-blue-600 hover:text-blue-700 p-0"
              >
                <Link href={"/auth/register"}>Create New Account</Link>
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground px-2">
                or continue with
              </span>
              <Separator className="flex-1" />
            </div>

            {/* Social Sign In */}
            <OauthBtns />
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>Trusted</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>Rated 4.9/5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
