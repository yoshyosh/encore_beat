class AddFlatNameToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :flat_name, :string, unique: true, null: false, index: true
  end
end
