"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  ShieldCheckIcon,
  KeyIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, AlertCircleIcon } from "lucide-react";
import { changePassword } from "@/helpers/user/changePassword";
import { signIn, useSession } from "next-auth/react";

// Password validation schema
const changePasswordSchema = zod
  .object({
    currentPassword: zod
      .string()
      .nonempty("Password is required")
      .min(8, "New password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/,
        "password is not valid"
      ),
    password: zod
      .string()
      .nonempty("Password is required")
      .min(8, "New password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/,
        "password is not valid"
      ),
    rePassword: zod.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

type PasswordFormData = zod.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const { data: userData } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (formData: PasswordFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      const response = await changePassword(formData);
      if ("user" in response!) {
        setSubmitStatus("success");
        form.reset();
        await signIn("credentials", {
          email: userData?.user.email,
          password: formData.password,
          redirect: false,
        });
      }
    } catch (error) {
      console.log(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <ShieldCheckIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Change Password</h1>
        <p className="text-muted-foreground mt-2">
          Keep your account secure with a strong new password
        </p>
      </motion.div>

      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
            <LockIcon className="text-primary" />
            Password Security
          </CardTitle>
          <CardDescription>
            Enter your current password and create a new secure password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Current Password */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <KeyIcon className="h-4 w-4" />
                      Current Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          className="pr-12"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <LockIcon className="h-4 w-4" />
                      New Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          className="pr-12"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />

                    {/* Password Requirements */}
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1">
                        <span
                          className={
                            field.value.length >= 8
                              ? "text-green-500"
                              : "text-muted-foreground"
                          }
                        >
                          {field.value.length >= 8 ? (
                            <CheckCircleIcon className="h-3 w-3" />
                          ) : (
                            <AlertCircleIcon className="h-3 w-3" />
                          )}
                        </span>
                        At least 8 characters
                      </p>
                      <p className="flex items-center gap-1">
                        <span
                          className={
                            /(?=.*[A-Z])/.test(field.value)
                              ? "text-green-500"
                              : "text-muted-foreground"
                          }
                        >
                          {/(?=.*[A-Z])/.test(field.value) ? (
                            <CheckCircleIcon className="h-3 w-3" />
                          ) : (
                            <AlertCircleIcon className="h-3 w-3" />
                          )}
                        </span>
                        Contains uppercase letter
                      </p>
                      <p className="flex items-center gap-1">
                        <span
                          className={
                            /(?=.*[@$!%*?&])/.test(field.value)
                              ? "text-green-500"
                              : "text-muted-foreground"
                          }
                        >
                          {/(?=.*[@$!%*?&])/.test(field.value) ? (
                            <CheckCircleIcon className="h-3 w-3" />
                          ) : (
                            <AlertCircleIcon className="h-3 w-3" />
                          )}
                        </span>
                        Contains special character (@$!%*?&)
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {/* Re-enter Password */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <LockIcon className="h-4 w-4" />
                      Confirm New Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showRePassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          className="pr-12"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowRePassword(!showRePassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showRePassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AnimatePresence mode="wait">
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-700"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    Password changed successfully!
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700"
                  >
                    <AlertCircleIcon className="h-4 w-4" />
                    Failed to change password. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-6 text-lg font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Changing Password...
                  </span>
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center pt-4 text-sm text-muted-foreground">
          <p>
            Make sure to choose a strong password that you haven&apos;t used
            before
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
