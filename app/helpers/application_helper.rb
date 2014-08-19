module ApplicationHelper
  def formatted_line_for_submission(submission)
    "#{submission.artist} - #{submission.title}"
  end

  def humanize_date(date)
    if date.today?
      "TODAY"
    else
      "#{date.strftime('%a %B %d')}"
    end
  end
end
