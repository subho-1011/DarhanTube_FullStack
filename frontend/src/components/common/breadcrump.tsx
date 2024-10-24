"use client";

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import React from "react";

export function BreadcrumbDemo() {
    const pathname = usePathname();

    const pathnames = pathname?.split("/");

    return (
        <Breadcrumb>
            <BreadcrumbList className="text-xs">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator /> */}
                {pathnames?.map((name, index) => {
                    const href = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    console.log(href);

                    return isLast ? (
                        <BreadcrumbItem key={name}>
                            <BreadcrumbPage>{name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    ) : (
                        <React.Fragment key={name}>
                            <BreadcrumbItem key={name}>
                                <BreadcrumbLink href={`/${href}`}>{name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );

    // return (
    //     <Breadcrumb>
    //         <BreadcrumbList className="text-xs">
    //             <BreadcrumbItem>
    //                 <BreadcrumbLink href="/">Home</BreadcrumbLink>
    //             </BreadcrumbItem>
    //             <BreadcrumbSeparator />
    //             <BreadcrumbItem>
    //                 <DropdownMenu>
    //                     <DropdownMenuTrigger className="flex items-center gap-1">
    //                         <BreadcrumbEllipsis className="h-4 w-4" />
    //                         <span className="sr-only">Toggle menu</span>
    //                     </DropdownMenuTrigger>
    //                     <DropdownMenuContent align="start">
    //                         <DropdownMenuItem>Documentation</DropdownMenuItem>
    //                         <DropdownMenuItem>Themes</DropdownMenuItem>
    //                         <DropdownMenuItem>GitHub</DropdownMenuItem>
    //                     </DropdownMenuContent>
    //                 </DropdownMenu>
    //             </BreadcrumbItem>
    //             <BreadcrumbSeparator />
    //             <BreadcrumbItem>
    //                 <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
    //             </BreadcrumbItem>
    //             <BreadcrumbSeparator />
    //             <BreadcrumbItem>
    //                 <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    //             </BreadcrumbItem>
    //         </BreadcrumbList>
    //     </Breadcrumb>
    // );
}
