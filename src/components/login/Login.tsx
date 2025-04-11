// TODO: add types to the endpoints
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

export default function Login() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Form
      className={styles.login_section}
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
          router.push("/test/moreroute");
        }

        setLoading(false);
      }}
    >
      <div className={styles.login_info}>
        <Field.Root name="username" className={styles.login_input_wrapper}>
          <Field.Control
            placeholder="username or email"
            className={styles.login_input}
          />
        </Field.Root>
        <Field.Root name="password" className={styles.login_input_wrapper}>
          <Field.Control
            placeholder="password"
            type="password"
            className={styles.login_input}
          />
          <Field.Error className={styles.login_error} />
        </Field.Root>
      </div>
      <button type="submit" className={styles.login_submit} disabled={loading}>
        {!loading ? "login" : <FaDog className={styles.login_submit_loading} />}
      </button>
      <p className={styles.login_register}>
        don't have an account?{" "}
        <Link className={styles.login_register_link} href="/register">
          register here!
        </Link>
      </p>
    </Form>
  );
}

async function handleLogin(request: LoginRequest) {
  const res = await api.auth.login(request.username, request.password);

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
