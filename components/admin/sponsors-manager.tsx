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
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Building2 } from 'lucide-react'

interface Sponsor {
  id: string
  name: string
  description: string | null
  logo_url: string | null
  website_url: string | null
  sponsor_level: string
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  start_date: string | null
  end_date: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

interface SponsorsManagerProps {
  initialSponsors: Sponsor[]
}

export function SponsorsManager({ initialSponsors }: SponsorsManagerProps) {
  const [sponsors, setSponsors] = useState(initialSponsors)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: '',
    website_url: '',
    sponsor_level: 'bronze',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    start_date: '',
    end_date: '',
    is_active: true,
    sort_order: 0,
  })

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      logo_url: '',
      website_url: '',
      sponsor_level: 'bronze',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      start_date: '',
      end_date: '',
      is_active: true,
      sort_order: sponsors.length,
    })
    setEditingSponsor(null)
  }

  const openEditDialog = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor)
    setFormData({
      name: sponsor.name,
      description: sponsor.description || '',
      logo_url: sponsor.logo_url || '',
      website_url: sponsor.website_url || '',
      sponsor_level: sponsor.sponsor_level,
      contact_name: sponsor.contact_name || '',
      contact_email: sponsor.contact_email || '',
      contact_phone: sponsor.contact_phone || '',
      start_date: sponsor.start_date || '',
      end_date: sponsor.end_date || '',
      is_active: sponsor.is_active,
      sort_order: sponsor.sort_order,
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
      logo_url: formData.logo_url || null,
      website_url: formData.website_url || null,
      contact_name: formData.contact_name || null,
      contact_email: formData.contact_email || null,
      contact_phone: formData.contact_phone || null,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
    }

    if (editingSponsor) {
      const { error } = await supabase
        .from('sponsors')
        .update(data)
        .eq('id', editingSponsor.id)

      if (!error) {
        setSponsors(sponsors.map(s => 
          s.id === editingSponsor.id ? { ...s, ...data } : s
        ))
      }
    } else {
      const { data: newSponsor, error } = await supabase
        .from('sponsors')
        .insert([data])
        .select()
        .single()

      if (!error && newSponsor) {
        setSponsors([...sponsors, newSponsor])
      }
    }

    setIsLoading(false)
    setIsDialogOpen(false)
    resetForm()
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sponsor?')) return

    const supabase = createClient()
    const { error } = await supabase.from('sponsors').delete().eq('id', id)

    if (!error) {
      setSponsors(sponsors.filter(s => s.id !== id))
      router.refresh()
    }
  }

  const toggleActive = async (sponsor: Sponsor) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('sponsors')
      .update({ is_active: !sponsor.is_active })
      .eq('id', sponsor.id)

    if (!error) {
      setSponsors(sponsors.map(s => 
        s.id === sponsor.id ? { ...s, is_active: !sponsor.is_active } : s
      ))
      router.refresh()
    }
  }

  const levelColors: Record<string, string> = {
    title: 'bg-purple-100 text-purple-700',
    platinum: 'bg-slate-100 text-slate-700',
    gold: 'bg-yellow-100 text-yellow-700',
    silver: 'bg-gray-100 text-gray-600',
    bronze: 'bg-orange-100 text-orange-700',
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
              Add Sponsor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSponsor ? 'Edit Sponsor' : 'New Sponsor'}
              </DialogTitle>
              <DialogDescription>
                {editingSponsor 
                  ? 'Update the sponsor details below'
                  : 'Add a new club sponsor'
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Sponsor Name</FieldLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Company or organization name"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the sponsor..."
                    rows={2}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Sponsor Level</FieldLabel>
                    <Select
                      value={formData.sponsor_level}
                      onValueChange={(value) => setFormData({ ...formData, sponsor_level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="title">Title Sponsor</SelectItem>
                        <SelectItem value="platinum">Platinum</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="bronze">Bronze</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Sort Order</FieldLabel>
                    <Input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                      min={0}
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Logo URL</FieldLabel>
                  <Input
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    placeholder="https://..."
                  />
                </Field>
                <Field>
                  <FieldLabel>Website URL</FieldLabel>
                  <Input
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    placeholder="https://..."
                  />
                </Field>
                <div className="grid grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel>Contact Name</FieldLabel>
                    <Input
                      value={formData.contact_name}
                      onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                      placeholder="Contact person"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Contact Email</FieldLabel>
                    <Input
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Contact Phone</FieldLabel>
                    <Input
                      type="tel"
                      value={formData.contact_phone}
                      onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                      placeholder="(555) 555-5555"
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Start Date</FieldLabel>
                    <Input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>End Date</FieldLabel>
                    <Input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                  </Field>
                </div>
                <Field className="flex items-center justify-between">
                  <FieldLabel className="mb-0">Active</FieldLabel>
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                </Field>
              </FieldGroup>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingSponsor ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sponsors List */}
      {sponsors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No sponsors yet. Add your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sponsors.map((sponsor) => (
            <Card key={sponsor.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      {sponsor.logo_url ? (
                        <img 
                          src={sponsor.logo_url} 
                          alt={sponsor.name}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <Building2 className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {sponsor.name}
                        {sponsor.website_url && (
                          <a 
                            href={sponsor.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </CardTitle>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${levelColors[sponsor.sponsor_level]}`}>
                        {sponsor.sponsor_level === 'title' ? 'Title Sponsor' : sponsor.sponsor_level}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={sponsor.is_active}
                      onCheckedChange={() => toggleActive(sponsor)}
                    />
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(sponsor)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(sponsor.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {(sponsor.description || sponsor.contact_email) && (
                <CardContent>
                  {sponsor.description && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {sponsor.description}
                    </p>
                  )}
                  {sponsor.contact_email && (
                    <p className="text-xs text-muted-foreground">
                      Contact: {sponsor.contact_name && `${sponsor.contact_name} - `}
                      {sponsor.contact_email}
                    </p>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
