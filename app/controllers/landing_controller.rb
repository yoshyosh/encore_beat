class LandingController < ApplicationController
  def index
    @submissions = 
      Submission
      .by_publish_date
      .includes(:count)
      .where('submissions.status = ?', Submission::STATUSES[:approved])
      .limit(50)
      .group_by(&:published_at)

    if current_user
      @current_user_upvotes = current_user.upvotes
    end
  end
end