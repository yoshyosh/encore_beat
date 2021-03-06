module TopHits
  # Currently used to send to Gist to create markdown gists
  def self.generate_in_gist!(start_date, end_date, num_results = 10)
    return false if start_date.blank? || end_date.blank?

    submissions = Submission.
    published.
    includes(:submission_count).
    where('submissions.published_at > ? AND submissions.published_at < ?', start_date, end_date).
    order('submission_counts.upvotes DESC').
    limit(num_results)

    markdown = ''

    submissions.each_with_index do |submission, index|
      artist = submission.artist
      title = submission.title
      upvotes = submission.submission_count.upvotes
      publish_date = submission.published_at

      markdown.concat("#### #{index + 1}. #{submission.artist} - #{submission.title} \n").concat("#{upvotes} Upvotes on #{publish_date.strftime('%b %d')} \n\n")
    end

    GistApi.create!(markdown)
  end
end