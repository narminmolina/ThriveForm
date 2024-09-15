class ReservationFieldsOptional < ActiveRecord::Migration[7.1]
   def change
    change_column_null :reservations, :owner_name, true
    change_column_null :reservations, :pet_age, true
    change_column_null :reservations, :owner_phone, true
    change_column_null :reservations, :owner_email, true
    change_column_null :reservations, :reservation_date, true
  end
end
