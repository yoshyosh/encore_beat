class User < ActiveRecord::Base
  has_many :submissions
  has_many :upvotes
  has_many :comments
  has_many :identities

  validates_presence_of :name
  validates_uniqueness_of :email, if: 'email.present?'
  # validates :email, format: { with: /\S+@\S+/ }
  validates_presence_of :password, :on => :create
  validates :password, :length => { :minimum => 4 }

  before_save :encrypt_password

  has_secure_password

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_digest = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end

  def self.authenticate(email, password)
    user = find_by_email(email)
    if user && user.password_digest == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end
end