import { z } from "zod";
import {
    ChangePasswordFormSchema,
    EmailVerificationFormSchema,
    LoginFormSchema,
    RegisterFormSchema,
} from "./userValidations";

import { EditProfileFormSchema } from "./profileValidations";

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;
export type TRegisterFormSchema = z.infer<typeof RegisterFormSchema>;
export type TChangePasswordFormSchema = z.infer<typeof ChangePasswordFormSchema>;
export type TEmailVerificationFormSchema = z.infer<typeof EmailVerificationFormSchema>;

export type TEditProfileFormSchema = z.infer<typeof EditProfileFormSchema>;
