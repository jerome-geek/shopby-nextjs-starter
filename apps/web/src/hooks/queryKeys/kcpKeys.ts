const kcpKeys = {
    all: ['kcp'] as const,
    certifications: () => [...kcpKeys.all, 'certification'] as const,
    certificationResult: (key: string) =>
        [...kcpKeys.certifications(), 'result', key] as const,
};

export default kcpKeys;
