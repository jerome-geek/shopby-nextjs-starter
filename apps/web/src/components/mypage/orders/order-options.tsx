import dayjs from 'dayjs';
import Link from 'next/link';

import * as styles from '@/components/mypage/orders/order-options.css';
import { OrderOptionsItem } from './order-options-item';
import { PATHS } from '@/const/paths';
import { OrderItems } from '@/models/order/myOrder';
import { MemberClaim } from '@/models/claim';

export const OrderOptions = ({
    optionItems,
}: {
    optionItems: OrderItems[] | MemberClaim[];
}) => {
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
            {optionItems.map((options) => (
                <li key={options.orderNo} className={styles.orderListItem}>
                    <div className={styles.orderTitleContainer}>
                        <Link
                            href={PATHS.MYPAGE.ORDERS.DETAIL.replace(
                                '[orderNo]',
                                options.orderNo,
                            )}
                            className={styles.orderNoLink}
                        >
                            {options.orderNo}
                        </Link>

                        <span className={styles.orderDate}>
                            {dayjs(options.orderYmdt).format('YYYY.MM.DD')}
                        </span>
                    </div>

                    <ul className={styles.orderOptionList}>
                        {itemList(options).map((option) => (
                            <OrderOptionsItem
                                key={option.orderOptionNo}
                                {...option}
                                inputs={option.inputs}
                                orderNo={options.orderNo}
                            />
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};
