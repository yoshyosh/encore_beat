class AddRejectedByFieldToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :rejected_by, :string
  end
end
