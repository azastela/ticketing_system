FactoryGirl.define do
  factory :comment do
    content { Faker::Lorem.sentence }
    association :user, factory: :user
    association :ticket, factory: :ticket
  end
end
