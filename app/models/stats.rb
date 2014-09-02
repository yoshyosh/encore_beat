module Stats
  def self.global_total_clicks
    SubmissionCount.all.pluck(:clicks).inject(:+)
  end
end