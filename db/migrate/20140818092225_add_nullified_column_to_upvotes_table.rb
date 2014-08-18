class AddNullifiedColumnToUpvotesTable < ActiveRecord::Migration
  def change
    add_column :upvotes, :nullified, :boolean, default: false, index: true
  end
end
