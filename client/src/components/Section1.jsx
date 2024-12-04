import React, { useEffect, useRef } from 'react';
import '../styles/Section1.css';
import animation from '../utils/animation.ts';
import MapImage from '../assets/map.svg';
import PositionImage from '../assets/position.svg';
import ArrowImage from '../assets/arrow.svg';
import DetailImage from '../assets/Details.png';

function Section1() {
    const reasonForFailSubtitleRef = useRef(null);
    const managementMethodContainerRef = useRef(null);

    const targets = [
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    useEffect(() => {
        animation(reasonForFailSubtitleRef, false, 2);
    }, [reasonForFailSubtitleRef]);

    useEffect(() => {
        animation(managementMethodContainerRef, false, 2);
    }, [managementMethodContainerRef]);

    useEffect(() => {
        let delay = 0;
        targets.forEach((target) => {
            animation(target, false, 1, delay);
            delay += 0.5;
        });
    }, [targets]);

    return (
        <div className="Section1">
            <div ref={managementMethodContainerRef} className="ManagementMethodContainer">
                <span className="ManagementMethodText">
                    내 르방은 언제 완성되지? 아무리 검색해도 나오지 않아요.
                    <br />
                    온도, 습도, 비율... 르방의 퀄리티를 좌우하는 너무 많은 변수 때문에
                    <br />
                    <span className="ManagementMethodHighlight">
                        르방이 100개라면, 100개의 관리법이 있거든요.
                        <br />
                    </span>
                </span>
            </div>
            <div className="ReasonForFailContainer">
                <span className="ReasonForFailTitle">왜 계속 르방 키우기에 실패할까?</span>
                <div className="ReasonBox">
                    <span className="ReasonBoxTitle">
                        <span className="ReasonBoxHighlight">지역마다 달라지는</span> 르방 관리 시간 때문!
                    </span>
                    <div className="MapContainer">
                        <img className="MapImage" src={MapImage} alt="Map" />
                        <div className="Position p1">
                            <img className="PositionImage" src={PositionImage} alt="" />
                        </div>
                        <div className="Position p2">
                            <img className="PositionImage" src={PositionImage} alt="" />
                        </div>
                        <div className="Position p3">
                            <img className="PositionImage" src={PositionImage} alt="" />
                        </div>
                        <img ref={targets[0]} className="DetailImage d1" src={DetailImage} alt="" />
                        <img ref={targets[1]} className="DetailImage d2" src={DetailImage} alt="" />
                        <img ref={targets[2]} className="DetailImage d3" src={DetailImage} alt="" />
                    </div>
                </div>
                <img className="Arrow" src={ArrowImage} alt="" />
                <div
                    ref={reasonForFailSubtitleRef}
                    className="ReasonForFailSubtitle ReasonForFailSubtitleAnimation"
                    style={{ color: 'black' }}
                >
                    지역마다 다른 르방 Refresh 시간,
                    <br />
                    <span style={{ fontWeight: 'bold' }}>
                        각자에게 맞는 <span style={{ color: '#7B4A30' }}>관리 사이클</span>이 필요합니다.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Section1;
