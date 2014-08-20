class Submission < ActiveRecord::Base
  STATUSES = {:pending => 0, :approved => 1, :rejected => 2}
  VALID_HOST_SUBMISSION_URLS = /youtube.com|soundcloud.com/

  has_many :comments
  has_many :upvotes, -> { where(nullified: false) }
  has_one :count
  belongs_to :user

  validates_presence_of :title, :artist, :url
  validates :url, format: { with: VALID_HOST_SUBMISSION_URLS }

  after_save :spawn_count , if: Proc.new {|a| a.status == 1}

  # default_scope order('published_at ASC')
  scope :by_publish_date, -> { order('published_at DESC') }
  scope :pending, -> { where(status: STATUSES[:pending]) }

  def spawn_count
    Count.create(submission: self)
  end
end