class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.integer :year
      t.string :genre
      t.text :description
      t.string :image_url
      t.belongs_to :user
      t.string :user_comment

      t.timestamps
    end
  end
end
