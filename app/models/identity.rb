class Identity < ActiveRecord::Base
  belongs_to :user

  def self.create_with_omniauth(auth)
    user = User.create(
      name: auth["info"]["name"],
      password: SecureRandom.uuid,
      password_digest: SecureRandom.uuid
    )

    create(
      provider: auth["provider"],
      uid: auth["uid"],
      name: auth["info"]["name"],
      username: auth["info"]["nickname"],
      user_id: user.id,
    )
  end
end
