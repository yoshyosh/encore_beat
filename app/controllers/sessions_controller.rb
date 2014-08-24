class SessionsController < ApplicationController
  before_filter :handle_oauth, only: :create
  def new
  end

  def create
    username_or_email = params[:username_or_email]
    is_username = !!(username_or_email =~ User::USERNAME_REGEXP)
    @user = is_username ? User.find_by_username(username_or_email) : User.find_by_email(username_or_email)

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to root_path
    else
      flash.now[:error] = "Invalid username/email or password combination"
      render :new
    end
  end

  def destroy
    reset_session
    flash[:info] = "Signed out successfully!"
    redirect_to root_path
  end

  private

  def handle_oauth
    auth = request.env["omniauth.auth"]

    if auth
      existing_identity = Identity.find_by_provider_and_uid(auth["provider"], auth["uid"])

      if existing_identity
        @user = existing_identity.user
        render 'users/final_signup_step' and return unless @user && @user.email

        session[:user_id] = @user.id
        redirect_to root_path
      else
        new_identity = Identity.create_with_omniauth(auth)
        @user = new_identity.user
        session[:user_id] = @user.id
        render 'users/final_signup_step' and return
      end
    end
  end
end