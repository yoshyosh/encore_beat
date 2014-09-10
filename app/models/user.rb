class User < ActiveRecord::Base
  EMAIL_REGEXP = /\S+@\S+/
  USERNAME_REGEXP = /\A[a-zA-Z0-9_-]{3,16}\z/
  DEFAULT_USER_IMAGE_PATH = 'defaultAvatar_a8kvhz.png'
  DEFAULT_USER_IMAGE_PATH_SMALL = 'defaultAvatar_a8kvhz_small_r6xc2f.png'
  TWITTER_PATH = 'https://twitter.com/'

  has_many :submissions
  has_many :upvotes, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :comments
  has_many :identities, dependent: :destroy


  validates_uniqueness_of :username
  validates_uniqueness_of :email, if: 'email.present?'
  validates :email, format: { with: EMAIL_REGEXP }, if: 'email.present?'
  validates :username, format: { with: USERNAME_REGEXP }
  validates :username, length: { minimum: 3 }
  validates_presence_of :password, :on => :create
  validates_presence_of :username, if: :non_identitied_user?
  validates :password, :length => { minimum: 4 }, unless: 'password_digest.present?'

  has_secure_password
  mount_uploader :avatar, UserAvatarUploader

  def non_identitied_user?
    identities.blank?
  end
end