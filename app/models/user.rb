class User < ApplicationRecord
  attr_accessor :password
  before_save :encrypt_password
  after_save :clear_password

  ROLES = {customer: 0, agent: 1, admin: 2}.freeze
  enum role: ROLES

  EMAIL_REGEX = /\A[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\z/i

  validates :email, presence: true, uniqueness: true, format: EMAIL_REGEX
  validates_length_of :password, in: 6..20, on: :create
  validates_confirmation_of :password

  has_many :created_tickets, class_name: 'Ticket', inverse_of: :author, foreign_key: 'author_id'
  has_many :assigned_to_me_tickets, class_name: 'Ticket', inverse_of: :assigned_to, foreign_key: 'assigned_to_id'
  has_many :comments, inverse_of: :user

  scope :not_admin, ->{ where('role <> ?', ROLES[:admin])}
  def self.authenticate(email, password)
    user = find_by(email: email)
    if user && user.encrypted_password == BCrypt::Engine.hash_secret(password, user.salt)
      user
    end
  end

  def encrypt_password
    if password.present?
      self.salt = BCrypt::Engine.generate_salt
      self.encrypted_password = BCrypt::Engine.hash_secret(password, salt)
    end
  end

  def clear_password
    self.password = nil
  end
end
