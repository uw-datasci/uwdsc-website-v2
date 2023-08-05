import Stats from "@/components/UI/Stats";

const STATS = [
  {
    title: "Workshops Held",
    stat: 100,
  },
  {
    title: "Current Members",
    stat: 400,
  },
  {
    title: "Recruiting Events Held",
    stat: 100,
  },
];

export default function ClubStats() {
  return <Stats inputStats={STATS} statTitle={"CXC STATS"} />;
}
