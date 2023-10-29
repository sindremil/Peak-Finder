import Chip from "@mui/material/Chip";
import { useAppDispatch } from "../../hooks";

export default function CustomChip({
  label,
  selected,
  action,
}: {
  label: string;
  selected: boolean;
  action: () => { type: string };
}): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Chip
      label={label}
      onClick={() => dispatch(action())}
      color={selected ? "primary" : "default"}
    />
  );
}
