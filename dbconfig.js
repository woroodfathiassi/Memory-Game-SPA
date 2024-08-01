import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://gopgepoflqdjcitxqxbk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcGdlcG9mbHFkamNpdHhxeGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzMjA5MTQsImV4cCI6MjAzNzg5NjkxNH0.q73Oyfyo4I8dVZpEy7mxJzLubUM_ULp6zuDiD4dJIq0'
const supabase = createClient(supabaseUrl, supabaseKey);

async function insertGameScore(name1, name2, score1, score2) {
    const { data, error } = await supabase
        .from('gameScore')
        .insert([{ player1: name1, player2: name2, score1: score1, score2: score2 }])  // Insert a new user with name and score
    
    if (error) {
        console.error('Error inserting user:', error)
        return null
    }
    
    return data
}

async function getAllGames() {
    const { data, error } = await supabase
        .from('gameScore')
        .select('*')

    if (error) {
        console.error('Error fetching users:', error)
        return []
    }

    return data
}

export { getAllGames, insertGameScore };