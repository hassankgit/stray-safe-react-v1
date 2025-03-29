// TODO: add types to the endpoints
"use client";
import styles from "./Login.module.scss"
import { api } from "../../app/api"
import React, { useState } from 'react';
import { LoginRequest } from "@/swagger/swagger";
import { Input } from "@base-ui-components/react";

async function handleLogin(loginRequest: LoginRequest) {

  const req = await api.user.login(loginRequest.username, loginRequest.password);
    // console.log("res:", res);
    // console.log("data:", res.data);
  }

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.login_wrapper}>
        <h2 className={styles.login_title}>Login</h2>
        <div className={styles.input_wrapper}>
          <Input 
            value={email}
            onChange={e => setEmail((e.target as HTMLInputElement).value)}
            placeholder="Email"
          />
        </div>
        <div className={styles.input_wrapper}>
          <Input 
            value={password}
            onChange={e => setPassword((e.target as HTMLInputElement).value)}
            placeholder="Password"
            type="password"
          />
        </div>
    </div>
  );
}
