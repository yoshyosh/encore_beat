class CreateHighlightsSubmissionsTable < ActiveRecord::Migration
  def change
    create_table :highlights_submissions do |t|
      t.references :highlight
      t.references :submission
    end
  end
end
