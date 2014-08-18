class CreatePhotosTable < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :url
      t.references :user
      t.timestamps
    end
  end
end
