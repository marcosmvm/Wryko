'use client'

import { useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { isFounder, getFounderMetadata } from './founder'

// Hook to automatically upgrade founder account with super-user permissions
export function useFounderUpgrade() {
  useEffect(() => {
    async function upgradeFounderAccount() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user || !isFounder(user.email)) return

      // Check if founder metadata is already set
      const currentRole = user.user_metadata?.role
      const isCurrentlyFounder = currentRole === 'founder'

      if (!isCurrentlyFounder) {
        console.log('🔑 Upgrading founder account with super-user permissions...')
        
        try {
          // Update user metadata to mark as founder
          const { error: updateError } = await supabase.auth.updateUser({
            data: getFounderMetadata(user.email!)
          })

          if (updateError) {
            console.error('Failed to upgrade founder account:', updateError)
          } else {
            console.log('✅ Founder account upgraded successfully')
            // Refresh the page to apply new permissions
            window.location.reload()
          }
        } catch (err) {
          console.error('Error upgrading founder account:', err)
        }
      }
    }

    upgradeFounderAccount()
  }, [])
}