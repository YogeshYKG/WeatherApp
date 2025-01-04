import React, {useState, useEffect, useRef} from 'react'
import clear from '../Assets/clear.png'
import humidity from '../Assets/humidity.png'
import wind from '../Assets/wind.png'


const Weather = () => {

    const WeatherImage = [
        { weather: 'clear', alt: 'clear', imagepath: '../Assets/clear.png' },
        { weather: 'cloud', alt: 'cloud', imagepath: '../Assets/cloud.png' },
        { weather: 'rain', alt: 'rain', imagepath: '../Assets/rain.png' },
        { weather: 'snow', alt: 'snow', imagepath: '../Assets/snow.png' },
        { weather: 'humidity', alt: 'humidity', imagepath: '../Assets/humidity.png' },
        { weather: 'drizzle', alt: 'drizzle', imagepath: '../Assets/drizzle.png' },
        { weather: 'wind', alt: 'wind', imagepath: '../Assets/wind.png' },
    ]

    const [WeatherData, setWeatherData] = useState(false);

    const allIcon = {
        "01d": WeatherImage[0].imagepath,
        "01n": WeatherImage[0].imagepath,
        "02d": WeatherImage[1].imagepath,
        "02n": WeatherImage[1].imagepath,
        "03d": WeatherImage[1].imagepath,
        "03n": WeatherImage[1].imagepath,
        "04d": WeatherImage[5].imagepath,
        "04n": WeatherImage[5].imagepath,
        "09d": WeatherImage[2].imagepath,
        "09n": WeatherImage[2].imagepath,
        "10d": WeatherImage[2].imagepath,
        "10n": WeatherImage[2].imagepath,
        "11d": WeatherImage[2].imagepath,
        "11n": WeatherImage[2].imagepath,
        "13d": WeatherImage[3].imagepath,
        "13n": WeatherImage[3].imagepath,
    }

    // Search Function
    const search = async (
        city
    ) => {

        if( city === "") {
            alert("Please Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcon[data.weather[0].icon] || WeatherImage[0].imagepath;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                location: data.name,
                temperature: Math.floor(data.main.temp),
                icon: icon,
            })
            console.log(setWeatherData);
        } catch (error) {
            setWeatherData(false);
            alert("City Not Found");
        }

    }

    // Ref for search bar
    const searchInputRef = useRef();

    // Run Search function on page load
    useEffect(() =>{
        search('Jaipur');
    },[])
    
    



  return (
    <div className="Background relative h-screen w-screen flex justify-center items-center overflow-hidden"
    >
      <div className="Weather absolute max-w-full max-h-full bg-gradient-to-br from-[#2f4680] to-[#500ae4] py-10 px-10 rounded-2xl overflow-auto">
        <div className="flex flex-col justify-center items-center">
            <div className="search-bar flex flex-row justify-center items-center gap-3">
                <input ref={searchInputRef} type="text" placeholder='Search' className="rounded-full px-6 py-4 ring-4 ring-inset ring-offset-stone-800 bg-gray-700" />
                <div 
                    className="material-symbols-rounded flex justify-center items-center text-grey-70 rounded-full p-7 ring-2 ring-inset ring-offset-slate-800 bg-gray-600"
                    onClick={() => search(searchInputRef.current.value)}
                >
                    search
                </div>
            </div>
            {WeatherData ? 
            <>
                <div className="Weather-Icon flex justify-center items-center">
                    <img src={WeatherData.icon} alt="clear" className="w-80 h-80" />
                </div>
                <div className="Temperature flex justify-center items-center text-3xl font-extrabold">
                    {WeatherData.temperature + '°C'}
                </div>
                <div className="CityName flex justify-center items-center text-xl font-semibold">
                    {WeatherData.location}
                </div>
                <div className="WeatherData flex flex-row justify-center items-center gap-40">   
                    <div className="HumidityData flex flex-col items-center justify-center">
                        <img src={humidity} alt="" className=" h-16 w-16" />
                        <p className="mt-2"> {WeatherData.humidity} % </p>
                        <p className=""> Humidity </p>
                    </div>
                    <div className="SpeedData flex flex-col items-center justify-center">
                        <img src={wind} alt="" className="h-16 w-16" />
                        <p className="mt-2"> {WeatherData.windSpeed} Km/Hr </p>
                        <p className=""> Wind </p>
                    </div>
                </div>
            
            
            </>
            
            :<></>}

            
        </div>
      </div>
      
    </div>
  )
}

export default Weather
