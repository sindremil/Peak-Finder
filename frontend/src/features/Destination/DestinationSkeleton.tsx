import { Container, Card, Skeleton, Grid, Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";

export default function DestinationSkeleton({
  isSmallScreen,
}: {
  isSmallScreen: boolean;
}): JSX.Element {
  // Returns a skeleton for the Destination based on the screen size.
  // It mimics the real design of the Destination component.
  return isSmallScreen ? (
    <>
      <Navbar />
      <Box sx={{ marginTop: "5px" }}>
        <Skeleton
          variant="text"
          width="80%"
          height={30}
          sx={{ padding: "20px 0" }}
        />
        <Card raised>
          <Skeleton variant="rectangular" height={400} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Skeleton
                variant="text"
                width="100%"
                height={200}
                sx={{ marginTop: "-8px" }}
              />
              <Skeleton
                variant="text"
                width="100%"
                height={50}
                sx={{ marginTop: "-16px" }}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "-8px" }}>
              <Skeleton variant="text" width="100%" height={70} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="text" width="100%" height={70} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="text" width="100%" height={70} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={350} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={350} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={175}
              height={40}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Card>
      </Box>
    </>
  ) : (
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
