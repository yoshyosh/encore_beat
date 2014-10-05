class TopHitsController < ApplicationController
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
end