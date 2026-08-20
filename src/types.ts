export type DangerLevel = 'SAFE' | 'CAUTION' | 'DANGER';

export interface GolfCourse {
  id: string;
  name: string;
  shortName: string;
  sector: 'South' | 'East' | 'West' | 'North' | 'Central';
  areaName: string; // matches data.gov.sg 2-hr forecast area
  lat: number;
  lng: number;
  holes: number;
  shelters: number;
  nearestStationId?: string;
  description: string;
  evacuationRoutes: string[];
}

export interface LightningStrike {
  id: string;
  lat: number;
  lng: number;
  distanceKm: number;
  timeAgoMins: number;
  intensity: 'MODERATE' | 'SEVERE' | 'CRITICAL';
  sector: string;
  isDangerZone: boolean; // <2km
  isCautionZone: boolean; // 2-5km
}

export interface TwoHrForecastItem {
  area: string;
  forecast: string;
}

export interface TwentyFourHrPeriod {
  time: string;
  forecast: string;
  temperature: { low: number; high: number };
  humidity: { low: number; high: number };
  wind: { speed: { low: number; high: number }; direction: string };
  regions: {
    west: string;
    east: string;
    central: string;
    south: string;
    north: string;
  };
}

export interface FourDayForecastDay {
  date: string;
  day: string;
  forecast: string;
  temperature: { low: number; high: number };
  humidity: { low: number; high: number };
  wind: { speed: { low: number; high: number }; direction: string };
}

export interface StationReading {
  stationId: string;
  name: string;
  location: { latitude: number; longitude: number };
  value: number;
}

export interface LiveWeatherData {
  lastUpdated: string;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  rainfall?: number;
  psi?: number;
  pm25?: number;
  uvIndex?: number;
  twoHrForecasts: TwoHrForecastItem[];
  twentyFourHrForecast?: {
    generalForecast: string;
    periods: TwentyFourHrPeriod[];
  };
  fourDayOutlook: FourDayForecastDay[];
  temperatureStations: StationReading[];
  rainfallStations: StationReading[];
  windStations: StationReading[];
  humidityStations: StationReading[];
}

export interface IncidentReport {
  id: string;
  courseId: string;
  courseName: string;
  type: 'Lightning Visible' | 'Heavy Downpour' | 'High Wind' | 'Flooded Green' | 'Tree Hazard';
  severity: 'Low' | 'Medium' | 'Critical';
  sector: string;
  notes: string;
  timestamp: string;
  reporterName: string;
  status: 'PENDING_REVIEW' | 'MARSHALL_DISPATCHED' | 'SIREN_ACTIVATED' | 'RESOLVED';
}

export interface SafetyOrder {
  id: string;
  type: 'EVACUATION' | 'PLAY_SUSPENDED' | 'CAUTION_ADVISORY' | 'ALL_CLEAR';
  courseId: string;
  timestamp: string;
  message: string;
  sirenActive: boolean;
  smsDispatchedCount: number;
}
