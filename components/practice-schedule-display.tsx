import { Clock, MapPin, Calendar, ExternalLink, Navigation } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { PracticeSchedule } from '@/lib/supabase/rows'

interface PracticeScheduleDisplayProps {
  schedules: PracticeSchedule[]
}

export function PracticeScheduleDisplay({ schedules }: PracticeScheduleDisplayProps) {
  // Group schedules by location for the map display
  const locationGroups = schedules.reduce((acc, schedule) => {
    const key = schedule.address
    if (!acc[key]) {
      acc[key] = {
        location_name: schedule.location_name,
        address: schedule.address,
        days: []
      }
    }
    acc[key].days.push({
      day: schedule.day_of_week,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      notes: schedule.notes
    })
    return acc
  }, {} as Record<string, { location_name: string; address: string; days: { day: string; start_time: string; end_time: string; notes: string | null }[] }>)

  const locations = Object.values(locationGroups)

  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  }

  const getGoogleMapsDirectionsUrl = (address: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
  }

  return (
    <div className="space-y-8">
      {/* Weekly Schedule Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {schedules.map((schedule, index) => (
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
                <span className="text-foreground font-medium">
                  {schedule.start_time} - {schedule.end_time}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">{schedule.location_name}</p>
                  <p className="text-sm text-muted-foreground">{schedule.address}</p>
                </div>
              </div>
              {schedule.notes && (
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">{schedule.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Location Details with Map Links */}
      {locations.map((location, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Location Info */}
            <div className="p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-foreground">
                    {location.location_name}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {location.address}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Practice Days
                </h4>
                <div className="space-y-2">
                  {location.days.map((day, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
                    >
                      <span className="font-medium text-foreground">{day.day}</span>
                      <span className="text-muted-foreground">
                        {day.start_time} - {day.end_time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="default" className="motion-button">
                  <a 
                    href={getGoogleMapsDirectionsUrl(location.address)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </a>
                </Button>
                <Button asChild variant="outline" className="motion-button">
                  <a 
                    href={getGoogleMapsUrl(location.address)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Map
                  </a>
                </Button>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="bg-muted min-h-[300px] lg:min-h-full relative">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.address)}&zoom=15`}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${location.location_name}`}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
