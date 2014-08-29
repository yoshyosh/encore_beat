class UserAvatarUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave
  PUBLIC_ID_SUFFIX = 'eb_twitter'

  process :convert => 'png'
  process :tags => ['user_picture']
  process :resize_to_fill => [150, 150, :face]

  version :thumb do
    process :resize_to_fill => [50, 50]
  end

  version :thumb_small do
    process :resize_to_fill => [20, 20]
  end

  def extension_white_list
    %w(jpg jpeg png)
  end
end