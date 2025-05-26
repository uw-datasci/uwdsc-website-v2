export const NAVBAR_ROUTES = {
  NOT_LOGGED_IN: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "/cxc" },
    { label: "Team", route: "/team" },
    { label: "Contact", route: "/#contact" },
  ],
  USER: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "/cxc" },
    { label: "Team", route: "/team" },
    { label: "QR Code", route: "/qrPage" },
    { label: "Check In", route: "/memCheckIn" },
  ],
  ADMIN: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "/cxc" },
    { label: "Team", route: "/team" },
    { label: "QR Code", route: "/qrPage" },
    { label: "Check In", route: "/memCheckIn" },
    {
      label: "Admin",
      subNavItems: [
        { label: "Memberships", route: "/admin" },
        { label: "QR Scanner", route: "/qrScanner" },
      ],
    },
  ],
};
