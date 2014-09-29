class SubscriptionsController < ApplicationController
  def create
    if request.xhr?
      respond_to do |format|
        format.html {render :partial => 'partials/social_media', :status => 200 }
      end
    else
      flash[:success] = "You've successfully been subscribed. Thank you and enjoy the beats!"
      redirect_to root_path and return
    end
  end
end