export type Translate = (key: string) => string;

export type ToggleOption<T extends string> = Readonly<{
    value: T;
    label: string;
}>;
