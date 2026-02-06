export interface BusinessProfileData {
  companyName: string
  industry: string
  website: string
  companySize: string
  roleTitle: string
}

export interface TargetAudienceData {
  idealCustomerProfile: string
  targetIndustries: string[]
  targetCompanySize: string
  targetGeographies: string[]
  primaryGoal: 'meetings' | 'leads' | 'brand_awareness' | 'pipeline_growth' | ''
}

export interface CampaignPrefsData {
  monthlyLeadTarget: string
  communicationStyle: 'professional' | 'conversational' | 'direct' | ''
  excludedDomains: string[]
  existingTools: string[]
  calendarLink: string
}

export type ClientOnboardingData = {
  businessProfile: BusinessProfileData
  targetAudience: TargetAudienceData
  campaignPrefs: CampaignPrefsData
}
