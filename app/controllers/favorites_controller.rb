class FavoritesController < ApplicationController
  def create
    render status: 422 and return unless current_user
    @favorite = Favorite.create(favorite_params)

    render json: {}
  end

  def destroy
    render status: 422 and return unless current_user
    @favorite = Favorite.find_by_id(params[:id])
    @favorite.destroy if @favorite

    render json: {}
  end

  def favorite_params
    params.permit(:submission_id, :user_id)
  end
end