class Recipe < ApplicationRecord
  validates :name, presence: true
  validates :ingredients, presence: true
  validates :insctruciton, presence: true
end
