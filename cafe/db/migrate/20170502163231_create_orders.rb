class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.integer :room
      t.references :user, foreign_key: true
      t.column :status, "ENUM('Delivered', 'Canceled','In Progress','On the way')"

      t.timestamps
    end
  end
end
