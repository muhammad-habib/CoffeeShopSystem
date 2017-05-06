class Order < ApplicationRecord
  belongs_to :user
  has_many :orders_products,dependent: :destroy
  has_many :products , through:   :orders_products
  before_save :default_values
  enum status: {
      deliverd: 0,
      out: 1
  }
  private
  def default_values
    self.status ||= "Delivered"
  end
end
