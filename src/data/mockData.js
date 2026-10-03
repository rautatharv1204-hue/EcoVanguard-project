// EcoVanguard Platform Mock Data & Telemetry Engine

export const initialRealTimeKpis = {
  activePowerDrawKw: 428.5,
  carbonIntensity: 312, // gCO2eq/kWh
  costRatePerHour: 72.84, // $/hr
  occupancyRatePct: 41, // 41% overall building occupancy
  totalEmissionsTodayKg: 2840,
  projectedCostToday: 1748.20,
  renewableGridMixPct: 38,
  dailyCarbonReductionKg: 462.8,
};

// 24-Hour hourly profile for dual-axis comparisons
export const hourly24HourData = [
  { hour: "00:00", timeLabel: "12 AM", gridRate: 0.09, carbonIntensity: 185, totalLoadKw: 210, baselineKw: 195, peakLoadKw: 15, isOffPeak: true },
  { hour: "01:00", timeLabel: "1 AM", gridRate: 0.08, carbonIntensity: 172, totalLoadKw: 198, baselineKw: 190, peakLoadKw: 8, isOffPeak: true },
  { hour: "02:00", timeLabel: "2 AM", gridRate: 0.08, carbonIntensity: 165, totalLoadKw: 192, baselineKw: 188, peakLoadKw: 4, isOffPeak: true },
  { hour: "03:00", timeLabel: "3 AM", gridRate: 0.08, carbonIntensity: 160, totalLoadKw: 190, baselineKw: 188, peakLoadKw: 2, isOffPeak: true },
  { hour: "04:00", timeLabel: "4 AM", gridRate: 0.09, carbonIntensity: 168, totalLoadKw: 205, baselineKw: 190, peakLoadKw: 15, isOffPeak: true },
  { hour: "05:00", timeLabel: "5 AM", gridRate: 0.11, carbonIntensity: 195, totalLoadKw: 230, baselineKw: 200, peakLoadKw: 30, isOffPeak: true },
  { hour: "06:00", timeLabel: "6 AM", gridRate: 0.14, carbonIntensity: 240, totalLoadKw: 280, baselineKw: 220, peakLoadKw: 60, isOffPeak: false },
  { hour: "07:00", timeLabel: "7 AM", gridRate: 0.17, carbonIntensity: 285, totalLoadKw: 345, baselineKw: 240, peakLoadKw: 105, isOffPeak: false },
  { hour: "08:00", timeLabel: "8 AM", gridRate: 0.21, carbonIntensity: 330, totalLoadKw: 410, baselineKw: 250, peakLoadKw: 160, isOffPeak: false },
  { hour: "09:00", timeLabel: "9 AM", gridRate: 0.24, carbonIntensity: 375, totalLoadKw: 460, baselineKw: 260, peakLoadKw: 200, isOffPeak: false },
  { hour: "10:00", timeLabel: "10 AM", gridRate: 0.25, carbonIntensity: 395, totalLoadKw: 485, baselineKw: 260, peakLoadKw: 225, isOffPeak: false },
  { hour: "11:00", timeLabel: "11 AM", gridRate: 0.23, carbonIntensity: 360, totalLoadKw: 470, baselineKw: 260, peakLoadKw: 210, isOffPeak: false },
  { hour: "12:00", timeLabel: "12 PM", gridRate: 0.20, carbonIntensity: 310, totalLoadKw: 450, baselineKw: 255, peakLoadKw: 195, isOffPeak: false },
  { hour: "13:00", timeLabel: "1 PM", gridRate: 0.19, carbonIntensity: 290, totalLoadKw: 460, baselineKw: 255, peakLoadKw: 205, isOffPeak: false },
  { hour: "14:00", timeLabel: "2 PM", gridRate: 0.22, carbonIntensity: 340, totalLoadKw: 490, baselineKw: 260, peakLoadKw: 230, isOffPeak: false },
  { hour: "15:00", timeLabel: "3 PM", gridRate: 0.26, carbonIntensity: 390, totalLoadKw: 515, baselineKw: 260, peakLoadKw: 255, isOffPeak: false },
  { hour: "16:00", timeLabel: "4 PM", gridRate: 0.29, carbonIntensity: 435, totalLoadKw: 540, baselineKw: 265, peakLoadKw: 275, isOffPeak: false },
  { hour: "17:00", timeLabel: "5 PM", gridRate: 0.32, carbonIntensity: 470, totalLoadKw: 530, baselineKw: 265, peakLoadKw: 265, isOffPeak: false },
  { hour: "18:00", timeLabel: "6 PM", gridRate: 0.31, carbonIntensity: 460, totalLoadKw: 480, baselineKw: 250, peakLoadKw: 230, isOffPeak: false },
  { hour: "19:00", timeLabel: "7 PM", gridRate: 0.27, carbonIntensity: 410, totalLoadKw: 410, baselineKw: 240, peakLoadKw: 170, isOffPeak: false },
  { hour: "20:00", timeLabel: "8 PM", gridRate: 0.22, carbonIntensity: 360, totalLoadKw: 350, baselineKw: 220, peakLoadKw: 130, isOffPeak: false },
  { hour: "21:00", timeLabel: "9 PM", gridRate: 0.18, carbonIntensity: 310, totalLoadKw: 300, baselineKw: 210, peakLoadKw: 90, isOffPeak: false },
  { hour: "22:00", timeLabel: "10 PM", gridRate: 0.14, carbonIntensity: 260, totalLoadKw: 260, baselineKw: 200, peakLoadKw: 60, isOffPeak: true },
  { hour: "23:00", timeLabel: "11 PM", gridRate: 0.11, carbonIntensity: 215, totalLoadKw: 225, baselineKw: 195, peakLoadKw: 30, isOffPeak: true },
];

