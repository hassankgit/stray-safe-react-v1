"use client";
import styles from "./Login.module.scss";
import { Field } from "@base-ui-components/react/field";
import { api } from "../../app/api";
import React, { useState } from "react";
import { LoginRequest } from "@/swagger/swagger";
import { Form } from "@base-ui-components/react";
import { FaDog } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRedirectIfAuthenticated } from "../../app/hooks/useRedirectIfAuthenticated";

export default function Login() {
  useRedirectIfAuthenticated();

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Form
      className={styles.login}
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const loginRequest = {
          username: formData.get("username") as string,
          password: formData.get("password") as string,
        };

        setLoading(true);
        const res = await handleLogin(loginRequest);
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
        <Field.Root name="username">
          <Field.Control
            placeholder="Email or username"
            className={styles.input}
          />
        </Field.Root>
        <Field.Root name="password">
          <Field.Control
            placeholder="Password"
            type="password"
            className={styles.input}
          />
          <Field.Error className={styles.error} />
        </Field.Root>
      </div>
      <button type="submit" className={styles.submit} disabled={loading}>
        {!loading ? "Login" : <FaDog className={styles.submit_loading} />}
      </button>
      <p className={styles.register_link_wrapper}>
        Don&apos;t have an account?{" "}
        <Link className={styles.register_link} href="/register">
          Sign up here!
        </Link>
      </p>
    </Form>
  );
}

async function handleLogin(request: LoginRequest) {
  const res = await api.auth.login(request);

  if (res.ok && res.data.token) {
    localStorage.setItem("token", res.data.token);
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      error: res.error?.Message || "",
    };
  }
}
