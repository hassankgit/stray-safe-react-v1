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
import { registerSchema } from "./RegisterSchema";
import { useRedirectIfAuthenticated } from "../../app/hooks/useRedirectIfAuthenticated";

export default function RegisterForm() {
  useRedirectIfAuthenticated();

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Form
      className={styles.signup_info}
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
      <div className={styles.input_section}>
        <Field.Root name="email">
          <Field.Control placeholder="Email" className={styles.input} />
          <Field.Error className={styles.error} />
        </Field.Root>
        <Field.Root name="username">
          <Field.Control placeholder="Username" className={styles.input} />
          <Field.Error className={styles.error} />
        </Field.Root>
        <Field.Root name="password">
          <Field.Control
            placeholder="Password"
            type="password"
            className={styles.input}
          />
          <Field.Error className={styles.error} />
        </Field.Root>
        <Field.Root name="confirmPassword">
          <Field.Control
            placeholder="Confirm password"
            type="password"
            className={styles.input}
          />
          <Field.Error className={styles.error} />
        </Field.Root>
      </div>
      <button type="submit" className={styles.submit} disabled={loading}>
        {!loading ? (
          "Create account"
        ) : (
          <FaDog className={styles.submit_loading} />
        )}
      </button>
      <p className={styles.login_link_wrapper}>
        Already have an account?{" "}
        <Link className={styles.login_link} href="/">
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
