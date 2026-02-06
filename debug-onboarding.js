// Debug script to check onboarding issue
// Run with: node debug-onboarding.js

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function debugOnboarding() {
  console.log('🔍 Debugging Wryko onboarding...')
  
  try {
    // 1. Check if clients table exists and structure
    console.log('\n1. Checking clients table structure...')
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('exec_sql', { 
        sql: `SELECT column_name, data_type, is_nullable 
              FROM information_schema.columns 
              WHERE table_name = 'clients' 
              ORDER BY ordinal_position;` 
      })
    
    if (tableError) {
      console.error('❌ Table check error:', tableError)
    } else {
      console.log('✅ Clients table columns:')
      tableInfo?.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'required'})`)
      })
    }

    // 2. Try a simple insert to see what fails
    console.log('\n2. Testing minimal client insert...')
    const { data: testClient, error: insertError } = await supabase
      .from('clients')
      .insert({
        company_name: 'Test Company',
        contact_name: 'Test User',
        contact_email: 'test@example.com',
        industry: 'Technology',
        plan: 'pilot',
        status: 'onboarding',
        health_score: 80,
        mrr: 0,
        user_id: '00000000-0000-0000-0000-000000000000' // dummy UUID
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('❌ Insert test failed:', insertError)
      console.error('Error details:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      })
    } else {
      console.log('✅ Test insert successful, ID:', testClient.id)
      
      // Clean up test record
      await supabase.from('clients').delete().eq('id', testClient.id)
      console.log('🧹 Test record cleaned up')
    }

  } catch (error) {
    console.error('❌ Debug script error:', error)
  }
}

debugOnboarding()