class UserPolicy < ApplicationPolicy
  %i(index? update? create? destroy?).each do |method|
    define_method(method){ user.admin? }
  end
end
