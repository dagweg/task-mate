import { createClient } from "@supabase/supabase-js";

const supabaseURL: string = process.env.NEXT_APP_SUPABASE_URL as string
const supabaseKEY: string = process.env.NEXT_APP_SUPABASE_KEY as string

const supabase = createClient(supabaseURL, supabaseKEY)

export default supabase