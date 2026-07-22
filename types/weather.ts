export interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number; // in km
  sunrise: string;
  sunset: string;
  condition: string;
  description: string;
  icon: string;
  tempMin: number;
  tempMax: number;
  updatedAt: string;
}

export interface ForecastItem {
  date: string;
  day: string;
  formattedDate: string;
  icon: string;
  condition: string;
  description: string;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
}

export interface OpenWeatherCurrentResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  dt: number;
  name: string;
  cod: number | string;
  message?: string;
}

export interface OpenWeatherForecastListItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  dt_txt: string;
}

export interface OpenWeatherForecastResponse {
  cod: string | number;
  message: number | string;
  cnt: number;
  list: OpenWeatherForecastListItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherError {
  message: string;
  code?: number | string;
}
