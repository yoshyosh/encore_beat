class ChangeSubmissionsApprovedColumnToStatusColumn < ActiveRecord::Migration
  def change
    remove_column :submissions, :approved, :boolean
    add_column :submissions, :status, :integer, null: false, default: 0
  end
end
