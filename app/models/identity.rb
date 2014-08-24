class Identity < ActiveRecord::Base
  belongs_to :user

  def self.create_with_omniauth(auth)
    nickname = auth[:info][:nickname]
    photo = auth[:info][:image].gsub("_normal", "")
    public_id = "#{nickname}_twitter"
    avatar = Cloudinary::Uploader.upload(photo, public_id: public_id)

    user = User.new(username: SecureRandom.hex(4), password: SecureRandom.uuid)
    user.remote_avatar_url = avatar['url']
    user.save

    create(
      provider: auth[:provider],
      uid: auth[:uid],
      username: nickname,
      user_id: user.id,
    )
  end
end
