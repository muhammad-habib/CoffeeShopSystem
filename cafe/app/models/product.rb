class Product < ApplicationRecord
  belongs_to :category
  has_many :orders, through: :orders_products
  mount_uploader :image, ImageUploader

  validates :category_id, :price, :image,:name,  presence: true
  validates :price , numericality: true

end