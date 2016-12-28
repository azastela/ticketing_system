FactoryGirl.define do
  factory :user do
    password 'foobar123'
    sequence(:email){ |n| "user#{n}@fake.com" }
    role { User.roles.keys.sample }

    factory :customer do
      role User.roles[:customer]
    end

    factory :agent do
      role User.roles[:agent]
    end

    factory :admin do
      role User.roles[:admin]
    end
  end
end
