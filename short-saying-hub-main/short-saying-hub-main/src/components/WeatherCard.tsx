
import { Card, CardContent } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';

interface WeatherData {
  name: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
}

interface WeatherCardProps {
  weather: WeatherData;
  loading: boolean;
}

const WeatherCard = ({ weather, loading }: WeatherCardProps) => {
  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded-lg mb-6"></div>
            <div className="h-20 bg-white/20 rounded-lg mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="h-24 bg-white/20 rounded-lg"></div>
              <div className="h-24 bg-white/20 rounded-lg"></div>
              <div className="h-24 bg-white/20 rounded-lg"></div>
              <div className="h-24 bg-white/20 rounded-lg"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
      <CardContent className="p-8">
        {/* Main Weather Info */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {weather.name}
            <span className="text-gray-300 font-normal">, {weather.country}</span>
          </h2>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            <img
              src={`${weather.icon}`}
              alt={weather.description}
              className="w-24 h-24"
            />
            <div className="text-left">
              <div className="text-6xl font-light text-white mb-1">
                {weather.temperature}°
              </div>
              <div className="text-gray-300 text-lg capitalize">
                {weather.description}
              </div>
            </div>
          </div>
          
          <div className="text-gray-300 text-lg">
            Feels like {weather.feelsLike}°C
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <Thermometer className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <div className="text-gray-300 text-sm mb-1">Feels Like</div>
            <div className="text-white font-semibold text-xl">{weather.feelsLike}°C</div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <Droplets className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <div className="text-gray-300 text-sm mb-1">Humidity</div>
            <div className="text-white font-semibold text-xl">{weather.humidity}%</div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <Wind className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <div className="text-gray-300 text-sm mb-1">Wind Speed</div>
            <div className="text-white font-semibold text-xl">{weather.windSpeed} m/s</div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <Eye className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <div className="text-gray-300 text-sm mb-1">Visibility</div>
            <div className="text-white font-semibold text-xl">{weather.visibility} km</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
