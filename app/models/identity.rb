class Identity < ActiveRecord::Base
  belongs_to :user

  def self.create_with_omniauth(auth)
    nickname = auth[:info][:nickname]
    photo = auth[:info][:image].gsub("_normal", "")
    public_id = "#{nickname}_#{UserAvatarUploader::PUBLIC_ID_SUFFIX}"
    avatar = Cloudinary::Uploader.upload(photo, public_id: public_id)

    user = User.new(password: SecureRandom.uuid, twitter_username: nickname)
    user.remote_avatar_url = avatar['url']
    user.save(validate: false)

    create(
      provider: auth[:provider],
      uid: auth[:uid],
      username: nickname,
      user_id: user.id,
    )
  end
end
