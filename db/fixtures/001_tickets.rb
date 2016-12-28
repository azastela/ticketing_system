Ticket.seed do |t|
  t.id = 1
  t.name = Faker::Lorem.word
  t.description = Faker::Lorem.sentence
  t.author_id = 1
  t.assigned_to_id = 2
end
Ticket.seed do |t|
  t.id = 2
  t.name = Faker::Lorem.word
  t.description = Faker::Lorem.sentence
  t.status = Ticket.statuses[:closed]
  t.author_id = 1
  t.assigned_to_id = 2
  t.created_at = 1.month.ago
  t.updated_at = 1.month.ago
end
Ticket.seed do |t|
  t.id = 3
  t.name = Faker::Lorem.word
  t.description = Faker::Lorem.sentence
  t.status = Ticket.statuses[:closed]
  t.author_id = 1
  t.assigned_to_id = 2
  t.created_at = 1.month.ago
  t.updated_at = 1.month.ago
end
Ticket.seed do |t|
  t.id = 4
  t.name = Faker::Lorem.word
  t.description = Faker::Lorem.sentence
  t.author_id = 1
  t.assigned_to_id = 2
end
