class SessionsController < ApplicationController
  def new
  end

  def create
    auth = request.env["omniauth.auth"]
    identity = Identity.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Identity.create_with_omniauth(auth)
    @user = identity.user
    session[:user_id] = @user.id

    redirect_to root_path
  end
end