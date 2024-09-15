class RenamePetTypeToReservationType < ActiveRecord::Migration[7.1]
  def change
    rename_column :reservations, :pet_type, :reservation_type
  end
end
