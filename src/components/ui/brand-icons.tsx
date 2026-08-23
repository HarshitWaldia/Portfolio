import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const Github = ({ size = 20, className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Linkedin = ({ size = 20, className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Twitter = ({ size = 20, className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export const OracleIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path
      d="M16.4 5H7.6C3.4 5 0 8.4 0 12.6s3.4 7.6 7.6 7.6h8.8c4.2 0 7.6-3.4 7.6-7.6S20.6 5 16.4 5zm-.2 11.6H7.8c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2h8.4c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2z"
      fill="#F80000"
    />
  </svg>
);

export const MicrosoftIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M2 2h9.5v9.5H2z" fill="#F25022" />
    <path d="M12.5 2H22v9.5h-9.5z" fill="#7FBA00" />
    <path d="M2 12.5h9.5V22H2z" fill="#00A4EF" />
    <path d="M12.5 12.5H22V22h-9.5z" fill="#FFB900" />
  </svg>
);

export const AzureIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M13.05 3.32L5.85 16.63h5.27L17.7 3.32h-4.65zm2.84 5.38L8.6 20.68h6.29l5.06-8.73-4.06-3.25z" fill="#0078D4" />
  </svg>
);

export const AwsIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M8.27 10.42c-.08-.48-.26-.84-.54-1.09-.28-.24-.68-.37-1.19-.37-.41 0-.77.08-1.07.25-.3.17-.5.4-.6.7l-.87-.33c.18-.51.5-.9 1-1.18.49-.28 1.05-.42 1.68-.42.81 0 1.45.21 1.93.63.48.42.74 1.01.78 1.77v3.29c0 .48.06.91.17 1.28.12.37.28.66.5.87h-1.09c-.1-.13-.19-.32-.26-.58-.07-.26-.11-.53-.13-.81-.29.49-.66.86-1.1 1.11-.45.25-.97.37-1.57.37-.73 0-1.32-.21-1.78-.63-.45-.42-.68-1-.68-1.73 0-.82.27-1.44.81-1.87.54-.43 1.34-.67 2.4-.73l1.83-.11v-.43zm-1.07 3.51c.42 0 .8-.1 1.14-.3.34-.2.57-.51.68-.92v-1.1l-1.57.1c-.8.05-1.37.2-1.72.45-.35.25-.52.62-.52 1.1 0 .43.13.75.4.96.27.21.69.31 1.25.31h.34z" fill="#FF9900" />
    <path d="M12.92 14.86l-.88-4.32h1.17l.54 2.89c.14.73.23 1.29.28 1.68.08-.43.19-.99.34-1.68l.68-2.89h1.09l.65 2.87c.14.67.24 1.24.31 1.7.07-.46.17-1.03.31-1.7l.59-2.87h1.12l-.93 4.32h-1.1l-.64-2.84c-.13-.59-.22-1.12-.27-1.61-.06.49-.15 1.02-.27 1.61l-.67 2.84h-1.15z" fill="#FF9900" />
    <path d="M21.73 13.91c-.24.37-.58.64-1 .82-.43.18-.94.27-1.54.27-.79 0-1.42-.19-1.9-.56-.48-.37-.75-.92-.81-1.65l1.09-.12c.05.47.21.82.48 1.05.27.23.67.34 1.19.34.4 0 .73-.06.99-.18.26-.12.44-.29.54-.51.1-.22.1-.47 0-.74-.09-.27-.29-.5-.59-.69-.3-.19-.74-.38-1.32-.57-.79-.26-1.36-.55-1.7-.87-.34-.32-.51-.76-.51-1.32 0-.67.23-1.19.7-1.57.47-.38 1.11-.57 1.92-.57.7 0 1.28.16 1.73.47.46.31.72.76.78 1.34l-1.08.13c-.05-.36-.18-.62-.4-.79-.22-.17-.55-.26-1-.26-.39 0-.69.06-.92.17-.23.11-.38.26-.46.44-.08.18-.08.37 0 .57.08.2.24.37.49.52.25.15.65.31 1.2.49.8.26 1.39.56 1.76.9.37.34.56.8.56 1.38 0 .42-.1.8-.3 1.15z" fill="#FF9900" />
    <path d="M4.09 17.52c4.89 3.01 11.83 2.65 15.99-.54.34-.26.85.04.53.47-4.47 5.09-12.78 4.69-17.06.67-.38-.36.08-.85.54-.6z" fill="#FF9900" />
    <path d="M20.73 16.35c.42.49 1.18 1.38 1.5 1.78.2.25.04.5-.26.43-1.18-.3-2.73-.67-3.95-.97-.47-.12-.34-.52.12-.49 1.24.08 2.21-.49 2.59-.75z" fill="#FF9900" />
  </svg>
);

export const GoogleIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export const GoogleCloudIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4" />
    <path d="M19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.61.1 2.78 1.49 2.78 3.1 0 1.73-1.41 2.86-3 2.86z" fill="#ffffff" fillOpacity="0.3" />
  </svg>
);

export const IbmIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M2 5h4v1.5H2zm0 3h4v1.5H2zm0 3h4v1.5H2zm0 3h4v1.5H2zm0 3h4v1.5H2zM8 5h4.5v1.5H8zm0 3h4.5v1.5H8zm0 3h4.5v1.5H8zm0 3h4.5v1.5H8zm0 3h4.5v1.5H8zM14.5 5H22v1.5h-7.5zm0 3H22v1.5h-7.5zm0 3H22v1.5h-7.5zm0 3H22v1.5h-7.5zm0 3H22v1.5h-7.5z" fill="#0F62FE" />
  </svg>
);

