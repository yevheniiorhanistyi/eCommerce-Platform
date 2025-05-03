import { render, screen } from '@testing-library/react';
import Main from '@/app/page';

describe('MainPage', () => {
  it('renders the main page correctly', () => {
    render(<Main />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Main Page');
  });
});
