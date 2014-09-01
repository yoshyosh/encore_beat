class AdminController < ApplicationController
  before_filter :authorize
  before_filter :authorize_site_admin, only: :users

  def index
  end

  def approval_queue
    @submissions = 
      Submission
      .pending
      .order('created_at DESC')
      .group_by {|s| s.created_at.strftime('%a %B %d')}

    @future_submissions = Submission.where('published_at = ?', Date.tomorrow).order('created_at DESC')
  end

  def users
    @users = User.order('created_at DESC').paginate(page: params[:page], :per_page => 5)
  end

  private

  def authorize
    redirect_to root_path unless current_user && current_user.admin
  end

  def authorize_site_admin
    redirect_to root_path unless current_user && current_user.site_admin
  end
end