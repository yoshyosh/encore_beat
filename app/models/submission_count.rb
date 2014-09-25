class SubmissionCount < ActiveRecord::Base
  belongs_to :submission

  def deduct_comments!
    if self.comments != 0
      self.comments -= 1
      self.save
    end
  end

  def increment_comments!
    self.comments += 1
    self.save
  end

  def deduct_upvotes!
    if self.upvotes != 0
      self.upvotes -= 1
      self.save
    end
  end

  def increment_upvotes!
    self.upvotes += 1
    self.save
  end

  def deduct_favorites!
    self.favorites -= 1
    self.save
  end

  def increment_favorites!
    self.favorites += 1
    self.save
  end
end