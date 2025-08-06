"use client";

import Link from "next/link";
import { Ellipsis, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import { getMenuList } from "./menu-list";
import { CollapseMenuButton } from "./collpase-menu";
import { Separator } from "@/components/ui/separator";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="h-full mt-5 w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-3">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-4" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <div className="flex items-center px-1 mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider truncate">
                    {groupLabel}
                  </p>
                  <Separator className="ml-2 flex-1 " />
                </div>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center py-2">
                        <Ellipsis className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-xs font-semibold uppercase">{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="pb-1"></div>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  !submenus || submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={
                                (active === undefined &&
                                  pathname.startsWith(href)) ||
                                active
                                  ? "default"
                                  : "ghost"
                              }
                              className={cn(
                                "w-full justify-start h-10 mb-1 transition-all",
                                "hover:bg-primary/10 hover:text-primary",
                                (active === undefined && pathname.startsWith(href)) || active
                                  ? "bg-primary/5 text-primary font-medium"
                                  : ""
                              )}
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(
                                    "flex items-center justify-center",
                                    isOpen === false ? "mx-auto" : "mr-3"
                                  )}
                                >
                                  <Icon size={18} className="shrink-0" />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate transition-all",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right" className="bg-foreground text-background">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={
                          active === undefined
                            ? pathname.startsWith(href)
                            : active
                        }
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end mb-4">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {}}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-10 mt-4 ",
                      "hover:bg-destructive/5 hover:text-destructive",
                      isOpen === false ? "justify-center" : ""
                    )}
                  >
                    <span className={cn(isOpen === false ? "" : "mr-3")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right" className="bg-foreground text-background">
                    Sign out
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}