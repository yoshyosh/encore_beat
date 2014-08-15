class SubmissionsController < ApplicationController

	def new
		@submission = Submission.new
	end

	def create
		@submission = Submission.create(submission_params)
		redirect_to root_path
	end

	def submission_params
		#TODO: Figure out way to default set approved to false, then submission will truly come from admins or preapproved users
		params.require(:submission).permit(:title, :artist, :url)
	end

end