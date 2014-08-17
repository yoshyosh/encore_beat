class CreateUsersTable < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false, unique: true
      t.string :email
      t.string :name
      t.string :admin, default: false
      t.string :password_digest, null: false
      t.string :password_salt, null: false
      t.timestamps
    end
  end
end
