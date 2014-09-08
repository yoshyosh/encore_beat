class Submission < ActiveRecord::Base
  STATUSES = {:pending => 0, :approved => 1, :rejected => 2}
  VALID_HOST_SUBMISSION_URLS = /youtube.com|youtu.be|soundcloud.com/

  has_many :comments, -> { order 'created_at DESC' }, dependent: :destroy
  has_many :upvotes, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_one :submission_count, dependent: :destroy
  belongs_to :user

  validates_presence_of :title, :artist, :url
  validates :url, format: { with: VALID_HOST_SUBMISSION_URLS }

  after_save :spawn_count , if: Proc.new {|a| a.status == 1}
  before_save :flatten_name

  scope :pending, -> { where(status: STATUSES[:pending]) }
  scope :published, -> { where('published_at is NOT NULL') }

  def is_duplicate?
    submission = Submission.find_by_url(url)

    return true if submission && submission.persisted?

    if url =~ /youtu.be/
      vendor_id = url.split('/').last
      submission = Submission.find_by_url("https://www.youtube.com/watch?v=#{vendor_id}")

      return true if submission
    elsif url =~ /youtube/
      vendor_id = url.split('=').last
      submission = Submission.find_by_url("http://youtu.be/#{vendor_id}")

      return true if submission
    end

    false
  end

  def spawn_count
    SubmissionCount.create(submission: self) unless submission_count
  end

  def flatten_name
    self.flat_name = flat_slug
  end

  def flat_slug
    "#{id}-#{artist}-#{title}".parameterize
  end
end