// 7-day aggregated data
export const weeklyData = [
  { day: "Mon", avgRate: 0.21, avgCarbon: 325, peakLoadKw: 520, energyKwh: 8640 },
  { day: "Tue", avgRate: 0.23, avgCarbon: 345, peakLoadKw: 545, energyKwh: 8920 },
  { day: "Wed", avgRate: 0.22, avgCarbon: 338, peakLoadKw: 535, energyKwh: 8810 },
  { day: "Thu", avgRate: 0.24, avgCarbon: 360, peakLoadKw: 560, energyKwh: 9150 },
  { day: "Fri", avgRate: 0.20, avgCarbon: 310, peakLoadKw: 495, energyKwh: 8200 },
  { day: "Sat", avgRate: 0.14, avgCarbon: 230, peakLoadKw: 340, energyKwh: 5800 },
  { day: "Sun", avgRate: 0.12, avgCarbon: 205, peakLoadKw: 310, energyKwh: 5200 },
];

// 30-day monthly aggregated data (grouped by 5-day intervals)
export const monthlyData = [
  { interval: "Days 1-5", avgRate: 0.21, avgCarbon: 320, peakLoadKw: 540, energyKwh: 43200 },
  { interval: "Days 6-10", avgRate: 0.19, avgCarbon: 295, peakLoadKw: 515, energyKwh: 41800 },
  { interval: "Days 11-15", avgRate: 0.22, avgCarbon: 335, peakLoadKw: 550, energyKwh: 44100 },
  { interval: "Days 16-20", avgRate: 0.24, avgCarbon: 365, peakLoadKw: 565, energyKwh: 45600 },
  { interval: "Days 21-25", avgRate: 0.18, avgCarbon: 280, peakLoadKw: 490, energyKwh: 39500 },
  { interval: "Days 26-30", avgRate: 0.20, avgCarbon: 305, peakLoadKw: 525, energyKwh: 42300 },
];

// Zone-by-Zone Energy Consumption Data
export const zoneEnergyData = [
  {
    id: "floor-1",
    name: "Floor 1 - R&D & Wet Labs",
    shortName: "Floor 1 (Labs)",
    baselineKw: 72,
    peakLoadKw: 46,
    totalKw: 118,
    occupancyPct: 68,
    efficiencyScore: 84,
    hvacStatus: "Optimal",
    wasteRisk: "Low",
    primaryUse: "Fume hoods, cleanrooms & spectrometry equipment"
  },
  {
    id: "floor-2",
    name: "Floor 2 - Executive & Boardrooms",
    shortName: "Floor 2 (Executive)",
    baselineKw: 38,
    peakLoadKw: 54, // High waste load when unoccupied!
    totalKw: 92,
    occupancyPct: 4, // Empty!
    efficiencyScore: 32, // Very low efficiency because AC is full blast while empty
    hvacStatus: "Flagged (Idle Overconsumption)",
    wasteRisk: "Critical",
    primaryUse: "Conference suites, VR boardrooms, C-suite suites"
  },
  {
    id: "floor-3",
    name: "Floor 3 - Engineering & Workstations",
    shortName: "Floor 3 (Engineering)",
    baselineKw: 64,
    peakLoadKw: 58,
    totalKw: 122,
    occupancyPct: 76,
    efficiencyScore: 91,
    hvacStatus: "Demand Controlled",
    wasteRisk: "Low",
    primaryUse: "CAD workstations, thermal testing benches, collaboration bays"
  },
  {
    id: "floor-4",
    name: "Floor 4 - Core Edge Data Hub",
    shortName: "Floor 4 (Data Hub)",
    baselineKw: 88,
    peakLoadKw: 22,
    totalKw: 110,
    occupancyPct: 12,
    efficiencyScore: 94, // High efficiency for server room with CRAC precision cooling
    hvacStatus: "Precision CRAC Eco-Mode",
    wasteRisk: "Low",
    primaryUse: "Blade enclosures, edge neural accelerators, UPS batteries"
  },
];

