import { Link } from 'react-router';

type RecentRowProps = {
    title: string;
    subtitle: string;
    to: string;
    isLast?: boolean;
};

export const RecentRow = ({ title, subtitle, to, isLast }: RecentRowProps) => {
    return (
        <Link
            to={to}
            className={`group -mx-2 block rounded-lg px-2 transition-colors hover:bg-[#fafafa] dark:hover:bg-white/5 ${
                isLast ? '' : 'border-b border-[#f3f4f6] dark:border-gray-800'
            }`}
        >
            <div className='flex items-center justify-between py-4'>
                <div className='flex min-w-0 flex-1 flex-col gap-0.5 pr-3'>
                    <span className='truncate text-sm font-medium leading-5 text-[#101828] transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400'>
                        {title}
                    </span>
                    <span className='truncate text-xs font-normal leading-4 text-[#6a7282] dark:text-gray-400'>
                        {subtitle}
                    </span>
                </div>
            </div>
        </Link>
    );
};
