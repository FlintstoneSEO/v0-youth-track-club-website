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
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'

interface Announcement {
  id: string
  title: string
  content: string
  priority: string
  is_published: boolean
  published_at: string | null
  expires_at: string | null
  created_at: string
}

interface AnnouncementsManagerProps {
  initialAnnouncements: Announcement[]
}

export function AnnouncementsManager({ initialAnnouncements }: AnnouncementsManagerProps) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'normal',
    is_published: false,
    expires_at: '',
  })

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'normal',
      is_published: false,
      expires_at: '',
    })
    setEditingAnnouncement(null)
  }

  const openEditDialog = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
      is_published: announcement.is_published,
      expires_at: announcement.expires_at?.split('T')[0] || '',
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    const data = {
      ...formData,
      published_at: formData.is_published ? new Date().toISOString() : null,
      expires_at: formData.expires_at || null,
    }

    if (editingAnnouncement) {
      const { error } = await supabase
        .from('announcements')
        .update(data)
        .eq('id', editingAnnouncement.id)

      if (!error) {
        setAnnouncements(announcements.map(a => 
          a.id === editingAnnouncement.id ? { ...a, ...data } : a
        ))
      }
    } else {
      const { data: newAnnouncement, error } = await supabase
        .from('announcements')
        .insert([data])
        .select()
        .single()

      if (!error && newAnnouncement) {
        setAnnouncements([newAnnouncement, ...announcements])
      }
    }

    setIsLoading(false)
    setIsDialogOpen(false)
    resetForm()
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return

    const supabase = createClient()
    const { error } = await supabase.from('announcements').delete().eq('id', id)

    if (!error) {
      setAnnouncements(announcements.filter(a => a.id !== id))
      router.refresh()
    }
  }

  const togglePublished = async (announcement: Announcement) => {
    const supabase = createClient()
    const newPublishedState = !announcement.is_published
    
    const { error } = await supabase
      .from('announcements')
      .update({ 
        is_published: newPublishedState,
        published_at: newPublishedState ? new Date().toISOString() : null
      })
      .eq('id', announcement.id)

    if (!error) {
      setAnnouncements(announcements.map(a => 
        a.id === announcement.id 
          ? { ...a, is_published: newPublishedState, published_at: newPublishedState ? new Date().toISOString() : null }
          : a
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
              Add Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAnnouncement ? 'Edit Announcement' : 'New Announcement'}
              </DialogTitle>
              <DialogDescription>
                {editingAnnouncement 
                  ? 'Update the announcement details below'
                  : 'Create a new announcement for the club'
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
                    placeholder="Announcement title"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Content</FieldLabel>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Announcement content..."
                    rows={5}
                    required
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Priority</FieldLabel>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Expires On (Optional)</FieldLabel>
                    <Input
                      type="date"
                      value={formData.expires_at}
                      onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                    />
                  </Field>
                </div>
                <Field className="flex items-center justify-between">
                  <FieldLabel className="mb-0">Publish immediately</FieldLabel>
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                </Field>
              </FieldGroup>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingAnnouncement ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No announcements yet. Create your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        announcement.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                        announcement.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        announcement.priority === 'normal' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {announcement.priority}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        announcement.is_published 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {announcement.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={announcement.is_published}
                      onCheckedChange={() => togglePublished(announcement)}
                    />
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(announcement)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(announcement.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {announcement.content}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Created: {new Date(announcement.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
