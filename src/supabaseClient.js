import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vzeeqwijvyrakwloxlql.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6ZWVxd2lqdnlyYWt3bG94bHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NDgzNTIsImV4cCI6MjA4NzIyNDM1Mn0.gtOLIwrXqohXiLp60FPTLpf5aPmGzvQ9xLTA6f6QIHw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)