class CreateUsersTable < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :name, null: false
      t.string :admin, default: false
      t.string :password_digest, null: false
      t.string :password_salt, null: false
      t.timestamps
    end
  end
end
