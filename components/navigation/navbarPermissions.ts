export const NAVBAR_ROUTES = {
  NOT_LOGGED_IN: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "/cxc" },
    { label: "Team", route: "/team" },
    { label: "Contact", route: "/#contact" },
    { label: "Calendar", route: "/calendar" },
  ],
  USER: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "/cxc" },
    { label: "Team", route: "/team" },
    { label: "Check In", route: "/memCheckIn" },
    { label: "Calendar", route: "/calendar" },
  ],
  ADMIN: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "/cxc" },
    { label: "Team", route: "/team" },
    { label: "Check In", route: "/memCheckIn" },
    { label: "Calendar", route: "/calendar" },
    {
      label: "Admin",
      subNavItems: [
        { label: "Memberships", route: "/memberships" },
        { label: "Events", route: "/events" },
      ],
    },
  ],
  EXEC: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "/cxc" },
    { label: "Team", route: "/team" },
    { label: "Check In", route: "/memCheckIn" },
    { label: "Calendar", route: "/calendar" },
    {
      label: "Admin",
      subNavItems: [
        { label: "Memberships", route: "/memberships" },
        { label: "Events", route: "/events" },
      ],
    },
  ],
};
