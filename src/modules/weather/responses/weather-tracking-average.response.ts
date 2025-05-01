export class RawTrackingAverage {
    count: string;
    avgTemp: string;
    avgWind: string;
}

export class WeatherTrackingAverageResponse {
    city: string;
    from: string;
    to: string;
    count: number;
    averageTemperature: number;
    averageWindspeed: number;
}