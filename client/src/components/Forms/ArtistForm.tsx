import { createArtist, deleteArtist, updateArtist } from "@api/artist";
import { Box, TextField, Button } from "@mui/material";
import { IUser } from "@typings/user/IUser";
import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { validateName } from "@utils/validations/validateName";

interface ProfileFormProps {
  user: IUser;
}

const ArtistForm = ({ user }: ProfileFormProps) => {
  const queryClient = useQueryClient();
  const [canEdit, setCanEdit] = useState(false);
  const [nickname, setNickname] = useState(user.profile?.nickname || "");

  const isNicknameCorrect = validateName(nickname);
  const isArtistExist = user.profile?.nickname;

  const canSubmit = isNicknameCorrect && user.profile?.nickname !== nickname;

  const resetForm = (userEl?: IUser) => {
    const nickname = userEl ? userEl.profile?.nickname : user.profile?.nickname;
    setNickname(nickname || "");
  };

  const handleCancelEdit = () => {
    resetForm();
    setCanEdit(false);
  };

  /*
    Mutations
    ==========
  */
  const onSettled = async () => {
    await queryClient.invalidateQueries("findMe");
    const updatedUser = queryClient.getQueryData<IUser>("findMe");
    resetForm(updatedUser);
  };

  const { mutate: createMutation } = useMutation(createArtist, { onSettled });
  const { mutate: updateMutation } = useMutation(updateArtist, { onSettled });
  const { mutate: deleteMutation } = useMutation(deleteArtist, { onSettled });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canEdit) {
      setCanEdit(true);
    }

    if (canEdit && canSubmit) {
      setCanEdit(false);
      if (isArtistExist) {
        updateMutation({ nickname });
      } else {
        createMutation({ nickname });
      }
    }
  };

  const handleDelete = () => {
    if (isArtistExist) {
      deleteMutation();
    }
  };

  return (
    <Box
      data-testid="artist-form"
      onSubmit={handleSubmit}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      <TextField
        disabled={!canEdit}
        fullWidth
        variant="filled"
        label="Nickname"
        error={nickname.length > 0 && !isNicknameCorrect}
        helperText={nickname.length > 0 && !isNicknameCorrect ? "Invalid nickname" : ""}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", gap: "10px" }}>
        {isArtistExist && (
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        )}

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

export default ArtistForm;
