'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface ClientRecord {
  id: string
  company_name: string
  contact_name: string
  contact_email: string
  phone: string | null
  plan: string
  status: string
  health_score: number
  mrr: number
  notes: string | null
  created_at: string
  updated_at: string
}

export async function getClients(): Promise<{ data: ClientRecord[] | null; error: string | null }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: data as ClientRecord[], error: null }
}

export async function getClientById(id: string): Promise<{ data: ClientRecord | null; error: string | null }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: data as ClientRecord, error: null }
}

export async function createClientRecord(formData: {
  companyName: string
  contactName: string
  contactEmail: string
  phone?: string
  plan: string
  notes?: string
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.from('clients').insert({
    company_name: formData.companyName,
    contact_name: formData.contactName,
    contact_email: formData.contactEmail,
    phone: formData.phone || null,
    plan: formData.plan,
    status: 'onboarding',
    health_score: 80,
    mrr: formData.plan === 'founding_partner' ? 2000 : formData.plan === 'growth' ? 3500 : 5000,
    notes: formData.notes || null,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/clients')
  return { success: true }
}

export async function updateClientRecord(
  id: string,
  data: {
    company_name?: string
    contact_name?: string
    contact_email?: string
    phone?: string
    plan?: string
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('clients')
    .update(data)
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/clients')
  revalidatePath(`/admin/clients/${id}`)
  return { success: true }
}

export async function pauseClient(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('clients')
    .update({ status: 'paused' })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/clients')
  revalidatePath(`/admin/clients/${id}`)
  return { success: true }
}

export async function reactivateClient(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('clients')
    .update({ status: 'active' })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/clients')
  revalidatePath(`/admin/clients/${id}`)
  return { success: true }
}

export async function getClientStats(): Promise<{
  totalClients: number
  activeClients: number
  totalMrr: number
  error: string | null
}> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clients')
    .select('status, mrr')

  if (error) {
    return { totalClients: 0, activeClients: 0, totalMrr: 0, error: error.message }
  }

  const clients = data || []
  return {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'active').length,
    totalMrr: clients.reduce((sum, c) => sum + (Number(c.mrr) || 0), 0),
    error: null,
  }
}
