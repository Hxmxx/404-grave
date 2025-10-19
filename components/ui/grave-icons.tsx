import React from 'react';

// 묘지 테마 아이콘 컴포넌트들

interface IconProps {
  className?: string;
  size?: number;
}

export function TombstoneIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2C8.5 2 6 4.5 6 8v12h12V8c0-3.5-2.5-6-6-6z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M10 6h4v2h-4V6z"
        fill="currentColor"
      />
      <path
        d="M9 10h6v1H9v-1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CoffinIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M4 8h16l-2 12H6L4 8z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M6 6h12v2H6V6z"
        fill="currentColor"
      />
      <path
        d="M8 4h8v2H8V4z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PhoenixIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 8l2 4h4l-3 2 1 3-4-2-4 2 1-3-3-2h4l2-4z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

export function SkullIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <circle
        cx="12"
        cy="9"
        r="7"
        fill="currentColor"
        opacity="0.8"
      />
      <circle
        cx="9"
        cy="8"
        r="1"
        fill="white"
      />
      <circle
        cx="15"
        cy="8"
        r="1"
        fill="white"
      />
      <path
        d="M8 12h8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 20h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function GhostIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2C8 2 5 5 5 9c0 2 1 4 2 5v6h10v-6c1-1 2-3 2-5 0-4-3-7-7-7z"
        fill="currentColor"
        opacity="0.8"
      />
      <circle
        cx="9"
        cy="8"
        r="1"
        fill="white"
      />
      <circle
        cx="15"
        cy="8"
        r="1"
        fill="white"
      />
      <path
        d="M8 12h8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 18h2v2H7v-2zM15 18h2v2h-2v-2z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

export function CrossIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2v20M2 12h20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function MoonIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  );
}

export function StarIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

// 묘지 상태별 아이콘 매핑
export const GraveStatusIcons = {
  'abandoned': TombstoneIcon,
  'archived': CoffinIcon,
  'adopted': PhoenixIcon,
  'failed': SkullIcon,
  'haunted': GhostIcon,
  'memorial': CrossIcon,
  'night': MoonIcon,
  'star': StarIcon,
} as const;

export type GraveStatus = keyof typeof GraveStatusIcons;
