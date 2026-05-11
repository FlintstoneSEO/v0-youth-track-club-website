'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Plus, Pencil, Trash2, Loader2, MapPin, Clock, GripVertical } from 'lucide-react'
import type { PracticeSchedule } from '@/lib/supabase/rows'

interface PracticeSchedulesManagerProps {
  initialSchedules: PracticeSchedule[]
}

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export function PracticeSchedulesManager({ initialSchedules }: PracticeSchedulesManagerProps) {
  const [schedules, setSchedules] = useState(initialSchedules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<PracticeSchedule | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    day_of_week: 'Monday',
    start_time: '18:00',
    end_time: '19:30',
    location_name: '',
    address: '',
    notes: '',
    is_active: true,
    display_order: 0,
  })

  const resetForm = () => {
    setFormData({
      day_of_week: 'Monday',
      start_time: '18:00',
      end_time: '19:30',
      location_name: '',
      address: '',
      notes: '',
      is_active: true,
      display_order: schedules.length,
    })
    setEditingSchedule(null)
  }

  const openEditDialog = (schedule: PracticeSchedule) => {
    setEditingSchedule(schedule)
    // Convert display time format to 24h for input
    const convertTo24h = (time: string) => {
      const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
      if (match) {
        let hour = parseInt(match[1])
        const min = match[2]
        const period = match[3].toUpperCase()
        if (period === 'PM' && hour !== 12) hour += 12
        if (period === 'AM' && hour === 12) hour = 0
        return `${hour.toString().padStart(2, '0')}:${min}`
      }
      return time
    }
    setFormData({
      day_of_week: schedule.day_of_week,
      start_time: convertTo24h(schedule.start_time),
      end_time: convertTo24h(schedule.end_time),
      location_name: schedule.location_name,
      address: schedule.address,
      notes: schedule.notes || '',
      is_active: schedule.is_active,
      display_order: schedule.display_order,
    })
    setIsDialogOpen(true)
  }

  // Convert 24h time to 12h display format
  const formatTimeForDisplay = (time24: string) => {
    const [hours, minutes] = time24.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 || 12
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    const data = {
      day_of_week: formData.day_of_week,
      start_time: formatTimeForDisplay(formData.start_time),
      end_time: formatTimeForDisplay(formData.end_time),
      location_name: formData.location_name,
      address: formData.address,
      notes: formData.notes || null,
      is_active: formData.is_active,
      display_order: formData.display_order,
    }

    if (editingSchedule) {
      const { error } = await supabase
        .from('practice_schedules')
        .update(data)
        .eq('id', editingSchedule.id)

      if (!error) {
        setSchedules(schedules.map(s => 
          s.id === editingSchedule.id ? { ...s, ...data } : s
        ))
      }
    } else {
      const { data: newSchedule, error } = await supabase
        .from('practice_schedules')
        .insert([data])
        .select()
        .single()

      if (!error && newSchedule) {
        setSchedules([...schedules, newSchedule].sort((a, b) => a.display_order - b.display_order))
      }
    }

    setIsLoading(false)
    setIsDialogOpen(false)
    resetForm()
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this practice schedule?')) return

    const supabase = createClient()
    const { error } = await supabase.from('practice_schedules').delete().eq('id', id)

    if (!error) {
      setSchedules(schedules.filter(s => s.id !== id))
      router.refresh()
    }
  }

  const toggleActive = async (schedule: PracticeSchedule) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('practice_schedules')
      .update({ is_active: !schedule.is_active })
      .eq('id', schedule.id)

    if (!error) {
      setSchedules(schedules.map(s => 
        s.id === schedule.id ? { ...s, is_active: !schedule.is_active } : s
      ))
      router.refresh()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Practice Day
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingSchedule ? 'Edit Practice Schedule' : 'New Practice Day'}
              </DialogTitle>
              <DialogDescription>
                {editingSchedule 
                  ? 'Update the practice schedule details below'
                  : 'Add a new practice day and time'
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Day of Week</FieldLabel>
                  <Select
                    value={formData.day_of_week}
                    onValueChange={(value) => setFormData({ ...formData, day_of_week: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS_OF_WEEK.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Start Time</FieldLabel>
                    <Input
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel>End Time</FieldLabel>
                    <Input
                      type="time"
                      value={formData.end_time}
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                      required
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Location Name</FieldLabel>
                  <Input
                    value={formData.location_name}
                    onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                    placeholder="e.g., Alfreda Schmidt Community Center Track"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="5825 Wise Rd, Lansing, MI 48911"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Notes (Optional)</FieldLabel>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any additional notes about this practice..."
                    rows={2}
                  />
                </Field>
                <Field>
                  <FieldLabel>Display Order</FieldLabel>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    min={0}
                  />
                </Field>
                <Field className="flex items-center gap-3">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <FieldLabel className="mb-0">Active</FieldLabel>
                </Field>
              </FieldGroup>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingSchedule ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Schedules List */}
      {schedules.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No practice schedules yet. Add your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {schedules.sort((a, b) => a.display_order - b.display_order).map((schedule) => (
            <Card key={schedule.id} className={!schedule.is_active ? 'opacity-60' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-muted-foreground cursor-grab">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {schedule.day_of_week}
                        {!schedule.is_active && (
                          <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                            Inactive
                          </span>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {schedule.start_time} - {schedule.end_time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {schedule.location_name}
                      </div>
                      <div className="text-xs text-muted-foreground pl-6">
                        {schedule.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={schedule.is_active}
                      onCheckedChange={() => toggleActive(schedule)}
                    />
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(schedule)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(schedule.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {schedule.notes && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {schedule.notes}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
