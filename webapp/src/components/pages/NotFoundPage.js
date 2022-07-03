import { Button, Container, createStyles, Text, Title } from "@mantine/core";
import { ArrowNarrowLeft, Home } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";

const useStyles = createStyles(theme => ({
  container: {
    textAlign: "center",
    paddingTop: 32,
    paddingBottom: 32,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      paddingTop: 64,
      paddingBottom: 64,
    },
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      textAlign: "initial",
    },
  },
  title: {
    fontSize: 22,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      fontSize: 26,
    },
  },
  description: {
    marginTop: 2,
    fontSize: theme.fontSizes.md,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      marginTop: 4,
      fontSize: theme.fontSizes.lg,
    },
  },
  buttonsGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      flexDirection: "row",
    },
  },
}));

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const handleGoBack = () => navigate(-1);
  return (
    <Container size="sm" className={classes.container}>
      <Title className={classes.title}>Sorry we can't find that page!</Title>
      <Text className={classes.description} color="dimmed">
        Either something went wrong or the page doesn't exist anymore.
      </Text>
      <div className={classes.buttonsGroup}>
        <Button component={Link} to="/" leftIcon={<Home size={18} />} uppercase>
          Go Home
        </Button>
        <Button
          leftIcon={<ArrowNarrowLeft size={18} />}
          uppercase
          variant="light"
          onClick={handleGoBack}
        >
          Go Back
        </Button>
      </div>
    </Container>
  );
};

export default NotFoundPage;
