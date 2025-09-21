import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { LiaShopware } from "react-icons/lia";
import { RiHeartLine } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const NavBar = () => {
  const { setTheme } = useTheme();
  return (
    <div className="flex gap-2 items-center justify-between w-full p-1">
      <div className="text-xl flex items-center justify-center gap-3 font-semibold">
        <LiaShopware className="size-8" />
        Ecom .
      </div>
      <div className="relative min-w-xs">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search"
          className="pl-8 w-full focus-visible:ring-1 bg-primary-foreground border-0 dark:border-gray-800"
        />
      </div>
      <div className="flex items-center gap-8 pe-5">
        <div className="cursor-pointer flex flex-col items-center gap-1 relative">
          <HiOutlineShoppingBag className="text-xl" />
          <span className="text-xs">Cart</span>
          <Badge
            variant="default"
            className="rounded-full w-5 h-5 bg-green-600 absolute -top-2 left-5"
          >
            4
          </Badge>
        </div>
        <div className="cursor-pointer flex flex-col items-center gap-1">
          <RiHeartLine className="text-xl" />
          <span className="text-xs">Favorites</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png1"
                className="cursor-pointer"
              />
              <AvatarFallback className="cursor-pointer">SR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Orders
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default NavBar;
