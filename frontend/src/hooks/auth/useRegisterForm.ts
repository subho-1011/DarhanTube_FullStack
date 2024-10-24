import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/auth.services";

import { TRegisterFormSchema } from "@/validators";
import { RegisterFormSchema } from "@/validators/userValidations";

export const useRegisterForm = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [isPending, setIsPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const togglePassword = () => setShowPassword((prev) => !prev);

    const form = useForm<TRegisterFormSchema>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: TRegisterFormSchema) => {
        setError("");
        setSuccess("");
        setIsPending(true);
        localStorage.setItem("email", data.email);

        try {
            await registerUser(data);
            setSuccess("Registration successful");

            toast({
                title: "Registration successful",
                description: "Verify your email address",
                duration: 5000,
            });

            // redirect to
            setTimeout(() => {
                router.push("/auth/verify-email");
            }, 1000);
        } catch (error) {
            setError(error as string);
        } finally {
            setIsPending(false);
        }
    };

    return {
        form,
        isPending,
        showPassword,
        togglePassword,
        error,
        success,
        onSubmit,
    };
};
