import React, { ReactNode } from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import { ITrack } from "../../types";
import { useMutation, useQueryClient } from "react-query";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import useTrackStore from "store/track";
import { IUser } from "modules/User";
import { deleteTrack } from "../../api";
import { formatName } from "utils/formatName";
import Image from "next/image";

interface TrackCardProps {
  track: ITrack;
  playlist: ITrack[];
  user?: IUser;
  children?: ReactNode | string;
}

const TrackCard = ({ user, track, playlist, children }: TrackCardProps) => {
  const [isActive, setIsActive] = useTrackStore((store) => [store.isActive, store.setIsActive]);
  const [currentTrack, setCurrentTrack] = useTrackStore((store) => [store.track, store.setTrack]);
  const { setCurrentPlaylist } = useTrackStore((store) => store);

  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation(deleteTrack, {
    onSettled() {
      queryClient.refetchQueries("tracks");
      queryClient.refetchQueries("album");
    }
  });

  const handlePlay = () => {
    if (track.id !== currentTrack?.id) setCurrentTrack(track);
    setCurrentPlaylist(playlist);
    setIsActive(true);
  };

  const handlePause = () => setIsActive(false);

  const handleDeleteTrack = () => {
    if (track.id === currentTrack?.id) {
      setCurrentTrack(null);
      setIsActive(false);
    }

    deleteMutation({ id: track.id });
  };

  return (
    <Paper
      data-testid="track"
      elevation={2}
      sx={{
        my: "10px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Image src="" alt="track" width={100} height={100} />
        <Typography fontSize={20}>{formatName(track.name)}</Typography>
      </Box>

      <Box>
        {track.id === currentTrack?.id && isActive ? (
          <IconButton onClick={handlePause}>
            <PauseIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton onClick={handlePlay}>
            <PlayArrowIcon fontSize="large" />
          </IconButton>
        )}

        {track.user.profile?.nickname === user?.profile?.nickname && (
          <IconButton onClick={handleDeleteTrack}>
            <DeleteIcon color="error" />
          </IconButton>
        )}

        {children}
      </Box>
    </Paper>
  );
};

export default TrackCard;
