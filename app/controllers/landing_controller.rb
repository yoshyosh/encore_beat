class LandingController < ApplicationController
  def index
    @submissions = 
      Submission
      .includes(:submission_count)
      .where('submissions.status = ?', Submission::STATUSES[:approved])
      .order('submission_counts.upvotes DESC, published_at DESC')
      .limit(50)
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