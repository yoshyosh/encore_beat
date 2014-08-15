class CreateSubmissionsTable < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.string :title, null: false
      t.string :artist, null: false
      t.string :url, null: false
      t.boolean :approved, default: false
      t.references :user, index: true
      t.timestamps
    end
  end
end
