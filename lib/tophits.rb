module TopHits
  # Currently used to send to Gist to create markdown gists
  def self.generate_in_md!(start_date, end_date, num_results)
    start_date = Date.yesterday - 7
    end_date = Date.yesterday
    num_results = 10

    submissions = Submission.
    includes(:submission_count).
    where('submissions.created_at > ? AND submissions.created_at < ?', start_date, end_date).
    order('submission_counts.upvotes DESC').
    limit(num_results)

    markdown = ''

    submissions.each_with_index do |submission, index|
      artist = submission.artist
      title = submission.title
      upvotes = submission.submission_count.upvotes
      publish_date = submission.published_at

      markdown += """
        ### #{index + 1}. #{submission.artist} - #{submission.title}
        #{upvotes} Upvotes on #{publish_date.strftime(%m-%d)}

      """
    end
  end
end