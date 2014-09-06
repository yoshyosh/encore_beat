class FavoritesController < ApplicationController
  def create
    render status: 422 and return unless current_user
    @favorite = Favorite.where(submission_id: params[:submission_id], user_id: current_user.id).first_or_initialize

    if @favorite.new_record?
      @favorite.user_id = current_user.id
      @favorite.save
    end

    render json: {}
  end

  def destroy
    render status: 422 and return unless current_user
    @favorite = Favorite.find_by_user_id_and_submission_id(current_user.id, params[:submission_id])
    @favorite.destroy if @favorite

    render json: {}
  end

  def favorite_params
    simple_param = params.permit(:submission_id)
  end
end