import React, { useState } from "react";
import { Ai } from "../components/temp/Ai.jsx";
import { Button } from "../components/temp/Button.jsx";
import locationIcon from "../assets/Location_vector.svg";
import temperatureIcon from "../assets/Temperature_vector.svg";
import humidityIcon from "../assets/Humidity_vector.svg";
import "../styles/Experience.css";

const Experience = () => {
  const [location, setLocation] = useState("Placeholder");
  const [temperature, setTemperature] = useState("Placeholder");
  const [humidity, setHumidity] = useState("Placeholder");
  const [showOutput, setShowOutput] = useState(false);

  const fetchWeatherData = async () => {
    try {
        console.log("Fetching client IP...");
        const ipResponse = await fetch("https://ipapi.co/json/");
        const ipData = await ipResponse.json();
        console.log("Client IP:", ipData);

        console.log("Sending request to backend...");
        const serverResponse = await fetch("http://localhost:5000/weather", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ip: ipData.ip }),
        });
        console.log("Server response status:", serverResponse.status);

        if (!serverResponse.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const weatherData = await serverResponse.json();
        console.log("Weather data received:", weatherData);

        setLocation(weatherData.location || "Unknown Location");
        setTemperature(weatherData.temperature || "Unknown Temperature");
        setHumidity(weatherData.humidity || "Unknown Humidity");
    } catch (error) {
        console.error("Error fetching data:", error.message);
        setLocation("Error fetching location");
        setTemperature("Error fetching temperature");
        setHumidity("Error fetching humidity");
    }
};

  const handleShowResult = () => {
    setShowOutput(true);
    fetchWeatherData(); // Fetch weather data on button click
  };

  return (
    <div className="experience">
      {/* 배경 이미지 */}
      <div className="background"></div>
      <div className="overlap-wrapper">
        <div className="overlap">
          <h1 className="main-title">AI 기반 발효 시간 예측</h1>
          <p className="text-wrapper">
            결과 버튼을 눌러 사용자의 위치를 기반으로 대략적인 발효 시간을 예측합니다.
            더 정확한 결과를 보고 싶으면 앱을 통해 확인해주세요!
          </p>

          <div className="FORM">
            <div className="overlap-group">
              {showOutput && (
                <div className="output">
                  <div className="the-expected-wrapper">
                    <p className="the-expected">
                      <span className="span">예상 발효 시간은 다음과 같습니다 : </span>
                      <span className="text-wrapper-2">&nbsp;</span>
                      <span className="text-wrapper-3">17 hours</span>
                      <span className="text-wrapper-2">.</span>
                    </p>
                  </div>
                  <div className="ai-icon">
                    <Ai className="ai-instance" />
                  </div>
                </div>
              )}

              <div className="input">
                <Button
                  className="submit-button"
                  labelText="Show Result"
                  labelTextClassName="button-instance"
                  showIcon={false}
                  style={{ type: "filled" }}
                  onClick={handleShowResult}
                />
                <div className="location">
                  <div className="div">
                    <div className="rectangle-2" />
                    <div className="text-wrapper-4">{location}</div>
                    <img className="location_vector" alt="Location" src={locationIcon} />
                    <div className="text-wrapper-5">Location</div>
                  </div>
                </div>

                <div className="humidity">
                  <div className="div">
                    <div className="rectangle-2" />
                    <div className="text-wrapper-4">{humidity}</div>
                    <div className="text-wrapper-6">Humidity</div>
                    <img className="humidity_vector" alt="Humidity" src={humidityIcon} />
                  </div>
                </div>

                <div className="temperature">
                  <div className="div">
                    <div className="rectangle-2" />
                    <div className="text-wrapper-4">{temperature}</div>
                    <div className="text-wrapper-7">Temperature</div>
                    <img
                      className="temperature_vector"
                      alt="Temperature"
                      src={temperatureIcon}
                    />
                  </div>
                </div>
              </div>

              <div className="text-wrapper-8">Calculate Your EFT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
