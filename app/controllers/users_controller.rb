class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(submission_params)

    if @user.save
      session[:user_id] = @user.id
      render :final_signup_step
    else
      flash[:error] = "Signup error, please try again."
      render :new
    end
  end

  def update
    @user = User.find_by_id(params[:id])
    @user.update_attributes(submission_params)

    if @user.errors.any? && params[:final_signup_step]
      render :final_signup_step
    elsif @user.errors.any?
      render :edit
    else
      flash.now[:success] = "You've successfully updated your account!"
      redirect_to root_path
    end
  end

  def final_signup_step
  end

  def submission_params
    params.require(:user).permit(:username, :email, :password, :avatar, :avatar_cache)
  end
end