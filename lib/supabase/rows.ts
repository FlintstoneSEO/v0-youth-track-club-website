export type SupabaseRow = Record<string, any>

export interface PracticeSchedule {
  id: string
  day_of_week: string
  start_time: string
  end_time: string
  location_name: string
  address: string
  notes: string | null
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}
