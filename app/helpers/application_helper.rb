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
    dimension = 50

    if user && user.avatar_url
      cl_image_tag user.avatar.thumb, alt: user.username, radius: :max, class: 'user-avatar-thumb'
    else
      default_avatar(50)
    end
  end

  def user_avatar_thumb_small(user)
    dimension = 20

    if user && user.avatar_url
      cl_image_tag user.avatar.thumb_small, alt: user.username, radius: :max, class: 'user-avatar-thumb'
    else
      default_avatar(20)
    end
  end

  def default_avatar(dimension)
    if dimension == 20
      cl_image_tag User::DEFAULT_USER_IMAGE_PATH_SMALL, width: dimension, height: dimension, alt: 'EncoreBeat User', class: 'user-avatar-thumb'
    else
      cl_image_tag User::DEFAULT_USER_IMAGE_PATH, width: dimension, height: dimension, radius: :max, alt: 'EncoreBeat User', class: 'user-avatar-thumb'
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
