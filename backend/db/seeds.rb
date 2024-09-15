# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Reservation.destroy_all

# db/seeds.rb

Reservation.create(
  pet_name: 'Buddy',
  reservation_type: 'boarding',
  pet_age: 3,
  reservation_date: '2021-10-10',
  owner_name: 'John Doe',
  owner_phone: '1234567890',
  owner_email: 'buddydad@gmail.com'
)

Reservation.create(
  pet_name: 'Max',
  reservation_type: 'grooming',
  pet_age: 2,
  reservation_date: '2023-11-15',
  owner_name: 'Jane Smith',
  owner_phone: '0987654321',
  owner_email: 'maxmom@gmail.com'
)

Reservation.create(
  pet_name: 'Luna',
  reservation_type: 'daycare',
  pet_age: 4,
  reservation_date: '2023-12-01',
  owner_name: 'Alice Johnson',
  owner_phone: '5555555555',
  owner_email: 'lunacare@gmail.com'
)
