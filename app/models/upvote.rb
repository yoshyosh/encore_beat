class Upvote < ActiveRecord::Base
  belongs_to :user
  belongs_to :submission

  scope :valid, -> { where(nullified: false) }
end