class AddSubmissionClicksToCountsTable < ActiveRecord::Migration
  def change
    add_column :counts, :submission_clicks, :integer, default: 0
  end
end
