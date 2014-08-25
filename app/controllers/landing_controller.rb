class LandingController < ApplicationController
  def index
    @submissions = 
      Submission
      .includes(:user)
      .includes(:submission_count)
      .where('submissions.status = ?', Submission::STATUSES[:approved])
      .order('published_at DESC, submission_counts.upvotes DESC')
      .limit(50)
      .references(:submission_count)
      .group_by(&:published_at)

    if current_user
      @current_user_upvotes = current_user.upvotes
    end
  end

  def terms
  end

  def faq
  end
end