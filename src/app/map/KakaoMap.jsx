'use client'
import React, { useEffect, useRef, useState } from "react";
import UiInput from "@/components/ui/UiInput";
import UiButton from "@/components/ui/UiButton";

export default function KakaoMap() {
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [placesList, setPlacesList] = useState([]);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        if(window.kakao && window.kakao.map) {
            initMap();
        } else {
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_JS_KEY}&libraries=services`;
            script.async = true;
            script.onload = () => initMap();
            document.head.appendChild(script);
        }
    }, []);

    const initMap = () => {
        const { kakao } = window;
        const mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3,
        };
        const createdMap = new kakao.maps.Map(mapRef.current, mapOption);
        setMap(createdMap);
    }

    const searchPlaces = () => {
        const keyword = inputRef.current.value.trim();
        if (!keyword) {
            alert("키워드를 입력해주세요!");
            return;
        }

        const { kakao } = window;
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword, placesSearchCB);
    };

    const placesSearchCB = (data, status, pagination) => {
        const { kakao } = window;
        if (status === kakao.maps.services.Status.OK) {
            setPlacesList(data);
            setPagination(pagination);
            displayMarkers(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert("검색 중 오류가 발생했습니다.");
        }
    };

    const displayMarkers = (places) => {
        const { kakao } = window;
        // 기존 마커 제거
        markers.forEach((marker) => marker.setMap(null));
        const newMarkers = [];
        const bounds = new kakao.maps.LatLngBounds();

        places.forEach((place, index) => {
            const position = new kakao.maps.LatLng(place.y, place.x);
            const marker = new kakao.maps.Marker({
                position,
                map,
            });

            kakao.maps.event.addListener(marker, "click", () => {
                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;">${place.place_name}</div>`,
                });
                infowindow.open(map, marker);
            });

            bounds.extend(position);
            newMarkers.push(marker);
        });

        setMarkers(newMarkers);
        if (map) map.setBounds(bounds);
    };

    return (
        <div style={{ display: "flex" }}>
            {/* 검색 UI */}
            <div style={{ width: "300px" }}>
                <UiInput
                    ref={inputRef}
                    placeholder={'장소를 입력하세요'}
                    style={{ width: "100%" }}
                />
                <UiButton btnText={'검색'} onClick={searchPlaces} />

                {/* 검색 결과 리스트 */}
                <ul>
                    {placesList.map((place, idx) => (
                        <li key={idx} style={{ border: '1px solid red'}}>
                            <strong>{place.place_name}</strong>
                            <br />
                            {place.road_address_name || place.address_name}
                            <br />
                            {place.phone}
                        </li>
                    ))}
                </ul>

                {/* 페이지네이션 */}
                <div>
                    {pagination &&
                        Array.from({ length: pagination.last }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => pagination.gotoPage(i + 1)}
                                style={{
                                    fontWeight: pagination.current === i + 1 ? "bold" : "normal",
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                </div>
            </div>

            {/* 지도 */}
            <div
                ref={mapRef}
                style={{ width: "600px", height: "500px", marginLeft: "10px" }}
            ></div>
        </div>
    );
}
