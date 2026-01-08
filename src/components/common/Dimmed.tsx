'use client';

import { motion } from 'motion/react';
import { HTMLMotionProps } from 'motion/react';

import { css } from '@/styled-system/css';

const Dimmed = ({ ...props }: HTMLMotionProps<'div'>) => {
    return (
        <motion.div
            key={'dimmed'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{
                type: 'keyframes',
                duration: 0.3,
                ease: 'easeInOut',
            }}
            className={css({
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                zIndex: 20,
            })}
            {...props}
        />
    );
};

export default Dimmed;
