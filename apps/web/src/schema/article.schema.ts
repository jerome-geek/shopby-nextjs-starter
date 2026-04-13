import { z } from 'zod';

export const articleWriteSchema = ({
    isLogin,
    isTermRequired,
    isCategoryRequired,
}: {
    isLogin: boolean;
    isTermRequired: boolean;
    isCategoryRequired: boolean;
}) => {
    return z
        .object({
            /** 작성자 이름 - 비회원은 값 입력, 회원은 회원정보 */
            writerName: z.string(),
            /** 비회원용 비밀번호 */
            password: z.string().optional(),
            /** 게시판 카테고리 번호 */
            boardCategoryNo: z.number().optional(),
            /** 게시글 제목 */
            articleTitle: z.string().min(1, '제목을 입력해 주세요.'),
            /** 게시글 내용 */
            articleContent: z.string().min(1, '내용을 입력해 주세요.'),
            /** 첨부 이미지 */
            images: z.array(z.union([z.file(), z.string()])).optional(),
            /** 대표 이미지 */
            thumbnailUrl: z.union([z.file(), z.string()]).optional(),
            /** 비밀글 여부 */
            secreted: z.boolean(),
            /** 비회원 개인정보 수집 및 이용에 동의 */
            agreeTerm: z.boolean(),
        })
        .superRefine((value, context) => {
            if (!isLogin && !value.writerName) {
                context.addIssue({
                    code: 'custom',
                    path: ['writerName'],
                    message: '작성자를 입력해 주세요.',
                });
            }

            if (!isLogin && !value.password) {
                context.addIssue({
                    code: 'custom',
                    path: ['password'],
                    message: '비밀번호를 입력해 주세요.',
                });
            }

            if (!isLogin && value.password && value.password.length < 4) {
                context.addIssue({
                    code: 'custom',
                    path: ['password'],
                    message: '비밀번호는 4자 이상 입력해 주세요.',
                });
            }

            if (isCategoryRequired && !value.boardCategoryNo) {
                context.addIssue({
                    code: 'custom',
                    path: ['boardCategoryNo'],
                    message: '카테고리를 선택해 주세요.',
                });
            }

            if (isTermRequired && !value.agreeTerm) {
                context.addIssue({
                    code: 'custom',
                    path: ['agreeTerm'],
                    message: '개인정보 수집 및 이용에 동의해 주세요.',
                });
            }
        });
};

export type ArticleWriteSchemaType = z.infer<
    ReturnType<typeof articleWriteSchema>
>;
