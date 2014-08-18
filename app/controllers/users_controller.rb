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
      redirect_to root_path
    end
  end

  def update
    current_user.update_attributes(submission_params)
    redirect_to root_path
  end

  def final_signup_step
    render 'final_signup_step' and return
  end

  def submission_params
    params.require(:user).permit(:username, :email, :password)
  end
end