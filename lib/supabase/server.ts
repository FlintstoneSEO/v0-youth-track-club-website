import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseConfig } from './config'

function createQueryResult(data: unknown = null) {
  const result = { data, error: null }
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

function createUnconfiguredServerClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      exchangeCodeForSession: async () => ({ data: { session: null }, error: null }),
    },
    from: () => createQueryResult([]),
  }
}

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  const cookieStore = await cookies()
  const { url, publishableKey } = getSupabaseConfig()

  if (!url || !publishableKey) {
    return createUnconfiguredServerClient() as any
  }

  return createServerClient(
    url,
    publishableKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // The "setAll" method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}
