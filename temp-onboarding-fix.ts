// Temporary fix for completeClientOnboarding function
// Replace the function in lib/supabase/actions.ts with this version

export async function completeClientOnboarding(data: {
  companyName: string
  industry: string
  website?: string
  companySize?: string
  roleTitle?: string
  idealCustomerProfile?: string
  targetIndustries?: string[]
  targetCompanySize?: string
  targetGeographies?: string[]
  primaryGoal?: string
  monthlyLeadTarget?: string
  communicationStyle?: string
  excludedDomains?: string[]
  existingTools?: string[]
  calendarLink?: string
}): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return { error: 'Not authenticated' }
  }

  // Try with minimal required fields first
  const minimalClient = {
    company_name: data.companyName,
    contact_name: user.user_metadata?.full_name || 'User',
    contact_email: user.email,
    industry: data.industry,
    plan: 'pilot',
    status: 'onboarding',
    health_score: 80,
    mrr: 0,
    user_id: user.id,
  }

  // Add optional fields that exist in the database
  const optionalFields: any = {}
  
  if (data.website) optionalFields.website = data.website
  if (data.companySize) optionalFields.company_size = data.companySize
  if (data.idealCustomerProfile) optionalFields.target_icp = data.idealCustomerProfile

  // Try to add onboarding_metadata if column exists
  try {
    optionalFields.onboarding_metadata = {
      role_title: data.roleTitle || null,
      target_industries: data.targetIndustries || [],
      target_company_size: data.targetCompanySize || null,
      target_geographies: data.targetGeographies || [],
      primary_goal: data.primaryGoal || null,
      monthly_lead_target: data.monthlyLeadTarget || null,
      communication_style: data.communicationStyle || null,
      excluded_domains: data.excludedDomains || [],
      existing_tools: data.existingTools || [],
      calendar_link: data.calendarLink || null,
    }
  } catch (e) {
    console.log('onboarding_metadata column not available, skipping')
  }

  const { data: clientRecord, error: clientError } = await supabase
    .from('clients')
    .insert({
      ...minimalClient,
      ...optionalFields,
    })
    .select('id')
    .single()

  if (clientError) {
    console.error('[Client Onboarding] Error details:', {
      code: clientError.code,
      message: clientError.message,
      details: clientError.details,
      hint: clientError.hint
    })
    return { error: `Database error: ${clientError.message}` }
  }

  // Update user metadata
  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      onboarding_completed: true,
      onboarding_step: 4,
      client_id: clientRecord.id,
    },
  })

  if (metadataError) {
    console.error('[Client Onboarding] Metadata error:', metadataError)
  }

  return { success: true }
}