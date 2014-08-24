class Submission < ActiveRecord::Base
  STATUSES = {:pending => 0, :approved => 1, :rejected => 2}
  VALID_HOST_SUBMISSION_URLS = /youtube.com|soundcloud.com/

  has_many :comments, dependent: :destroy
  has_many :upvotes, dependent: :destroy
  has_one :submission_count, dependent: :destroy
  belongs_to :user

  validates_presence_of :title, :artist, :url
  validates :url, format: { with: VALID_HOST_SUBMISSION_URLS }

  after_save :spawn_count , if: Proc.new {|a| a.status == 1}

  scope :pending, -> { where(status: STATUSES[:pending]) }

  def spawn_count
    SubmissionCount.create(submission: self)
  end
end