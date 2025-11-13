/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // Next.js는 보안을 위해 next/image로 외부 이미지 도메인을 직접 쓸 수 없음
        // 그 도메인을 “허용 리스트”에 등록
        domains: ["cdn-img.thehandsome.com"],
    },
};
export default nextConfig;
