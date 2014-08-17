module ApplicationHelper

  def formatted_line_for_submission(submission)
    "#{submission.artist} - #{submission.title}"
  end
end
