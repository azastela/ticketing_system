class TicketPolicy < ApplicationPolicy
  def index?
    true
  end

  def report?
    user.agent?
  end

  def destroy?
    user.admin?
  end

  def show?
    true
  end

  def update?
    true
  end

  def create?
    true
  end

  class Scope < Scope
    def resolve
      if user.customer?
        scope.where(author: user)
      else
        scope.all
      end
    end
  end
end
