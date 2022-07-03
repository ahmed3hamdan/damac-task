import { Link, Outlet } from "react-router-dom";
import {
  AppShell,
  Header,
  createStyles,
  Container,
  ActionIcon,
  Button,
  Menu,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { UserProvider, useUser } from "../../contexts/userContext";
import { Home, Logout, User } from "tabler-icons-react";
import { useAuth } from "../../contexts/authContext";

const useStyles = createStyles({
  headerContainer: {
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const DashboardHeader = () => {
  const modals = useModals();
  const { classes } = useStyles();
  const { setToken } = useAuth();
  const user = useUser();

  const handleLogOutClick = () =>
    modals.openConfirmModal({
      title: "Log Out",
      children: "Are you sure you want to log out?",
      labels: { confirm: "Log out", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => setToken(null),
    });

  return (
    <Header>
      <Container className={classes.headerContainer}>
        <Button
          variant="subtle"
          compact
          uppercase
          component={Link}
          to="/"
          leftIcon={<Home />}
          size="xl"
          color="teal"
        >
          Books
        </Button>
        <Menu
          control={
            <ActionIcon size="xl" variant="transparent" color="blue">
              <User size={24} />
            </ActionIcon>
          }
        >
          <Menu.Label>{user.email}</Menu.Label>
          <Menu.Item
            color="red"
            icon={<Logout size={14} />}
            onClick={handleLogOutClick}
          >
            Log out
          </Menu.Item>
        </Menu>
      </Container>
    </Header>
  );
};

const DashboardLayout = () => {
  return (
    <UserProvider>
      <AppShell header={<DashboardHeader />}>
        <Outlet />
      </AppShell>
    </UserProvider>
  );
};

export default DashboardLayout;
