class AddTwitterUsernameToUsers < ActiveRecord::Migration
  def up
    add_column :users, :twitter_username, :string

    User.transaction do
      users = User.joins(:identities).where("email is NOT NULL")

      users.each do |user|
        user.twitter_username = user.identities.first.username
        user.save!
      end
    end
  end

  def down
    remove_column :users, :twitter_username, :string
  end
end
