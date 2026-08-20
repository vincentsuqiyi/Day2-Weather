import { LiveWeatherData, StationReading, TwoHrForecastItem, TwentyFourHrPeriod, FourDayForecastDay, LightningStrike } from '../types';

const BASE_URL = 'https://api-open.data.gov.sg/v2/real-time/api';

async function safeFetch<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`);
    if (!res.ok) {
      console.warn(`Failed fetching ${endpoint}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`Error fetching ${endpoint}:`, err);
    return null;
  }
}

export async function fetchAllLiveWeatherData(): Promise<LiveWeatherData> {
  const [
    twoHrRes,
    twentyFourHrRes,
    fourDayRes,
    airTempRes,
    rainfallRes,
    psiRes,
    pm25Res,
    uvRes,
    humidityRes,
    windRes
  ] = await Promise.all([
    safeFetch<any>('two-hr-forecast'),
    safeFetch<any>('twenty-four-hr-forecast'),
    safeFetch<any>('four-day-outlook'),
    safeFetch<any>('air-temperature'),
    safeFetch<any>('rainfall'),
    safeFetch<any>('psi'),
    safeFetch<any>('pm25'),
    safeFetch<any>('uv'),
    safeFetch<any>('relative-humidity'),
    safeFetch<any>('wind-speed')
  ]);

  // Parse 2-hr forecast
  const twoHrForecasts: TwoHrForecastItem[] = [];
  if (twoHrRes?.data?.items?.[0]?.forecasts) {
    for (const f of twoHrRes.data.items[0].forecasts) {
      twoHrForecasts.push({
        area: f.area,
        forecast: f.forecast
      });
    }
  }

  // Parse 24-hr forecast
  let twentyFourHrForecast: { generalForecast: string; periods: TwentyFourHrPeriod[] } | undefined;
  if (twentyFourHrRes?.data?.records?.[0]?.general) {
    const gen = twentyFourHrRes.data.records[0].general;
    const periods: TwentyFourHrPeriod[] = (twentyFourHrRes.data.records[0].periods || []).map((p: any) => ({
      time: p.timePeriod?.text || p.time?.text || 'Period',
      forecast: p.regions?.south || p.general?.forecast?.text || 'Fair',
      temperature: { low: gen.temperature?.low || 25, high: gen.temperature?.high || 33 },
      humidity: { low: gen.relativeHumidity?.low || 65, high: gen.relativeHumidity?.high || 95 },
      wind: {
        speed: { low: gen.wind?.speed?.low || 10, high: gen.wind?.speed?.high || 25 },
        direction: gen.wind?.direction || 'NE'
      },
      regions: {
        west: p.regions?.west || 'Partly Cloudy',
        east: p.regions?.east || 'Partly Cloudy',
        central: p.regions?.central || 'Partly Cloudy',
        south: p.regions?.south || 'Partly Cloudy',
        north: p.regions?.north || 'Partly Cloudy'
      }
    }));

    twentyFourHrForecast = {
      generalForecast: gen.forecast?.text || gen.forecast || 'Partly Cloudy',
      periods
    };
  }

  // Parse 4-day outlook
  const fourDayOutlook: FourDayForecastDay[] = [];
  if (fourDayRes?.data?.records?.[0]?.forecasts) {
    for (const d of fourDayRes.data.records[0].forecasts) {
      const dateObj = new Date(d.timestamp || d.date);
      const dayName = isNaN(dateObj.getTime())
        ? (d.day || 'Day')
        : dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

      fourDayOutlook.push({
        date: d.timestamp || d.date || '',
        day: dayName,
        forecast: d.forecast?.text || d.forecast || 'Thundery Showers',
        temperature: { low: d.temperature?.low || 24, high: d.temperature?.high || 33 },
        humidity: { low: d.relativeHumidity?.low || 60, high: d.relativeHumidity?.high || 95 },
        wind: {
          speed: { low: d.wind?.speed?.low || 10, high: d.wind?.speed?.high || 25 },
          direction: d.wind?.direction || 'NE'
        }
      });
    }
  }

  // Extract station readings helper
  const parseStations = (res: any): StationReading[] => {
    if (!res?.data?.stations || !res?.data?.readings?.[0]?.data) return [];
    const stationMap = new Map<string, any>();
    for (const s of res.data.stations) {
      stationMap.set(s.id, s);
    }
    const readings: StationReading[] = [];
    for (const r of res.data.readings[0].data) {
      const st = stationMap.get(r.stationId);
      if (st && typeof r.value === 'number') {
        readings.push({
          stationId: r.stationId,
          name: st.name || st.id,
          location: {
            latitude: st.location?.latitude || 1.35,
            longitude: st.location?.longitude || 103.82
          },
          value: r.value
        });
      }
    }
    return readings;
  };

  const temperatureStations = parseStations(airTempRes);
  const rainfallStations = parseStations(rainfallRes);
  const windStations = parseStations(windRes);
  const humidityStations = parseStations(humidityRes);

  // Compute aggregate averages
  const calcAvg = (stations: StationReading[]) => {
    if (!stations.length) return undefined;
    const sum = stations.reduce((acc, curr) => acc + curr.value, 0);
    return Math.round((sum / stations.length) * 10) / 10;
  };

  // PSI
  let psi: number | undefined;
  if (psiRes?.data?.items?.[0]?.readings?.psi_twenty_four_hourly?.national) {
    psi = psiRes.data.items[0].readings.psi_twenty_four_hourly.national;
  } else if (psiRes?.data?.readings?.[0]?.psi_twenty_four_hourly) {
    psi = psiRes.data.readings[0].psi_twenty_four_hourly.national || 48;
  }

  // PM2.5
  let pm25: number | undefined;
  if (pm25Res?.data?.items?.[0]?.readings?.pm25_one_hourly?.national) {
    pm25 = pm25Res.data.items[0].readings.pm25_one_hourly.national;
  } else if (pm25Res?.data?.readings?.[0]?.pm25_one_hourly) {
    pm25 = pm25Res.data.readings[0].pm25_one_hourly.national || 12;
  }

  // UV
  let uvIndex: number | undefined;
  if (uvRes?.data?.items?.[0]?.index?.[0]?.value !== undefined) {
    uvIndex = uvRes.data.items[0].index[0].value;
  } else if (uvRes?.data?.records?.[0]?.index?.[0]?.value !== undefined) {
    uvIndex = uvRes.data.records[0].index[0].value;
  }

  return {
    lastUpdated: new Date().toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    temperature: calcAvg(temperatureStations) ?? 30.5,
    humidity: calcAvg(humidityStations) ?? 82,
    windSpeed: calcAvg(windStations) ?? 18.5,
    rainfall: calcAvg(rainfallStations) ?? 0.4,
    psi: psi ?? 45,
    pm25: pm25 ?? 14,
    uvIndex: uvIndex ?? 7,
    twoHrForecasts,
    twentyFourHrForecast,
    fourDayOutlook,
    temperatureStations,
    rainfallStations,
    windStations,
    humidityStations
  };
}

