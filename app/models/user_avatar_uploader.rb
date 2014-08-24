class UserAvatarUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  process :convert => 'png'
  process :tags => ['user_picture']
  process :resize_to_fill => [150, 150, :face]

  version :thumb do
    process :resize_to_fill => [32, 32]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def public_id
    model.username.downcase
  end
end