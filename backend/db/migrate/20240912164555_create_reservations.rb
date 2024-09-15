class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.string :pet_name
      t.string :pet_type
      t.integer :pet_age
      t.string :reservation_date
      t.string :owner_name
      t.integer :owner_phone
      t.string :owner_email

      t.timestamps
    end
  end
end
