class UpvotesController < ApplicationController
  def create
    return unless current_user
    is_upvoted = params[:upvoted] == "true"
    upvote = Upvote.find_or_initialize_by(submission_id: params[:submission_id], user_id: current_user.id)
    upvote_exists = upvote.persisted?

    if is_upvoted && !upvote_exists
      Upvote.create(submission_id: params[:submission_id], user_id: current_user.id)
    elsif is_upvoted && upvote_exists
      upvote.nullified = false
      upvote.save
    else
      upvote.nullified = true
      upvote.save
    end

    render json: {}
  end
end