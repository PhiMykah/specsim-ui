import { 
  ChartColumn,
  ChartColumnIncreasing,
  CirclePlus,
  Cog,
  FolderClosed,
  FolderOpen,
  Package,
  PackageOpen,
  Settings,
  SlidersHorizontal,
  SlidersVertical, 
  SquarePlus,
  SendHorizonal,
  Send,
} from "lucide-react"

import { open, save } from "@tauri-apps/plugin-dialog"; // Import Tauri file dialog functions
import { writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
import { useGlobalParams } from "@/components/context/GlobalParamsContext";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ModeToggle";
import { title } from "process";

// Menu items.
const items = [
  {
    title: "File",
    href: "/Simulation/File",
    icon: FolderClosed,
    hover: FolderOpen,
  },
  {
    title: "Simulation Options",
    href: "/Simulation/SimOptions",
    icon: SlidersHorizontal,
    hover: SlidersVertical,
  },
  {
    title: "Optimization Options",
    href: "/Simulation/OptOptions",
    icon: Cog,
    hover: Settings,
  },
  {
    title: "Optimization Parameters",
    href: "/Simulation/OptParams",
    icon: ChartColumn,
    hover: ChartColumnIncreasing,
  },
  {
    title: "Model Parameters",
    href: "/Simulation/ModelParams",
    icon: Package,
    hover: PackageOpen,
  },
  {
    title: "Additional Parameters",
    href: "/Simulation/OtherParams",
    icon: CirclePlus,
    hover: SquarePlus,
  },
  {
    title: "Submit Parameters",
    href: "/",
    icon: SendHorizonal,
    hover: Send,
  }
]

export function Trigger() {
  const { open } = useSidebar();
  return (
  <div
    className={`fixed top-0 ${
      open ? "left-[var(--sidebar-width)]" : "left-0"
    } z-50 p-2 transition-all duration-300`}
  >
    <SidebarTrigger />
  </div>
  )
}

export function AppSidebar() {
  const pathname = usePathname(); // Get the current route
  const { combinedParams, updateParams } = useGlobalParams(); // Access global state

  const handleSaveParams = async () => {
    try {
      const filePath = await save({
        filters: [
          {
            name: "JSON Files",
            extensions: ["json"],
          },
        ],
      });

      if (filePath) {
        const fileContent = JSON.stringify(combinedParams, null, 2);
        // await window.__TAURI__.fs.writeFile({ path: filePath, contents: fileContent });
        await writeTextFile(filePath, fileContent, {
          baseDir: BaseDirectory.AppConfig,
        });
        console.log("Parameters saved to file:", filePath);
      }
    } catch (error) {
      console.error("Failed to save parameters:", error);
    }
  };

  const handleLoadParams = async () => {
    try {
      const filePath = await open({
        multiple: false,
        filters: [
          {
            name: "JSON Files",
            extensions: ["json"],
          },
        ],
      });

      if (typeof filePath === "string") {
        const fileContent = await readTextFile(filePath, {
          baseDir: BaseDirectory.AppConfig,
        });
        const loadedParams = JSON.parse(fileContent);

        Object.keys(loadedParams).forEach((section) => {
          updateParams(section, loadedParams[section]); // Update global state
        });

        console.log("Parameters loaded from file:", filePath);
      }
    } catch (error) {
      console.error("Failed to load parameters:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-base-200">
        <SidebarGroup>
          <SidebarGroupLabel className="text-base-content">specsim-ui</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="text-base-content hover:text-base-content">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={
                      pathname === item.href ? "bg-accent text-accent-content" : "hover:bg-accent hover:text-accent-content"
                    }
                  >
                    <Link href={item.href}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-base-200">
        <div className="flex flex-col gap-2 justify-end">
          <Button
            onClick={handleLoadParams}
            className="bg-primary text-primary-content px-4 py-2 rounded"
          >
            Load Params
          </Button>
          <Button
            onClick={handleSaveParams}
            className="bg-secondary text-secondary-content px-4 py-2 rounded hover:bg-secondary/80"
          >
            Save Params
          </Button>
        </div>
        <div className="flex justify-end">
          <ModeToggle/>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}