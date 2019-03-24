import WeatherSagas from './Weather';
import MetricSagas from './Metric';
import ApiErrors from './ApiErrors';

export default [...ApiErrors, ...WeatherSagas, ...MetricSagas];
