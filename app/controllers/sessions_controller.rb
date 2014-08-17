class SessionsController < ApplicationController
  def new
  end

  def create
    auth = request.env["omniauth.auth"]
    handle_oauth if auth

    user = User.authenticate(params[:username_or_email], params[:password])

    if user
      session[:user_id] = user.id
      redirect_to root_path
    else
      flash.now[:error] = "Invalid email or password"
      render :new
    end
  end

  private

  def handle_oauth
    
    existing_identity = Identity.find_by_provider_and_uid(auth["provider"], auth["uid"])

    if existing_identity
      @user = identity.user
      session[:user_id] = @user.id
      redirect_to root_path and return
    else
      new_identity = Identity.create_with_omniauth(auth)
      @user = identity.user
      session[:user_id] = @user.id
      redirect_to new_identity_last_step and return
    end
  end
end