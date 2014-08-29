class SubmissionCountsController < ApplicationController
  def update
    count = SubmissionCount.find_by_submission_id(edit_params[:id])
    count.clicks += 1 if count
    count.save

    render json: {}
  end

  def edit_params
    params.permit(:id)
  end
end