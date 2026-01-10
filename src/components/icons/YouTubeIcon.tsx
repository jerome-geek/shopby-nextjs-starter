export function YouTubeIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="2" y="7" width="20" height="10" rx="2" strokeWidth="2" />
            <path
                d="M10 12l4-2v4l-4-2z"
                fill="currentColor"
                stroke="none"
            />
        </svg>
    );
}

