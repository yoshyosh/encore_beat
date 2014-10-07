class HighlightsSubmissions < ActiveRecord::Base
  belongs_to :highlight
  belongs_to :submission
end