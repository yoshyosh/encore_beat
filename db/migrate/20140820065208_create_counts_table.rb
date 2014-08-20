class CreateCountsTable < ActiveRecord::Migration
  def change
    create_table :counts do |t|
      t.integer :submission_upvotes, default: 0, index: true
      t.references :submission
      t.timestamps
    end
  end
end
