'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ShoppingBasket } from 'lucide-react';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/context/AuthContext';
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu';
import DrawerMenu from '../DrawerMenu/DrawerMenu';

const navLinks = [
  { href: '/catalog', label: 'Catalog' },
  { href: '/about', label: 'About Us' }
];

const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setAuthentication } = useAuth();

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
            src="/images/logo.png"
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
              <UserDropdownMenu
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setAuthentication}
              />
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
              <DrawerMenu
                navLinks={navLinks}
                isAuthenticated={isAuthenticated}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
