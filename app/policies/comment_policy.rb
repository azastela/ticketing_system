class CommentPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    true
  end

  def destroy?
    user.admin?
  end
end
