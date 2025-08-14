import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper functions for common operations
export const auth = {
  // Sign up new user
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Sign in existing user
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  // Get current session
  getCurrentSession: () => {
    return supabase.auth.getSession()
  }
}

// Database helper functions
export const db = {
  // Properties
  properties: {
    getAll: async (userId) => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    create: async (propertyData) => {
      const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
      return { data, error }
    },

    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()
      return { data, error }
    },

    delete: async (id) => {
      const { data, error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)
      return { data, error }
    }
  },

  // Tenants
  tenants: {
    getAll: async (landlordId) => {
      const { data, error } = await supabase
        .from('tenants')
        .select(`
          *,
          properties (
            name,
            address
          )
        `)
        .eq('landlord_id', landlordId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    create: async (tenantData) => {
      const { data, error } = await supabase
        .from('tenants')
        .insert([tenantData])
        .select()
      return { data, error }
    },

    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('tenants')
        .update(updates)
        .eq('id', id)
        .select()
      return { data, error }
    }
  },

  // Maintenance Requests
  maintenance: {
    getAll: async (landlordId) => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select(`
          *,
          properties (
            name,
            address
          ),
          tenants (
            full_name,
            phone
          )
        `)
        .eq('landlord_id', landlordId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    create: async (requestData) => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .insert([requestData])
        .select()
      return { data, error }
    },

    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .update(updates)
        .eq('id', id)
        .select()
      return { data, error }
    }
  },

  // Messages
  messages: {
    getConversation: async (userId, otherUserId) => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`)
        .order('created_at', { ascending: true })
      return { data, error }
    },

    send: async (messageData) => {
      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select()
      return { data, error }
    },

    markAsRead: async (messageId) => {
      const { data, error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
      return { data, error }
    }
  },

  // Profiles
  profiles: {
    get: async (userId) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      return { data, error }
    },

    create: async (profileData) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
      return { data, error }
    },

    update: async (userId, updates) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
      return { data, error }
    }
  }
}

// Real-time subscriptions
export const realtime = {
  // Subscribe to messages
  subscribeToMessages: (userId, callback) => {
    return supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to maintenance requests
  subscribeToMaintenance: (landlordId, callback) => {
    return supabase
      .channel('maintenance')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'maintenance_requests',
          filter: `landlord_id=eq.${landlordId}`
        },
        callback
      )
      .subscribe()
  }
}

export default supabase