// Heavy Load Detection & Equipment Status
export const heavyEquipmentData = [
  {
    id: "eq-1",
    name: "Central Chiller Plant A (Trane Centrifugal)",
    zone: "Rooftop / Central Utility",
    powerDrawKw: 135,
    ratedPowerKw: 160,
    dutyCycle: "84%",
    currentStatus: "High Consumption Peak",
    carbonImpactLevel: "Severe",
    recommendation: "Shift 40% thermal storage pre-cooling to 02:00 - 05:00 off-peak rate window.",
    potentialMonthlySavings: "$1,420 / 3.8 tons CO₂",
    canShift: true
  },
  {
    id: "eq-2",
    name: "Zone 2B Multi-Split VRF Condenser",
    zone: "Floor 2 - East Wing",
    powerDrawKw: 36,
    ratedPowerKw: 42,
    dutyCycle: "92%",
    currentStatus: "Unoccupied Waste Alert",
    carbonImpactLevel: "Critical",
    recommendation: "Immediate automated shut-off recommended (Zone occupancy currently 4%).",
    potentialMonthlySavings: "$640 / 1.9 tons CO₂",
    canShift: false
  },
  {
    id: "eq-3",
    name: "Commercial EV Fast-Charger Bank (6x 50kW)",
    zone: "Basement Fleet Depot",
    powerDrawKw: 150,
    ratedPowerKw: 300,
    dutyCycle: "50%",
    currentStatus: "Discretionary Load",
    carbonImpactLevel: "Moderate",
    recommendation: "Enforce smart queue: throttle charging speeds until 21:00 when grid carbon drops below 220 gCO₂/kWh.",
    potentialMonthlySavings: "$980 / 2.7 tons CO₂",
    canShift: true
  },
  {
    id: "eq-4",
    name: "Regenerative High-Speed Traction Elevators",
    zone: "Core Shafts 1-4",
    powerDrawKw: 42,
    ratedPowerKw: 75,
    dutyCycle: "38%",
    currentStatus: "Normal Operating Curve",
    carbonImpactLevel: "Low",
    recommendation: "Operating on regenerative kinetic braking. Eco-idle mode active.",
    potentialMonthlySavings: "$120 / 0.4 tons CO₂",
    canShift: false
  }
];

// Algorithmic Flow Step Details
export const algorithmFlowSteps = [
  {
    stepNumber: "01",
    phase: "Sensor Data Ingestion",
    title: "High-Frequency Telemetry Ingestion",
    description: "Multi-point IoT sub-meters, BACnet/Modbus gateways, and smart CT clamps capture 3-phase AC voltage, line current, and true active power factor at 1-second resolution.",
    metrics: ["Voltage (V)", "Current (I)", "True Power Factor (cos φ)", "Real Power (P = V·I·cos φ)"],
    status: "Active (60 Hz Sampling)",
    latency: "42ms ingestion lag",
    iconName: "Cpu"
  },
  {
    stepNumber: "02",
    phase: "Carbon Intensity Matching",
    title: "Marginal Grid Intensity Sync",
    description: "Ingests sub-minute marginal emissions factors (MEF) and average emissions factors (AEF) from regional grid operators and satellite-derived power flow models.",
    metrics: ["gCO₂eq/kWh marginal rate", "Fuel-mix breakdown (% solar, wind, gas)", "Locational Marginal Pricing (LMP)"],
    status: "Synchronized",
    latency: "WattTime & ElecMaps feed < 2 min",
    iconName: "Globe"
  },
  {
    stepNumber: "03",
    phase: "Optimization Decision",
    title: "Dual-Objective Constraint Engine",
    description: "A constrained optimization algorithm calculates marginal carbon abatement cost vs. thermal comfort boundaries and zone occupancy matrices to determine load shedding priorities.",
    metrics: ["Carbon abatement ($/ton CO₂)", "Occupancy Threshold (PIR + Wi-Fi)", "Thermal inertia decay coefficient"],
    status: "Optimizing (Interval: 30s)",
    latency: "12ms compute time",
    iconName: "Zap"
  },
  {
    stepNumber: "04",
    phase: "Automated Action / Alert",
    title: "Closed-Loop Dispatch & BMS Control",
    description: "Executes automated BMS setpoint adjustments, switches chiller chill-water setpoints, sheds discretionary EV load, or pushes immediate notifications to facilities managers.",
    metrics: ["BACnet Setpoint Override", "Smart Thermostat Step-back", "Automated Load Shifting Webhook"],
    status: "Closed-Loop Enabled",
    latency: "Instantaneous dispatch (< 200ms)",
    iconName: "ShieldAlert"
  }
];

