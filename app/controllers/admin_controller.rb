class AdminController < ApplicationController
  before_filter :authorize
  before_filter :authorize_site_admin, except: :approval_queue

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
    @users = User.order('created_at DESC').paginate(page: params[:page], :per_page => 50)
  end

  def submissions
    @submissions = Submission
      .includes(:user)
      .includes(:submission_count)
      .includes(:favorites)
      .where('submissions.status = ?', Submission::STATUSES[:approved])
      .order('published_at DESC')
      .references(:submission_count)
      .paginate(page: params[:page], :per_page => 50)

    @total_clicks = Stats.global_total_clicks
    @total_upvotes = Upvote.where(nullified: false).count
    @total_comments = Comment.count
  end

  def rejects
    @submissions = Submission
      .includes(:user)
      .where('submissions.status = ?', Submission::STATUSES[:rejected])
      .order('submissions.created_at DESC')
      .paginate(page: params[:page], :per_page => 50)
  end

  def top_hits
  end

  def top_hits_generate
  end

  private

  def authorize
    redirect_to root_path unless current_user && current_user.admin
  end

  def authorize_site_admin
    redirect_to root_path unless current_user && current_user.site_admin
  end
end