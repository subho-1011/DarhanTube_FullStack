"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthCardWrapper } from "@/components/auth";

import { FormError } from "@/components/common/formError";
import { FormSuccess } from "@/components/common/formSuccess";

import { useEmailVerificationForm } from "@/hooks/auth";

export const EmailVerificationForm = () => {
    const { form, isPending, error, success, onSubmit, resendEmailVerificationOtp } =
        useEmailVerificationForm();

    return (
        <AuthCardWrapper headerLabel="Email Verification">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="mr.chandragupta@gmail.com"
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="otpCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Otp</FormLabel>
                                    <FormControl>
                                        <span className="relative flex items-center">
                                            <Input
                                                {...field}
                                                placeholder="Enter your otp code"
                                                type="number"
                                                disabled={isPending}
                                            />
                                        </span>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </div>
                    <Button className="w-full" size="lg" type="submit" disabled={isPending}>
                        {isPending && <Loader className="animate-spin mr-3" />}
                        Submit
                    </Button>
                </form>
            </Form>
            <div className="flex w-full items-center justify-between">
                <Button
                    className="w-full text-muted-foreground mt-4"
                    variant="link"
                    text="resend otp code"
                    onClick={resendEmailVerificationOtp}
                    disabled={isPending}
                />
            </div>
        </AuthCardWrapper>
    );
};
