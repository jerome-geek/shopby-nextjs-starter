import { clsx, type ClassValue } from 'clsx';

// Tailwind CSS 클래스 충돌 해결을 위한 유틸리티
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}
