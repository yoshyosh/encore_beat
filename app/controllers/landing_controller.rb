class LandingController < ApplicationController
  def index
  	@submissions = Submission.all
  end
end