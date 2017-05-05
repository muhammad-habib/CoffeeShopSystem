class Order < ApplicationRecord
  belongs_to :user
  has_many :orders_products,dependent: :destroy
  has_many :products , through:   :orders_products
  before_save :default_values
  private
  def default_values
    self.status ||= "Delivered"
  end
end
