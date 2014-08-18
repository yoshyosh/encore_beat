class LandingController < ApplicationController
  def index
    @upvotes = current_user.upvotes if current_user
    @submissions = Submission.all
  end
end