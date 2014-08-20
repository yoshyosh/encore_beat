class Identity < ActiveRecord::Base
  belongs_to :user

  def self.create_with_omniauth(auth)
    user = User.new(username: SecureRandom.hex(4), password: SecureRandom.uuid)
    user.save

    create(
      provider: auth["provider"],
      uid: auth["uid"],
      username: auth["info"]["nickname"],
      user_id: user.id,
    )
  end
end
