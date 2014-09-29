require 'will_paginate/array'
class LandingController < ApplicationController
  def index
    setup_newsletter_callout
    @submissions = 
      Submission
      .includes(:user)
      .includes(:submission_count)
      .where('submissions.status = ?', Submission::STATUSES[:approved])
      .order('published_at DESC, submission_counts.upvotes DESC')
      .references(:submission_count)
      .group_by(&:published_at)

    @submissions_dates = @submissions.keys.paginate(page: params[:page], :per_page => 5)
    @keep_headline = true

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

  def contact
  end

  private

  def setup_newsletter_callout
    @newsletter_form_presenter = {
      clicked: false,
      form: {
        action: subscriptions_path,
        csrf_param: request_forgery_protection_token,
        csrf_token: form_authenticity_token
      }
    }
  end
end