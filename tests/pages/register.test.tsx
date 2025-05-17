import { render, screen } from '@testing-library/react';
import Register from '@/app/register/page';

jest.mock('@/components/Register/Form/RegisterForm', () => ({
  __esModule: true,
  default: jest.fn(() => <div>RegisterForm</div>)
}));

describe('Register', () => {
  it('should render all components', () => {
    render(<Register />);

    expect(screen.getByText('RegisterForm')).toBeInTheDocument();
  });
});