// Tech Stack & API Integration Grid
export const techStackData = [
  {
    category: "External Grid & Rate APIs",
    items: [
      {
        name: "Electricity Maps API",
        type: "Real-time Grid Carbon",
        endpoint: "https://api.electricitymaps.com/v3/carbon-intensity/latest",
        status: "200 OK • Operational",
        syncRate: "Every 5 mins",
        description: "Direct telemetry for regional marginal and average carbon emissions and solar/wind curtailment.",
        badge: "Live REST v3",
        samplePayload: {
          zone: "US-CAL-CISO",
          carbonIntensity: 312,
          datetime: "2026-10-03T06:55:00Z",
          fossilFreePercentage: 42,
          renewablePercentage: 38
        }
      },
      {
        name: "WattTime API",
        type: "Marginal Operating Emission Rate (MOER)",
        endpoint: "https://api.watttime.org/v3/marginal-emissions",
        status: "200 OK • Operational",
        syncRate: "Every 15 mins",
        description: "Predictive 24-hour forecasted carbon intensity indices used for load-shifting dispatch calculations.",
        badge: "MOER Engine",
        samplePayload: {
          ba: "CAISO_NORTH",
          moer: 418.6,
          percent: 64,
          point_time: "2026-10-03T07:00:00Z"
        }
      },
      {
        name: "OpenEI Utility Rate API",
        type: "Tariff Structure & Time-of-Use",
        endpoint: "https://api.openei.org/utility_rates/v8",
        status: "200 OK • Operational",
        syncRate: "Hourly sync",
        description: "Dynamic utility tariff structures, demand charges ($/kW peak), and seasonal TOU schedules.",
        badge: "NREL Database",
        samplePayload: {
          utility: "Pacific Gas & Electric",
          rateSchedule: "B-19 Medium General Demand",
          onPeakRate: 0.32,
          offPeakRate: 0.08
        }
      }
    ]
  },
  {
    category: "Internal Backend & Data Pipeline",
    items: [
      {
        name: "PostgreSQL & TimescaleDB",
        type: "Time-Series & Relational Storage",
        endpoint: "pg-cluster.ecovanguard.internal:5432",
        status: "Healthy • 1.2M rows/hr",
        syncRate: "Continuous streaming",
        description: "Partitioned hyper-tables storing 1-second electrical telemetry, occupancy sensor logs, and historical baseline regressions.",
        badge: "PostgreSQL 16",
        samplePayload: {
          activeHypertables: 8,
          compressionRatio: "91.4%",
          queryLatencyP95: "4.8ms"
        }
      },
      {
        name: "Python (FastAPI / PyTorch)",
        type: "Algorithmic Analytics Engine",
        endpoint: "https://engine.ecovanguard.internal/v1/optimize",
        status: "Online • 4 Worker Nodes",
        syncRate: "Continuous daemon",
        description: "FastAPI microservices executing non-linear programming, marginal emissions factor matching, and thermal comfort model predictive control (MPC).",
        badge: "FastAPI + NumPy",
        samplePayload: {
          activeSolvers: "COIN-OR CBC",
          forecastHorizon: "24 Hours",
          meanSquareError: 0.014
        }
      },
      {
        name: "Node.js Real-Time Ingestion Hub",
        type: "Microservices & WebSocket Broker",
        endpoint: "wss://stream.ecovanguard.internal/telemetry",
        status: "Connected • 0 Dropped Packets",
        syncRate: "Low-latency duplex",
        description: "High-throughput Node.js microservice maintaining persistent bi-directional WebSockets with IoT building gateways and enterprise client dashboards.",
        badge: "Node.js v20 LTS",
        samplePayload: {
          connectedGateways: 14,
          throughputMsgPerSec: 1240,
          memoryUsageMb: 184
        }
      }
    ]
  }
];

