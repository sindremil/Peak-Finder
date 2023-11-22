import Chip from "@mui/material/Chip";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

// CustomChip takes in a selector which is used to read the current filter state and an action to update the state
export default function CustomChip({
  label,
  selector,
  action,
}: {
  label: string;
  selector: (state: any) => boolean;
  action: () => { type: string };
}): JSX.Element {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selector);

  return (
    <Chip
      label={label}
      onClick={() => dispatch(action())}
      color={selected ? "primary" : "default"}
    />
  );
}
