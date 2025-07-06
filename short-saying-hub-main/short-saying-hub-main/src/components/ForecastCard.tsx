
interface ForecastData {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

interface ForecastCardProps {
  forecast: ForecastData;
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
      <div className="text-gray-300 text-sm font-medium mb-3">{forecast.date}</div>
      <img
        src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
        alt={forecast.description}
        className="w-12 h-12 mx-auto mb-3"
      />
      <div className="text-white font-semibold text-lg mb-2">
        {forecast.temperature}°C
      </div>
      <div className="text-gray-400 text-xs capitalize leading-tight">
        {forecast.description}
      </div>
    </div>
  );
};

export default ForecastCard;
