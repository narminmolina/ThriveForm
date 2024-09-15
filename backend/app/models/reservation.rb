class Reservation < ApplicationRecord
  validates :pet_name, presence: true
  validates :reservation_type, inclusion: { in: %w(boarding grooming daycare training) }
  validates :pet_age, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_blank: true
  validates :reservation_date, presence: true 
  validates :owner_phone, format: { with: /\A\d{10}\z/ }, allow_blank: true 
  validates :owner_email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_nil: true
end
