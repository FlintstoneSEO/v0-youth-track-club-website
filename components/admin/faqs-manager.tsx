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

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  sort_order: number
  is_published: boolean
  created_at: string
}

interface FaqsManagerProps {
  initialFaqs: FAQ[]
}

export function FaqsManager({ initialFaqs }: FaqsManagerProps) {
  const [faqs, setFaqs] = useState(initialFaqs)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
    sort_order: 0,
    is_published: true,
  })

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'general',
      sort_order: faqs.length,
      is_published: true,
    })
    setEditingFaq(null)
  }

  const openEditDialog = (faq: FAQ) => {
    setEditingFaq(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sort_order: faq.sort_order,
      is_published: faq.is_published,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    if (editingFaq) {
      const { error } = await supabase
        .from('faqs')
        .update(formData)
        .eq('id', editingFaq.id)

      if (!error) {
        setFaqs(faqs.map(f => 
          f.id === editingFaq.id ? { ...f, ...formData } : f
        ))
      }
    } else {
      const { data: newFaq, error } = await supabase
        .from('faqs')
        .insert([formData])
        .select()
        .single()

      if (!error && newFaq) {
        setFaqs([...faqs, newFaq])
      }
    }

    setIsLoading(false)
    setIsDialogOpen(false)
    resetForm()
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    const supabase = createClient()
    const { error } = await supabase.from('faqs').delete().eq('id', id)

    if (!error) {
      setFaqs(faqs.filter(f => f.id !== id))
      router.refresh()
    }
  }

  const togglePublished = async (faq: FAQ) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('faqs')
      .update({ is_published: !faq.is_published })
      .eq('id', faq.id)

    if (!error) {
      setFaqs(faqs.map(f => 
        f.id === faq.id ? { ...f, is_published: !faq.is_published } : f
      ))
      router.refresh()
    }
  }

  const categoryLabels: Record<string, string> = {
    general: 'General',
    registration: 'Registration',
    practices: 'Practices',
    meets: 'Meets',
    equipment: 'Equipment',
    other: 'Other',
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
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingFaq ? 'Edit FAQ' : 'New FAQ'}
              </DialogTitle>
              <DialogDescription>
                {editingFaq 
                  ? 'Update the FAQ details below'
                  : 'Add a new frequently asked question'
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Question</FieldLabel>
                  <Input
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="What is the question?"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Answer</FieldLabel>
                  <Textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    placeholder="Write the answer..."
                    rows={5}
                    required
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="registration">Registration</SelectItem>
                        <SelectItem value="practices">Practices</SelectItem>
                        <SelectItem value="meets">Meets</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                <Field className="flex items-center justify-between">
                  <FieldLabel className="mb-0">Published</FieldLabel>
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
                  {editingFaq ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* FAQs List */}
      {faqs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No FAQs yet. Create your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-base">{faq.question}</CardTitle>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      faq.is_published 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {categoryLabels[faq.category]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={faq.is_published}
                      onCheckedChange={() => togglePublished(faq)}
                    />
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(faq)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(faq.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
