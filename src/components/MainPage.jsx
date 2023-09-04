import React from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureQuarter } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FiSunrise, FiSunset } from "react-icons/fi";

const MainPage = () => {
  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  const tempIcon = <FontAwesomeIcon icon={faTemperatureQuarter} />;
  const visibilityIcon = <FontAwesomeIcon icon={faEye} />;
  // Icons

  // Api keys and defaults and API is Open Weather Api
  const [city, setCity] = useState("Gurugram");
  const api = {
    key: `eaeb9b56a133ac2c5b933350fa0bc9f6`,
    base: `https://api.openweathermap.org/data/2.5/`,
  };

  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => setWeather(result));
  }, []);

  // Weather Setup
  const [weather, setWeather] = useState({});
  const searched = () => {
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => setWeather(result));
  };

  // Reset After 5min
  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setCity("");
    }, 300000);
  };

  // Formatted Date defaults is 17-12-2000
  const date = new Date(weather.dt * 1000);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  if (weather === null) {
    return <div>loading...</div>;
  }

  // Open Weather API defaults icons
  let weatherIcon = null;
  let weatherDes = null;
  if (weather.weather && weather.weather.length > 0) {
    const icon = weather.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    weatherIcon = <img src={iconUrl} alt="" />;
    weatherDes = weather.weather[0].description;
  }

  // SunSet and SunRise Time and visibility
  let sunriseTime = "";
  let sunsetTime = "";
  let lightRemain = "";
  let remainingTime = "";
  let visibility = "";
  let visibilityDistance = "";
  let sunlightFirst = "";
  if (weather.sys) {
    sunriseTime = new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
      ["en-US"],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    sunsetTime = new Date(weather.sys.sunset * 1000).toLocaleTimeString(
      ["en-US"],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    lightRemain = new Date(weather.sys.sunset * 1000);
    visibility = weather.visibility;
    visibilityDistance = (visibility / 1000).toFixed(1);
    sunlightFirst = new Date(weather.sys.sunrise * 1000);
  }
  // Total Daylight
  let totalSunlight = lightRemain - sunlightFirst;
  let totalSunlightHrs = Math.floor(totalSunlight / 3600000);
  let totalSunlightMin = Math.floor((totalSunlight % 3600000) / 60000);

  // Sunset time Left
  let currentTime = new Date();
  let sunlightRemain = lightRemain - currentTime;
  if (sunlightRemain > 0) {
    let remainingHours = Math.floor(sunlightRemain / (1000 * 60 * 60));
    let remainingMinutes = Math.floor(
      (sunlightRemain % (1000 * 60 * 60)) / (1000 * 60)
    );
    remainingTime = (
      <div>
        Daylight Left: {remainingHours}Hrs{remainingMinutes}Min
      </div>
    );
  } else {
    remainingTime = (
      <div>
        Total Daylight:{totalSunlightHrs}Hrs{totalSunlightMin}Min
      </div>
    );
  }

  // Visibility comments
  let visComment = "";

  if (visibilityDistance >= 10) {
    visComment = <div>It is Perfectly Clear</div>;
  } else if (visibilityDistance >= 5) {
    visComment = <div>Visibility is Good</div>;
  } else if (visibilityDistance >= 2) {
    visComment = <div>Visibility is Fair</div>;
  } else {
    visComment = <div>Visibility is Not Clear</div>;
  }

  return (
    <div className="w-screen h-screen">
      <div
        className="w-full h-full flex justify-center items-center mt-4 mb-4
      xs:mt-0 xs:mb-4 sm:mt-0 sm:mb-0 md:mt-4 md:mb-4 lg:mt-4 lg:mb-4 xl:mt-4 xl:mb-4"
      >
        <div
          className="absolute bg-white w-1/3 h-full z-10 rounded-md bg-opacity-50
        border-2 border-gray-300 flex justify-start items-center flex-col mb-4 
        sm:bg-opacity-0 md:bg-opacity-50 lg:bg-opacity-50 xl:bg-opacity-50 sm:w-full 
        md:w-1/3 lg:w-1/3 xl:1/3 xs:w-full fold:w-full xs:h-5/6 sm:h-5/6 md:h-full lg:h-full xl:h-full "
        >
          <div
            className="w-5/6 h-20 backdrop-filter backdrop-blur-sm border-2 border-white
          bg-Bg-Img bg-cover bg-no-repeat mt-6 "
          >
            <div
              className="flex justify-center items-center mt-4 h-full w-full
            backdrop-filter backdrop-blur-sm"
            >
              <form onSubmit={handleSubmit}>
                <label htmlFor="search">
                  <input
                    type="text"
                    required
                    onChange={(e) => setCity(e.target.value)}
                    name="search"
                    ref={ref}
                    placeholder="Enter City Name..."
                    id="search"
                    className="h-10 outline-none mb-8
                    w-96 placeholder:pl-1 pl-2 text-xl xs:w-56 sm:w-96 md:w-96 lg:w-96 xl:w-96
                    fold:w-56 "
                  />
                </label>
              </form>
              <button
                className="w-10 h-10 bg-white mb-8 ml-2 "
                onClick={searched}
              >
                {searchIcon}
              </button>
            </div>
          </div>
          <div
            className="w-5/6 h-3/5 backdrop-filter backdrop-blur-md 
          border-2 border-white mt-3 mb-3"
          >
            {typeof weather.main !== "undefined" ? (
              <div className="bg-yellowSky w-full h-full bg-cover bg-no-repeat">
                <div className="w-full h-full  flex-col  flex items-center backdrop-filter backdrop-blur">
                  <div className="bg- text-4xl mt-3 w-48 h-11 text-center pt-1">
                    <div
                      className="w-48 h-10 bg-white bg-opacity-40 backdrop-blur-lg drop-shadow-lg'
                    rounded-sm text-center shadow-[0px_0px_10px_2px_#00000080] font-bold
                    xs:text-xl sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl xs:w-40 sm:w-40 md:w-44 lg:w-48 xl:w-48
                    xs:h-8 sm:h-8 md:h-10 lg:h-10 xl:h-10"
                    >
                      <div>{weather.name}</div>
                    </div>
                  </div>
                  <div
                    className="font-bold w-36 h-8 bg-white bg-opacity-40 backdrop-blur-lg drop-shadow-lg'
                    rounded-sm  text-center  text-xl mt-4 pt-1 shadow-[0px_0px_10px_2px_#00000080]
                    xs:w-28 sm:w-32 md:w-36 lg:w-36 xl:w-36 "
                  >
                    {formattedDate}
                  </div>
                  <div className="mt-2 w-2/4 h-10 font-bold">
                    <div className="flex text-2xl justify-center">
                      <div className="mb-2 ">{weatherIcon}</div>
                      <div className="pt-2">{weatherDes}</div>
                    </div>
                  </div>
                  <div className="text-9xl mt-3 mb-3 ml-3 xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl  ">
                    {weather.main.temp}&#xb0;
                  </div>
                  <div className="w-11/12 h-full flex flex-row mt-5">
                    <div
                      className="w-1/2 h-5/6  rounded-lg mr-2 bg-white bg-opacity-40 backdrop-blur-lg drop-shadow-lg
                     shadow-[0px_0px_10px_2px_#00000080]"
                    >
                      <div className="text-2xl mt-2 ml-2 mb-3 font-bold xs:mb-1 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-3">
                        {tempIcon} FEELS LIKE
                      </div>
                      <div
                        className="ml-1 text-7xl mb-3 font-semibold xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl
                      xs:mb-1 sm:mb-1 md:mb-1 lg:mb-3 xl:mb-3"
                      >
                        {weather.main.feels_like}&#xb0;
                      </div>
                      <div
                        className="ml-2 text-2xl mt-3 font-bold xs:mt-1 sm:mt-1 md:mt-2 lg:mt-3 xl:mt-3 xs:text-xl xs:mb-4 sm:text-xl sm:mb-4 md:mb-2 lg:mb-0 xl:mb-0 
                      md:text-2xl lg:text-2xl xl:text-2xl"
                      >
                        Humidity-{weather.main.humidity}%
                      </div>
                    </div>
                    <div
                      className="w-1/2 h-5/6  rounded-lg ml-2 bg-white bg-opacity-40 backdrop-blur-lg drop-shadow-lg
                    shadow-[0px_0px_10px_2px_#00000080] "
                    >
                      <div className="mt-2 ml-2 text-2xl mb-4 font-bold xs:mb-2 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-4">
                        {visibilityIcon} Visibility
                      </div>
                      <div
                        className="mt-1 ml-2 text-6xl mb-3 font-bold xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl
                      xs:mb-1 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-3"
                      >
                        {visibilityDistance}Km
                      </div>
                      <div className="mt-2 ml-2 text-2xl font-bold xs:mt-1  ">
                        {visComment}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>not found</div>
            )}
          </div>
          <div
            className="bg-clearSkyV22 bg-cover bg-no-repeat w-5/6 h-1/5 mb-2 backdrop-filter backdrop-blur-md mt-3
          border-2 border-white bg-opacity-70"
          >
            <div className="w-full h-full backdrop-filter backdrop-blur-sm flex flex-col items-center">
              <div className="w-full h-2/3 flex mt-2 mb-1">
                <div
                  className="w-1/2 h-full ml-2 mr-1  bg-white bg-opacity-40 backdrop-blur-lg drop-shadow-lg
                    shadow-[0px_0px_10px_1px_#00000080] rounded-md"
                >
                  <div className="flex items-center text-center">
                    <div className="ml-1 text-4xl mb-2 xs:text-3xl sm:text-3xl md:text-2xl lg:text-4xl xl:text-4xl">
                      <FiSunset />
                    </div>
                    <div className="mt-1 ml-1 text-4xl mb-2 xs:text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
                      SunSet
                    </div>
                  </div>

                  <div className="text-5xl ml-3 xs:text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl">
                    {sunsetTime}
                  </div>
                </div>
                <div
                  className="w-1/2 h-full mr-2 ml-1  bg-white bg-opacity-40 backdrop-blur-lg drop-shadow-lg
                    shadow-[0px_0px_10px_1px_#00000080] rounded-md"
                >
                  <div className="flex items-center text-center">
                    <div className="ml-1 text-4xl mb-2 xs:text-3xl sm:text-3xl md:text-2xl lg:text-4xl xl:text-4xl">
                      <FiSunrise />
                    </div>
                    <div className="mt-1 ml-1 text-4xl mb-2 xs:text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
                      SunRise
                    </div>
                  </div>

                  <div className="text-5xl ml-3 xs:text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl">
                    {sunriseTime}
                  </div>
                </div>
              </div>
              <div
                className="w-11/12 h-1/3 mb-1  bg-white bg-opacity-40 backdrop-blur-lg drop-shadow-lg
                    shadow-[0px_0px_10px_1px_#00000080] rounded-md"
              >
                <div className="text-3xl pt-2 text-center">{remainingTime}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-Bg-Img w-full h-full bg-no-repeat bg-cover filter blur-lg
        brightness-90 xs:bg-transparent"
        ></div>
      </div>
    </div>
  );
};

export default MainPage;
