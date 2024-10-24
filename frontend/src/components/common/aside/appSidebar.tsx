import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavItems } from "@/lib/navItems";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar() {
    const isMobile = useIsMobile();

    return (
        <Sidebar className="mt-16">
            <SidebarContent className="p-2">
                <SidebarGroup>
                    {isMobile && (
                        <SidebarHeader className="text-lg font-semibold text-muted-foreground">
                            Darshan Tube
                        </SidebarHeader>
                    )}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {NavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
