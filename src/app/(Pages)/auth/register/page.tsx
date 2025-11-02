"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  Shield,
  Star,
  CheckCircle,
  UserCircle2,
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
import Link from "next/link";
import Logo from "@/components/design/Logo";
import * as zod from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { registerAction } from "@/actions/register.action";
// import { Alert, AlertDescription } from "@/components/ui/alert";

const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(5, "Name must be at least 5 characters")
      .max(20, "Name must be at most 20 characters")
      .regex(
        /^([A-Za-z']+([ ]?[A-Za-z]+)*){5,20}$/,
        "Invalid characters at Name"
      ),
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
        "password is not valid"
      ),
    rePassword: zod.string().nonempty("Confirm Password is required"),
    phone: zod
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0125][0-9]{8}$/, "the phone is not valid"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Confirm password not match password",
    path: ["rePassword"],
  });

export default function AuthPages() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();

  // Signup form
  const registerForm = useForm<zod.infer<typeof registerSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  async function onSubmit(values: zod.infer<typeof registerSchema>) {
    setErrMsg("");
    setSuccessMsg("");
    setIsLoading(true);
    const response = await registerAction(values);

    if (response.message == "success") {
      setSuccessMsg(response.message);
      registerForm.reset();
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } else {
      setErrMsg(response.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="w-full max-w-lg px-2">
        {/* Header */}
        <div className="flex items-center justify-center mt-5 mb-8">
          <Link className="scale-150" href={"/"}>
            <Logo />
          </Link>
        </div>

        <Card className="shadow-2xl border-2 dark:bg-slate-900/70 bg-white backdrop-blur-md">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center">
              Sign Up
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
              Join us today and start your shopping
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Form */}
            <div className="space-y-4">
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Name */}
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <UserCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="john"
                              className={cn(
                                "pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-colors",
                                registerForm.formState.errors.name &&
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

                  {/* Email */}
                  <FormField
                    control={registerForm.control}
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
                                registerForm.formState.errors.email &&
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
                    // control={registerForm.control}
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
                                registerForm.formState.errors.password &&
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

                  {/* Confirm Password */}
                  <FormField
                    // control={registerForm.control}
                    name="rePassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="rePassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="********"
                              className={cn(
                                "pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-colors",
                                registerForm.formState.errors.rePassword &&
                                  "border-red-400!"
                              )}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showConfirmPassword ? (
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

                  {/* Phone */}
                  <FormField
                    control={registerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="phone"
                              type="number"
                              placeholder="0 (0125) 12345678"
                              className={cn(
                                "pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-colors",
                                registerForm.formState.errors.phone &&
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

                  {/* Error and Success Message */}
                  <h3 className="text-red-400 text-center">{errMsg}</h3>
                  <h3 className="text-green-400 text-center">{successMsg}</h3>

                  <Button
                    disabled={isLoading}
                    type="submit"
                    // onClick={signupForm.handleSubmit(onSignupSubmit)}
                    className="w-full h-12 text-base text-white font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                  >
                    {isLoading && (
                      <Loader2 className="animate-spin size-5 text-white" />
                    )}
                    Create Account
                  </Button>
                </form>
              </Form>
            </div>

            {/* Switch to Login */}
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Button
                variant="link"
                asChild
                className="text-sm text-green-600 hover:text-green-700 p-0"
              >
                <Link href={"/auth/login"}>Sign in</Link>
              </Button>
            </div>
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
