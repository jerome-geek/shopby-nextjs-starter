# 프론트엔드 네이밍 컨벤션 가이드 (Next.js & React)

해당 문서는 팀 내 일관된 코드 품질 유지와 원활한 협업(특히 대소문자로 인한 Git 충돌 및 배포 에러 방지)을 위해 작성된 공식 코딩 네이밍 컨벤션입니다.

## 1. 폴더 및 파일 네이밍 (File & Folder Naming)

자바스크립트/리액트 생태계가 Next.js(App/Pages Router 구성) 기반으로 넘어오면서 URL 구조와 파일 시스템의 결합도가 매우 높아졌습니다.
이에 따라 macOS 로컬과 리눅스 기반 사내/클라우드 배포 서버(Vercel, AWS 등) 사이의 대소문자 충돌(Case-sensitive 이슈)로 인한 **`Module Not Found`** 에러를 미연에 원천 차단하기 위해 아래 규칙을 적용합니다.

- **기본 규칙**: 프로젝트 내 모든 폴더명과 파일명은 **소문자 케밥 케이스(kebab-case, 하이픈 `-` 연결)**를 사용합니다.
- **적용 대상**: 리액트 컴포넌트(`.tsx`), 훅스(`.ts`), 유틸리티(`.ts`), CSS-in-JS 스타일 파일(`.css.ts`) 등 **모든 파일**
- **컴포넌트 구조**: 컴포넌트는 독립된 폴더로 관리하며, 해당 폴더 내의 **`index.tsx`** 파일이 실제 컴포넌트 역할을 하도록 작성합니다. (예: `components/hero-banner/index.tsx`)

✅ **Good Example:**
```text
src/components/ui/scroll-to-top/index.tsx
src/hooks/use-click-outside.ts
src/utils/date-formatter.ts
```

❌ **Bad Example:**
```text
src/components/ui/ScrollToTop/index.tsx  (X) - 파스칼 케이스
src/hooks/useClickOutside.ts             (X) - 카멜 케이스
```

---

## 2. 내부 코드 컴포넌트/변수 네이밍 (Internal Code Naming)

파일 트리의 이름은 전부 `kebab-case`로 눕히지만, 작성하는 **실제 자바스크립트/타입스크립트 내부 코드**에서는 문법적 표준을 따라야 합니다.

### 컴포넌트명 제한: 파스칼 케이스 (PascalCase)
리액트(JSX)는 컴포넌트명의 첫 글자가 대문자여야만 커스텀 컴포넌트(`<ScrollToTop />`)로 인식하며, 소문자일 경우 표준 HTML 내장 태그(`<button>`, `<header>`)로 해석해버립니다.

- 무조건 **첫 문자를 대문자로 시작하는 PascalCase**를 준수하세요.
- **페이지 컴포넌트**: 일반 컴포넌트와 구분하기 위해 컴포넌트명 뒤에 반드시 **`Page`** 접미사를 붙입니다. (예: `LoginPage`, `EventDetailPage`)

### 일반 변수, 함수, 훅스(Hooks): 카멜 케이스 (camelCase)
- 무조건 변수와 일반 함수형 로직은 `camelCase`를 준수하세요.

### 이벤트 핸들러 네이밍: on{Event} vs handle{Event}
"이벤트가 언제 일어나는지(알림)"와 "그 이벤트를 어떻게 처리하는지(로직)"를 명확히 구분하기 위해 아래 규칙을 권장합니다.

- **`on{Event}` (Props용)**: 컴포넌트 외부에서 받는 이벤트 속성(Props)이나 이벤트를 알리는 용도로 사용합니다.
- **`handle{Event}` (로직용)**: 이벤트를 실제로 처리하는 내부 로직(기능 구현) 함수에 사용합니다.

✅ **Good Example:**
```tsx
const Parent = () => {
  // 실제 로직이 담긴 함수: handle{Event}
  const handleTextAreaClick = () => {
    if (!isLogin) openLoginDialog();
  };

  // 자식에게는 알림용 Prop 이름으로 전달: on{Event}
  return <CommentInput onTextAreaClick={handleTextAreaClick} />;
};

const CommentInput = ({ onTextAreaClick }) => {
  return <textarea onClick={onTextAreaClick} />;
};
```

---

## 3. 요약 및 기대효과 (TL;DR)

1. 폴더 트리에 위치하는 껍데기(파일/폴더 이름)는 **소문자 케밥 케이스(`kebab-case`)**
2. 자바스크립트 런타임에 쓰이는 알맹이(코드 내 컴포넌트명)은 **대문자 파스칼 케이스(`PascalCase`)**

**이 두 가지만 철저하게 분리**하면 모듈을 찾을 수 없다는 배포 단계 에러를 방지하고, shadcn/ui와 같은 대세 오픈소스들의 코드 뼈대를 그대로 붙여 넣을 때도 일관된 구조를 가져갈 수 있습니다.
