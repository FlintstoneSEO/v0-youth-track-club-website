-- Seed initial data for the Lansing Area Track Club website
-- Run this after all tables are created

-- Seed FAQs
INSERT INTO public.faqs (question, answer, category, display_order, is_published) VALUES
('What ages do you accept?', 'Lansing Area Track Club accepts athletes from ages 6 through 18 (high school). We have age-appropriate programs for youth (6-12), middle school (12-14), and high school prep (14-18) athletes.', 'General', 1, true),
('How much does it cost to join?', 'Registration fees vary by season and program level. Our spring/summer season typically runs $75-125 depending on the program. Early bird discounts are available, and we offer payment plans and financial assistance for families who need it. Contact us for current pricing.', 'Registration', 1, true),
('Does my child need prior track experience?', 'No prior experience is necessary! We welcome athletes of all skill levels. Our youth program focuses on fundamentals and making track fun, while more advanced programs build competitive skills progressively.', 'General', 2, true),
('What equipment does my child need?', 'Athletes need comfortable athletic clothing and running shoes. Track spikes are optional and recommended only for more experienced athletes. We recommend bringing a water bottle, sunscreen for outdoor practices, and weather-appropriate layers.', 'Practices', 1, true),
('Where are practices held?', 'Practices are held at various Lansing-area high school tracks depending on the age group. Youth practices are at Sexton High School, middle school at Eastern High School, and high school prep at Everett High School. Check our Practices page for current locations.', 'Practices', 2, true),
('How often are practices?', 'Practice frequency depends on the age group. Youth athletes practice 2 days per week, middle school athletes practice 3 days per week, and high school prep athletes practice 5 days per week during the competitive season.', 'Practices', 3, true),
('Will my child compete in meets?', 'Yes! All athletes have opportunities to compete in local and regional track meets. Competition is optional for younger athletes, but we encourage participation as it''s a great way to measure progress and build confidence.', 'Competitions', 1, true),
('Do you require USATF membership?', 'USATF membership is required for athletes who want to compete in USATF-sanctioned meets, including Junior Olympics qualifiers. We help families with the registration process. For local, non-sanctioned meets, USATF membership is not required.', 'Competitions', 2, true),
('What is Run Tha City 517?', 'Run Tha City 517 is our community running group, also founded by Ramon Brunson. It''s open to all ages and skill levels and focuses on bringing the Lansing community together through running. We host regular group runs throughout the city.', 'Programs', 1, true),
('How do I register my child?', 'Registration is available through our Contact page. Fill out the athlete signup form, and our team will reach out with next steps including payment information and practice details.', 'Registration', 2, true),
('Can parents watch practices?', 'Yes, parents are welcome to watch practices from designated areas. We ask that parents allow coaches to work with athletes during practice time. Parent volunteers are always appreciated for help with meets and events!', 'Practices', 4, true),
('What events do you teach?', 'We teach all standard track and field events including sprints (100m, 200m, 400m), distance (800m, 1500m, 3000m), hurdles, relays, long jump, high jump, shot put, and discus. Event availability varies by age group and athlete interest.', 'Programs', 2, true)
ON CONFLICT DO NOTHING;

-- Seed sample announcements
INSERT INTO public.announcements (title, content, category, is_pinned, is_published) VALUES
('Spring 2026 Registration Now Open!', 'We''re excited to announce that registration for the Spring 2026 track season is now open! Early bird pricing is available through March 1st. Visit our contact page to sign up your athlete today.', 'Registration', true, true),
('New Practice Location for Middle School Athletes', 'Starting March 1st, middle school practices will move to Eastern High School track. This change gives us access to better facilities and more space for our growing program. Same days and times apply.', 'Update', false, true),
('Congratulations to Our Fall Award Winners!', 'We want to recognize our outstanding athletes from the fall cross country season! Most Improved: Marcus Johnson. Outstanding Effort: Aaliyah Williams. Team Spirit: Devon Carter. Keep up the great work!', 'Recognition', false, true)
ON CONFLICT DO NOTHING;

-- Seed sample events
INSERT INTO public.events (title, description, event_type, event_date, start_time, location, registration_required, is_published) VALUES
('Spring Track Season Kickoff', 'The official start of our spring track season! All registered athletes should attend for team introductions and the first practice.', 'Practice', '2026-03-15', '09:00', 'Lansing Track Complex', false, true),
('Mid-Michigan Youth Track Meet', 'Our first competition of the season. Open to all LATC athletes. Events include sprints, distance, relays, and field events.', 'Competition', '2026-04-05', '08:00', 'East Lansing High School', true, true),
('LATC End of Season Celebration', 'Celebrate the end of a great season! Awards ceremony, food, and fun for the whole family.', 'Social', '2026-06-20', '18:00', 'Lansing Community Center', false, true)
ON CONFLICT DO NOTHING;

-- Seed Run Tha City 517 events
INSERT INTO public.run_tha_city_events (title, description, event_date, start_time, meeting_location, distance, difficulty, is_published) VALUES
('Downtown Loop', 'Our signature route through downtown Lansing! Great for beginners and families.', '2026-04-12', '09:00', 'Capitol Building, Downtown Lansing', '3 miles', 'All Levels', true),
('River Trail Run', 'Scenic run along the beautiful Lansing River Trail. Moderate pace, beautiful views.', '2026-04-19', '08:00', 'Lansing River Trail - North Entrance', '5 miles', 'Intermediate', true),
('MSU Campus Run', 'Tour the beautiful Michigan State campus on foot! Go Green!', '2026-04-26', '09:00', 'Spartan Stadium, East Lansing', '4 miles', 'All Levels', true)
ON CONFLICT DO NOTHING;
