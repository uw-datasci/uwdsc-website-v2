import Stats from "@/components/UI/Stats";

const STATS = [
  {
    title: "Participants",
    stat: 300,
  },
  {
    title: "Collaborating Companies",
    stat: 10,
  },
  {
    title: "Instagram Following",
    stat: 2410,
  },
  {
    title: "Hackathons Hosted",
    stat: 4,
  },
];

export default function CxCStats() {
  return <Stats inputStats={STATS} statTitle={"CxC STATS"} />;
}
