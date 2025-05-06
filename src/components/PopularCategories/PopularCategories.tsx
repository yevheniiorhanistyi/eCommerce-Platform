import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const PopularCategories = (): JSX.Element => {
  const categories = [
    {
      title: 'Training Shoes',
      description:
        'Versatile performance shoes built for gym sessions, HIIT, and everything in between',
      href: '/catalog',
      image: '/images/category.png'
    },
    {
      title: 'Running Shoes',
      description: 'Enhance your performance with our top-notch running sneakers.',
      href: '/catalog',
      image: '/images/category.png'
    },
    {
      title: 'Casual Sneakers',
      description: 'Find your perfect pair for everyday wear and comfort.',
      href: '/catalog',
      image: '/images/category.png'
    }
  ];

  return (
    <section className="w-full max-w-[1440px] px-4 sm:px-10 py-8 mx-auto">
      <h2 className="text-2xl text-center mb-7">Popular Categories</h2>
      <div className="flex flex-row flex-wrap gap-5 items-center justify-center w-full">
        {categories.map((category) => (
          <Link href={category.href} key={category.title} className="max-w-[420px]">
            <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg py-5">
              <CardContent>
                <div className="relative w-full h-[246px] mb-7">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 364px"
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-lg mb-2 sm:mb-4">{category.title}</h3>
                <p className="text-base sm:-tracking-tight mb-1">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
