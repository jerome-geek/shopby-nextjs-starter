import { Search } from 'lucide-react';
import { Control, Controller, UseFormRegister } from 'react-hook-form';

import * as styles from '@/components/board/search-form/index.css';
import { Button } from '@/shared/ui/button';
import { InputField, InputFieldContainer, Select } from '@/shared/ui/input';
import { BOARD_SEARCH_TYPE } from '@/const/board';

export type SearchFormValues = {
    searchType: string;
    keyword: string;
};

type BoardSearchFormProps = {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    control: Control<SearchFormValues>;
    register: UseFormRegister<SearchFormValues>;
};

export const BoardSearchForm = ({
    onSubmit,
    control,
    register,
}: BoardSearchFormProps) => (
    <form className={styles.searchForm} onSubmit={onSubmit}>
        <Controller
            control={control}
            name='searchType'
            render={({ field }) => (
                <Select
                    {...field}
                    classNames={{
                        container: () => styles.searchTypeSelect,
                        control: () => styles.searchSelectControl,
                    }}
                    options={BOARD_SEARCH_TYPE}
                    value={
                        BOARD_SEARCH_TYPE.find(
                            (option) => option.value === field.value,
                        ) ?? BOARD_SEARCH_TYPE[0]
                    }
                    onChange={(option) => field.onChange(option?.value)}
                />
            )}
        />

        <InputFieldContainer className={styles.searchInputWrapper}>
            <InputField {...register('keyword')} />
        </InputFieldContainer>

        <Button
            frame='outlined'
            type='submit'
            className={styles.searchSubmitButton}
        >
            <Search color='#656966' strokeWidth={1.5} size={20} />
        </Button>
    </form>
);
