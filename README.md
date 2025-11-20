## 🚀 실행 방법
```bash
npm install
nvm use 18
npm run dev
npm run serve
```


## 🛠️ 기술 스택
- **React**: v15
- **Next.js**: v19
- **Tailwind CSS**: CSS 프레임워크


## 📦 사용된 라이브러리
- **clsx**: 조건부 클래스 이름을 깔끔하게 조합해주는 헬퍼
- **@headlessui/react**: Tailwind Labs 제작. 접근성을 고려한 UI 컴포넌트 라이브러리 : https://react-icons.github.io/react-icons/
- **@heroicons/react**: Tailwind CSS 팀이 만든 공식 SVG 아이콘 세트
- **zustand**: 상태관리 라이브러리
- **react-icons**: 아이콘 https://react-icons.github.io/react-icons/
- **react-hook-form**: 폼 관리 라이브러리
- **@hookform/resolvers**: react-hook-form과 zod를 연결해주는 중간 모듈
- **zod**: 스키마 유효성 검사 라이브러리
- npx auth secret: 자동으로 .env.local 파일에 환경변수가 설정됨.

## 📂 폴더 구조 (예시)
- `/components` - 공통 컴포넌트 모음
- `/app` - Next.js의 라우트 기반 폴더
- `/styles` 
  - ui : 공통 

    

## 📂 백엔드 데이터 확인방법
- 파이썬에서 `uvicorn app.main:app --reload --port 7000` 명령어 치기 
- `npm run serve`로 짧은 스크립트로 작성함
- main.py 안에서 FastAPI 인스턴스를 만들고 boards_router를 포함시켰죠.
- FastAPI 서버는 main.py 안의 app을 실행해야 /boards 라우터까지 포함돼서 돌아갑니다.
``` 
- app/
  ├─ main.py   ← 여기에 app = FastAPI()
  └─ api/
  ├─ products.py  ← router 정의
  └─ boards.py    ← router 정의
```


## 📂 Swagger
- http://127.0.0.1:7000/docs
- FastAPI에서 Swagger URL은 항상 /docs (ReDoc은 /redoc)입니다.


## 로그인
- access token 저장: 로그인 성공 시 백엔드에서 받은 JWT 토큰을 sessionStorage에 저장
- 브라우저: 자동으로 HttpOnly 쿠키(refreshToken) 저장


## middleware
- /app 과 나란한 위치에 middleware.js 파일 생성 : 서버로 요청을 전달할 때, 페이지 접속할 때마다
- /src/app/api/auth/[...nextauth]/route.js 파일 생성 : 로그인과 세션을 실제로 처리하는 핵심 서버 파일
- [...nextauth] : “여기 로그인 성공했으니까 쿠키에 토큰 저장할게~”
- middleware : “그 쿠키 아직 유효한가 확인해볼게~”
- 이 두 개가 세트로 돌아가야 getToken()이 값을 가져올 수 있음!!



