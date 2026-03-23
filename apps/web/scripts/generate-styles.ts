import fs from 'fs';
import path from 'path';

// 스타일 JSON 경로
const STYLES_JSON_PATH = path.join(__dirname, '../src/styles/styles.json');
const TARGET_TYPOGRAPHY_PATH = path.join(
    __dirname,
    '../src/styles/typography.css.ts',
);

// JSON 파일 읽기
const stylesData = JSON.parse(fs.readFileSync(STYLES_JSON_PATH, 'utf8'));

// 색상 변환 함수
function generateColors(colors: any[]) {
    const colorMap: Record<string, any> = {};

    colors.forEach((color: any) => {
        // 이름 예시: "Gray 90 #1E231F" -> token: "gray-90-1e231f"
        // 혹은 직접 name 파싱
        const nameParts = color.name.split(' ');
        const hex = nameParts[nameParts.length - 1]; // #XXXXXX
        const scale = nameParts.length > 2 ? nameParts[1] : null; // 90, 80 ...
        const colorName = nameParts[0].toLowerCase(); // gray, pink ...

        if (!colorMap[colorName]) {
            colorMap[colorName] = {};
        }

        if (scale) {
            colorMap[colorName][scale] = hex;
        } else {
            colorMap[colorName] = hex;
        }
    });

    // 구조 정리 (단일 색상 vs 스케일)
    const refinedColors: Record<string, any> = {};
    colors.forEach((color: any) => {
        const match = color.name.match(
            /^([a-zA-Z]+)\s*(\d*)\s*(#[0-9a-fA-F]+)$/,
        );
        if (match) {
            const category = match[1].toLowerCase();
            const scale = match[2];
            const hex = match[3];

            if (scale) {
                if (!refinedColors[category]) refinedColors[category] = {};
                if (typeof refinedColors[category] === 'string') {
                    // 이미 문자열로 있다면 객체로 변환하거나 다른 키 사용해야함
                }
                refinedColors[category][scale] = hex;
            } else {
                refinedColors[category] = hex;
            }
        }
    });

    return refinedColors;
}

// 텍스트 스타일 변환 함수
function generateTypography(textStyles: any[]) {
    const typography: Record<string, any> = {};

    textStyles.forEach((style: any) => {
        // name: "Display 1/Semibold"
        const [category, weight] = style.name.split('/');
        const tokenName = category.toLowerCase().replace(/\s+/g, '-'); // display-1

        // 폰트 사이즈
        if (!typography.fontSize) typography.fontSize = {};
        typography.fontSize[tokenName] = style.fontSize;

        // 라인 하이트
        if (!typography.lineHeight) typography.lineHeight = {};
        // 숫자 1.5 등으로 변환하거나 px 값 유지 (여기선 비율로 변환 시도 or raw string)
        typography.lineHeight[tokenName] = String(style.lineHeight); // style.lineHeight is number

        // 폰트 웨이트 (공통 정의)
        if (!typography.fontWeight) typography.fontWeight = {};
        typography.fontWeight[weight.toLowerCase()] = style.fontWeight;
    });

    return typography;
}

// Typography.css.ts 생성
function generateTypographyFileContent(textStyles: any[]) {
    let content = `import { style } from '@vanilla-extract/css';\n\n`;
    content += `export const textStyles = {\n`;

    textStyles.forEach((item: any) => {
        // name: "Display 1/Semibold" -> key: "display1Semibold" or similar
        const key = item.name.replace(/[\s\/]+/g, ''); // Display1Semibold
        const camelKey = key.charAt(0).toLowerCase() + key.slice(1); // display1Semibold

        // Convert px to rem (1rem = 10px)
        const fontSizePx = parseFloat(item.fontSize);
        const fontSizeRem = `${fontSizePx / 10}rem`;

        content += `    ${camelKey}: style({\n`;
        content += `        fontSize: '${fontSizeRem}',\n`;
        content += `        fontWeight: ${item.fontWeight},\n`;
        content += `        lineHeight: '${item.lineHeight}',\n`;
        // letterSpacing might be undefined in some tokens, add check or default
        content += `        letterSpacing: '${item.letterSpacing || 'normal'}',\n`;
        content += `        fontFamily: '${item.fontFamily}',\n`;
        content += `    }),\n`;
    });

    content += `};\n`;
    return content;
}

const typographyFileContent = generateTypographyFileContent(
    stylesData.styles.textStyles,
);

fs.writeFileSync(TARGET_TYPOGRAPHY_PATH, typographyFileContent);
console.log('Typography styles generated at:', TARGET_TYPOGRAPHY_PATH);
