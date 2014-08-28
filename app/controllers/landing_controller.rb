require 'will_paginate/array'
class LandingController < ApplicationController
  def index
    @submissions = 
      Submission
      .includes(:user)
      .includes(:submission_count)
      .where('submissions.status = ?', Submission::STATUSES[:approved])
      .order('published_at DESC, submission_counts.upvotes DESC')
      .references(:submission_count)
      .group_by(&:published_at)

    @submissions_dates = @submissions.keys.paginate(page: params[:page], :per_page => 2)
    @keep_headline = true

    if current_user
      @current_user_upvotes = current_user.upvotes
    end

    if request.xhr?
      respond_to do |format|
        format.html {render :partial => 'partials/submission_date', :status => 200 }
      end
    end
  end

  def terms
  end

  def faq
  end
end