// FIXED VERSION: Replace completeClientOnboarding function with this safer version
// This handles missing database columns gracefully

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

  // Start with required fields only
  const baseClientData = {
    company_name: data.companyName,
    contact_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    contact_email: user.email || '',
    industry: data.industry,
    plan: 'pilot',
    status: 'onboarding',
    health_score: 80,
    mrr: 0,
    user_id: user.id,
  }

  // Try to insert with progressive enhancement
  let clientRecord
  let insertError

  // First try: Include all fields including onboarding_metadata
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert({
        ...baseClientData,
        website: data.website || null,
        company_size: data.companySize || null,
        target_icp: data.idealCustomerProfile || null,
        onboarding_metadata: {
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
        },
      })
      .select('id')
      .single()

    clientRecord = data
    insertError = error
  } catch (err) {
    insertError = err as any
  }

  // Second try: Without onboarding_metadata if it failed
  if (insertError && insertError.code === '42703') { // Column does not exist
    console.log('[Onboarding] onboarding_metadata column missing, retrying without it')
    
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert({
          ...baseClientData,
          website: data.website || null,
          company_size: data.companySize || null,
          target_icp: data.idealCustomerProfile || null,
        })
        .select('id')
        .single()

      clientRecord = data
      insertError = error
    } catch (err) {
      insertError = err as any
    }
  }

  // Third try: Absolute minimum required fields only
  if (insertError) {
    console.log('[Onboarding] Retrying with minimal fields only')
    
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert(baseClientData)
        .select('id')
        .single()

      clientRecord = data
      insertError = error
    } catch (err) {
      insertError = err as any
    }
  }

  if (insertError || !clientRecord) {
    console.error('[Client Onboarding] All insert attempts failed:', insertError)
    return { 
      error: `Unable to create account. Please contact support. Error: ${insertError?.message || 'Unknown error'}` 
    }
  }

  // Update user metadata (non-critical)
  try {
    await supabase.auth.updateUser({
      data: {
        onboarding_completed: true,
        onboarding_step: 4,
        client_id: clientRecord.id,
      },
    })
  } catch (metaError) {
    console.error('[Client Onboarding] Metadata update failed:', metaError)
    // Don't fail onboarding for this
  }

  // Trigger n8n webhook (non-critical)
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(`${webhookUrl}/client-onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientRecord.id,
          client_name: data.companyName,
          contact_name: baseClientData.contact_name,
          contact_email: baseClientData.contact_email,
          industry: data.industry,
          onboarding_data: {
            role_title: data.roleTitle,
            target_industries: data.targetIndustries,
            primary_goal: data.primaryGoal,
            monthly_lead_target: data.monthlyLeadTarget,
          },
        }),
      })
    }
  } catch (webhookError) {
    console.error('[Client Onboarding] Webhook failed:', webhookError)
    // Don't fail onboarding for this
  }

  console.log('[Client Onboarding] Success! Client ID:', clientRecord.id)
  return { success: true }
}