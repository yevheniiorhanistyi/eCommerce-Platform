interface AnnouncementBannerProps {
  label?: string;
  text: string[];
  socials?: boolean;
}

const AnnouncementBanner = ({ label, text }: AnnouncementBannerProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center text-xs sm:text-sm p-4 bg-neutral-950 text-amber-50">
      {label && <span className="font-bold">{label}</span>}
      <div className="flex flex-col">
        {text.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
