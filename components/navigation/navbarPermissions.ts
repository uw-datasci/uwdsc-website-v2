export const NAVBAR_ROUTES = {
  NOT_LOGGED_IN: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "https://cxc.uwdatascience.ca/" },
    { label: "Speed Dataing", route: "/speed-dataing" },
    { label: "Team", route: "/team" },
    // { label: "Apply", route: "/apply" },
    { label: "Contact", route: "/#contact" },
    { label: "Calendar", route: "/calendar" },
  ],
  USER: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "https://cxc.uwdatascience.ca/" },
    { label: "Speed Dataing", route: "/speed-dataing" },
    { label: "Team", route: "/team" },
    // { label: "Apply", route: "/apply" },
    { label: "Check In", route: "/memCheckIn" },
    { label: "Calendar", route: "/calendar" },
  ],
  ADMIN: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "https://cxc.uwdatascience.ca/" },
    { label: "Speed Dataing", route: "/speed-dataing" },
    { label: "Team", route: "/team" },
    // { label: "Apply", route: "/apply" },
    { label: "Check In", route: "/memCheckIn" },
    { label: "Calendar", route: "/calendar" },
    {
      label: "Admin",
      subNavItems: [
        { label: "Memberships", route: "/memberships" },
        { label: "Events", route: "/events" },
        { label: "Email Campaigns", route: "/emailCampaigns" },
        { label: "Exec Apps", route: "/execAppView" },
      ],
    },
  ],
  EXEC: [
    { label: "Home", route: "/" },
    { label: "CxC", route: "https://cxc.uwdatascience.ca/" },
    { label: "Speed Dataing", route: "/speed-dataing" },
    { label: "Team", route: "/team" },
    // { label: "Apply", route: "/apply" },
    { label: "Check In", route: "/memCheckIn" },
    { label: "Calendar", route: "/calendar" },
    {
      label: "Exec",
      subNavItems: [
        { label: "Memberships", route: "/memberships" },
        { label: "Events", route: "/events" },
      ],
    },
  ],
};
