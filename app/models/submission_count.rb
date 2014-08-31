class SubmissionCount < ActiveRecord::Base
  belongs_to :submission

  def deduct_comments!
    self.comments -= 1
    self.save
  end

  def increment_comments!
    self.comments += 1
    self.save
  end

  def deduct_upvotes!
    self.upvotes -= 1
    self.save
  end

  def increment_upvotes!
    self.upvotes += 1
    self.save
  end
end