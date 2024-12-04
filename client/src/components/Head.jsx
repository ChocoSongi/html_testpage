import React, { useEffect, useRef } from 'react';
import '../styles/Head.css';
import MainImage from '../assets/Main1.png';
import Main2Image from '../assets/Main2.png';
import animation from '../utils/animation.ts';

function Main() {
    // useRef에서 TypeScript 관련 타입 제거
    const mainTextRef = useRef(null);

    // 애니메이션 적용
    useEffect(() => {
        if (mainTextRef.current) {
            animation(mainTextRef, true, 2);
        }
    }, [mainTextRef]);

    return (
        <div className="Main">
            {/* 메인 이미지 */}
            <img className="MainImage" src={MainImage} alt="Main Image" />

            {/* 텍스트 애니메이션 */}
            <div ref={mainTextRef} className="MainText animation">
                <span className="Subtitle">자꾸 실패하는 르방 관리?</span>
                <p className="Title">
                    르방, 정답은 없지만<br />
                    <span className="Highlight">오답</span>은 있다.
                </p>
            </div>

            {/* 버튼 */}
            <a className="MainButton" href="/">
                <span className="MainButtonText">맞춤 르방 관리법 추천받기</span>
            </a>
        </div>
    );
}

export default Main;
