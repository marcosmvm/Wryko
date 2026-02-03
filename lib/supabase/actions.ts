'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getDestinationByRole } from '@/lib/auth/redirect'

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: signInData } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  const destination = getDestinationByRole(
    signInData.user?.user_metadata?.role,
    signInData.user?.user_metadata?.onboarding_completed
  )
  redirect(destination)
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const company = formData.get('company') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        company: company,
        role: 'client', // Default role for new users
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, message: 'Check your email to verify your account' }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function resetPasswordForEmail(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, message: 'Check your email for the reset link' }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/login?message=Password updated successfully')
}

export async function changePassword(newPassword: string, confirmPassword: string) {
  const supabase = await createClient()

  if (newPassword !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (newPassword.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updateUserProfile(data: {
  full_name?: string
  company?: string
  phone?: string
  website?: string
  avatar_url?: string
  notification_prefs?: Record<string, boolean>
  calendar_prefs?: Record<string, string>
}) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    data,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function completeOnboarding(data: {
  companyName: string
  contactName: string
  contactEmail: string
  industry: string
  website?: string
  phone?: string
  companySize?: string
  hasInstantly: boolean
  instantlyApiKey?: string
  blockedDomains?: string
  blockedCountries?: string
  defaultNiche: string
  nicheDefinitions?: string
  targetIcp?: string
}): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient()

  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return { error: 'Not authenticated' }
  }

  // Parse niche definitions if provided
  let parsedNicheDefinitions = null
  if (data.nicheDefinitions) {
    try {
      parsedNicheDefinitions = JSON.parse(data.nicheDefinitions)
    } catch {
      return { error: 'Invalid niche definitions JSON' }
    }
  }

  // Create client record in database
  const { data: clientRecord, error: clientError } = await supabase
    .from('clients')
    .insert({
      company_name: data.companyName,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      phone: data.phone || null,
      plan: 'pilot',
      status: 'onboarding',
      health_score: 80,
      mrr: 0,
      industry: data.industry,
      website: data.website || null,
      has_instantly: data.hasInstantly,
      instantly_api_key: data.instantlyApiKey || null,
      blocked_domains: data.blockedDomains || null,
      blocked_countries: data.blockedCountries || null,
      default_niche: data.defaultNiche,
      niche_definitions: parsedNicheDefinitions,
      target_icp: data.targetIcp || null,
      company_size: data.companySize || null,
      user_id: user.id,
      onboarding_started_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (clientError) {
    console.error('[Onboarding] Error creating client record:', clientError)
    return { error: 'Failed to create your account. Please try again.' }
  }

  // Update user metadata to mark onboarding as complete
  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      onboarding_completed: true,
      client_id: clientRecord.id,
    },
  })

  if (metadataError) {
    console.error('[Onboarding] Error updating user metadata:', metadataError)
    // Non-critical: client record exists, proceed anyway
  }

  // Trigger n8n Engine G webhook (non-blocking)
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    if (webhookUrl) {
      fetch(`${webhookUrl}/engine-g-onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientRecord.id,
          client_name: data.companyName,
          contact_name: data.contactName,
          contact_email: data.contactEmail,
          industry: data.industry,
          has_instantly: data.hasInstantly,
          instantly_api_key: data.instantlyApiKey || null,
          blocked_domains: data.blockedDomains || null,
          blocked_countries: data.blockedCountries || null,
          default_niche: data.defaultNiche,
          niche_definitions: parsedNicheDefinitions,
          target_icp: data.targetIcp || null,
        }),
      }).catch((err) => {
        console.error('[Onboarding] n8n webhook error:', err)
      })
    }
  } catch (err) {
    console.error('[Onboarding] n8n webhook error:', err)
    // Non-blocking: don't fail onboarding if webhook fails
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { error: error?.message || 'Not authenticated' }
  }

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email || '',
      full_name: user.user_metadata?.full_name || '',
      company: user.user_metadata?.company || '',
      phone: user.user_metadata?.phone || '',
      website: user.user_metadata?.website || '',
      role: user.user_metadata?.role || 'client',
      avatar_url: user.user_metadata?.avatar_url || '',
      notification_prefs: user.user_metadata?.notification_prefs || {},
      calendar_prefs: user.user_metadata?.calendar_prefs || {},
    },
  }
}
