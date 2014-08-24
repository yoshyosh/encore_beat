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

  def user_avatar_thumb(user)
    if user && user.avatar_url
      cl_image_tag user.avatar.thumb, alt: user.username, radius: :max, class: 'user-avatar-thumb'
    else
      cl_image_tag User::DEFAULT_USER_IMAGE_PATH, radius: :max, width: 50, height: 50, alt: 'EncoreBeat User', class: 'user-avatar-thumb'
    end
  end

  def user_avatar_thumb_small(user)
    if user && user.avatar_url
      cl_image_tag user.avatar.thumb_small, alt: user.username, radius: :max, class: 'user-avatar-thumb'
    else
      cl_image_tag User::DEFAULT_USER_IMAGE_PATH, alt: 'EncoreBeat User', class: 'user-avatar-thumb'
    end
  end

  def submission_username(user)
    if user.nil?
      "Deleted User"
    else
      user.username
    end
  end

  def comment_count(submission)
    count = submission.submission_count.comments

    "#{pluralize(count, 'Comment')}"
  end
end
