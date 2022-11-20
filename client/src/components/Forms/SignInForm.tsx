import React, { FormEvent, useState } from "react";
import Router from "next/router";
import { signin } from "@api/user";
import { SignInBody } from "@api/user/signin";
import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { validateEmail } from "utils/validations/validateEmail";
import { validatePassword } from "utils/validations/validatePassword";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isEmailCorrect = validateEmail(email);
  const isPasswordCorrect = validatePassword(password);
  const canSubmit = isEmailCorrect && isPasswordCorrect;

  const { mutate: signinMutate } = useMutation((body: SignInBody) => signin(body), {
    onSuccess() {
      Router.push("/");
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      signinMutate({ email, password });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        maxWidth: "360px",
        margin: "0 auto"
      }}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        label="Your E-mail"
        type="email"
        error={email.length > 0 && !isEmailCorrect}
        helperText={email.length > 0 && !isEmailCorrect ? "Invalid email" : ""}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        required
        label="Password"
        type="password"
        error={password.length > 0 && !isPasswordCorrect}
        helperText={password.length > 0 && !isPasswordCorrect ? "Invalid password" : ""}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" variant="contained">
        SignIn
      </Button>
    </Box>
  );
};

export default SignInForm;