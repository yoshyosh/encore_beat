class RedoSubmissionCountsTableColumnsAddComments < ActiveRecord::Migration
  def change
    rename_column :submission_counts, :submission_upvotes, :upvotes
    rename_column :submission_counts, :submission_clicks, :clicks
    add_column :submission_counts, :comments, :integer, default: 0
  end
end
