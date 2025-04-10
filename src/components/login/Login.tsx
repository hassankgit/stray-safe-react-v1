// TODO: add types to the endpoints
"use client";
import styles from "./Login.module.scss";
import { Field } from "@base-ui-components/react/field";
import { api } from "../../app/api";
import React, { useState } from "react";
import { LoginRequest } from "@/swagger/swagger";
import { Form } from "@base-ui-components/react";
import { FaDog } from "react-icons/fa6";
// import { useRouter } from "next/navigation"; 
// async function handleLogin(loginRequest: LoginRequest) {

//   const req = await api.user.login(loginRequest.username, loginRequest.password);
//     // console.log("res:", res);
//     // console.log("data:", res.data);
//   }

export default function Login() {
  // const router = useRouter(); // will be used to route the user to the dashboard
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Form
      className={styles.login_section}
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={async (event) => {
        // router.push('/test/moreroute'); // add to end of onSubmit, make sure u get a 200 from login endpoint, then redirect to dashboard
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const loginRequest = {
          username: formData.get("username") as string,
          password: formData.get("password") as string,
        };

        setLoading(true);
        const res = await handleLogin(loginRequest);
        console.log(res);
        // const serverErrors = {
        //   username: res.error,
        //   password: res.error,
        // }

        // setErrors(serverErrors);
        setLoading(false);
      }}
    >
      <div className={styles.login_info}>
        <Field.Root name="username" className={styles.login_input_wrapper}>
          <Field.Control
            placeholder="username"
            className={styles.login_input}
          />
        </Field.Root>
        <Field.Root name="password" className={styles.login_input_wrapper}>
          <Field.Control
            placeholder="password"
            type="password"
            className={styles.login_input}
          />
        </Field.Root>
      </div>
      <button type="submit" className={styles.login_submit}>
        {!loading ? "login" : <FaDog className={styles.login_submit_loading} />}
      </button>
    </Form>
  );
}

async function handleLogin(request: LoginRequest) {
  const res = await api.user.login(request.username, request.password);
  console.log(res);
}
