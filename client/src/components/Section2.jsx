import React, { useEffect, useRef } from 'react';
import '../styles/Section2.css';
import animation from '../utils/animation.ts';
import DiagonalArrowImage from '../assets/DiagonalArrow.svg';
import GoogleButtonImage from '../assets/Google_btn.png';
import AppleButtonImage from '../assets/Apple_btn.png';

function Section2() {
    const deviceRef = useRef(null);

    useEffect(() => {
        animation(deviceRef, false, 2);
    }, [deviceRef]);

    return (
        <div className="Section2">
            {/* 제목 */}
            <span className="Section2Title">
                40만개의 데이터를 기반으로
                <br />
                추천 받는 르방 관리 사이클
            </span>

            {/* 사이클 설명 박스 */}
            <div className="CycleContainer">
                <div className="CycleBox">
                    <span className="CycleText">
                        데이터 기반
                        <br />
                        개인 맞춤 사이클
                    </span>
                </div>
                <div className="CycleBox">
                    <span className="CycleText">
                        불필요한
                        <br />
                        시간소요를
                        <br />
                        최소한으로
                    </span>
                </div>
                <div className="CycleBox">
                    <span className="CycleText">
                        최적의
                        <br />
                        페이스 조절
                    </span>
                </div>
            </div>

            {/* 디바이스 컨테이너 */}
            <div ref={deviceRef} className="Section2DeviceContainer">
                <div className="Section2Device" />
                <div className="Section2DeviceContentContainer">
                    <span className="Section2DeviceDescription">
                        개인화된 데이터를 바탕으로
                        <br />
                        실패할 수 없는 르방 키우기,
                    </span>
                    <span className="Section2DeviceTitle">
                        앱 하나로 손쉽게
                        <br />
                        르방을 관리하세요
                    </span>
                    <div className="Section2DeviceButtonContainer">
                        <a href="/">
                            <img
                                className="Section2DeviceButtonImg"
                                src={GoogleButtonImage}
                                alt="Google Play"
                            />
                        </a>
                        <a href="/">
                            <img
                                className="Section2DeviceButtonImg"
                                src={AppleButtonImage}
                                alt="Apple Store"
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* 구분선 */}
            <div className="Section2Divider" />
        </div>
    );
}

export default Section2;
