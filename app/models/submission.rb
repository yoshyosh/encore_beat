class Submission < ActiveRecord::Base
  attr_accessible :title, :artist, :url, :approved

  VALID_HOST_SUBMISSION_URLS = /youtube.com|soundcloud.com/

  has_many :comments
  has_many :upvotes
  belongs_to :user

  validates_presence_of :title, :artist, :url
  validates :url, format: { with: VALID_HOST_SUBMISSION_URLS }
end