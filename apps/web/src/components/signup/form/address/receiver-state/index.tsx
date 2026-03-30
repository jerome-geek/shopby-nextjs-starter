import { find, includes } from '@fxts/core';
import { useEffect } from 'react';
import {
    Controller,
    useController,
    useFormContext,
    useWatch,
} from 'react-hook-form';

import { CANADA_STATE_LIST, STATE_LIST } from '@/const/form';
import { useResponsive } from '@/hooks/utils';
import InputContainer from '@/components/ui/input/InputContainer';
import InputField from '@/components/ui/input/field';
import Select from '@/components/ui/select';
import { ErrorMessage } from '@/components/ui/form';

type ReceiverStateProps =
    | {
          name: 'shippingAddress.receiverState';
          countryCdName: 'shippingAddress.countryCd';
      }
    | {
          name: 'state';
          countryCdName?: 'countryCd';
      }
    | {
          name: 'receiverState';
          countryCdName?: 'countryCd';
      };

const ReceiverState = ({
    name,
    countryCdName = 'countryCd',
}: ReceiverStateProps) => {
    const { isMobile } = useResponsive();

    // NOTE: generic으로 RegisterShippingAddressSchemaType, PaymentReserveSchemaType이 들어올 수 있다.
    const { control, register, resetField } = useFormContext();

    const {
        fieldState: { isDirty: isCountryCdDirty },
    } = useController({ name: countryCdName, control });

    const countryCdWatch = useWatch({
        control,
        name: countryCdName,
    });

    const isStateSelectable = includes(countryCdWatch, ['US', 'CA']);
    const stateList = countryCdWatch === 'US' ? STATE_LIST : CANADA_STATE_LIST;

    useEffect(() => {
        if (!isCountryCdDirty) {
            return;
        }

        resetField(name, { defaultValue: '' });
    }, [isCountryCdDirty, countryCdWatch, name, resetField]);

    return (
        <InputContainer>
            {isStateSelectable ? (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Select
                                isSearchable
                                name={name}
                                placeholder='State / Province / Region'
                                options={stateList}
                                value={
                                    find(
                                        (item) => item.value === value,
                                        stateList,
                                    ) ?? null
                                }
                                getOptionLabel={(option) =>
                                    `${option.label} (${option.value})`
                                }
                                onChange={(selectedOption) => {
                                    if (selectedOption) {
                                        onChange(selectedOption.value);
                                    }
                                }}
                                menuPortalTarget={
                                    isMobile ? document.body : null
                                }
                                menuShouldBlockScroll={isMobile}
                                menuPlacement='auto'
                            />
                        );
                    }}
                />
            ) : (
                <InputField
                    placeholder='State / Province / Region'
                    {...register(name)}
                />
            )}

            <ErrorMessage name={name} />
        </InputContainer>
    );
};

export default ReceiverState;
