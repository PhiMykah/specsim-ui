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
  SquarePlus
} from "lucide-react"
 
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
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";

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

  return (
    <Sidebar>
      <SidebarContent className="bg-base-200">
        <SidebarGroup>
          <SidebarGroupLabel className="text-base-content">specsim-ui</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="text-base-content hover:text-base-content">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild 
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
        <div className="flex justify-end">
          <ModeToggle/>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}