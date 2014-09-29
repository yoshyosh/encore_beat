class SubscriptionsController < ApplicationController
  def create
    if request.xhr?
      response = MailchimpApi.subscribe_user!(params[:email])

      if response[:success].present?
        cookies[:newsletter_signed_up] = true

        render js: {}
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
      flash[:success] = "Thanks for subscribing, enjoy the beats!"
      redirect_to root_path and return
    end
  end
end