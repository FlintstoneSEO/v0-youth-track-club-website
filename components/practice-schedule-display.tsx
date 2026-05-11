import { Clock, MapPin, Calendar, ExternalLink, Navigation, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { PracticeSchedule } from '@/lib/supabase/rows'

interface PracticeScheduleDisplayProps {
  schedules: PracticeSchedule[]
}

export function PracticeScheduleDisplay({ schedules }: PracticeScheduleDisplayProps) {
  const locationGroups = schedules.reduce((acc, schedule) => {
    const key = schedule.address
    if (!acc[key]) {
      acc[key] = {
        location_name: schedule.location_name,
        address: schedule.address,
        days: [],
      }
    }
    acc[key].days.push({
      day: schedule.day_of_week,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      notes: schedule.notes,
    })
    return acc
  }, {} as Record<string, { location_name: string; address: string; days: { day: string; start_time: string; end_time: string; notes: string | null }[] }>)

  const locations = Object.values(locationGroups)

  const getGoogleMapsUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  const getGoogleMapsDirectionsUrl = (address: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

  return (
    <div className="space-y-8">
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <p className="flex items-start gap-2 text-sm md:text-base text-foreground">
            <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            Core practices are currently set for <strong>Monday, Tuesday, and Wednesday from 6:00 PM to 7:30 PM</strong> at
            <strong> Alfreda Schmidt Community Center Track</strong>, 5825 Wise Rd, Lansing, MI 48911. Changes can be updated in the admin schedule manager.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="overflow-hidden motion-card">
            <div className="h-1.5 bg-primary" />
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {schedule.day_of_week}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <span className="text-foreground font-medium">{schedule.start_time} - {schedule.end_time}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">{schedule.location_name}</p>
                  <p className="text-sm text-muted-foreground">{schedule.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {locations.map((location, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-6 lg:p-8">
              <h3 className="text-xl font-bold text-foreground">{location.location_name}</h3>
              <p className="text-muted-foreground mt-1">{location.address}</p>
              <div className="mt-6 space-y-2">
                {location.days.map((day, dayIndex) => (
                  <div key={dayIndex} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50">
                    <span className="font-medium text-foreground">{day.day}</span>
                    <span className="text-muted-foreground">{day.start_time} - {day.end_time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="default"><a href={getGoogleMapsDirectionsUrl(location.address)} target="_blank" rel="noopener noreferrer"><Navigation className="w-4 h-4 mr-2" />Get Directions</a></Button>
                <Button asChild variant="outline"><a href={getGoogleMapsUrl(location.address)} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4 mr-2" />View on Map</a></Button>
              </div>
            </div>

            <div className="bg-muted min-h-[300px] lg:min-h-full relative">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(location.address)}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                title={`Map of ${location.location_name}`}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
