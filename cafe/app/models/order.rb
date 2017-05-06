class Order < ApplicationRecord
  belongs_to :user
  has_many :orders_products,dependent: :destroy
  has_many :products , through:   :orders_products

  before_save :default_values
  enum status: {
      'Received': 0,
      'In Progress': 1,
      'On The Way': 2,
      'Delivered': 3,
  }
  private
  def default_values
    self.status ||= 0
  end

end
