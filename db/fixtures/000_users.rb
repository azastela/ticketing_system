User.seed do |u|
  u.id = 1
  u.email = 'customer@fakemail.com'
  u.password = 'foobar123'
  u.role = User.roles[:customer]
end
User.seed do |u|
  u.id = 2
  u.email = 'agent@fakemail.com'
  u.password = 'foobar123'
  u.role = User.roles[:agent]
end
User.seed do |u|
  u.id = 3
  u.email = 'admin@fakemail.com'
  u.password = 'foobar123'
  u.role = User.roles[:admin]
end
