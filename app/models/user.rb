class User < ActiveRecord::Base
  has_many :submissions
  has_many :upvotes
  has_many :comments
  has_many :identities

  EMAIL_REGEXP = /\S+@\S+/
  USERNAME_REGEXP = /^[a-zA-Z0-9_-]{3,16}$/

  validates_presence_of :name
  validates_uniqueness_of :username
  validates_uniqueness_of :email, if: 'email.present?'
  validates :email, format: { with: EMAIL_REGEXP }, if: 'email.present?'
  validates :username, format: { with: USERNAME_REGEXP }
  validates_presence_of :password, :on => :create
  validates :password, :length => { :minimum => 4 }

  before_save :encrypt_password
  before_create :downcase_username

  has_secure_password

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_digest = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end

  def self.authenticate(username_or_email, password)
    is_username == !!(username_or_email =~ USERNAME_REGEXP)
    user = is_username ? find_by_username(username_or_email) : find_by_email(email)

    if user && user.password_digest == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end

  def downcase_username
    username = username.downcase if username.present?
  end
end