export const CourseraIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.2 14.5c-3.1 0-5.2-2.1-5.2-5.2s2.1-5.2 5.2-5.2c1.7 0 3 .6 3.9 1.6l-1.5 1.5c-.6-.7-1.4-1.1-2.4-1.1-1.8 0-3 1.4-3 3.2s1.2 3.2 3 3.2c1 0 1.8-.4 2.4-1.1l1.5 1.5c-.9 1-2.2 1.6-3.9 1.6z" fill="#0056D2" />
  </svg>
);

export const CredlyIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="12" cy="12" r="10" fill="#FF6B00" />
    <path d="M8 12l3 3 5-5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GoogleDriveIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
    <path d="M8.01 3.5h7.98l7.01 12-3.99 7-11-19z" fill="#FFBA00" />
    <path d="M1.02 15.5l3.99-7 7.98 14H5.01l-3.99-7z" fill="#0066DA" />
    <path d="M5.01 22.5h15.98l3.99-7H8.99l-3.98 7z" fill="#00AC47" />
  </svg>
);

export const LinuxIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
    <path d="M12 2c-2.4 0-4 1.8-4 4.2v4.1C6.8 11.2 6 13 6 15.1c0 2.2.9 3.9 2.5 4.6-.3.6-.5 1.3-.5 1.8 0 .8 1.1 1.5 3.5 1.5h1c2.4 0 3.5-.7 3.5-1.5 0-.5-.2-1.2-.5-1.8 1.6-.7 2.5-2.4 2.5-4.6 0-2.1-.8-3.9-2-4.8V6.2C16 3.8 14.4 2 12 2z" fill="#FCC624" />
    <circle cx="10" cy="6.5" r="1" fill="#000" />
    <circle cx="14" cy="6.5" r="1" fill="#000" />
    <path d="M10.5 8.5c.5.5 2.5.5 3 0" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const RoboticsIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="3" y="11" width="18" height="10" rx="2" stroke="#00979D" />
    <circle cx="12" cy="5" r="2" stroke="#00979D" />
    <path d="M12 7v4" stroke="#00979D" />
    <line x1="8" y1="16" x2="8" y2="16.01" stroke="#00979D" />
    <line x1="16" y1="16" x2="16" y2="16.01" stroke="#00979D" />
  </svg>
);
