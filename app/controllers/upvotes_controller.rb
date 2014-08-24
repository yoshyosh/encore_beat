class UpvotesController < ApplicationController
  def create
    render status: 422 and return unless current_user
    submission_id = params[:submission_id]
    is_upvoted = params[:upvoted] == "true"
    upvote = Upvote.where(submission_id: submission_id, user_id: current_user.id).first_or_initialize
    count = SubmissionCount.find_by_submission_id(submission_id)
    upvote_exists = upvote.persisted?

    if is_upvoted && !upvote_exists && count
      # User upvoted, but the upvote record doesn't exist
      Upvote.create(submission_id: submission_id, user_id: current_user.id)
      count.upvotes += 1
      count.save
    elsif is_upvoted && upvote_exists && count
      # User upvoting a previously nullified upvote
      upvote.nullified = false
      upvote.save
      count.upvotes += 1
      count.save
    else
      # User nullifying their upvote
      upvote.nullified = true
      upvote.save
      if count
        count.upvotes -= 1
        count.save
      end
    end

    render json: {}
  end
end