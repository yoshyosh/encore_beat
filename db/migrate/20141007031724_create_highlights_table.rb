class CreateHighlightsTable < ActiveRecord::Migration
  def change
    create_table :highlights do |t|
      t.date :date, null: false
      t.integer :interval, default: 0
      t.string :slug
      t.timestamps
    end
  end
end
