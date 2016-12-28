FactoryGirl.define do
  factory :ticket do
    sequence(:name){ |n| "ticket#{n}" }
    description { Faker::Lorem.sentence }
    status { Ticket.statuses.keys.sample }
    association :author, factory: :customer
    association :assigned_to, factory: :agent

    trait :closed do
      status Ticket.statuses[:closed]
    end
  end
end
