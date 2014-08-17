class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(submission_params)
    @user.password = params[:password]

    if @user.save
      binding.pry
      session[:user_id] = @user.id
      redirect_to root_path
    else
      binding.pry
      flash[:error] = "Signup error, please try again."
      redirect_to root_path
    end
  end

  def submission_params
    params.require(:user).permit(:username, :email, :password)
  end
end