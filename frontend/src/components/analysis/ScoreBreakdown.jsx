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

  let data = [];

  if (Array.isArray(breakdown)) {
    // Backend returns an array
    data = breakdown.map((item) => ({
      axis: item.label,
      v: item.value,
    }));
  } else {
    // Backend returns an object
    data = [
      { axis: "Keywords", v: breakdown.keywords || 0 },
      { axis: "Formatting", v: breakdown.formatting || 0 },
      { axis: "Impact", v: breakdown.impact || 0 },
      { axis: "Clarity", v: breakdown.clarity || 0 },
    ];
  }

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
            <PolarRadiusAxis
              domain={[0, 25]}
              tick={false}
              axisLine={false}
            />
            <Radar
              dataKey="v"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-3">
        {data.map((d) => (
          <div key={d.axis} className="text-center">
            <div className="text-xs text-gray-400">{d.axis}</div>
            <div className="font-semibold">
              {d.v}
              <span className="text-xs text-gray-500">/25</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}