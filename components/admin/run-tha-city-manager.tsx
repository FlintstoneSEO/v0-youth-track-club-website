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
import { Plus, Pencil, Trash2, Loader2, MapPin, Calendar, Activity } from 'lucide-react'

interface RTCEvent {
  id: string
  title: string
  description: string | null
  event_type: string
  location: string | null
  address: string | null
  meeting_point: string | null
  event_date: string
  start_time: string | null
  distance: string | null
  pace: string | null
  difficulty: string
  is_recurring: boolean
  recurrence_pattern: string | null
  registration_url: string | null
  is_published: boolean
  is_featured: boolean
  created_at: string
}

interface RunThaCityManagerProps {
  initialEvents: RTCEvent[]
}

export function RunThaCityManager({ initialEvents }: RunThaCityManagerProps) {
  const [events, setEvents] = useState(initialEvents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<RTCEvent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: 'group_run',
    location: '',
    address: '',
    meeting_point: '',
    event_date: '',
    start_time: '',
    distance: '',
    pace: '',
    difficulty: 'all_levels',
    is_recurring: false,
    recurrence_pattern: '',
    registration_url: '',
    is_published: false,
    is_featured: false,
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_type: 'group_run',
      location: '',
      address: '',
      meeting_point: '',
      event_date: '',
      start_time: '',
      distance: '',
      pace: '',
      difficulty: 'all_levels',
      is_recurring: false,
      recurrence_pattern: '',
      registration_url: '',
      is_published: false,
      is_featured: false,
    })
    setEditingEvent(null)
  }

  const openEditDialog = (event: RTCEvent) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description || '',
      event_type: event.event_type,
      location: event.location || '',
      address: event.address || '',
      meeting_point: event.meeting_point || '',
      event_date: event.event_date,
      start_time: event.start_time || '',
      distance: event.distance || '',
      pace: event.pace || '',
      difficulty: event.difficulty,
      is_recurring: event.is_recurring,
      recurrence_pattern: event.recurrence_pattern || '',
      registration_url: event.registration_url || '',
      is_published: event.is_published,
      is_featured: event.is_featured,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    const data = {
      ...formData,
      description: formData.description || null,
      location: formData.location || null,
      address: formData.address || null,
      meeting_point: formData.meeting_point || null,
      start_time: formData.start_time || null,
      distance: formData.distance || null,
      pace: formData.pace || null,
      recurrence_pattern: formData.recurrence_pattern || null,
      registration_url: formData.registration_url || null,
    }

    if (editingEvent) {
      const { error } = await supabase
        .from('run_tha_city_events')
        .update(data)
        .eq('id', editingEvent.id)

      if (!error) {
        setEvents(events.map(e => 
          e.id === editingEvent.id ? { ...e, ...data } : e
        ))
      }
    } else {
      const { data: newEvent, error } = await supabase
        .from('run_tha_city_events')
        .insert([data])
        .select()
        .single()

      if (!error && newEvent) {
        setEvents([newEvent, ...events])
      }
    }

    setIsLoading(false)
    setIsDialogOpen(false)
    resetForm()
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    const supabase = createClient()
    const { error } = await supabase.from('run_tha_city_events').delete().eq('id', id)

    if (!error) {
      setEvents(events.filter(e => e.id !== id))
      router.refresh()
    }
  }

  const togglePublished = async (event: RTCEvent) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('run_tha_city_events')
      .update({ is_published: !event.is_published })
      .eq('id', event.id)

    if (!error) {
      setEvents(events.map(e => 
        e.id === event.id ? { ...e, is_published: !event.is_published } : e
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
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? 'Edit Event' : 'New Run Tha City 517 Event'}
              </DialogTitle>
              <DialogDescription>
                {editingEvent 
                  ? 'Update the event details below'
                  : 'Create a new running group event'
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Event title"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Event description..."
                    rows={3}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Event Type</FieldLabel>
                    <Select
                      value={formData.event_type}
                      onValueChange={(value) => setFormData({ ...formData, event_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="group_run">Group Run</SelectItem>
                        <SelectItem value="race">Race</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Difficulty</FieldLabel>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_levels">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Event Date</FieldLabel>
                    <Input
                      type="date"
                      value={formData.event_date}
                      onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Start Time</FieldLabel>
                    <Input
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Distance</FieldLabel>
                    <Input
                      value={formData.distance}
                      onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                      placeholder="e.g., 5K, 3 miles"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Pace</FieldLabel>
                    <Input
                      value={formData.pace}
                      onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
                      placeholder="e.g., 9-10 min/mile"
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Location Name</FieldLabel>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Lansing River Trail"
                  />
                </Field>
                <Field>
                  <FieldLabel>Meeting Point</FieldLabel>
                  <Input
                    value={formData.meeting_point}
                    onChange={(e) => setFormData({ ...formData, meeting_point: e.target.value })}
                    placeholder="Specific meeting location"
                  />
                </Field>
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Full street address"
                  />
                </Field>
                <div className="flex items-center justify-between">
                  <Field className="flex items-center gap-3">
                    <Switch
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                    />
                    <FieldLabel className="mb-0">Published</FieldLabel>
                  </Field>
                  <Field className="flex items-center gap-3">
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <FieldLabel className="mb-0">Featured</FieldLabel>
                  </Field>
                </div>
              </FieldGroup>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingEvent ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No Run Tha City 517 events yet. Create your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-accent" />
                      {event.title}
                      {event.is_featured && (
                        <span className="text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full">
                          Featured
                        </span>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.event_date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                      {event.start_time && ` at ${event.start_time}`}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    )}
                    {(event.distance || event.pace) && (
                      <p className="text-sm text-muted-foreground">
                        {event.distance && `Distance: ${event.distance}`}
                        {event.distance && event.pace && ' | '}
                        {event.pace && `Pace: ${event.pace}`}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                      event.event_type === 'group_run' ? 'bg-green-100 text-green-700' :
                      event.event_type === 'race' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {event.event_type.replace('_', ' ')}
                    </span>
                    <Switch
                      checked={event.is_published}
                      onCheckedChange={() => togglePublished(event)}
                    />
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(event)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {event.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.description}
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
