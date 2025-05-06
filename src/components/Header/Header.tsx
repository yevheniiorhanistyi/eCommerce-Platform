'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  CircleUserRound,
  KeyRound,
  UserRoundPlus,
  ShoppingBasket,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';

const navLinks = [
  { href: '/catalog', label: 'Catalog' },
  { href: '/about', label: 'About Us' }
];

const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <header className="px-5 sm:px-10 py-4 grow-0 shrink-0 basis-auto">
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
        <Link className="flex items-center gap-2" href={'/'}>
          <Image
            className="h-[35px] w-[17px] sm:h-[51px] sm:w-[25px]"
            src="/logo.png"
            width={25}
            height={51}
            alt="Logo"
          />
          <h1 className="text-2xl sm:text-3xl tracking-wide font-[family-name:var(--font-mr-dafoe)]">
            StepUp
          </h1>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map(({ href, label }) => (
              <NavigationMenuItem key={href} className="hidden sm:flex">
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Link className="sm:text-lg" href={href}>
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
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
                    <Link className="flex items-center gap-2 w-full cursor-pointer" href={'/login'}>
                      <KeyRound />
                      <span className="text-base">Sign In</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      className="flex items-center gap-2 w-full cursor-pointer"
                      href={'/register'}
                    >
                      <UserRoundPlus />
                      <span className="text-base">Join Us</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={'/cart'}>
                <Button
                  aria-label="Cart"
                  className="rounded-full cursor-pointer transition-colors duration-300"
                  variant="ghost"
                  size="icon"
                >
                  <ShoppingBasket className="size-6" strokeWidth={1.6} />
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="sm:hidden">
              <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
                <DrawerTrigger asChild>
                  <Button
                    aria-label="Open menu"
                    className="rounded-full cursor-pointer transition-colors duration-300"
                    variant="ghost"
                    size="icon"
                  >
                    <Menu className="size-6" strokeWidth={1.6} />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="flex items-end">
                    <DrawerTitle>
                      <VisuallyHidden>Menu</VisuallyHidden>
                    </DrawerTitle>
                    <DrawerClose asChild>
                      <Button
                        aria-label="Close menu"
                        className="rounded-full cursor-pointer transition-colors duration-300"
                        variant="ghost"
                        size="icon"
                      >
                        <X className="size-6" strokeWidth={1.6} />
                      </Button>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="flex flex-col gap-5 p-5">
                    <Link
                      className="flex items-center justify-between w-full text-xl hover:text-accent-foreground/90"
                      href={'/cart'}
                      onClick={() => setIsOpen(false)}
                    >
                      Cart
                      <ChevronRight />
                    </Link>
                    {navLinks.map(({ href, label }) => (
                      <Link
                        key={href}
                        className="flex items-center justify-between w-full text-xl hover:text-accent-foreground/90"
                        href={href}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                        <ChevronRight />
                      </Link>
                    ))}
                    <p className="text-lg text-accent-foreground/90 -tracking-tighter">
                      Become a StepUp Member for the best products, inspiration and stories in
                      sport.
                    </p>
                    <div className="flex items-center gap-4">
                      <Link
                        className="flex items-center gap-2"
                        href={'/login'}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button className="text-base font-bold rounded-2xl cursor-pointer">
                          Sign In
                        </Button>
                      </Link>
                      <Link
                        className="flex items-center gap-2"
                        href={'/register'}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="text-base font-bold rounded-2xl cursor-pointer"
                        >
                          Join Us
                        </Button>
                      </Link>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
