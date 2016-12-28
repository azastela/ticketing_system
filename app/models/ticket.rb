class Ticket < ApplicationRecord
  STATUSES = {open: 0, reopened: 1, closed: 2}.freeze
  enum status: STATUSES

  belongs_to :author, class_name: 'User'
  belongs_to :assigned_to, class_name: 'User', optional: true
  has_many :comments, inverse_of: :ticket, dependent: :destroy
  validates_presence_of :name, :author

  scope :closed_last_month, -> do
    where("updated_at >= ? AND updated_at <= ? AND status = ?",
      Date.current.prev_month.beginning_of_month,
      Date.current.prev_month.end_of_month,
      STATUSES[:closed])
  end
end
