"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
  MailIcon,
  ArrowLeftIcon,
  ClockIcon,
  ShieldCheckIcon,
  KeyIcon,
  LockIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/helpers/user/forgotPassword";
import { verifyResetCode } from "@/helpers/user/verifyRestCode";
import { resetPassword } from "@/helpers/user/resetPassword";

// Validation schemas
const emailSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address"
    ),
});

const codeSchema = z.object({
  resetCode: z.string().min(6, "Verification code must be 6 digits"),
});

const resetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address"
    ),
  newPassword: z
    .string()
    .nonempty("Password is required")
    .min(8, "New password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
});

type EmailFormData = z.infer<typeof emailSchema>;
type CodeFormData = z.infer<typeof codeSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [countdown, setCountdown] = useState(0);
  const [currentStep, setCurrentStep] = useState<"email" | "code" | "reset">(
    "email"
  );
  const [email, setEmail] = useState("");

  // Forms
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const codeForm = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
      newPassword: "",
    },
  });

  // Update reset form email when email changes
  useEffect(() => {
    resetForm.setValue("email", email);
  }, [email, resetForm]);

  const handleEmailSubmit = async (emailFormData: EmailFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await forgotPassword(emailFormData);
      if (response?.statusMsg == "success") {
        setEmail(emailFormData.email);
        setCurrentStep("code");
        setCountdown(60);

        // Start countdown timer
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeSubmit = async (codeFormData: CodeFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await verifyResetCode(codeFormData);
      if ("status" in response!) {
        setCurrentStep("reset");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (
    resetPasswordFormData: ResetPasswordFormData
  ) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await resetPassword(resetPasswordFormData);
      if ("token" in response!) {
        setSubmitStatus("success");
        router.push("/auth/login");
      } else {
        setSubmitStatus("error");
      }
      // Redirect to login after success
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendEmail = () => {
    emailForm.handleSubmit(handleEmailSubmit)();
  };

  const getTitle = () => {
    switch (currentStep) {
      case "email":
        return "Forgot Password?";
      case "code":
        return "Verify Your Email";
      case "reset":
        return "Reset Your Password";
      default:
        return "Reset Password";
    }
  };

  const getDescription = () => {
    switch (currentStep) {
      case "email":
        return "Enter your email and we'll send you a verification code";
      case "code":
        return "Enter the 6-digit code sent to your email";
      case "reset":
        return "Create a new secure password for your account";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-md">
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
        <h1 className="text-3xl font-bold tracking-tight">{getTitle()}</h1>
        <p className="text-muted-foreground mt-2">{getDescription()}</p>
      </motion.div>

      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
            {currentStep === "email" && (
              <>
                <MailIcon className="text-primary" />
                Reset Your Password
              </>
            )}
            {currentStep === "code" && (
              <>
                <KeyIcon className="text-primary" />
                Enter Verification Code
              </>
            )}
            {currentStep === "reset" && (
              <>
                <LockIcon className="text-primary" />
                Create New Password
              </>
            )}
          </CardTitle>
          <CardDescription>
            {currentStep === "email"
              ? "We'll send a verification code to your email address"
              : currentStep === "code"
              ? `Check your inbox for the code sent to ${email}`
              : "Your new password must be strong and secure"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            {currentStep === "email" && (
              <motion.div
                key="email-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Form {...emailForm}>
                  <form
                    onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MailIcon className="h-4 w-4" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <AnimatePresence mode="wait">
                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-red-50 border border-red-200 rounded-md"
                        >
                          <div className="flex items-start gap-3">
                            <AlertCircleIcon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-red-800">
                                Something went wrong
                              </h3>
                              <p className="text-sm text-red-700 mt-1">
                                Please check your email and try again
                              </p>
                            </div>
                          </div>
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
                          Sending Email...
                        </span>
                      ) : (
                        "Send Verification Code"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}

            {currentStep === "code" && (
              <motion.div
                key="code-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Form {...codeForm}>
                  <form
                    onSubmit={codeForm.handleSubmit(handleCodeSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={codeForm.control}
                      name="resetCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <KeyIcon className="h-4 w-4" />
                            Verification Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="123456"
                              maxLength={6}
                              {...field}
                              disabled={isSubmitting}
                              className="text-center text-2xl font-mono tracking-widest"
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            Check your email for the 6-digit code
                          </p>
                        </FormItem>
                      )}
                    />

                    <AnimatePresence mode="wait">
                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-red-50 border border-red-200 rounded-md"
                        >
                          <div className="flex items-start gap-3">
                            <AlertCircleIcon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-red-800">
                                Invalid Code
                              </h3>
                              <p className="text-sm text-red-700 mt-1">
                                Please check the code and try again
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 py-6 text-lg font-medium"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                          Verifying Code...
                        </span>
                      ) : (
                        "Verify Code"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}

            {currentStep === "reset" && (
              <motion.div
                key="reset-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Form {...resetForm}>
                  <form
                    onSubmit={resetForm.handleSubmit(handleResetSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={resetForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MailIcon className="h-4 w-4" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={email}
                              // value={email}
                              {...field}
                              disabled={true}
                              className="bg-muted"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={resetForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <LockIcon className="h-4 w-4" />
                            New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
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

                    <AnimatePresence mode="wait">
                      {submitStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-green-50 border border-green-200 rounded-md"
                        >
                          <div className="flex items-start gap-3">
                            <ShieldCheckIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-green-800">
                                Password Reset Successfully!
                              </h3>
                              <p className="text-sm text-green-700 mt-1">
                                Your password has been updated. You can now sign
                                in with your new password.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-red-50 border border-red-200 rounded-md"
                        >
                          <div className="flex items-start gap-3">
                            <AlertCircleIcon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-red-800">
                                Reset Failed
                              </h3>
                              <p className="text-sm text-red-700 mt-1">
                                Please try again or contact support
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-6 text-lg font-medium"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                          Resetting Password...
                        </span>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-4">
          {currentStep === "code" && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep("email")}
              className="w-full"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Change Email
            </Button>
          )}

          {currentStep === "reset" && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep("code")}
              className="w-full"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Verification
            </Button>
          )}

          {currentStep === "email" ? (
            <Button variant="outline" className="w-full" asChild>
              <Link href="/auth/login" className="flex items-center gap-2">
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          ) : currentStep === "code" ? (
            <Button
              variant="ghost"
              onClick={handleResendEmail}
              disabled={countdown > 0 || isSubmitting}
              className="w-full text-primary hover:bg-primary/5"
            >
              {countdown > 0 ? (
                <span className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  Resend in {countdown}s
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <RotateCcwIcon className="h-4 w-4" />
                  Resend Verification Code
                </span>
              )}
            </Button>
          ) : null}

          <p className="text-xs text-muted-foreground text-center">
            {currentStep === "email" ? (
              <>
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline"
                >
                  Sign in
                </Link>
              </>
            ) : currentStep === "code" ? (
              "Didn't receive the code? Check your spam folder"
            ) : (
              "Make sure to choose a strong password you haven't used before"
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

// Helper components
function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function RotateCcwIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

// "use client";

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as zod from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   MailIcon,
//   ArrowLeftIcon,
//   ClockIcon,
//   ShieldCheckIcon,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { forgotPassword } from "@/helpers/user/forgotPassword";

// // Email validation schema
// const emailSchema = zod.object({
//   email: zod
//     .string()
//     .nonempty("Email is required")
//     .regex(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//       "Please enter a valid email address"
//     ),
// });

// type EmailFormData = zod.infer<typeof emailSchema>;

// export default function ForgotPasswordPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<
//     "idle" | "success" | "error"
//   >("idle");
//   const [countdown, setCountdown] = useState(0);

//   const form = useForm<EmailFormData>({
//     resolver: zodResolver(emailSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   const onSubmit = async (data: EmailFormData) => {
//     setIsSubmitting(true);
//     setSubmitStatus("idle");

//     try {
//       const response = await forgotPassword(data);

//       setSubmitStatus("success");
//       setCountdown(60); // 60 second countdown

//       // Start countdown timer
//       const timer = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } catch (error) {
//       setSubmitStatus("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container mx-auto py-12 px-4 max-w-md">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-center mb-8"
//       >
//         <div className="flex justify-center mb-4">
//           <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
//             <ShieldCheckIcon className="h-8 w-8 text-white" />
//           </div>
//         </div>
//         <h1 className="text-3xl font-bold tracking-tight">Forgot Password?</h1>
//         <p className="text-muted-foreground mt-2">
//           Enter your email and we&apos;ll send you a verification code
//         </p>
//       </motion.div>

//       <Card className="border-2 border-primary/20 shadow-lg">
//         <CardHeader className="text-center pb-6">
//           <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
//             <MailIcon className="text-primary" />
//             Reset Your Password
//           </CardTitle>
//           <CardDescription>
//             We&apos;ll send a verification code to your email address
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="flex items-center gap-2">
//                       <MailIcon className="h-4 w-4" />
//                       Email Address
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="your@email.com"
//                         {...field}
//                         disabled={isSubmitting || countdown > 0}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <AnimatePresence mode="wait">
//                 {submitStatus === "success" && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="p-4 bg-green-50 border border-green-200 rounded-md"
//                   >
//                     <div className="flex items-start gap-3">
//                       <ShieldCheckIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
//                       <div>
//                         <h3 className="font-medium text-green-800">
//                           Email Sent!
//                         </h3>
//                         <p className="text-sm text-green-700 mt-1">
//                           Check your inbox for the verification code.
//                           {countdown > 0 && (
//                             <span className="block mt-1">
//                               <ClockIcon className="inline h-3 w-3 mr-1" />
//                               Resend available in {countdown}s
//                             </span>
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}

//                 {submitStatus === "error" && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="p-4 bg-red-50 border border-red-200 rounded-md"
//                   >
//                     <div className="flex items-start gap-3">
//                       <AlertCircleIcon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
//                       <div>
//                         <h3 className="font-medium text-red-800">
//                           Something went wrong
//                         </h3>
//                         <p className="text-sm text-red-700 mt-1">
//                           Please check your email and try again
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <Button
//                 type="submit"
//                 disabled={isSubmitting || countdown > 0}
//                 className="w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-6 text-lg font-medium"
//               >
//                 {isSubmitting ? (
//                   <span className="flex items-center gap-2">
//                     <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
//                     Sending Email...
//                   </span>
//                 ) : countdown > 0 ? (
//                   <span className="flex items-center gap-2">
//                     <ClockIcon className="h-4 w-4" />
//                     Wait {countdown}s
//                   </span>
//                 ) : (
//                   "Send Verification Code"
//                 )}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>

//         <CardFooter className="flex flex-col gap-3 pt-4">
//           <Button variant="outline" className="w-full" asChild>
//             <Link href="/auth/login" className="flex items-center gap-2">
//               <ArrowLeftIcon className="h-4 w-4" />
//               Back to Login
//             </Link>
//           </Button>
//           <p className="text-xs text-muted-foreground text-center">
//             Remember your password?{" "}
//             <Link href="/auth/login" className="text-primary hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

// // Helper component for AlertCircleIcon (if not already available)
// function AlertCircleIcon({ className }: { className?: string }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       <circle cx="12" cy="12" r="10" />
//       <line x1="12" y1="8" x2="12" y2="12" />
//       <line x1="12" y1="16" x2="12.01" y2="16" />
//     </svg>
//   );
// }
