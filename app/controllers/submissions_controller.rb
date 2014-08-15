class SubmissionsController < ApplicationController

	def new
		@submission = Submission.new
	end

	def create
		@submission = Submission.create(params[:submission])
	end

	def submission_params
		params.require(:submission).permit(:title, :artist, :url, :approved)
	end

end