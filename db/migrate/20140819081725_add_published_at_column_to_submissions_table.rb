class AddPublishedAtColumnToSubmissionsTable < ActiveRecord::Migration
  def change
    add_column :submissions, :published_at, :date, index: true
  end
end
