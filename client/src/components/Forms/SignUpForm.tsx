import React, { FormEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { signup } from "@api/user";
import Router from "next/router";
import { validateName } from "utils/validations/validateName";
import { validateEmail } from "utils/validations/validateEmail";
import { validatePassword } from "utils/validations/validatePassword";
import { SignUpBody } from "@api/user/signup";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFirstNameCorrect = validateName(firstName);
  const isLastNameCorrect = validateName(lastName);
  const isEmailCorrect = validateEmail(email);
  const isPasswordCorrect = validatePassword(password);

  const canSubmit = isFirstNameCorrect && isLastNameCorrect && isEmailCorrect && isPasswordCorrect;

  const { mutate: signupMutate } = useMutation((body: SignUpBody) => signup(body), {
    onSuccess() {
      Router.push("/");
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      signupMutate({ firstName, lastName, email, password });
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
        label="First Name"
        error={firstName.length > 0 && !isFirstNameCorrect}
        helperText={firstName.length > 0 && !isFirstNameCorrect ? "Invalid first name" : ""}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <TextField
        required
        label="Last Name"
        error={lastName.length > 0 && !isLastNameCorrect}
        helperText={lastName.length > 0 && !isLastNameCorrect ? "Invalid last name" : ""}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

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

      <Button type="submit" variant="contained" disabled={!canSubmit}>
        SignUp
      </Button>
    </Box>
  );
};

export default SignUpForm;
