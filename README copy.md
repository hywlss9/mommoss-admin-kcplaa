# mommoss-admin-kcplaa

맘모스 노무사회 관리자 페이지

&nbsp;

# 디렉토리 구조

- public
  - sampleExcel
    > 구성원 등록 예시 파일(xlsx, csv)
- src
  - api
    > api call 함수들
  - assets
    > 이미지, 아이콘 등 정적 파일들
  - components
    > 컴포넌트들
  - constants
    > color type, path 등 상수들
  - hooks
    > custom hooks들
  - pages
    > 화면을 구성하는 page들
  - reduce
    > redux 코드들
  - types
    > response model, util type 등 type들
  - utils
    > localStorage, logout, model event 등 자주 쓰는 코드들

&nbsp;

# 주요 모듈

- [ablestor-survey](https://github.com/Ablestor/ablestor-survey)
- [antd](https://ant.design/components/overview)
- [immutability-helper](https://github.com/kolodny/immutability-helper)
- [react-query](https://github.com/amplitude/redux-query)
- [react-router-dom](https://github.com/remix-run/react-router)
- [redux](https://github.com/reduxjs/redux)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [styled-component](https://github.com/styled-components/styled-components)

&nbsp;

# import convention

1. src 및 src 바로 하위 디렉토리들은 import 시 **[@]** 를 앞에 붙여 import할 것

```typescript
import login from "@api/auth/login";
import Button from "@components/Button";
import src from "@src";
```

&nbsp;  
2. 같은 디렉토리 레벨의 styled component, type은 **[\* as ~]** 로 import할 것

> 해당 디렉토리에서만 쓰는 걸 알기 쉽게 할 수 있을 것이라 예상

```typescript
import * as S from "./style";
import type * as T from "./type";
import type { GET } from "@type/utile";

<S.Container />;
const props: T.Props = {};
```

&nbsp;

# 페이지 목록

## 사업장 관리

- 사업장 정보
- 구성원
- 조직도
- 직위/권한
- 관리자설정

&nbsp;

## 주소록 관리

- 회원 관리
- 회원 그룹 관리

&nbsp;

## 서비스 관리

- 알림메시지
- 공지
- 설문
- 동영상게시판
- 경조사
