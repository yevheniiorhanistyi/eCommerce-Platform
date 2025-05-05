import { render, screen } from '@testing-library/react';
import Main from '@/app/page';

describe('MainPage', () => {
  it('renders the main page correctly', () => {
    render(<Main />);

    expect(screen.getByText(/Seasonal savings/i)).toBeInTheDocument();
  });
});
