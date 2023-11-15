import { Container, Card, Skeleton, Grid, Box } from "@mui/material";
import Navbar from "../Navbar";

export default function DestinationSkeleton(): JSX.Element {
  return (
    <>
      <Navbar />
      <br />
      <Container maxWidth="md">
        <Skeleton variant="text" width="30%" height={20} />
        <Card raised>
          <Skeleton variant="rectangular" height={400} />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Skeleton variant="text" width="100%" height={100} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="text" width="100%" height={100} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Skeleton variant="text" width="100%" height={100} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={350} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={350} />
            </Grid>
          </Grid>
          <Skeleton variant="text" width="100%" height={140} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
          >
            {/* Button Skeleton */}
            <Skeleton
              variant="rectangular"
              width={175}
              height={40}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Card>
      </Container>
    </>
  );
}
