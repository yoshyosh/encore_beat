class CreateFavoritesTable < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.references :user
      t.references :submission
      t.timestamps
    end
  end
end
