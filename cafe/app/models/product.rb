class Product < ApplicationRecord
  belongs_to :category
  has_many :orders , through: :orders_products
  mount_uploader :image, ImageUploader
end
