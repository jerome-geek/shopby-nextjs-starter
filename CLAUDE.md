## Approach

- Think before acting — read existing files before writing code
- Be concise in output but thorough in reasoning
- Prefer editing over rewriting whole files
- Don't re-read files unless the file may have changed
- Test code before declaring done
- No sycophantic openers or closing fluff
- No over-engineering — keep solutions simple and direct
- If unsure, say so — never guess or invent file paths
- User instructions always override this file

## Efficiency

- Read before writing — understand the problem before coding
- No redundant file reads — read each file once
- One focused coding pass — avoid write-delete-rewrite cycles
- Test once, fix if needed, verify once — no unnecessary iterations
- 50 tool calls maximum

## Language

- Always respond in Korean

## CodeGraph

이 프로젝트는 CodeGraph MCP 서버(`codegraph_*` 도구)를 사용합니다.
처음 클론하거나 대규모 변경 후에는 반드시 인덱스를 초기화하세요:

```bash
codegraph init -i
```

`.codegraph/` 디렉토리는 머신별 로컬 파일이므로 커밋하지 않습니다.

## Project Context

@apps/web/CLAUDE.md
