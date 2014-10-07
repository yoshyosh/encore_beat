class SeedFirstHighlight < ActiveRecord::Migration
  def change
    Highlight.create(date: Date.today + 1)
  end
end
