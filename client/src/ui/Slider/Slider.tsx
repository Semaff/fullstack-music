import { Box, Slider, SxProps, Typography } from "@mui/material";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label: string;
  sx?: SxProps;
}

const CustomSlider = ({ value, onChange, min, max, label, sx }: SliderProps) => {
  const handleChange = (_event: any, newValue: number | number[]) => {
    onChange(newValue as number);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "20px", ...sx }}>
      <Typography>{label}</Typography>
      <Slider aria-label={label} value={value} onChange={handleChange} min={min} max={max} />
      <Typography>
        {value}/{max}
      </Typography>
    </Box>
  );
};

export default CustomSlider;
