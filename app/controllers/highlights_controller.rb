class HighlightsController < ApplicationController
  def show
    slug = params[:slug]
    @highlight = Highlight.find_by_slug(slug)
    @keep_headline = true

    if @highlight.nil?
      flash[:error] = "List not found, sorry!"
      redirect_to root_path and return
    end

    @meta_data = "Top 10 EDM songs for the week of #{@highlight.weekly_start_date.strftime('%B %d')} to #{@highlight.date.strftime('%B %d')}, #{@highlight.date.year}"
    @show_nav_home_link = true
  end
end