class LandingController < ApplicationController
  def index
    @submissions = Submission.includes(:upvotes).limit(50)
    @upvote_counts = Upvote.valid.group_by(&:submission_id)
  end
end