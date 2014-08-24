class RenameCountsTableToSubmissionCounts < ActiveRecord::Migration
  def change
    rename_table :counts, :submission_counts
  end
end
