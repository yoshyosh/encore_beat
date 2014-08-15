class Comment < ActiveRecord::Base
  attr_accessible :body

  belongs_to :user
  belongs_to :submission

  validates :body, :presence => true, :length => { :maximum => 1000 }
end