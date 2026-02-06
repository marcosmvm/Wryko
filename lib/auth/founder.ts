// Founder super-user utilities
// Marcos Matthews gets universal access to all parts of the platform

const FOUNDER_EMAIL = 'marcos@wryko.com'
const FOUNDER_EMAILS = [
  'marcos@wryko.com',
  'marcosmatthews@icloud.com', 
  'marcosvm@gmail.com',
  'marcos@xgrowthos.com',
  // Add more founder emails as needed
]

export function isFounder(email: string | null | undefined): boolean {
  if (!email) return false
  return FOUNDER_EMAILS.includes(email.toLowerCase())
}

export function isFounderUser(user: any): boolean {
  return user && isFounder(user.email)
}

export function hasFounderAccess(user: any): boolean {
  return isFounderUser(user)
}

// Founder bypass for auth checks
export function shouldBypassAuth(email: string | null | undefined, pathname: string): boolean {
  if (!email || !isFounder(email)) return false
  
  // Founder can access everything except auth pages when logged in
  return true
}

// Get founder role for routing
export function getFounderDestination(pathname: string): string | null {
  // Allow founder to stay on current path unless it's an auth page
  if (pathname === '/login' || pathname === '/register') {
    return '/dashboard' // Default destination
  }
  
  // Allow founder to stay on any other page
  return null
}

export const FOUNDER_PERMISSIONS = {
  // Admin portal access
  admin: true,
  
  // Client portal access (can see all clients)
  client: true,
  
  // Marketing site access
  marketing: true,
  
  // Bypass onboarding
  bypassOnboarding: true,
  
  // View all data
  viewAllClients: true,
  viewAllCampaigns: true,
  viewAllAnalytics: true,
  
  // Modify all data
  modifyAllClients: true,
  modifyAllCampaigns: true,
  modifySystemSettings: true,
}

// Helper to mark user as founder in metadata
export function getFounderMetadata(email: string) {
  if (!isFounder(email)) return {}
  
  return {
    role: 'founder',
    is_founder: true,
    onboarding_completed: true,
    permissions: FOUNDER_PERMISSIONS,
    super_user: true,
  }
}