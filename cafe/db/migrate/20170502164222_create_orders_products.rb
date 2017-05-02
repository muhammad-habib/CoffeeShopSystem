class CreateOrdersProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :orders_products do |t|
      t.references :product, foreign_key: true
      t.references :order, foreign_key: true
      t.text :notes
      t.integer :amount

      t.timestamps
    end
  end
end
