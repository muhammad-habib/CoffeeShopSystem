class RemoveStatusFromOrders < ActiveRecord::Migration[5.0]
  def change
    remove_column :orders, :status, :enum
  end
end
