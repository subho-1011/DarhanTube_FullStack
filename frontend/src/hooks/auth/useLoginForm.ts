import { debounce } from "lodash";
import { useToast } from "../use-toast";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginFormSchema } from "@@/shared/validators";
import { LoginFormSchema } from "@@/shared/validators/userValidations";

import { useAuth } from "./useAuth";
import { useAppSelector } from "@/lib/utils";

export const useLoginForm = () => {
    const { login } = useAuth();
    const { toast } = useToast();
    const { loading, error: e } = useAppSelector((state) => state.session);

    const router = useRouter();
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get("callbackUrl");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const togglePassword = () => setShowPassword((prev) => !prev);

    const email = (localStorage.getItem("email") as string) || "";

    const form = useForm<TLoginFormSchema>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: email ?? "",
            password: "",
        },
    });

    const onSubmit = async (data: TLoginFormSchema) => {
        setError("");
        setSuccess("");
        login(data)
            .unwrap()
            .then(() => {
                setSuccess("Logged in successfully");
                localStorage.removeItem("email");
                form.reset();

                toast({
                    title: "Login successful",
                });

                // redirect to
                setTimeout(() => {
                    if (callbackUrl) {
                        router.push(callbackUrl);
                    } else {
                        router.push("/");
                    }
                }, 1000);
            })
            .catch((error: any) => {
                setError(error.message || "Something went wrong");
            });
    };

    useEffect(() => {
        const delayedErrorReset = debounce(() => {
            setError("");
            setSuccess("");
        }, 500);

        delayedErrorReset();

        return () => {
            delayedErrorReset.cancel();
        };
    }, [form.watch("password"), form.watch("email")]);

    return {
        form,
        isPending: loading.login,
        showPassword,
        togglePassword,
        error,
        success,
        onSubmit,
        callbackUrl,
    };
};
