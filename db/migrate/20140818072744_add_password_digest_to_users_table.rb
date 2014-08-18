class AddPasswordDigestToUsersTable < ActiveRecord::Migration
  def change
    add_column :users, :password_digest, :string, null: false
    remove_column :users, :password_hash, :string
  end
end
