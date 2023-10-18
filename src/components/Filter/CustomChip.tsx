import Chip from "@mui/material/Chip";

// Reusable Chip component
export default function ChipOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}): JSX.Element {
  return (
    <Chip
      label={label}
      onClick={onClick}
      color={selected ? "primary" : "default"}
    />
  );
}