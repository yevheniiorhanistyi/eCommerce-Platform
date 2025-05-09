import { render, screen } from '@testing-library/react';
import { SOCIAL_LOGOS } from '@/constants/constants';
import AnnouncementBanner from '@/components/AnnouncementBanner/AnnouncementBanner';

jest.mock('@/constants/constants', () => ({
  SOCIAL_LOGOS: ['facebook.png', 'twitter.png', 'instagram.png']
}));

describe('AnnouncementBanner', () => {
  it('renders the text and label correctly', () => {
    const label = 'Seasonal Sale';
    const text = ['Up to 50% off!', 'Hurry, limited time offer!'];

    render(<AnnouncementBanner label={label} text={text} socials={false} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    text.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
  });

  it('renders social icons when socials is true', () => {
    const label = 'Follow Us';
    const text = ['Stay connected with us on social media!'];

    render(<AnnouncementBanner label={label} text={text} socials={true} />);

    SOCIAL_LOGOS.forEach((logo) => {
      expect(screen.getByAltText(logo.replace('.png', ''))).toBeInTheDocument();
    });
  });

  it('does not render social icons when socials is false', () => {
    const label = 'Join us';
    const text = ['Find out more about our products'];

    render(<AnnouncementBanner label={label} text={text} socials={false} />);

    SOCIAL_LOGOS.forEach((logo) => {
      expect(screen.queryByAltText(logo.replace('.png', ''))).toBeNull();
    });
  });
});
