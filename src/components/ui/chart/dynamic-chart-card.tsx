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
  CardFooter,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { CircleHelp } from "lucide-react";
import Loader from "@/components/ui/loader/loader";

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
  //   description,
  //   logo,
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

  const [chartData, setChartData] = useState<unknown[]>([]);
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
          const formattedData = result.data.map((item: never) => ({
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
    return <Loader />;
  }

  return (
    <div className="grid-stack-item col-span-4" ref={widgetRef}>
      <div className="">
        <Card className="rounded-xl bg-white">
          <CardHeader className="p-2 w-full flex flex-row justify-between items-center border-b">
            <CardTitle className="font-medium leading-6 tracking-wide text-sm text-gray-600">
              {title}
            </CardTitle>

            <div className="flex items-center">
              <CircleHelp className="size-5 text-black" />
            </div>
          </CardHeader>
          <CardContent className="overflow-visible p-2">
            <div className="flex items-center justify-center">
              {renderChart()}
            </div>
          </CardContent>
          <CardFooter className="flex border-t px-4 py-2 gap-5 items-center">
            <div className="flex items-center justify-between gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <p className="text-sm font-sans text-gray-500 leading-6 tracking-wide">
                This Month
              </p>
            </div>
            <div className="flex items-center justify-start gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              <p className="text-sm font-sans text-gray-500 leading-6 tracking-wide">
                Last Month
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DynamicChartCard;
