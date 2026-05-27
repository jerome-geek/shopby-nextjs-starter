import dayjs from 'dayjs';
import Link from 'next/link';

import { OrderOptionsItem } from '@/components/mypage/orders/order-options-item';
import * as styles from '@/components/mypage/orders/order-options.css';
import { PATHS } from '@/const/paths';
import type { MemberClaim } from '@/models/claim';
import type { OrderItems } from '@/models/order/myOrder';

interface OrderOptionsProps {
    optionItems: OrderItems[] | MemberClaim[];
}

export const OrderOptions = ({ optionItems }: OrderOptionsProps) => {
    const isOrderItems = optionItems.every(
        (option) => 'orderOptions' in option,
    );

    const itemList = (option: OrderItems | MemberClaim) => {
        if (isOrderItems) {
            return (option as OrderItems).orderOptions;
        }

        return (option as MemberClaim).claimedOptions;
    };

    return (
        <ul className={styles.orderList}>
            {optionItems.map((options) => {
                return (
                    <li key={options.orderNo} className={styles.orderListItem}>
                        <div className={styles.orderTitleContainer}>
                            <Link
                                href={PATHS.MYPAGE.ORDERS.DETAIL.replace(
                                    '[orderNo]',
                                    options.orderNo,
                                )}
                                className={styles.orderNoLink}
                                prefetch={false}
                            >
                                {options.orderNo}
                            </Link>

                            <span className={styles.orderDate}>
                                {dayjs(options.orderYmdt).format('YYYY.MM.DD')}
                            </span>
                        </div>

                        <ul className={styles.orderOptionList}>
                            {itemList(options).map((option) => {
                                return (
                                    <li key={option.orderOptionNo}>
                                        <OrderOptionsItem
                                            {...option}
                                            inputs={option.inputs}
                                            orderNo={options.orderNo}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
};
