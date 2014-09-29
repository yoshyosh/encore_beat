class SubscriptionsController < ApplicationController
  def create
    if request.xhr?
      response = MailchimpApi.subscribe_user!(params[:email])

      if response[:success].present?
        cookies[:newsletter_signed_up] = true

        respond_to do |format|
          format.html { render partial: 'partials/social_media', status: 200 }
        end
      elsif response[:error].present?
        respond_to do |format|
          format.js { render json: {message: response[:error]}, status: 422 }
        end
      else response[:warn].present?
        respond_to do |format|
          format.js { render json: {message: response[:warn]}, status: 422 }
        end
      end
    else
      cookies[:newsletter_signed_up] = true
      flash[:success] = "You've successfully been subscribed. Thank you and enjoy the beats!"
      redirect_to root_path and return
    end
  end
end