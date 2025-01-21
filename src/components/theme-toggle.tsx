"use client";

import * as React from "react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';

export function ThemeToggle() {
    const { setTheme, themes, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {theme === "Telkom" ? (
                        <div className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all">
                            <Image
                                src="/logotelkom.png"
                                alt="Logo"
                                fill
                            />
                        </div>
                    ) : (
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.map((theme) => (
                    <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
                        {theme === "system" ? "System" : theme}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}