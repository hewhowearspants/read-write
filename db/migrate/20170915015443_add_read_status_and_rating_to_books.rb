class AddReadStatusAndRatingToBooks < ActiveRecord::Migration[5.1]
  def change
    change_table :books do |t|
      t.boolean :read
      t.integer :user_rating
    end
  end
end