// Voice Assistant Sample Prompts & Pre-computed Responses
export const voiceAssistantPrompts = [
  {
    id: "voice-1",
    platform: "Google Assistant",
    promptText: '"Hey Google, what is the building\'s current carbon intensity?"',
    shortPrompt: "Current carbon intensity",
    responseText: "Current grid carbon intensity is 312 gCO₂eq per kilowatt-hour, which is 14% higher than the morning average. Recommended action: Postpone heavy industrial laundry and fleet EV charging.",
    actionExecuted: "Queried Electricity Maps live telemetry",
    metricHighlight: "312 gCO₂eq/kWh"
  },
  {
    id: "voice-2",
    platform: "Amazon Alexa",
    promptText: '"Alexa, ask EcoVanguard for the best window to run heavy chillers today."',
    shortPrompt: "Best chiller window",
    responseText: "The optimal low-carbon and lowest-cost window is between 01:30 AM and 04:45 AM tonight, where grid rates dip to $0.08 per kilowatt-hour and carbon intensity reaches a daily low of 160 gCO₂eq.",
    actionExecuted: "Evaluated 24-hr predictive MOER forecast",
    metricHighlight: "01:30 AM - 04:45 AM ($0.08/kWh)"
  },
  {
    id: "voice-3",
    platform: "Google Assistant",
    promptText: '"Hey Google, shut down idle HVAC on Floor 2."',
    shortPrompt: "Shut down Floor 2 HVAC",
    responseText: "Dispatched automated BACnet shutdown signal to Floor 2 East VRF condensers. Zone temperature setback applied. Power draw reduced by 34.2 kW.",
    actionExecuted: "Triggered BACnet override command",
    metricHighlight: "-34.2 kW waste mitigated"
  },
  {
    id: "voice-4",
    platform: "Amazon Alexa",
    promptText: '"Alexa, summarize today\'s total carbon savings."',
    shortPrompt: "Summarize carbon savings",
    responseText: "EcoVanguard has avoided 462.8 kg of CO₂ emissions today through automated occupancy shut-offs and load throttling, generating an estimated $142 in avoided peak demand charges.",
    actionExecuted: "Compiled daily avoided emissions report",
    metricHighlight: "462.8 kg CO₂ avoided"
  }
];

// Executive Summary Metrics & Actionable Recommendations
export const executiveSummaryReport = {
  monthlySavingsDollars: 4820,
  monthlyCarbonReductionTons: 18.4,
  percentEnergyWasteMitigated: 23.6,
  peakDemandCutKw: 78,
  annualizedRoiMonths: 5.4,
  actionableRecommendations: [
    {
      id: "rec-1",
      priority: "High Impact",
      title: "Automate Unoccupied Floor Setbacks (Floor 2)",
      description: "Floor 2 Executive Wing operates HVAC at full cooling capacity despite 4% average occupancy. Auto-enable motion-bound BMS setback.",
      estimatedSavings: "$640/month",
      carbonCut: "2.1 tons CO₂/month",
      actionLabel: "Enable PIR Interlock",
      status: "Recommended"
    },
    {
      id: "rec-2",
      priority: "Immediate",
      title: "Shift Heavy Chiller Pre-Cooling to 02:00 - 05:00",
      description: "Pre-cool building thermal mass when grid carbon is 165 gCO₂/kWh and rates are $0.08/kWh, shedding 80kW off the 16:00 peak tariff window.",
      estimatedSavings: "$1,850/month",
      carbonCut: "6.8 tons CO₂/month",
      actionLabel: "Deploy Chiller Schedule",
      status: "Ready to Deploy"
    },
    {
      id: "rec-3",
      priority: "Medium Impact",
      title: "Dynamic EV Charging Throttle at Peak Carbon",
      description: "Restrict EV fleet rapid-charging to 30% speed when regional grid carbon exceeds 400 gCO₂eq/kWh, queuing full charge for midnight off-peak.",
      estimatedSavings: "$1,210/month",
      carbonCut: "4.5 tons CO₂/month",
      actionLabel: "Apply EV Smart Tariff",
      status: "Ready to Deploy"
    },
    {
      id: "rec-4",
      priority: "Quick Win",
      title: "Implement Daylight Harvesting & Auto-Dimming",
      description: "Sensor data indicates perimeter zones on Floor 3 exceed 650 lux natural daylight. Auto-dim perimeter LED arrays by 40%.",
      estimatedSavings: "$420/month",
      carbonCut: "1.2 tons CO₂/month",
      actionLabel: "Activate Photo-dimming",
      status: "Ready to Deploy"
    }
  ]
};
