import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://xumrrqoflmyguwqfasuu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1bXJycW9mbG15Z3V3cWZhc3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MzA4NDQsImV4cCI6MjA2NTIwNjg0NH0.NOW_Xo1Xd4ZgwNm47MmzwTyQwwK4N1B8230Oaj3CLrI";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;