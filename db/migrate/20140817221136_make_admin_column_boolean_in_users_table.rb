class MakeAdminColumnBooleanInUsersTable < ActiveRecord::Migration
  def change
    remove_column :users, :admin, :string
    add_column :users, :admin, :boolean, default: false
  end
end
