import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar/sidebar";
import Image from "next/image";
import perfora from "../../../public/images/perfora.png";
import mama from "../../../public/images/mama.png";
import boat from "../../../public/images/boat.png";
import { ComboboxDemo } from "@/components/ui/combobox/combobox";
import { Button } from "@/components/ui/button/button";
import {
  ChevronDown,
  Home,
  Images,
  Plus,
  TvMinimal,
  Users,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible/collapsible";
import Link from "next/link";
const Appsidebar = () => {
  const sidebarOptio = [
    {
      id: 0,
      title: "Overview",
      icon: <Home className="size-5" />,
      isDropDown: false,
    },
    {
      id: 1,
      title: "Channel",
      icon: <TvMinimal className="size-5" />,
      isDropDown: true,
      dropdown: ["Meta Ads", "Google Ads", "Quick Commerce"],
    },
    {
      id: 2,
      title: "Creatives",
      icon: <Images className="size-5" />,
    },
  ];
  return (
    <aside>
      <Sidebar>
        <SidebarHeader className="bg-[#FFFFFF]">
          <div className="">
            <div className="flex items-center gap-3">
              <Image src={perfora} className="w-12" alt="Logo" />
              <ComboboxDemo />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="">
          <div className="flex h-svh">
            <div className="flex px-2 py-2 w-fit bg-[#FFFFFF] justify-between flex-col items-center">
              <div className="flex mt-2 flex-col items-center gap-4">
                <Image
                  src={mama}
                  className="w-12 rounded-2xl transition-all ease-linear ring-1 ring-gray-500"
                  alt="Logo"
                />
                <Image
                  src={boat}
                  className="w-12 rounded-2xl  transition-all ease-linear ring-1 ring-gray-500"
                  alt="Logo"
                />
                <div className="">
                  <Button
                    variant={"default"}
                    className="h-12 w-12 inline-flex items-center bg-transparent ring-1 ring-gray-400 rounded-lg justify-center"
                  >
                    <Plus className="size-5 text-[#1D874F]" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center">
                  <Users className="size-5 text-gray-600" />
                </div>
                <Button className="w-9 h-9 flex items-center justify-center rounded-full bg-fuchsia-700">
                  SS
                </Button>
              </div>
            </div>

            <div className="flex justify-between pl-6 flex-col py-4 items-start w-full">
              <div className="mt-2 flex gap-5 flex-col justify-between items-center ">
                {sidebarOptio.map((items) =>
                  !items.isDropDown ? (
                    <SidebarMenu
                      className="w-full"
                      key={`sidebar_${items.title}`}
                    >
                      <Link href={"/"} className="w-full inline-block">
                        <SidebarMenu className="flex flex-row items-center gap-4">
                          <span className="text-gray-400 size-5">
                            {items.icon}
                          </span>
                          <span className="text-lg font-normal leading-6 tracking-wide ">
                            {items.title}
                          </span>
                        </SidebarMenu>
                      </Link>
                    </SidebarMenu>
                  ) : (
                    <SidebarMenu key={`sidebar_drop_${items.title}`}>
                      <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                          <CollapsibleTrigger className="hover:cursor-pointer">
                            <div className="flex w-full justify-between flex-row items-center text-black gap-15">
                              <div className="flex w-full flex-row items-center gap-4">
                                <span className="text-gray-400 size-5">
                                  {items.icon}
                                </span>
                                <span className="text-lg font-normal leading-6 tracking-wide ">
                                  {items.title}
                                </span>
                              </div>
                              <ChevronDown className="ml-auto size-6 transition-transform duration-500 ease-linear group-data-[state=open]/collapsible:rotate-180" />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="flex items-end justify-end flex-col gap-2">
                            <SidebarMenuSub>
                              {items.isDropDown &&
                                items.dropdown &&
                                items.dropdown.map((item, index) => (
                                  <SidebarMenuItem
                                    key={`sidebar_dropdown_item_${item}`}
                                  >
                                    <SidebarMenuSubButton
                                      className="hover:cursor-pointer"
                                      asChild
                                      isActive={index === 2}
                                      data-active={index === 2} // Explicitly setting data-active
                                    >
                                      <Link
                                        href={"/"}
                                        className="data-[active=true]:bg-green-700 text-[#031B15CC] text-[14px] font-normal leading-6 tracking-wide"
                                      >
                                        {item}
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuItem>
                                ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    </SidebarMenu>
                  )
                )}
              </div>

              <div className="flex gap-5  flex-col justify-between items-center">
                <Link href={"/"} className="w-full mt-5 inline-block">
                  <SidebarMenu className="flex flex-row items-center gap-4">
                    <span className="text-gray-400">
                      {" "}
                      <svg
                        className="size-5"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.877075 7.49972C0.877075 3.84204 3.84222 0.876892 7.49991 0.876892C11.1576 0.876892 14.1227 3.84204 14.1227 7.49972C14.1227 11.1574 11.1576 14.1226 7.49991 14.1226C3.84222 14.1226 0.877075 11.1574 0.877075 7.49972ZM7.49991 1.82689C4.36689 1.82689 1.82708 4.36671 1.82708 7.49972C1.82708 10.6327 4.36689 13.1726 7.49991 13.1726C10.6329 13.1726 13.1727 10.6327 13.1727 7.49972C13.1727 4.36671 10.6329 1.82689 7.49991 1.82689ZM8.24993 10.5C8.24993 10.9142 7.91414 11.25 7.49993 11.25C7.08571 11.25 6.74993 10.9142 6.74993 10.5C6.74993 10.0858 7.08571 9.75 7.49993 9.75C7.91414 9.75 8.24993 10.0858 8.24993 10.5ZM6.05003 6.25C6.05003 5.57211 6.63511 4.925 7.50003 4.925C8.36496 4.925 8.95003 5.57211 8.95003 6.25C8.95003 6.74118 8.68002 6.99212 8.21447 7.27494C8.16251 7.30651 8.10258 7.34131 8.03847 7.37854L8.03841 7.37858C7.85521 7.48497 7.63788 7.61119 7.47449 7.73849C7.23214 7.92732 6.95003 8.23198 6.95003 8.7C6.95004 9.00376 7.19628 9.25 7.50004 9.25C7.8024 9.25 8.04778 9.00601 8.05002 8.70417L8.05056 8.7033C8.05924 8.6896 8.08493 8.65735 8.15058 8.6062C8.25207 8.52712 8.36508 8.46163 8.51567 8.37436L8.51571 8.37433C8.59422 8.32883 8.68296 8.27741 8.78559 8.21506C9.32004 7.89038 10.05 7.35382 10.05 6.25C10.05 4.92789 8.93511 3.825 7.50003 3.825C6.06496 3.825 4.95003 4.92789 4.95003 6.25C4.95003 6.55376 5.19628 6.8 5.50003 6.8C5.80379 6.8 6.05003 6.55376 6.05003 6.25Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-lg font-normal leading-6 tracking-wide ">
                      Help
                    </span>
                  </SidebarMenu>
                </Link>
                <SidebarMenu>
                  <Link href={"/"} className="flex flex-row items-center gap-4">
                    <svg
                      className="size-5 text-gray-400"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-lg font-normal leading-6 tracking-wide ">
                      Settings
                    </span>
                  </Link>
                </SidebarMenu>
              </div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </aside>
  );
};

export default Appsidebar;
