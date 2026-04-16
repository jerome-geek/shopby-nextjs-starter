# React Query: Mutation & Data Synchronization Strategy

뮤테이션(CUD) 발생 시 데이터의 정합성을 유지하고, 비동기 실행 순서를 보장하기 위한 전략을 정리합니다.

## 1. 도메인 단위 뮤테이션 훅 및 중앙 집중형 무효화

우리 프로젝트는 각 도메인별로 커스텀 뮤테이션 훅(`useRecipeMutation`, `useCollectionMutation` 등)을 만들어 사용하며, **쿼리 무효화 로직은 반드시 훅 내부에서 처리**하는 것을 컨벤션으로 합니다.

### ✅ 도메인 뮤테이션 훅 구조 예시
```typescript
const useRecipeMutation = () => {
    const queryClient = useQueryClient();

    // 1. 성공 시 공통으로 실행할 무효화 로직을 내부에 정의
    const onMutationSuccess = () => {
        return queryClient.invalidateQueries({ 
            queryKey: recipeKeys.all 
        });
    };

    return {
        likeRecipe: useMutation({
            mutationFn: recipe.likeRecipe,
            onSuccess: onMutationSuccess, // 2. 각 뮤테이션에 적용
        }),
    };
};
```

### 💡 왜 이렇게 하나요?
- **관심사 분리**: 컴포넌트는 "어떤 데이터를 바꿔야 하는지"만 신경 쓰고, "어떤 쿼리 캐시를 날려야 하는지"는 훅이 책임집니다.
- **유지보수 용이성**: 특정 도메인의 데이터 구조가 바뀌어 무효화해야 할 키가 늘어나더라도, 훅 내부의 `onMutationSuccess` 한 곳만 수정하면 전체 프로젝트에 반영됩니다.
- **일관성**: 여러 컴포넌트에서 같은 뮤테이션을 사용할 때 무효화 로직을 빠뜨리는 실수를 방지합니다.

---

## 2. Mutation onSuccess: Promise 반환의 중요성

뮤테이션 성공 후 관련 쿼리를 무효화(`invalidateQueries`)할 때, 반드시 그 결과를 **return**해야 합니다.

### ❌ 잘못된 예 (안티 패턴)
```typescript
const onMutationSuccess = () => {
    // 무효화 작업이 백그라운드에서 돌고, 함수는 즉시 종료됨
    queryClient.invalidateQueries({ queryKey: ['data'] });
};
```

### ✅ 올바른 예
```typescript
const onMutationSuccess = () => {
    // Promise를 반환하여 호출자가 무효화 완료 시점을 알 수 있게 함
    return queryClient.invalidateQueries({ queryKey: ['data'] });
};
```

### 💡 왜 중요한가요?
`mutateAsync`와 `await`를 사용할 때, `onSuccess`가 Promise를 반환해야만 **무효화가 완전히 끝난 뒤에 다음 로직(예: 페이지 이동)이 실행**됩니다.
`return`이 없으면 무효화가 진행 중인 상태에서 페이지가 이동되어, 이동한 페이지에서 여전히 **과거 데이터(Stale Data)**를 보게 되는 레이스 컨디션(Race Condition)이 발생합니다.

---

## 2. 전역 설정: refetchOnMount의 역할

데이터의 실시간 정합성을 위해 `QueryClient` 설정에서 `refetchOnMount: true`는 필수적입니다.

### 설정 방법 (`_app.tsx`)
```typescript
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: true, // 기본값이며, 명시적으로 true 유지 권장
            staleTime: 1000 * 60 * 5, // 데이터가 상해도(stale), 마운트 시에는 다시 가져옴
        },
    },
});
```

### 💡 왜 true여야 하나요?
1.  **SPA 네비게이션 동기화**: `invalidateQueries`는 현재 화면에 없는(inactive) 쿼리를 즉시 리페칭하지 않고 `stale` 상태로 표시만 합니다.
2.  **마운트 시 자동 갱신**: 사용자가 목록 페이지로 이동(Mount)할 때, `refetchOnMount: true`여야만 React Query가 "어? 데이터가 상했네(stale)"를 감지하고 즉시 서버에서 최신 데이터를 가져옵니다.
    - 만약 `false`라면, `staleTime`이 남아있을 경우 상한 데이터를 그대로 보여주게 됩니다.

---

## 3. 베스트 프랙티스: 삭제 후 이동 시나리오

```typescript
// 1. Hook 정의
const onMutationSuccess = () => {
    return queryClient.invalidateQueries({ queryKey: ['list'] });
};

// 2. 컴포넌트 사용
const handleDelete = async () => {
    // 무효화가 끝날 때까지 여기서 await 함
    await deleteMutateAsync(id); 

    // 무효화가 완료된 것을 보장받은 후 안전하게 이동
    router.replace('/list'); 
};
```

이 패턴을 준수함으로써 데이터 레이스 컨디션을 방지하고 사용자에게 항상 최신화된 UI를 제공할 수 있습니다.

---

## 4. mutate vs mutateAsync 선택 기준

상황에 따라 적절한 호출 방식을 선택하여 코드의 복잡도를 낮춥니다.

| 구분 | `mutate` | `mutateAsync` |
| :--- | :--- | :--- |
| **동작 방식** | 호출 후 즉시 반환 (Fire & Forget) | Promise 반환 (비동기 완료 대기 가능) |
| **에러 처리** | 훅 내부 `onError`에 집중 | `try/catch`를 통한 컴포넌트 내 에러 처리 |
| **주요 용도** | 단순 UI 상태 변경 (좋아요, 장바구니 등) | **실행 순서가 중요한 경우 (삭제 후 이동 등)** |

### ✅ mutate 사용 권장 (Clean Code)
별도의 순서 제어가 필요 없다면 `mutate`가 코드를 훨씬 깔끔하게 유지해 줍니다. 에러 핸들링이나 로딩 처리를 뮤테이션 훅 한 곳에서 관리하기 쉽기 때문입니다.

### ✅ mutateAsync 사용 권장 (Control Flow)
뮤테이션과 후속 작업(무효화 포함)이 완전히 끝난 뒤에만 특정 코드(페이지 이동, 스크롤 이동 등)가 실행되어야 한다면 `mutateAsync`를 사용합니다.
