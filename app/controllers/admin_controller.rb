class AdminController < ApplicationController
  before_filter :authorize

  def approval_queue
    @submissions = 
      Submission
      .pending
      .order('created_at DESC')
      .group_by {|s| s.created_at.strftime('%a %B %d')}
  end

  private

  def authorize
    redirect_to root_path unless current_user && current_user.admin
  end
end