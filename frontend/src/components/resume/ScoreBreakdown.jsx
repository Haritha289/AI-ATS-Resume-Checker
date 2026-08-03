import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

export function ScoreBreakdown({ breakdown }) {
  console.log("Breakdown:", breakdown);

  if (!breakdown) return null;

  const data = [
    { axis: "Keywords", v: breakdown.keywords ?? 0 },
    { axis: "Formatting", v: breakdown.formatting ?? 0 },
    { axis: "Impact", v: breakdown.impact ?? 0 },
    { axis: "Clarity", v: breakdown.clarity ?? 0 },
  ];

  console.log("Chart Data:", data);

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <CardTitle className="text-base">Score Breakdown</CardTitle>
          <CardDescription>
            Each axis scored out of 25
          </CardDescription>
        </div>
      </CardHeader>

      <div className="h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="axis" />
            <PolarRadiusAxis domain={[0, 25]} />
            <Radar
              dataKey="v"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-3">
        {data.map((d) => (
          <div key={d.axis} className="text-center">
            <div>{d.axis}</div>
            <div>{d.v}/25</div>
          </div>
        ))}
      </div>
    </Card>
  );
}