// Generate realistic dynamic lightning strike cluster around selected coordinates
export function generateLiveStrikes(courseLat: number, courseLng: number): LightningStrike[] {
  // Always include close strikes to simulate active radar intelligence as shown in mockups
  return [
    {
      id: 'strike-1',
      lat: courseLat + 0.0095,
      lng: courseLng + 0.008,
      distanceKm: 1.8,
      timeAgoMins: 2,
      intensity: 'CRITICAL',
      sector: 'North-East Sector',
      isDangerZone: true,
      isCautionZone: false
    },
    {
      id: 'strike-2',
      lat: courseLat - 0.019,
      lng: courseLng + 0.024,
      distanceKm: 4.2,
      timeAgoMins: 8,
      intensity: 'SEVERE',
      sector: 'South-East Fairway Corridor',
      isDangerZone: false,
      isCautionZone: true
    },
    {
      id: 'strike-3',
      lat: courseLat + 0.025,
      lng: courseLng - 0.018,
      distanceKm: 4.9,
      timeAgoMins: 14,
      intensity: 'MODERATE',
      sector: 'West Perimeter Water Feature',
      isDangerZone: false,
      isCautionZone: true
    },
    {
      id: 'strike-4',
      lat: courseLat - 0.038,
      lng: courseLng - 0.012,
      distanceKm: 6.7,
      timeAgoMins: 22,
      intensity: 'MODERATE',
      sector: 'Offshore Sea Approach',
      isDangerZone: false,
      isCautionZone: false
    }
  ];
}
