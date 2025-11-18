
export const CATEGORY_LIST = {
    '여성': ['전체', '아우터', '탑', '니트', '팬츠', '스커트', '라운지/언더웨어', '캡슐 컬렉션*'],
    '남성': ['전체', '아우터', '탑', '니트', '팬츠', '수트', '라운지/언더웨어', '캡슐 컬렉션*'],
    '잡화': ['전체', '여성슈즈', '남성슈즈', '여성백', '남성백', '스카프/머플러', '주얼리', '기타 ACC'],
    '골프': ['전체', '여성웨어', '남성웨어', '잡화'],
    '키즈': ['전체', '의류', '잡화'],
    '뷰티': ['전체', '향수', '스킨케어', '바디/핸드케어', '헤어케어', '메이크업', '뷰티용품'],
    '라이프스타일': ['전체', '홈', '배스', '키친', '클리닝', '데스크', '펫', '테크', '레저'],
};

export const BRAND_LIST = {
    '한섬': ["TIME", "SYSTEM", "the CASHMERE", "LANVIN COLLECTION", "SJSJ", "MINE", "TIME HOMME", "SYSTEM HOMME", "OBZEE", "O'2nd", "LÄTT", "LANVIN BLANC"],
    '해외': ["CLUB MONACO", "DKNY", "ASPESI", "OUR LEGACY", "NILI LOTAN", "MOOSE KNUCKLES", "RE/DONE", "FEAR OF GOD", "Veronica Beard", "BALLY", "LANVIN", "AGNONA", "TEN C"],
    '셀렉티드': ["SÉLECTED", "TOM GREYHOUND", "MUE", "the CASHMERE THINGS", "TIME LIFESTYLE", "FOURM", "FOURM LOUNGE"],
    '뷰티': ["oera", "Liquides Perfume Bar", "FUEGUIA 1833"],
};


export const MAIN_MENU = [
    { type: 'category', label: '카테고리', data: CATEGORY_LIST },
    { type: 'brand', label: '브랜드', data: BRAND_LIST },
    { type: 'simple', label: '아울렛' },
    { type: 'simple', label: '셀렉티드' },
    { type: 'simple', label: 'TOP 100' },
];