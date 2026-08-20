import { GolfCourse } from '../types';

export const SINGAPORE_GOLF_COURSES: GolfCourse[] = [
  {
    id: 'sentosa-golf-club',
    name: 'Sentosa Golf Club',
    shortName: 'Sentosa Golf Club',
    sector: 'South',
    areaName: 'Southern Islands',
    lat: 1.2494,
    lng: 103.8298,
    holes: 36,
    shelters: 12,
    nearestStationId: 'S117',
    description: 'Host to the SMBC Singapore Open & LIV Golf. Features The Serapong and The Tanjong championship 18-hole layouts.',
    evacuationRoutes: [
      'Holes 1-9: Immediate egress to South Clubhouse Shelter via Buggy Path 3',
      'Holes 10-18: Lightning bunker adjacent to Tanjong Turn 14',
      'Ocean Fairways: Concrete shelter at Hole 5 Tee Box'
    ]
  },
  {
    id: 'marina-bay-golf',
    name: 'Marina Bay Golf Course',
    shortName: 'Marina Bay Golf',
    sector: 'Central',
    areaName: 'Marine Parade',
    lat: 1.2936,
    lng: 103.8744,
    holes: 18,
    shelters: 7,
    nearestStationId: 'S107',
    description: 'Singapore’s only 18-hole public golf course with links-style undulating terrain and vast water hazards.',
    evacuationRoutes: [
      'Front 9: Evacuate towards Driving Range bunker',
      'Back 9: Reinforced storm refuge at Hole 13 Green'
    ]
  },
  {
    id: 'tanah-merah-country-club',
    name: 'Tanah Merah Country Club',
    shortName: 'Tanah Merah CC',
    sector: 'East',
    areaName: 'Changi',
    lat: 1.3486,
    lng: 103.9782,
    holes: 36,
    shelters: 14,
    nearestStationId: 'S24',
    description: 'Garden and Tampines courses adjacent to Changi Coastline, high coastal wind exposure and rapid storm formation.',
    evacuationRoutes: [
      'Garden Course: Shelters 1, 2, and Clubhouse Main Hall',
      'Tampines Course: Perimeter storm bunkers along Airport Boulevard'
    ]
  },
  {
    id: 'sicc-bukit-island',
    name: 'Singapore Island Country Club (SICC)',
    shortName: 'SICC Island/Bukit',
    sector: 'Central',
    areaName: 'Central Water Catchment',
    lat: 1.3571,
    lng: 103.8213,
    holes: 36,
    shelters: 16,
    nearestStationId: 'S109',
    description: 'Prestigious country club with lush rainforest fairways hugging the reservoir with heightened lightning activity.',
    evacuationRoutes: [
      'Bukit Course: Rain shelters at Hole 4, 8, 12, 16',
      'Island Course: Direct vehicle evacuation to Island Clubhouse'
    ]
  },
  {
    id: 'laguna-national',
    name: 'Laguna National Golf Resort Club',
    shortName: 'Laguna National',
    sector: 'East',
    areaName: 'Bedok',
    lat: 1.3283,
    lng: 103.9575,
    holes: 36,
    shelters: 10,
    nearestStationId: 'S108',
    description: 'World-class 36-hole facility featuring the Masters and Classic courses with extensive lightning siren coverage.',
    evacuationRoutes: [
      'Masters Course: Safe bunker at Hole 6 & Laguna Clubhouse',
      'Classic Course: Drainage underpass storm shelters'
    ]
  },
  {
    id: 'orchid-country-club',
    name: 'Orchid Country Club',
    shortName: 'Orchid Country Club',
    sector: 'North',
    areaName: 'Yishun',
    lat: 1.4124,
    lng: 103.8447,
    holes: 27,
    shelters: 9,
    nearestStationId: 'S114',
    description: 'Aranda, Vanda, and Dendro 9-hole courses overlooking the Sungei Seletar Reservoir.',
    evacuationRoutes: [
      'Aranda: Shelter at Hole 5 fairway junction',
      'Vanda/Dendro: Golf Academy storm station'
    ]
  },
  {
    id: 'seletar-country-club',
    name: 'Seletar Country Club',
    shortName: 'Seletar Country Club',
    sector: 'North',
    areaName: 'Seletar',
    lat: 1.4116,
    lng: 103.8687,
    holes: 18,
    shelters: 6,
    nearestStationId: 'S106',
    description: 'Picturesque parkland-style 18-hole championship course framed by Lower Seletar Reservoir.',
    evacuationRoutes: [
      'North Sector: Main pavilion & lower terrace bunker',
      'Lake Loop: Rapid buggy recall corridor'
    ]
  },
  {
    id: 'warren-golf-country-club',
    name: 'Warren Golf & Country Club',
    shortName: 'Warren Golf Club',
    sector: 'West',
    areaName: 'Tengah',
    lat: 1.3789,
    lng: 103.7381,
    holes: 18,
    shelters: 8,
    nearestStationId: 'S44',
    description: '18-hole course with undulating greens and water traps along Kranji Expressway.',
    evacuationRoutes: [
      'West Fairways: Concrete shelter at Hole 7 Turn',
      'Clubhouse Wing: Lower storm shelter level 1'
    ]
  }
];
