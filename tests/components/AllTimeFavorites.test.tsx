/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import AllTimeFavorites from '@/components/AllTimeFavorites/AllTimeFavorites';
import { getProductsByCategoryKey } from '@/services/getProductsByCategoryKey';

jest.mock('@/services/getProductsByCategoryKey');

jest.mock('@/services/BuildClient', () => ({
  getEnvVar: jest.fn().mockReturnValue('step-up')
}));

describe('AllTimeFavorites', () => {
  it('should render products correctly', async () => {
    const mockProducts = [
      {
        id: '1',
        name: { 'en-US': 'Product 1' },
        masterVariant: {
          images: [{ url: '/image1.jpg' }],
          prices: [{ value: { centAmount: 1000 } }]
        }
      },
      {
        id: '2',
        name: { 'en-US': 'Product 2' },
        masterVariant: {
          images: [{ url: '/image2.jpg' }],
          prices: [{ value: { centAmount: 2000 } }]
        }
      }
    ];

    (getProductsByCategoryKey as jest.Mock).mockResolvedValue(mockProducts);

    await act(async () => {
      render(<AllTimeFavorites />);
    });

    await screen.findByText('Product 1');
    await screen.findByText('Product 2');

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('10$')).toBeInTheDocument();
    expect(screen.getByText('20$')).toBeInTheDocument();
  });

  it('should render empty if no products found', async () => {
    (getProductsByCategoryKey as jest.Mock).mockResolvedValue([]);

    await act(async () => {
      render(<AllTimeFavorites />);
    });

    const product1 = screen.queryByText('Product 1');
    const product2 = screen.queryByText('Product 2');

    expect(product1).toBeNull();
    expect(product2).toBeNull();
  });
});
