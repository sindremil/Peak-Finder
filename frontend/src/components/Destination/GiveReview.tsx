import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import giveRating from "../../api/giveRating";

interface GiveReviewProps {
  name: string;
  handleClose: () => void;
  handleReviewGiven: (
    newTotalRating: number,
    newAmountOfRatings: number,
  ) => void;
}

export default function GiveReview({
  name,
  handleClose,
  handleReviewGiven: handleGiveRating,
}: GiveReviewProps): JSX.Element {
  const [newRating, setNewRating] = useState(0);

  const handleMutation = async (rating: number) => {
    try {
      const response = await giveRating({ resort: name, rating });
      handleGiveRating(
        response.giveRating.TotalRating,
        response.giveRating.AmountOfRatings,
      );
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Dialog onClose={handleClose} open>
      <DialogTitle>Gi en vurdering</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <Rating
          name="newRating"
          value={newRating}
          onChange={(_event, value: number | null) => {
            if (value != null) {
              setNewRating(value);
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button
          onClick={() => {
            handleMutation(newRating);
            handleClose();
          }}
        >
          Send inn
        </Button>
      </DialogActions>
    </Dialog>
  );
}
