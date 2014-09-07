module ApplicationHelper
  include TweetButton

  TweetButton.default_tweet_button_options = {via: 'EncoreBeatCOM', count: 'none'}

  def formatted_line_for_submission(submission)
    "#{submission.artist} - #{submission.title}"
  end

  def humanize_date(date)
    if date.today?
      "Today"
    else
      date.strftime('%a %B %d')
    end
  end

  def humanize_date_with_numerics(date)
    if date.today?
      "Today"
    else
      date.strftime('%m-%d-%Y')
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
    count_parts = pluralize(count, 'Comment').split

    "#{count_parts[0]} <span class='longform-text'>#{count_parts[1]}".html_safe
  end

  def user_since(user)
    user.nil? ? '' : "Since #{user.created_at.strftime('%b %Y')}"
  end

  def user_upvoted_song?(user, song_id)
    return false if user.upvotes.blank?

    user.upvotes.any? {|upvote| !upvote.nullified && upvote.submission_id == song_id }
  end

  def user_favorited_song?(user, song_id)
    return false if user.favorites.blank?

    user.favorites.any? {|favorite| favorite.submission_id == song_id }
  end
end
