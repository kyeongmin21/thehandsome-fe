## 🚀 실행 방법
```bash
npm install
nvm use 18
npm run dev
npm run serve
```


<br/>
<br/>



## 🛠️ 기술 스택
- **React**: v15
- **Next.js**: v19
- **Next-auth**: v4
- **Typescript**: v5
- **Tailwind CSS**: v4
- **tanstack/react-query**: v5


<br/>
<br/>


## 📦 사용된 라이브러리
- **zustand**: 상태관리 라이브러리
- **clsx**: 조건부 클래스 이름을 깔끔하게 조합해주는 헬퍼
- **zod**: 스키마 유효성 검사 라이브러리
- **react-icons**: 아이콘 https://react-icons.github.io/react-icons/
- **react-hook-form**: 폼 관리 라이브러리
- **@headlessui/react**: Tailwind Labs 제작. 접근성을 고려한 UI 컴포넌트 라이브러리 : https://react-icons.github.io/react-icons/
- **@heroicons/react**: Tailwind CSS 팀이 만든 공식 SVG 아이콘 세트
- **@hookform/resolvers**: react-hook-form과 zod를 연결해주는 중간 모듈


<br/>
<br/>


## 📂 프론트 폴더 구조

- `/app` - Next.js의 라우트 기반 폴더
- `/components` - 공통 컴포넌트 모음
- `/config` - 환경별 설정: 핵심 구성 파일 보관
- `/constants` - 변하지 않는 상수(고정값)
- `/hooks` - 커스텀 훅
- `/utles` - 범용 유틸리티 함수
- `/styles` - CSS 스타일링
- `/types` - TypeScript 타입 정의 모음
- `/utils` - 검증, API 공통 처리 등 범용 유틸리티 함수


<br/>
<br/>


## 🔑 인증 및 토큰 관리 (Next-auth 기반)
-  `/src/app/api/auth/[...nextauth]/route.ts`: **로그인 및 세션 처리를 담당하는 핵심 서버 파일**입니다. 백엔드와 통신하여 JWT 토큰을 받아 세션을 구성합니다.
* **JWT 토큰 관리:**
    * **Access Token:** 로그인 성공 시 백엔드로부터 받은 $\text{Access Token}$은 $\text{Next-auth}$에 의해 **$\text{JWT}$ 세션 쿠키** 내부에 암호화되어 저장됩니다.
    * **Refresh Token:** 로그인 성공 응답 **Body에 포함**되어 클라이언트에서 직접 저장 및 관리합니다.


<br/>
<br/>


## middleware
- /app 과 나란한 위치에 middleware.ts 파일 생성
- 토큰의 존재 유무에 따라 /mypage 경로 및 하위 경로의 접근을 제어하는 역할만 수행


<br/>
<br/>


## 📂 백엔드 FastApi
- **실행 명령어:** `uvicorn app.main:app --reload --port 7000`
- **간편 명령어:** `npm run serve` 스크립트를 통해 실행 가능
- **FastAPI 인스턴스:** `app/main.py` 파일에서 `app = FastAPI()` 인스턴스를 생성합니다.
- **라우터 통합 (핵심):** `app/api/v1/router.py` 파일이 `products`, `boards` 등의 **모든 개별 라우터**를 한데 모아 `api_router`로 통합합니다.
- **앱 연결:** `main.py`는 이 **`api_router`**를 최종적으로 `app` 인스턴스에 포함시켜 모든 엔드포인트(`products`, `boards` 등)가 유효하게 작동하도록 합니다.
``` 
- app/
  ├─ api/           ← HTTP 요청 처리 (Router 정의) 클라이언트 요청을 받고 응답 반환
  ├─ crud/          ← DB 접근 코드 (CRUD). SQLAlchemy 쿼리 실행
  ├─ dependencies/  ← 공통 로직 또는 세션 관리 등 의존성 주입 함수 정의
  ├─ models/        ← DB 테이블 정의 (SQLAlchemy ORM모델)
  ├─ schemas/       ← 데이터 유효성 검사 (Pydantic 모델 - Request/Response 정의)
  ├─ services/      ← 비즈니스 로직 처리 및 데이터 가공
  ├─ database.py    ← DB 연결 설정
  └─ main.py        ← FastAPI 인스턴스 (app = FastAPI()) 생성 및 모든 라우터 통합
```

<br/>
<br/>


## 📂 Swagger / 백엔드 API 경로
- **Swagger URL:** $\text{API}$ 문서는 다음 경로에서 확인 가능합니다.
    * **Swagger UI:** `http://127.0.0.1:7000/docs`
    * **ReDoc:** `http://127.0.0.1:7000/redoc`
- **기본 API Prefix:** 모든 엔드포인트는 **`/api/v1`** 접두사를 사용합니다.
* **라우트 구조:** 백엔드 라우트(`routers.py`)는 **`app/api/v1/endpoints`** 폴더에 정의된 각 기능별 파일(예: `products.py`, `boards.py`)을 포함합니다.



