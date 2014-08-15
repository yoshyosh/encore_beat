class CreateCommentsTable < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.references :user, index: true
      t.references :submission, index: true
      t.timestamps
    end
  end
end
