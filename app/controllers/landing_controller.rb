class LandingController < ApplicationController
  def index
    @submissions = 
      Submission
      .includes(:upvotes)
      .where('submissions.status = ?', Submission::STATUSES[:approved])
      .limit(50)
      .group_by(&:published_at)

    if current_user
      @current_user_upvotes = current_user.upvotes
    end

    @upvote_counts = Upvote.valid.group_by(&:submission_id)
  end
end