# require 'bcrypt'
class User < ActiveRecord::Base
  # include BCrypt

  has_many :submissions
  has_many :upvotes, dependent: :destroy
  has_many :comments
  has_many :identities, dependent: :destroy

  EMAIL_REGEXP = /\S+@\S+/
  USERNAME_REGEXP = /\A[a-zA-Z0-9_-]{3,16}\z/

  validates_uniqueness_of :username
  validates_uniqueness_of :email, if: 'email.present?'
  validates :email, format: { with: EMAIL_REGEXP }, if: 'email.present?'
  validates :username, format: { with: USERNAME_REGEXP }
  validates_presence_of :password, :on => :create
  validates :password, :length => { :minimum => 4 }, unless: 'password_digest.present?'

  before_create :downcase_username

  has_secure_password

  # def password
  #   @password ||= Password.new(password_hash)
  # end

  # def password=(new_password)
  #   @password = Password.create(new_password)
  #   self.password_hash = @password
  # end

  def downcase_username
    username = username.downcase if username.present?
  end
end