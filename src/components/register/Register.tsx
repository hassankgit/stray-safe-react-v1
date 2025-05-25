"use client";
import styles from "./Register.module.scss";
import { Field } from "@base-ui-components/react/field";
import { api } from "../../app/api";
import React, { useState } from "react";
import { RegisterRequest } from "@/swagger/swagger";
import { Form } from "@base-ui-components/react";
import { FaDog } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useRedirectIfAuthenticated } from "../../app/hooks/useRedirectIfAuthenticated";

// TODO: separate schema into different file
export const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Please enter a valid email"),

    username: z
      .string()
      .nonempty("Username is required")
      .regex(
        /^[a-zA-Z0-9-._@+]+$/,
        "Username can only contain letters, numbers, and - . _ @ +"
      ),

    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function RegisterForm() {
  useRedirectIfAuthenticated();

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Form
      className={styles.register_section}
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const registerRequest = {
          username: formData.get("username") as string,
          password: formData.get("password") as string,
          email: formData.get("email") as string,
          confirmPassword: formData.get("confirmPassword") as string,
        };
        const validation = registerSchema.safeParse(registerRequest);

        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.errors.forEach((err) => {
            if (err.path.length > 0) {
              const field = err.path[0] as string;
              if (!fieldErrors[field]) {
                fieldErrors[field] = err.message;
              }
            }
          });

          setErrors(fieldErrors);
          return;
        }

        setLoading(true);
        const res = await handleRegister(registerRequest);
        if (!res.success) {
          const serverErrors = {
            username: res.error,
            password: res.error,
          };
          setErrors(serverErrors);
        } else {
          router.push("/home");
        }

        setLoading(false);
      }}
    >
      <div className={styles.register_info}>
        <Field.Root name="email" className={styles.register_input_wrapper}>
          <Field.Control
            placeholder="Email"
            className={styles.register_input}
          />
          <Field.Error className={styles.register_error} />
        </Field.Root>
        <Field.Root name="username" className={styles.register_input_wrapper}>
          <Field.Control
            placeholder="Username"
            className={styles.register_input}
          />
          <Field.Error className={styles.register_error} />
        </Field.Root>
        <Field.Root name="password" className={styles.register_input_wrapper}>
          <Field.Control
            placeholder="Password"
            type="password"
            className={styles.register_input}
          />
          <Field.Error className={styles.register_error} />
        </Field.Root>
        <Field.Root
          name="confirmPassword"
          className={styles.register_input_wrapper}
        >
          <Field.Control
            placeholder="Confirm password"
            type="password"
            className={styles.register_input}
          />
          <Field.Error className={styles.register_error} />
        </Field.Root>
      </div>
      <button
        type="submit"
        className={styles.register_submit}
        disabled={loading}
      >
        {!loading ? (
          "Create account"
        ) : (
          <FaDog className={styles.register_submit_loading} />
        )}
      </button>
      <p className={styles.register_login}>
        Already have an account?{" "}
        <Link className={styles.register_login_link} href="/">
          Log in here!
        </Link>
      </p>
    </Form>
  );
}

async function handleRegister(request: RegisterRequest) {
  const res = await api.auth.register(request);

  if (res.ok && res.data.token) {
    localStorage.setItem("token", res.data.token);
    return { success: true };
  } else {
    return {
      success: false,
      error: res.error?.Message || "",
    };
  }
}
