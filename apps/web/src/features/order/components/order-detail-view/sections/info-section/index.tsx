import React from 'react';

import type { InfoListItem } from '../types';

interface InfoSectionProps {
    title: string;
    infoList: InfoListItem[];
}

export const InfoSection = ({ title, infoList }: InfoSectionProps) => {
    return (
        <section style={{ marginTop: '40px' }}>
            <h3
                style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #111',
                }}
            >
                {title}
            </h3>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    padding: '0 8px',
                }}
            >
                {infoList.map((info, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            fontSize: '14px',
                            lineHeight: '20px',
                        }}
                    >
                        <div
                            style={{
                                width: '120px',
                                color: '#666',
                                flexShrink: 0,
                            }}
                        >
                            {info.label}
                        </div>
                        <div
                            style={{
                                color: '#111',
                                flex: 1,
                                wordBreak: 'break-all',
                            }}
                        >
                            {info.content || '-'}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

