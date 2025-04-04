"use client";

import * as React from "react";
import { Check, ChevronsLeft, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("NJ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[220px] items-center py-2 rounded-[12px] px-0 ring-1 ring-gray-400 justify-between"
          >
            <div className="bg-[#309E96] w-7 h-7 flex items-center justify-center rounded-[7px]">
              {value && (
                <p className="text-white font-medium text-center -mt-0.5 text-xs p-[5px] tracking-wide leading-1.5">
                  {value.slice(0, 2).toLocaleUpperCase() ?? "HI"}
                </p>
              )}
            </div>
            {frameworks[0].label ?? "HI"}
            <ChevronsUpDown className="text-black size-5 inline-block" />
          </Button>
          <ChevronsLeft className="size-5 text-[#309E96]" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
