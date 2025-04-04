"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import DateWithRange from "@/components/ui/date-with-range/date-with-range";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar/menubar";
import { Switch } from "@/components/ui/switch/switch";
import { ChartLine, CircleHelp } from "lucide-react";
import { LineChart } from "recharts";
import blinkt from "../../public/images/blinkt.png";
import instamart from "../../public/images/instamart.png";
import zepto from "../../public/images/zepto.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GridStack } from "gridstack";
// import data from "@/data/data.json";
// import DynamicChartCard from "@/components/ui/chart/dynamic-chart-card";
import {
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const [result, setResult] = useState([]);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // const data = {
  //   id: "11|BLINKIT|PERFORMANCE|TEST",
  //   brandId: "11",
  //   name: "Blinkit",
  //   logo: "/icons/blinkit.svg",
  //   description: "Deep drive and analyse KPIs from BlinkIt",
  //   active: true,
  //   cards: [
  //     {
  //       visualizationType: "linechart",
  //       title: "Sales (MRP)",
  //       id: "blinkit-insights-sku-sales_mrp",
  //       logo: "/icons/blinkit.svg",
  //       description: "",
  //       gridStackProperties: {
  //         x: 0,
  //         w: 4,
  //       },
  //       query:
  //         '[{"measures":["blinkit_insights_sku.sales_mrp_sum"],"timeDimensions":[{"dimension":"blinkit_insights_sku.created_at","dateRange":"this month"}]},{"measures":["blinkit_insights_sku.sales_mrp_sum"],"timeDimensions":[{"dimension":"blinkit_insights_sku.created_at","dateRange":"this month","granularity":"day"}],"order":{"blinkit_insights_sku.created_at":"asc"}}]',
  //       datatableProperties: {
  //         columnOrder: [],
  //         columnsPinned: [],
  //         columnsVisible: {},
  //       },
  //       active: true,
  //     },
  //     {
  //       visualizationType: "semipiechart",
  //       title: "Top cities",
  //       id: "blinkit-insights-city-sales_mrp_sum",
  //       logo: "/icons/blinkit.svg",
  //       description: "Know which cities are contributing the most 📈",
  //       gridStackProperties: {
  //         x: 4,
  //         w: 4,
  //       },
  //       query:
  //         '[{"measures":["blinkit_insights_city.sales_mrp_sum"],"order":{"blinkit_insights_city.sales_mrp_sum":"desc"},"dimensions":["blinkit_insights_city.name"],"timeDimensions":[{"dimension":"blinkit_insights_city.created_at","dateRange": "this month"}],"limit":4}]',
  //       datatableProperties: {
  //         columnOrder: ["blinkit_insights_city.sales_mrp_sum"],
  //         columnsPinned: [],
  //         columnsVisible: {
  //           "blinkit_insights_city.sales_mrp_sum": true,
  //         },
  //       },
  //       active: true,
  //     },
  //     {
  //       visualizationType: "linechart",
  //       title: "Items sold",
  //       id: "blinkit-insights-sku-qty_sold",
  //       logo: "/icons/blinkit.svg",
  //       description: "",
  //       gridStackProperties: {
  //         x: 12,
  //         w: 4,
  //       },
  //       query:
  //         '[{"measures":["blinkit_insights_sku.qty_sold"],"timeDimensions":[{"dimension":"blinkit_insights_sku.created_at","dateRange":"this month"}],"order":{"blinkit_insights_sku.created_at":"asc"}},{"measures":["blinkit_insights_sku.qty_sold"],"timeDimensions":[{"dimension":"blinkit_insights_sku.created_at","dateRange":"this month","granularity":"day"}],"order":{"blinkit_insights_sku.created_at":"asc"}}]',
  //       datatableProperties: {
  //         columnOrder: [],
  //         columnsPinned: [],
  //         columnsVisible: {},
  //       },
  //       active: true,
  //     },
  //     {
  //       visualizationType: "table",
  //       title: "Product Insights",
  //       id: "blinkit-insights-sku",
  //       logo: "/icons/blinkit.svg",
  //       description: "Analytics for all your SKUs 📦",
  //       gridStackProperties: {
  //         x: 0,
  //         w: 12,
  //       },
  //       query:
  //         '[{"measures":["blinkit_insights_sku.sales_mrp_sum","blinkit_insights_sku.qty_sold","blinkit_insights_sku.drr_7","blinkit_insights_sku.drr_14","blinkit_insights_sku.drr_30","blinkit_insights_sku.sales_mrp_max","blinkit_insights_sku.month_to_date_sales","blinkit_insights_sku.be_inv_qty","blinkit_insights_sku.fe_inv_qty","blinkit_insights_sku.inv_qty","blinkit_insights_sku.days_of_inventory_14","blinkit_insights_sku.days_of_inventory_max","blinkit_scraping_stream.on_shelf_availability","blinkit_scraping_stream.rank_avg","blinkit_scraping_stream.selling_price_avg","blinkit_scraping_stream.discount_avg"],"dimensions":["blinkit_insights_sku.id","blinkit_insights_sku.name"],"timeDimensions":[{"dimension":"blinkit_insights_sku.created_at","dateRange":"this month"}]}]',
  //       datatableProperties: {
  //         columnOrder: [
  //           "blinkit_insights_sku.name",
  //           "blinkit_insights_sku.sales_mrp_sum",
  //           "blinkit_insights_sku.qty_sold",
  //           "blinkit_insights_sku.drr_7",
  //           "blinkit_insights_sku.drr_14",
  //           "blinkit_insights_sku.days_of_inventory_14",
  //           "blinkit_insights_sku.drr_30",
  //           "blinkit_insights_sku.sales_mrp_max",
  //           "blinkit_insights_sku.month_to_date_sales",
  //           "blinkit_insights_sku.be_inv_qty",
  //           "blinkit_insights_sku.fe_inv_qty",
  //           "blinkit_insights_sku.inv_qty",
  //           "blinkit_insights_sku.days_of_inventory_max",
  //           "blinkit_scraping_stream.on_shelf_availability",
  //           "blinkit_scraping_stream.selling_price_avg",
  //           "blinkit_scraping_stream.discount_avg",
  //           "blinkit_scraping_stream.rank_avg",
  //         ],
  //         columnsPinned: ["selection-checkbox", "blinkit_insights_sku.name"],
  //         columnsVisible: {
  //           "blinkit_scraping_stream.rank_avg": true,
  //           "blinkit_scraping_stream.discount_avg": true,
  //           "blinkit_insights_sku.month_to_date_sales": true,
  //           "blinkit_insights_sku.name": true,
  //           "blinkit_insights_sku.days_of_inventory_14": true,
  //           "blinkit_insights_sku.drr_30": true,
  //           "blinkit_insights_sku.days_of_inventory_max": true,
  //           "blinkit_insights_sku.drr_7": true,
  //           "blinkit_scraping_stream.selling_price_avg": true,
  //           "blinkit_insights_sku.sales_mrp_max": true,
  //           "blinkit_insights_sku.id": false,
  //           "blinkit_scraping_stream.on_shelf_availability": true,
  //           "blinkit_insights_sku.be_inv_qty": true,
  //           "blinkit_insights_sku.inv_qty": true,
  //           "blinkit_insights_sku.fe_inv_qty": true,
  //           "blinkit_insights_sku.drr_14": true,
  //           "blinkit_insights_sku.sales_mrp_sum": true,
  //           "blinkit_insights_sku.qty_sold": true,
  //         },
  //       },
  //       active: true,
  //     },
  //     {
  //       visualizationType: "table",
  //       title: "City Insights",
  //       id: "blinkit-insights-city",
  //       logo: "/icons/blinkit.svg",
  //       description: "Know your sales trend across cities 🗺️",
  //       gridStackProperties: {
  //         x: 0,
  //         w: 12,
  //       },
  //       query:
  //         '[{"measures":["blinkit_insights_city.sales_mrp_sum","blinkit_insights_city.qty_sold","blinkit_insights_city.drr_7","blinkit_insights_city.drr_14","blinkit_insights_city.drr_30","blinkit_insights_city.sales_mrp_max","blinkit_insights_city.month_to_date_sales","blinkit_insights_city.be_inv_qty","blinkit_insights_city.fe_inv_qty","blinkit_insights_city.inv_qty","blinkit_insights_city.days_of_inventory_14","blinkit_insights_city.days_of_inventory_max","blinkit_scraping_stream.on_shelf_availability","blinkit_scraping_stream.rank_avg","blinkit_scraping_stream.selling_price_avg","blinkit_scraping_stream.discount_avg"],"dimensions":["blinkit_insights_city.id","blinkit_insights_city.name"],"timeDimensions":[{"dimension":"blinkit_insights_city.created_at","dateRange":"this month"}]}]',
  //       datatableProperties: {
  //         columnOrder: [
  //           "blinkit_insights_city.id",
  //           "blinkit_insights_city.name",
  //           "blinkit_insights_city.sales_mrp_sum",
  //           "blinkit_insights_city.qty_sold",
  //           "blinkit_insights_city.drr_7",
  //           "blinkit_insights_city.drr_14",
  //           "blinkit_insights_city.days_of_inventory_14",
  //           "blinkit_insights_city.drr_30",
  //           "blinkit_insights_city.sales_mrp_max",
  //           "blinkit_insights_city.month_to_date_sales",
  //           "blinkit_insights_city.be_inv_qty",
  //           "blinkit_insights_city.fe_inv_qty",
  //           "blinkit_insights_city.inv_qty",
  //           "blinkit_insights_city.days_of_inventory_max",
  //           "blinkit_scraping_stream.on_shelf_availability",
  //           "blinkit_scraping_stream.selling_price_avg",
  //           "blinkit_scraping_stream.discount_avg",
  //           "blinkit_scraping_stream.rank_avg",
  //         ],
  //         columnsPinned: ["selection-checkbox", "blinkit_insights_city.name"],
  //         columnsVisible: {
  //           "blinkit_scraping_stream.rank_avg": true,
  //           "blinkit_insights_city.fe_inv_qty": true,
  //           "blinkit_scraping_stream.discount_avg": true,
  //           "blinkit_insights_city.sales_mrp_sum": true,
  //           "blinkit_insights_city.drr_7": true,
  //           "blinkit_insights_city.drr_14": true,
  //           "blinkit_insights_city.sales_mrp_max": true,
  //           "blinkit_insights_city.drr_30": true,
  //           "blinkit_scraping_stream.selling_price_avg": true,
  //           "blinkit_insights_city.days_of_inventory_max": true,
  //           "blinkit_insights_city.month_to_date_sales": true,
  //           "blinkit_insights_city.be_inv_qty": true,
  //           "blinkit_insights_city.id": false,
  //           "blinkit_insights_city.days_of_inventory_14": true,
  //           "blinkit_insights_city.inv_qty": true,
  //           "blinkit_insights_city.qty_sold": true,
  //           "blinkit_scraping_stream.on_shelf_availability": true,
  //           "blinkit_insights_city.name": true,
  //         },
  //       },
  //       active: true,
  //     },
  //   ],
  // };

  useEffect(() => {
    fetch("/api/cube", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          measures: ["blinkit_insights_city.sales_mrp_sum"],
          timeDimensions: [
            {
              dimension: "blinkit_insights_city.created_at",
              granularity: "day",
              dateRange: "This month",
            },
          ],
          order: {
            "blinkit_insights_city.created_at": "asc",
          },
        },
        queryType: "multi",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setResult(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      GridStack.init(
        {
          float: true,
          cellHeight: 160,
          resizable: { handles: "e, se, s, sw, w" },
        },
        gridRef.current
      );
    }
  }, []);
  // console.log(data);
  console.log(result);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <>
      <section className="relative bg-white">
        <Card className="rounded-[10px] bg-white">
          <CardHeader className="px-[24px]  py-[12px] w-full flex flex-row justify-between items-center border-b">
            <CardTitle className="font-medium leading-6 tracking-wide text-sm text-black">
              Quick Commerce
            </CardTitle>

            <div className="flex items-center gap-2">
              <Card className="w-24 flex gap-1.5 items-center h-8 justify-center rounded-md p-2 bg-white">
                <ChartLine className="text-black size-5" />
                <Switch checked />
              </Card>
              <DateWithRange />
            </div>
          </CardHeader>
          <CardHeader className="px-[24px]  py-[12px] w-full flex flex-row justify-between items-center border-b">
            <Menubar className="p-6">
              <MenubarMenu>
                <MenubarTrigger>
                  <Image
                    src={blinkt}
                    alt="blinkt"
                    loading="lazy"
                    className="w-[16px] h-[16px] mr-1"
                  />{" "}
                  <span className="">Blinkit</span>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger disabled={true}>
                  {" "}
                  <Image
                    src={zepto}
                    alt="zepto"
                    className="w-[16px] h-[16px] mr-1"
                  />{" "}
                  Zepto
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger disabled={true}>
                  {" "}
                  <Image
                    src={instamart}
                    alt="instamart"
                    className="w-[16px] h-[16px] mr-1"
                  />{" "}
                  Instamart
                </MenubarTrigger>
              </MenubarMenu>
            </Menubar>
          </CardHeader>
          <CardContent className="bg-[#EBEBEB] p-0.5">
            {/* Charts */}
            <div className="grid grid-cols-12 w-full gap-5">
              {/* {data?.cards?.slice(0, 3).map((item) => (
                <DynamicChartCard
                  key={`dynamic_chart_card_${item.id}`}
                  id={item.id}
                  query={JSON.parse(item.query)}
                  chartType={item.visualizationType}
                  gridProps={item.gridStackProperties}
                  title={item?.title}
                  description={item?.description}
                  logo={item?.logo}
                />
              ))} */}
              <div className="col-span-5 p-3">
                <Card className="rounded-xl bg-white">
                  <CardHeader className="p-2 w-full flex flex-row justify-between items-center border-b">
                    <CardTitle className="font-medium leading-6 tracking-wide text-sm text-gray-600">
                      Quick Commerce
                    </CardTitle>

                    <div className="flex items-center">
                      <CircleHelp className="size-5 text-black" />
                    </div>
                  </CardHeader>
                  <CardContent className="overflow-visible p-2">
                    <div className="flex items-center justify-center">
                      {/* <ResponsiveContainer width="100%" height="100%"> */}
                      <LineChart
                        width={300}
                        height={200}
                        data={data}
                        margin={{
                          // top: 5,
                          // right: 30,
                          left: -20,
                          // bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Line
                          type="monotone"
                          dataKey="pv"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                      </LineChart>
                      {/* </ResponsiveContainer> */}
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

            {/* Data table */}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
