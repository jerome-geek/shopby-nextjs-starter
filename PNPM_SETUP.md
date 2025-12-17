# pnpm 전환 가이드

## pnpm 설치

```bash
# npm을 통해 전역 설치
npm install -g pnpm

# 또는 Homebrew (macOS)
brew install pnpm

# 설치 확인
pnpm --version
```

## 의존성 설치

```bash
# 기존 node_modules 제거 (선택사항)
rm -rf node_modules

# pnpm으로 의존성 설치
pnpm install
```

## 사용 방법

pnpm은 npm과 거의 동일한 명령어를 사용합니다:

```bash
# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 실행
pnpm start

# 패키지 설치
pnpm add <package-name>
pnpm add -D <package-name>  # devDependencies

# 패키지 제거
pnpm remove <package-name>

# 의존성 업데이트
pnpm update
```

## 주요 차이점

### npm vs pnpm

| 명령어 | npm | pnpm |
|--------|-----|------|
| 설치 | `npm install` | `pnpm install` |
| 추가 | `npm install <pkg>` | `pnpm add <pkg>` |
| 제거 | `npm uninstall <pkg>` | `pnpm remove <pkg>` |
| 실행 | `npm run <script>` | `pnpm <script>` |

### 장점

- ✅ **빠른 설치 속도**: npm보다 2-3배 빠름
- ✅ **디스크 공간 절약**: 하드링크로 50-70% 절약
- ✅ **엄격한 의존성 관리**: phantom dependencies 방지
- ✅ **모노레포 지원**: 워크스페이스 우수

## CI/CD 설정

GitHub Actions 예시:

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8

- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: 20
    cache: 'pnpm'

- name: Install dependencies
  run: pnpm install
```

## 문제 해결

### 호환성 문제 발생 시

`.npmrc` 파일에서 설정 조정:
```ini
# 호환성 모드 (npm과 유사한 구조)
node-linker=hoisted

# 엄격한 피어 의존성 체크 비활성화
strict-peer-dependencies=false
```

### 기존 npm 프로젝트와 혼용

- `package-lock.json`은 `.gitignore`에 추가됨
- `pnpm-lock.yaml`은 커밋합니다
- 팀원은 모두 pnpm 사용 권장

