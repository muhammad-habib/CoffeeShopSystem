class AddRoomToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :room, :integer
  end
end
