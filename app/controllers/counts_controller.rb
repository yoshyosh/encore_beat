class CountsController < ApplicationController
  def update
    count = Count.find_by_submission_id(edit_params[:id])
    count.submission_clicks += 1 if count

    render json: {}
  end

  def edit_params
    params.permit(:id)
  end
end