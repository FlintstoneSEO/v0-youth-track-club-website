'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldLabel } from '@/components/ui/field'
import { Eye, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react'

interface Signup {
  id: string
  athlete_first_name: string
  athlete_last_name: string
  athlete_dob: string
  athlete_gender: string | null
  athlete_grade: string | null
  athlete_school: string | null
  parent_first_name: string
  parent_last_name: string
  parent_email: string
  parent_phone: string
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  medical_conditions: string | null
  experience_level: string
  preferred_events: string[] | null
  how_heard_about_us: string | null
  status: string
  notes: string | null
  created_at: string
}

interface SignupsManagerProps {
  initialSignups: Signup[]
}

export function SignupsManager({ initialSignups }: SignupsManagerProps) {
  const [signups, setSignups] = useState(initialSignups)
  const [selectedSignup, setSelectedSignup] = useState<Signup | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const router = useRouter()

  const filteredSignups = filterStatus === 'all' 
    ? signups 
    : signups.filter(s => s.status === filterStatus)

  const openSignupDetails = (signup: Signup) => {
    setSelectedSignup(signup)
    setNotes(signup.notes || '')
    setIsDialogOpen(true)
  }

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('athlete_signups')
      .update({ status, notes })
      .eq('id', id)

    if (!error) {
      setSignups(signups.map(s => 
        s.id === id ? { ...s, status, notes } : s
      ))
      setIsDialogOpen(false)
      router.refresh()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this signup?')) return

    const supabase = createClient()
    const { error } = await supabase.from('athlete_signups').delete().eq('id', id)

    if (!error) {
      setSignups(signups.filter(s => s.id !== id))
      setIsDialogOpen(false)
      router.refresh()
    }
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    approved: 'bg-green-100 text-green-700',
    waitlist: 'bg-blue-100 text-blue-700',
    rejected: 'bg-red-100 text-red-700',
  }

  const statusCounts = {
    all: signups.length,
    pending: signups.filter(s => s.status === 'pending').length,
    approved: signups.filter(s => s.status === 'approved').length,
    waitlist: signups.filter(s => s.status === 'waitlist').length,
    rejected: signups.filter(s => s.status === 'rejected').length,
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus(status)}
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-2 text-xs bg-background/20 px-1.5 py-0.5 rounded-full">
              {count}
            </span>
          </Button>
        ))}
      </div>

      {/* Signups List */}
      {filteredSignups.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {filterStatus === 'all' 
                ? 'No signups yet.' 
                : `No ${filterStatus} signups.`
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredSignups.map((signup) => (
            <Card key={signup.id} className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {signup.athlete_first_name} {signup.athlete_last_name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Grade: {signup.athlete_grade || 'N/A'} | 
                      School: {signup.athlete_school || 'N/A'} |
                      Experience: {signup.experience_level}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Parent: {signup.parent_first_name} {signup.parent_last_name} | 
                      {signup.parent_email} | {signup.parent_phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[signup.status]}`}>
                      {signup.status}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => openSignupDetails(signup)}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Submitted: {new Date(signup.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Signup Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSignup && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedSignup.athlete_first_name} {selectedSignup.athlete_last_name}
                </DialogTitle>
                <DialogDescription>
                  Review signup details and update status
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Athlete Information */}
                <div>
                  <h4 className="font-semibold mb-2">Athlete Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Date of Birth:</span>
                      <p>{new Date(selectedSignup.athlete_dob).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Gender:</span>
                      <p className="capitalize">{selectedSignup.athlete_gender?.replace('_', ' ') || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Grade:</span>
                      <p>{selectedSignup.athlete_grade || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">School:</span>
                      <p>{selectedSignup.athlete_school || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Experience Level:</span>
                      <p className="capitalize">{selectedSignup.experience_level}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Preferred Events:</span>
                      <p>{selectedSignup.preferred_events?.join(', ') || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information */}
                <div>
                  <h4 className="font-semibold mb-2">Parent/Guardian Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p>{selectedSignup.parent_first_name} {selectedSignup.parent_last_name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p>{selectedSignup.parent_email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p>{selectedSignup.parent_phone}</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h4 className="font-semibold mb-2">Emergency Contact</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p>{selectedSignup.emergency_contact_name || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p>{selectedSignup.emergency_contact_phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                {selectedSignup.medical_conditions && (
                  <div>
                    <h4 className="font-semibold mb-2">Medical Conditions</h4>
                    <p className="text-sm bg-amber-50 text-amber-800 p-3 rounded-lg">
                      {selectedSignup.medical_conditions}
                    </p>
                  </div>
                )}

                {/* How they heard about us */}
                {selectedSignup.how_heard_about_us && (
                  <div>
                    <h4 className="font-semibold mb-2">How They Heard About Us</h4>
                    <p className="text-sm text-muted-foreground">{selectedSignup.how_heard_about_us}</p>
                  </div>
                )}

                {/* Admin Notes */}
                <Field>
                  <FieldLabel>Admin Notes</FieldLabel>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this signup..."
                    rows={3}
                  />
                </Field>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <Button 
                    onClick={() => updateStatus(selectedSignup.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => updateStatus(selectedSignup.id, 'waitlist')}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Waitlist
                  </Button>
                  <Button 
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => updateStatus(selectedSignup.id, 'rejected')}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    variant="ghost"
                    className="text-destructive ml-auto"
                    onClick={() => handleDelete(selectedSignup.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
