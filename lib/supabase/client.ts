import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseConfig } from './config'

const missingConfigError = {
  message:
    'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local.',
}

function createRejectedQuery() {
  const result = { data: null, error: missingConfigError }
  const query = {
    select: () => query,
    insert: () => query,
    update: () => query,
    delete: () => query,
    eq: () => query,
    gte: () => query,
    order: () => query,
    limit: () => query,
    single: () => Promise.resolve(result),
    then: (
      resolve: (value: typeof result) => unknown,
      reject?: (reason?: unknown) => unknown,
    ) => Promise.resolve(result).then(resolve, reject),
  }

  return query
}

function createUnconfiguredBrowserClient() {
  return {
    auth: {
      signInWithPassword: async () => ({ data: { session: null }, error: missingConfigError }),
      resetPasswordForEmail: async () => ({ data: null, error: missingConfigError }),
      updateUser: async () => ({ data: null, error: missingConfigError }),
      signOut: async () => ({ error: missingConfigError }),
    },
    from: () => createRejectedQuery(),
  }
}

export function createClient() {
  const { url, publishableKey } = getSupabaseConfig()

  if (!url || !publishableKey) {
    return createUnconfiguredBrowserClient() as any
  }

  return createBrowserClient(url, publishableKey)
}
