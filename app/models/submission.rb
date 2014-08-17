class Submission < ActiveRecord::Base
  STATUSES = {:pending => 0, :approved => 1, :rejected => 2}
  VALID_HOST_SUBMISSION_URLS = /youtube.com|soundcloud.com/

  has_many :comments
  has_many :upvotes
  belongs_to :user

  validates_presence_of :title, :artist, :url
  validates :url, format: { with: VALID_HOST_SUBMISSION_URLS }

  scope :pending, -> { where(status: STATUSES[:pending]) }
end