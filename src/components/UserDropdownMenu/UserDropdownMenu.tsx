'use client';

import Link from 'next/link';
import { CircleUserRound, KeyRound, UserRoundPlus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const UserDropdownMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        aria-label="User menu"
        className="rounded-full cursor-pointer transition-colors duration-300"
        variant="ghost"
        size="icon"
      >
        <CircleUserRound className="size-6" strokeWidth={1.6} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem asChild>
        <Link className="flex items-center gap-2 w-full cursor-pointer" href="/login">
          <KeyRound />
          <span className="text-base">Sign In</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link className="flex items-center gap-2 w-full cursor-pointer" href="/register">
          <UserRoundPlus />
          <span className="text-base">Join Us</span>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserDropdownMenu;
