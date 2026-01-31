export const industryMultipliers = {
  saas: { meetingRate: 1.2, dealCloseRate: 0.25, name: 'SaaS' },
  'professional-services': {
    meetingRate: 1.0,
    dealCloseRate: 0.3,
    name: 'Professional Services',
  },
  technology: { meetingRate: 1.1, dealCloseRate: 0.22, name: 'Technology' },
  healthcare: { meetingRate: 0.9, dealCloseRate: 0.28, name: 'Healthcare' },
  'financial-services': {
    meetingRate: 0.85,
    dealCloseRate: 0.35,
    name: 'Financial Services',
  },
  manufacturing: { meetingRate: 0.8, dealCloseRate: 0.32, name: 'Manufacturing' },
  other: { meetingRate: 1.0, dealCloseRate: 0.25, name: 'Other' },
} as const

export type IndustryKey = keyof typeof industryMultipliers

export interface CalculatorInputs {
  salesReps: number
  averageDealSize: number
  currentMeetings: number
  industry: IndustryKey
}

export interface CalculatorResults {
  projectedMeetings: number
  additionalMeetings: number
  additionalRevenuePotential: number
  roiMultiplier: number
  costSavingsVsSDR: number
  monthlyInvestment: number
  annualInvestment: number
  timeToFirstMeeting: string
}

export function calculateROI(inputs: CalculatorInputs): CalculatorResults {
  const multiplier = industryMultipliers[inputs.industry]

  // XGrowthOS delivers 25-40 meetings/month (use 32 as baseline)
  const baseMeetings = 32
  const projectedMeetings = Math.round(baseMeetings * multiplier.meetingRate)

  // Additional meetings beyond current
  const additionalMeetings = Math.max(0, projectedMeetings - inputs.currentMeetings)

  // Revenue potential: additional meetings * close rate * deal size * 12 months
  const additionalRevenuePotential =
    additionalMeetings * multiplier.dealCloseRate * inputs.averageDealSize * 12

  // Monthly investment (Growth tier as baseline)
  // $3,000 retainer + $300 per meeting bonus
  const monthlyRetainer = 3000
  const perMeetingBonus = 300
  const monthlyInvestment = monthlyRetainer + projectedMeetings * perMeetingBonus
  const annualInvestment = monthlyInvestment * 12

  // ROI = (Revenue - Investment) / Investment
  const roiMultiplier =
    annualInvestment > 0
      ? Math.round((additionalRevenuePotential / annualInvestment) * 10) / 10
      : 0

  // Cost savings vs hiring SDR ($120k/year average fully loaded)
  const sdrCost = 120000
  const costSavingsVsSDR = sdrCost - annualInvestment

  return {
    projectedMeetings,
    additionalMeetings,
    additionalRevenuePotential,
    roiMultiplier,
    costSavingsVsSDR,
    monthlyInvestment,
    annualInvestment,
    timeToFirstMeeting: '14 days',
  }
}

export const industryOptions = Object.entries(industryMultipliers).map(
  ([key, value]) => ({
    value: key as IndustryKey,
    label: value.name,
  })
)
