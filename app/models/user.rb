require 'bcrypt'
class User < ActiveRecord::Base
  include BCrypt

  has_many :submissions
  has_many :upvotes
  has_many :comments
  has_many :identities

  EMAIL_REGEXP = /\S+@\S+/
  USERNAME_REGEXP = /\A[a-zA-Z0-9_-]{3,16}\z/

  validates_uniqueness_of :username
  validates_uniqueness_of :email, if: 'email.present?'
  validates :email, format: { with: EMAIL_REGEXP }, if: 'email.present?'
  validates :username, format: { with: USERNAME_REGEXP }
  validates_presence_of :password, :on => :create
  validates :password, :length => { :minimum => 4 }

  before_create :downcase_username

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def login
    is_username == !!(username_or_email =~ USERNAME_REGEXP)
    user = is_username ? find_by_username(username_or_email) : find_by_email(email)

    if user.password == params[:password]
      give_token
    else
      redirect_to home_url
    end
  end

  def downcase_username
    username = username.downcase if username.present?
  end
end