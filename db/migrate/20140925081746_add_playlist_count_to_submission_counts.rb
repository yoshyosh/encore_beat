class AddPlaylistCountToSubmissionCounts < ActiveRecord::Migration
  def change
    add_column :submission_counts, :favorites, :integer, default: 0
  end
end

# Submission.transaction do
#   Submission.all.each do |submission|
#     count = submission.favorites.count
#     sc = submission.submission_count
#     if sc 
#       sc.favorites = count
#       sc.save
#     end
#   end
# end