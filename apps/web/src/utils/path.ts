import { PATH_TITLE } from '@/const/pathTitle';

export function getPathTitle(pathname: string) {
    const title = PATH_TITLE.find((item) => item.pathname === pathname)?.title;

    return title || '';
}
