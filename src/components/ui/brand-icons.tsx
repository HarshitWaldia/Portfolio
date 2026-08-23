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
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"
      fill="#FF9900"
    />
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
