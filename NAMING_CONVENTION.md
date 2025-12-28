# 네이밍 컨벤션 (Naming Conventions)

일관성을 유지하고 OS별(macOS/Windows/Linux) 대소문자 처리 차이로 인한 Git 오류를 방지하기 위해 아래 규칙을 따릅니다.

## 1. 폴더 이름: `kebab-case` (소문자 + 하이픈)

모든 디렉토리(폴더) 이름은 **소문자**를 사용하며, 단어 사이는 하이픈(-)으로 연결합니다.

-   **이유:**
    -   **Git 대소문자 민감성:** macOS/Windows에서는 `Auth`와 `auth`를 같은 폴더로 취급하지만, 리눅스(CI/CD 환경)에서는 다르게 취급하여 빌드 오류가 발생할 수 있습니다.
    -   **Next.js 일관성:** Next.js App Router(`src/app`)의 라우팅 규칙과 통일감을 줍니다.

**예시:**

-   ✅ `src/components/auth`
-   ✅ `src/components/product-list`
-   ❌ `src/components/Auth`
-   ❌ `src/components/ProductList`

## 2. 컴포넌트 파일: `PascalCase` (대문자 시작)

React 컴포넌트 파일은 반드시 **대문자**로 시작해야 합니다.

-   **이유:**
    -   **React 표준:** React 컴포넌트는 대문자로 시작하는 것이 원칙이며, 파일명과 컴포넌트명을 일치시킵니다.
    -   **시각적 구분:** 탐색기에서 일반 유틸리티 파일이나 폴더와 쉽게 구분할 수 있습니다.

**예시:**

-   ✅ `MemberJoinField.tsx`
-   ✅ `LoginForm.tsx`
-   ❌ `memberJoinField.tsx`
-   ❌ `loginForm.tsx`

## 3. 기타 파일 (유틸, 훅 등): `camelCase` 또는 `kebab-case`

유틸리티 함수, 훅, 설정 파일 등은 종류에 따라 `camelCase`나 `kebab-case`를 사용합니다.

-   **Hooks:** `useAuth.ts` (camelCase 사용, `use` 접두어 필수)
-   **Utils:** `dateUtils.ts` 또는 `format-date.ts`

---

### 폴더 구조 예시

```
src/
  components/
    auth/               # 📂 분류는 소문자 폴더
      ├── LoginForm.tsx      # 📄 컴포넌트는 대문자 파일
      └── MemberJoinField.tsx
    ui/
      ├── Button.tsx
      └── Input.tsx
```
