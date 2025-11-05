## 🚀 실행 방법
```bash
npm install
nvm use 18
npm run dev // 프론트 open
npm run serve
```


## 🛠️ 기술 스택
- **React**: v15
- **Next.js**: v19
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크


## 📦 사용된 라이브러리
- **clsx**: 조건부 클래스 이름을 깔끔하게 조합해주는 헬퍼
- **@headlessui/react**: Tailwind Labs 제작. 접근성을 고려한 UI 컴포넌트 라이브러리 : https://react-icons.github.io/react-icons/
- **@heroicons/react**: Tailwind CSS 팀이 만든 공식 SVG 아이콘 세트
- **@tanstack/react-table**: 테이블 라이브러리 https://ui.shadcn.com/docs/components/data-table?utm_source=chatgpt.com
- **zustand**: 상태관리 라이브러리
- **react-icons**: 아이콘 https://react-icons.github.io/react-icons/



## 📂 폴더 구조 (예시)
- `/components` - 공통 컴포넌트 모음
- `/app` - Next.js의 라우트 기반 폴더
- `/styles` 
  - ui : 공통 

    

## 📂 백엔드 데이터 확인방법
- 파이썬에서 `uvicorn app.main:app --reload --port 7000` 명령어 치기 
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