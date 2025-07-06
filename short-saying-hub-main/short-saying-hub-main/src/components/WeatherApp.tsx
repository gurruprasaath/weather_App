import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WeatherCard from './WeatherCard';
// import ForecastCard from './ForecastCard'; // Commented out since forecast is not used

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

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const apiKey = 'bb532d83773c484fb59151143250607';

  const fetchWeather = async () => {
    if (!city.trim()) {
      toast({
        title: 'City Required',
        description: 'Please enter a city name.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/weather?q=${city}`);


      if (!response.ok) throw new Error('City not found');

      const data = await response.json();
      setWeather({
        name: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        icon: data.current.condition.icon,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        visibility: data.current.vis_km,
        feelsLike: data.current.feelslike_c,
      });

      toast({
        title: 'Success',
        description: `Weather data loaded for ${data.location.name}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'City not found. Please check the spelling and try again.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Weather
          </h1>
          <p className="text-gray-300 text-lg">Beautiful weather, beautiful day</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for a city..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-lg rounded-xl focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <Button
                onClick={fetchWeather}
                disabled={loading}
                className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg transition-all duration-200"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weather Display */}
        {weather && (
          <div className="space-y-6">
            <WeatherCard weather={weather} loading={loading} />
          </div>
        )}

        {!weather && !loading && (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Welcome to Weather</h3>
              <p className="text-gray-300 text-lg">Enter a city name to get started</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
