class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :submission

  validates :body, :presence => true, :length => { :maximum => 1000 }
end