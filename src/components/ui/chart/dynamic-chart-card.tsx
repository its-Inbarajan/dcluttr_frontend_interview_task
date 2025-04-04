"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import "gridstack/dist/gridstack.min.css";
import { ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { LineChart } from "recharts";
import { CartesianGrid } from "recharts";
import { XAxis } from "recharts";
import { Line } from "recharts";
import { PieChart } from "recharts";
import { Pie } from "recharts";
import { Cell } from "recharts";
import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
// import Image from "next/image";
type GridProps = {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  minW?: number;
  minH?: number;
};

type ChartType = "linechart" | "semipiechart";

type ChartCardProps = {
  id: string;
  title: string;
  logo?: string;
  description?: string;
  chartType: ChartType | string;
  query: string; // should be typed per chart later
  gridProps: GridProps;
};

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const DynamicChartCard: FC<ChartCardProps> = ({
  query,
  chartType,
  gridProps,
  id,
  title,
  description,
  logo,
}) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (widgetRef.current && gridProps) {
      const element = widgetRef.current;
      element.setAttribute("gs-id", id);
      element.setAttribute("gs-x", (gridProps.x || 0).toString());
      element.setAttribute("gs-y", (gridProps.y || 0).toString());
      element.setAttribute("gs-w", (gridProps.w || 4).toString());
      element.setAttribute("gs-h", (gridProps.h || 3).toString());
      if (gridProps.minW)
        element.setAttribute("gs-min-w", gridProps.minW.toString());
      if (gridProps.minH)
        element.setAttribute("gs-min-h", gridProps.minH.toString());
    }
  }, [gridProps, id]);

  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cube", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query), // FIXED: Ensure query is properly structured
        });

        const result = await response.json();

        if (result.data) {
          // Convert Cube.js response to chart format
          const formattedData = result.data.map((item: any) => ({
            date: item["blinkit_insights_sku.created_at"],
            value: item["blinkit_insights_sku.sales_mrp_sum"],
          }));

          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  function renderChart() {
    switch (chartType) {
      case "linechart":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "semipiechart":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <p>No chart type matched.</p>;
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="grid-stack-item col-span-4" ref={widgetRef}>
      <Card className="rounded-2xl shadow-md h-full ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            {/* {logo && <Image src={logo} alt="logo" width={20} height={20} />} */}
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {/* {description && (
            <p className="text-sm mb-2 text-muted-foreground">{description}</p>
          )} */}
          {renderChart()}
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicChartCard;
