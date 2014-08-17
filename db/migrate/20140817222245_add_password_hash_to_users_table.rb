class AddPasswordHashToUsersTable < ActiveRecord::Migration
  def change
    add_column :users, :password_hash, :string, null: false
    remove_column :users, :password_digest, :string
    remove_column :users, :password_salt, :string
  end
end
