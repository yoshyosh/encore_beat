class UpvotesController < ApplicationController
  def create
    render status: 422 and return unless current_user
    submission_id = params[:submission_id]
    is_upvoted = params[:upvoted] == "true"
    upvote = Upvote.where(submission_id: submission_id, user_id: current_user.id).first_or_initialize
    count = SubmissionCount.find_by_submission_id(submission_id)
    upvote_exists = upvote.persisted?

    if upvote_exists
      if is_upvoted
        # User upvoting a previously nullified upvote
        count.upvotes += 1
        count.save
        upvote.nullified = false
        upvote.save
      else
        # User nullifying their upvote
        count.upvotes -= 1
        count.save
        upvote.nullified = true
        upvote.save
      end
    else
      # User upvoted, but the upvote record doesn't exist
      Upvote.create(submission_id: submission_id, user_id: current_user.id)
      count.upvotes += 1
      count.save
    end

    render json: {}
  end
end