/**
 * Determines the correct post-login destination based on user role and onboarding status.
 */
export function getDestinationByRole(
  role: string | undefined | null,
  onboardingCompleted?: boolean
): string {
  if (role === 'admin') return '/admin'
  if (!onboardingCompleted) return '/onboarding'
  return '/dashboard'
}
