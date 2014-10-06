class TopHitsController < ApplicationController
  before_filter :authorize_site_admin

  def index
  end

  def create
    response = TopHits.generate_in_gist!(params[:start_date], params[:end_date], params[:results])

    if response
      flash.now[:success] = response
    else
      flash.now[:error] = "Something went wrong, try again"
    end

    render :index
  end

  def authorize_site_admin
    redirect_to root_path unless current_user && current_user.site_admin
  end
end