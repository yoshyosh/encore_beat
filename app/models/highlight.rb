class Highlight < ActiveRecord::Base
  INTERVALS = {weekly: 0}

  has_and_belongs_to_many :submissions

  after_create :load_songs
  after_create :create_slug

  validates_presence_of :date

  def load_songs
    if interval == INTERVALS[:weekly]
      self.submissions << Submission.
        published.
        includes(:submission_count).
        where('submissions.published_at > ? AND submissions.published_at < ?', (date.to_date - 8).beginning_of_day, date.end_of_day).
        order('submission_counts.upvotes DESC').
        limit(10)
    end
  end

  def create_slug
    week_end = date.to_date
    week_start = week_end - 7

    if week_start.month == week_end.month
      self.slug = "#{week_start.strftime('%B-%d')}-#{week_end.strftime('%d-%Y')}".downcase # 'september-22-28-2014'
    else
      self.slug = "#{week_start.strftime('%B-%d')}-#{week_end.strftime('%B-%d-%Y')}".downcase # 'september-30-october-06-2014'
    end

    self.save
  end

  def weekly_start_date
    date.to_date - 7
  end
end