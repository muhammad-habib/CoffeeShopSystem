class Dropcatergories < ActiveRecord::Migration[5.0]
  def change
    drop_table :catergories
  end
end
