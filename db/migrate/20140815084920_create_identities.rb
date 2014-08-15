class CreateIdentities < ActiveRecord::Migration
  def change
    create_table :identities do |t|
      t.string :name
      t.string :username
      t.string :provider
      t.string :uid
      t.references :user

      t.timestamps
    end
  end
end
