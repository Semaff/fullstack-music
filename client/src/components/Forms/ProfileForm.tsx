import { update } from "@api/user";
import { Box, TextField, Button } from "@mui/material";
import { IUser } from "@typings/user/IUser";
import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { validateEmail } from "@utils/validations/validateEmail";
import { validateName } from "@utils/validations/validateName";

interface ProfileFormProps {
  user: IUser;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const queryClient = useQueryClient();
  const [canEdit, setCanEdit] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");

  const isFirstNameCorrect = validateName(firstName);
  const isLastNameCorrect = validateName(lastName);
  const isEmailCorrect = validateEmail(email);

  const canSubmit =
    isFirstNameCorrect &&
    isLastNameCorrect &&
    isEmailCorrect &&
    (user.firstName !== firstName || user.lastName !== lastName || user.email !== email);

  const resetForm = (userEl?: IUser) => {
    const firstName = userEl ? userEl.firstName : user.firstName;
    const lastName = userEl ? userEl.lastName : user.lastName;
    const email = userEl ? userEl.email : user.email;
    setFirstName(firstName || "");
    setLastName(lastName || "");
    setEmail(email || "");
  };

  const handleCancelEdit = () => {
    resetForm();
    setCanEdit(false);
  };

  /*
    Mutations
    ============
  */
  const { mutate: updateMutation } = useMutation(update, {
    onSettled: async () => {
      await queryClient.invalidateQueries("findMe");
      const updatedUser = queryClient.getQueryData<IUser>("findMe");
      resetForm(updatedUser);
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canEdit) {
      setCanEdit(true);
    }

    if (canEdit && canSubmit) {
      setCanEdit(false);
      updateMutation({ firstName, lastName, email });
    }
  };

  return (
    <Box
      data-testid="profile-form"
      onSubmit={handleSubmit}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          disabled={!canEdit}
          required
          fullWidth
          variant="filled"
          label="First Name"
          error={firstName.length > 0 && !isFirstNameCorrect}
          helperText={firstName.length > 0 && !isFirstNameCorrect ? "Invalid first name" : ""}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          disabled={!canEdit}
          required
          fullWidth
          variant="filled"
          label="Last Name"
          error={lastName.length > 0 && !isLastNameCorrect}
          helperText={lastName.length > 0 && !isLastNameCorrect ? "Invalid last name" : ""}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Box>

      <TextField
        disabled={!canEdit}
        required
        fullWidth
        variant="filled"
        label="Your E-mail"
        type="email"
        error={email.length > 0 && !isEmailCorrect}
        helperText={email.length > 0 && !isEmailCorrect ? "Invalid email" : ""}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", gap: "10px" }}>
        {canEdit && (
          <Button onClick={handleCancelEdit} variant="contained" color="inherit">
            Cancel
          </Button>
        )}

        <Button type="submit" variant="contained" disabled={!canSubmit && canEdit}>
          {!canEdit ? "Edit" : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;
