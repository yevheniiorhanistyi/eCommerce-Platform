import Link from 'next/link';
import FooterForm from './FooterForm';

const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Terms of Service', href: '#' }
];

const Footer = (): JSX.Element => {
  return (
    <footer className="px-4 sm:px-10 py-10 grow-0 shrink-0 basis-auto bg-neutral-950 text-amber-50">
      <div className="flex flex-col items-center justify-between gap-6 xl:gap-0 xl:flex-row w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-2 sm:gap-4 max-w-[440px] self-start">
          <h3 className="font-bold text-lg sm:text-xl">
            StepUp — More than sneakers. A lifestyle.
          </h3>
          <p className="text-sm text-amber-50/80">
            We believe that the right shoes can take you anywhere — one step at a time. Built for
            movement. Designed for you.
          </p>
          <p className="text-sm text-amber-50/80">© 2025 StepUp. All rights reserved.</p>
        </div>
        <ul className="flex flex-row order-3 xl:order-0 xl:flex-col gap-2 sm:gap-4 self-center">
          {footerLinks.map(({ label, href }) => (
            <li key={label} className="text-[13px] sm:text-sm text-amber-50/80 hover:text-amber-50">
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 sm:gap-4 max-w-[560px] self-end mb-4 xl:mb-0">
          <h2 className="font-bold text-xl sm:text-2xl">Subscribe to our Newsletter</h2>
          <p className="text-sm text-amber-50/80">
            Stay in step with new releases, style tips, and special deals — just for you.
          </p>
          <FooterForm />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
