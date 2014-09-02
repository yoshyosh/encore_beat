class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      render :final_signup_step
    else
      flash.now[:error] = "Signup error, please try again."
      render :new
    end
  end

  def edit
    @user = User.find_by_id(params[:id])

    redirect_to root_path if current_user != @user
  end

  def update
    @user = User.find_by_id(params[:id])
    @user.update_attributes(user_params)

    if @user.errors.any? && params[:final_signup_step]
      render :final_signup_step
    elsif @user.errors.any?
      render :edit
    else
      flash[:success] = "You've successfully updated your account!"
      session[:user_id] = @user.id unless current_user
      redirect_to root_path
    end
  end

  def show
    @user = User.find_by_username(params[:username]) || User.find_by_id(params[:id])
    @submissions = Submission.published.includes(:submission_count).includes(:comments).where('user_id = ?', @user.id).paginate(page: params[:page], per_page: 10)

    if request.xhr?
      respond_to do |format|
        format.html {render partial: 'users/show_submissions', :status => 200 }
      end
    end
  end

  def final_signup_step
    @hide_nav = true
    flash[:success] = "Welcome to EncoreBeat!"
    redirect_to root_path
  end

  def user_params
    params.permit(:username, :email, :password, :avatar, :avatar_cache)
  end
end