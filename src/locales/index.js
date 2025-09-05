import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// JSON 불러오기
import enLayout from "@/locales/en/layout.json";


import koLayout from "@/locales/ko/layout.json";


i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                layout: enLayout,
            },
            ko: {
                layout: koLayout,
            },
        },
        lng: "ko", // 기본 언어
        fallbackLng: "en", // 번역 없으면 영어로 fallback
        ns: ["common", "header", "footer", "home"], // 네임스페이스 등록
        defaultNS: "common",
        interpolation: {
            escapeValue: false,  // React에서는 이미 XSS를 방지하므로 false로 설정
        },
    });

export default i18n;
