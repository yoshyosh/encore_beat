class AdminController < ApplicationController
  before_filter :authorize

  def approval_queue
    @submissions = Submission.pending
  end

  private

  def authorize
    redirect_to root_path unless current_user && current_user.admin
  end
end