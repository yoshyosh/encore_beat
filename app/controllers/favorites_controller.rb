class FavoritesController < ApplicationController
  def create
    render status: 422 and return unless current_user
    @favorite = Favorite.new(submission_id: params[:submission_id], user_id: current_user.id)

    if @favorite.save
      @submission = @favorite.submission
      submission_count = @submission.submission_count
      submission_count.increment_favorites!
    end

    render json: {}
  end

  def destroy
    render status: 422 and return unless current_user
    @favorite = Favorite.find_by_user_id_and_submission_id(current_user.id, params[:submission_id])
    @favorite.destroy if @favorite
    @submission = @favorite.submission
    submission_count = @submission.submission_count
    submission_count.deduct_favorites!

    render json: {}
  end

  def favorite_params
    simple_param = params.permit(:submission_id)
  end
end