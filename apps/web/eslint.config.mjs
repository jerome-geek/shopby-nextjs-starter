import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
    ]),
    {
        files: ['**/src/components/layout/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': 'off',
        },
    },
    {
        files: ['**/src/**/*.{ts,tsx}'],
        ignores: ['**/src/components/layout/**/*.{ts,tsx}'],
        rules: {
            // CDN 이미지 사용 시 next/image 불필요
            '@next/next/no-img-element': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@/components/layout/*'],
                            message: 'Please import from "@/components/layout" barrel instead of deep sub-folders for better consistency and performance.',
                        },
                    ],
                },
            ],
        },
    },
]);

export default eslintConfig;
