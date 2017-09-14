class CreateCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.text :description
      t.belongs_to :project

      t.timestamps
    end
  end
end
