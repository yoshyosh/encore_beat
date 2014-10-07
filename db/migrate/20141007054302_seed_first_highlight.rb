class SeedFirstHighlight < ActiveRecord::Migration
  def change
    Highlight.create(date: Date.parse("06-10-2014"))
  end
end
